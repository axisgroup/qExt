const should = require("chai").should()
const path = require("path")
const fs = require("fs-extra")
const execQextScripts = require("../../util/exec-qext-scripts")

const testExtensionDir = path.resolve(__dirname, "./TestExtension")
const extensionName = "test-extension"

describe("10. Server Config destination property", function() {
	this.timeout(10000)

	it("should fail if serverConfig is not defined", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			stderr.should.equal(
				`serverConfig property not defined in ./qext.config.json\n`
			)
			done()
		})
	})
})
