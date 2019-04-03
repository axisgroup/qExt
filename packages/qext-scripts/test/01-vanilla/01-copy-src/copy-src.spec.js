const should = require("chai").should()
const path = require("path")
const fs = require("fs-extra")
const execQextScripts = require("../../util/exec-qext-scripts")

const testExtensionDir = path.resolve(__dirname, "./TestExtension")
const extensionName = "test-extension"

describe("01. Copy source directory", function() {
	this.timeout(10000)

	it("should copy source directory into output", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			const srcDirectory = fs.readdir(`${testExtensionDir}/src`)
			const distDirectory = fs.readdir(
				`${testExtensionDir}/dist/${extensionName}`
			)

			Promise.all([srcDirectory, distDirectory]).then(
				([srcDirectory, distDirectory]) => {
					distDirectory.should.deep.equal(srcDirectory)
					done()
				}
			)
		})
	})
})
