const should = require("chai").should()
const path = require("path")
const fs = require("fs-extra")
const execQextScripts = require("../../util/exec-qext-scripts")

const testExtensionDir = path.resolve(__dirname, "./TestExtension")
const extensionName = "test-extension"

describe("00. Compile to dist", function() {
	this.timeout(20000)

	it("should compile", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			const config = fs.readJson(`${testExtensionDir}/qext.config.json`)

			config.then(config => {
				const distDir = fs.readdir(`${testExtensionDir}/${config.output}`)

				const checkDist = distDir
					.then(directoryContents => {
						directoryContents.should.deep.equal([
							"test-extension",
							"test-extension.zip",
						])
					})
					.catch(console.error)

				const bundledDir = checkDist.then(() => {
					return fs.readdir(
						`${testExtensionDir}/${config.output}/test-extension`
					)
				})

				bundledDir
					.then(directoryContents => {
						directoryContents.should.deep.equal([
							"static",
							"test-extension.js",
							"test-extension.qext",
						])
						done()
					})
					.catch(console.error)
			})
		})
	})
})
