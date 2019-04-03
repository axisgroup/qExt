const should = require("chai").should()
const path = require("path")
const fs = require("fs-extra")
const execQextScripts = require("../../util/exec-qext-scripts")

const testExtensionDir = path.resolve(__dirname, "./TestExtension")
const extensionName = "test-extension"

describe("09. Desktop Config destination property", function() {
	this.timeout(10000)

	it("should fail if destination in desktopConfig is not defined", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			stderr.should.equal(`destination not defined in "desktopConfig"\n`)
			done()
		})
	})
})
