const should = require("chai").should()
const path = require("path")
const fs = require("fs-extra")
const execQextScripts = require("../../util/exec-qext-scripts")
const httpInsecure = require("http")
const httpSecure = require("https")

const testExtensionDir = path.resolve(__dirname, "./TestExtension")
const extensionName = "test-extension"

describe("03. Deploy to server", function() {
	this.timeout(10000)

	it("should deploy extension file to server", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			const config = fs.readJson(`${testExtensionDir}/qext.config.json`)
			const qextFile = fs.readJson(
				`${testExtensionDir}/src/${extensionName}.qext`
			)

			Promise.all([config, qextFile]).then(([config, qextFile]) => {
				const http = config.serverConfig.isSecure ? httpSecure : httpInsecure

				const prefix = config.serverConfig.prefix
					? `/${config.serverConfig.prefix}`
					: ""

				const headers = {
					"x-qlik-xrfkey": "123456789abcdefg",
					"content-type": "application/zip",
					"hdr-usr": config.serverConfig["hdr-usr"],
				}

				const options = {
					method: "GET",
					host: config.serverConfig.host,
					port: config.serverConfig.port ? config.serverConfig.port : null,
					headers,
					path: `${prefix}/qrs/extension/schema?xrfkey=123456789abcdefg`,
				}

				const request = http.request(options, res => {
					let chunks = []

					res
						.on("data", chunk => chunks.push(chunk))
						.on("end", () => {
							const body = Buffer.concat(chunks).toString()
							const extensionList = JSON.parse(body)
							const extension = extensionList[extensionName]

							extension.should.deep.equal(qextFile)

							done()
						})
				})

				request.end()
			})
		})
	})
})
