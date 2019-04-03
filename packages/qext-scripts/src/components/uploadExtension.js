import { Observable } from "rxjs"
import { map, switchMap, tap } from "rxjs/operators"
import httpInsecure from "http"
import httpSecure from "https"
import fs from "fs-extra"

export default inputAccessorFunction => {
	let accessorFunction

	if (inputAccessorFunction) accessorFunction = inputAccessorFunction
	else accessorFunction = a => a

	return obs$ =>
		obs$.pipe(
			map(accessorFunction),
			switchMap(({ config, cookie }) =>
				Observable.create(observer => {
					const http = config.serverConfig.isSecure ? httpSecure : httpInsecure
					const prefix = config.serverConfig.prefix
						? `/${config.serverConfig.prefix}`
						: ""

					const headers =
						config.authenticate === "windows"
							? {
									"x-qlik-xrfkey": "123456789abcdefg",
									"content-type": "application/zip",
									Cookie: `X-Qlik-Session=${cookie}`,
							  }
							: config.authenticate === "header"
							? {
									"x-qlik-xrfkey": "123456789abcdefg",
									"content-type": "application/zip",
									"hdr-usr": config.serverConfig["hdr-usr"],
							  }
							: {
									"x-qlik-xrfkey": "123456789abcdefg",
									"content-type": "application/zip",
							  }

					const options = {
						method: "DELETE",
						host: config.serverConfig.host,
						port: config.serverConfig.port ? config.serverConfig.port : null,
						path: `${prefix}/qrs/extension/name/${
							config.extension
						}?xrfkey=123456789abcdefg`,
						headers,
					}

					const request = http.request(options, res => {
						let chunks = []

						res
							.on("data", chunk => chunks.push(chunk))
							.on("end", () => {
								if (res.statusCode === 403) {
									observer.error({ authenticate: true })
								} else if (res.statusCode === 400) {
									observer.next({
										message: "not found",
										config,
										cookie,
									})
									observer.complete()
								} else if (res.statusCode >= 200 && res.statusCode < 300) {
									observer.next({
										message: "deleted",
										config,
										cookie,
									})
									observer.complete()
								} else {
									observer.error({
										statusCode: res.statusCode,
										statusMessage: res.statusMessage,
									})
								}
							})
							.on("error", err => {
								observer.error(err)
							})
					})

					request.end()
				})
			),
			switchMap(({ config, cookie }) =>
				Observable.create(observer => {
					const http = config.serverConfig.isSecure ? httpSecure : httpInsecure
					const prefix = config.serverConfig.prefix
						? `/${config.serverConfig.prefix}`
						: ""

					const headers =
						config.authenticate === "windows"
							? {
									"x-qlik-xrfkey": "123456789abcdefg",
									"content-type": "application/zip",
									Cookie: `X-Qlik-Session=${cookie}`,
							  }
							: config.authenticate === "header"
							? {
									"x-qlik-xrfkey": "123456789abcdefg",
									"content-type": "application/zip",
									"hdr-usr": config.serverConfig["hdr-usr"],
							  }
							: {
									"x-qlik-xrfkey": "123456789abcdefg",
									"content-type": "application/zip",
							  }

					const extensionPath = `${config.output}/${config.extension}.zip`

					const options = {
						method: "POST",
						host: config.serverConfig.host,
						port: config.serverConfig.port ? config.serverConfig.port : null,
						path: `${prefix}/qrs/extension/upload?xrfkey=123456789abcdefg`,
						headers,
					}

					const readZipFile = fs.readFile(extensionPath)

					readZipFile.then(data => {
						const request = http.request(options, res => {
							let chunks = []
							res
								.on("data", chunk => chunks.push(chunk))
								.on("end", () => {
									if (res.statusCode === 403 || res.statusCode === 302) {
										observer.error({ authenticate: true })
									} else if (res.statusCode >= 200 && res.statusCode < 300) {
										observer.next("uploaded")
										observer.complete()
									} else {
										observer.error({
											statusCode: res.statusCode,
											statusMessage: res.statusMessage,
										})
									}
								})
								.on("error", err => {
									observer.error(err)
								})
						})

						request.write(data)
						request.end()
					})
				})
			),
			tap(uplodStatus => console.log(`uploaded\n`))
		)
}
