const should = require("chai").should()
const path = require("path")
const fs = require("fs-extra")
const execQextScripts = require("../../util/exec-qext-scripts")

const testExtensionDir = path.resolve(__dirname, "./TestExtension")
const extensionName = "test-extension"

describe("12. Server Header Host property", function() {
	this.timeout(10000)

	it("should fail if host is not defined in serverConfig", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			stderr.should.equal(`host property not defined in serverConfig\n`)
			done()
		})
	})
})
