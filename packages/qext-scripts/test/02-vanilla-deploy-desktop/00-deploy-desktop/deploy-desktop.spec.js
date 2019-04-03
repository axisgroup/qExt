const should = require("chai").should()
const path = require("path")
const fs = require("fs-extra")
const execQextScripts = require("../../util/exec-qext-scripts")

const testExtensionDir = path.resolve(__dirname, "./TestExtension")
const extensionName = "test-extension"

describe("00. Deploy to Desktop", function() {
	this.timeout(10000)

	it("should copy dist files to desktop location", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			console.log(stdout)
			console.log(stderr)
			done()
		})
	})
})
