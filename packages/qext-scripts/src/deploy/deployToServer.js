import { Observable } from "rxjs"
import { tap, map, switchMap } from "rxjs/operators"
import httpInsecure from "http"
import httpSecure from "https"
import path from "path"
import fs from "fs-extra"

export default config =>
	Observable.create(observer => {
		const { serverDeploy, session } = config
		const { isSecure, hdrAuthUser, hdrAuthHeaderName, allowSelfSignedSignature, host, port } = serverDeploy

		const http = isSecure ? httpSecure : httpInsecure

		const headers = session
			? { "x-qlik-xrfkey": "123456789abcdefg", "content-type": "application/zip", Cookie: `X-Qlik-Session=${session}` }
			: hdrAuthUser
			? {
					"x-qlik-xrfkey": "123456789abcdefg",
					"content-type": "application/zip",
					[hdrAuthHeaderName ? hdrAuthHeaderName : "hdr-usr"]: hdrAuthUser,
			  }
			: { "x-qlik-xrfkey": "123456789abcdefg", "content-type": "application/zip" }

		const options = {
			rejectUnauthorized: allowSelfSignedSignature ? false : true,
			host: host,
			port: port ? port : null,
			headers,
		}

		observer.next({ config, options, http })
	}).pipe(
		switchMap(({ config, options, http }) =>
			Observable.create(observer => {
				const { extension, serverDeploy } = config
				const prefix = serverDeploy.prefix ? `/${serverDeploy.prefix}` : ""

				const request = http.request(
					{ ...options, method: "DELETE", path: `${prefix}/qrs/extension/name/${extension}?xrfkey=123456789abcdefg` },
					res => {
						let chunks = []

						res
							.on("data", chunk => chunks.push(chunk))
							.on("end", () => {
								const { statusCode, statusMessage } = res
								if (statusCode === 403) {
									observer.error({
										message: `${statusCode}: ${statusMessage}`,
										//  authenticate: true, config
									})
								} else if (statusCode === 400) {
									observer.next({ message: "not found", config, options, http })
									observer.complete()
								} else if (statusCode >= 200 && res.statusCode < 300) {
									observer.next({ message: "old extension deleted", config, options, http })
									observer.complete()
								} else {
									observer.error({ config, message: `${statusCode}: ${statusMessage}` })
								}
							})
							.on("error", err => {
								observer.error(err)
							})
					}
				)
				request.end()
			})
		),
		tap(({ message }) => console.log(`${message}\n`)),
		switchMap(({ config, options, http }) =>
			Observable.create(observer => {
				const { extension, output, serverDeploy } = config
				const prefix = serverDeploy.prefix ? `/${serverDeploy.prefix}` : ""
				const extensionPath = path.resolve(process.cwd(), `${output}/${extension}.zip`)

				fs.readFile(extensionPath).then(data => {
					const request = http.request(
						{ ...options, method: "POST", path: `${prefix}/qrs/extension/upload?xrfkey=123456789abcdefg` },
						res => {
							let chunks = []

							res
								.on("data", chunk => chunks.push(chunk))
								.on("end", () => {
									const { statusCode, statusMessage } = res
									if (statusCode === 403 || statusCode === 302) {
										observer.error({ authenticate: true })
									} else if (statusCode >= 200 && statusCode < 300) {
										observer.next({ config, message: "updated" })
										observer.complete()
									} else {
										observer.error({ config, message: `${statusCode}: ${statusMessage}` })
									}
								})
								.on("error", err => {
									observer.error(err)
								})
						}
					)

					request.write(data)
					request.end()
				})
			})
		),
		tap(({ message }) => console.log(`${message}\n`)),
		map(({ config }) => config)
	)
