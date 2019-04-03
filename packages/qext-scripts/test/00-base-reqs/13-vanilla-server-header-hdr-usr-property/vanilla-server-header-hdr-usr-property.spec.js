const should = require("chai").should()
const path = require("path")
const fs = require("fs-extra")
const execQextScripts = require("../../util/exec-qext-scripts")

const testExtensionDir = path.resolve(__dirname, "./TestExtension")
const extensionName = "test-extension"

describe("13. Server Header hdr-usr property", function() {
	this.timeout(10000)

	it("should fail if hdr-usr is not defined in serverConfig", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			stderr.should.equal(`hdr-usr property not defined in serverConfig\n`)
			done()
		})
	})
})
