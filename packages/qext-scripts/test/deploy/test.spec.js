const { Observable } = require("rxjs")
const { tap, map, switchMap } = require("rxjs/operators")
const httpInsecure = require("http")
const httpSecure = require("https")
const config = require("./deploy-to-server-windows-auth/qext.config.json")
const path = require("path")
const should = require("chai").should()
const execQextScripts = require("../util/exec-qext-scripts")
const fs = require("fs-extra")

describe("deploy", function() {
	this.timeout(20000)

	const delete$ = Observable.create(observer => {
		const { serverDeploy, session, extension } = config
		const { isSecure, hdrAuthUser, allowSelfSignedSignature, host, port } = serverDeploy
		const http = isSecure ? httpSecure : httpInsecure

		const headers = {
			"x-qlik-xrfkey": "123456789abcdefg",
			"content-type": "application/zip",
			"hdr-usr": "win-jt0r3uds9hc\\qexter",
		}

		const options = {
			method: "DELETE",
			rejectUnauthorized: allowSelfSignedSignature ? false : true,
			host: host,
			port: port ? port : null,
			headers,
			path: `/hdr/qrs/extension/name/${extension}?xrfkey=123456789abcdefg`,
		}

		const request = http.request(options, res => {
			let chunks = []

			res
				.on("data", chunk => chunks.push(chunk))
				.on("end", () => {
					const { statusCode, statusMessage } = res
					if (statusCode === 403) {
						observer.error({ authenticate: true, config })
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
		})
		request.end()
	}).pipe(map(({ config }) => config))

	const checkExtensionExists = extensionName =>
		Observable.create(observer => {
			const { serverDeploy, session, extension } = config
			const { isSecure, hdrAuthUser, allowSelfSignedSignature, host, port } = serverDeploy
			const http = isSecure ? httpSecure : httpInsecure

			const headers = {
				"x-qlik-xrfkey": "123456789abcdefg",
				"content-type": "application/zip",
				"hdr-usr": "win-jt0r3uds9hc\\qexter",
			}

			const options = {
				method: "GET",
				rejectUnauthorized: allowSelfSignedSignature ? false : true,
				host: host,
				port: port ? port : null,
				headers,
				path: `/hdr/qrs/extension?xrfkey=123456789abcdefg`,
			}

			const request = http.request(options, res => {
				let chunks = []

				res
					.on("data", chunk => chunks.push(chunk))
					.on("end", () => {
						const extensionList = JSON.parse(Buffer.concat(chunks).toString())

						const extensionExists = extensionList.find(extension => extension.name === extensionName)

						if (extensionExists === undefined) observer.error("extension not found")
						else {
							observer.next(true)
							observer.complete()
						}
					})
					.on("error", observer.error)
			})

			request.end()
		})

	describe("deploy to server", function() {
		it("should deploy an extension using windows auth", done => {
			const deploy$ = delete$.pipe(
				switchMap(() =>
					Observable.create(observer => {
						const extensionDir = path.resolve(__dirname, "./deploy-to-server-windows-auth")

						execQextScripts(extensionDir, (error, stdout, stderr) => {
							if (error !== null || stderr.length) observer.error({ error, stderr })

							observer.next(extensionDir)
							observer.complete()
						})
					})
				)
			)

			const check$ = deploy$.pipe(switchMap(() => checkExtensionExists("qext-test")))

			const cleanup$ = check$.pipe(
				switchMap(a => {
					a.should.equal(true)
					return delete$
				})
			)

			cleanup$.subscribe(() => {
				done()
			})
		})

		it("should deploy an extension using header auth", done => {
			const deploy$ = delete$.pipe(
				switchMap(() =>
					Observable.create(observer => {
						const extensionDir = path.resolve(__dirname, "./deploy-to-server-header-auth")

						execQextScripts(extensionDir, (error, stdout, stderr) => {
							if (error !== null || stderr.length) observer.error({ error, stderr })

							observer.next(extensionDir)
							observer.complete()
						})
					})
				)
			)

			const check$ = deploy$.pipe(switchMap(() => checkExtensionExists("qext-test")))

			const cleanup$ = check$.pipe(
				switchMap(a => {
					a.should.equal(true)
					return delete$
				})
			)

			cleanup$.subscribe(() => {
				done()
			})
		})
	})

	describe("deploy to desktop", function() {
		it("should deploy extension to desktop location", done => {
			const extensionDir = path.resolve(__dirname, "./deploy-to-desktop")
			const desktopDestination = `${extensionDir}/desktop-dest`

			const deleteDesktopDest = fs.remove(desktopDestination)

			deleteDesktopDest.then(() => {
				execQextScripts(extensionDir, () => {
					const desktopExtensionExists = fs.pathExists(`${desktopDestination}/example`)
					desktopExtensionExists.then(res => {
						res.should.equal(true)
						done()
					})
				})
			})
		})
	})
})
