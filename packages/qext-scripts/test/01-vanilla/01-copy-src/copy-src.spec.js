const should = require("chai").should()
const path = require("path")
const fs = require("fs-extra")
const execQextScripts = require("../../util/exec-qext-scripts")
const testExtensionDir = path.resolve(__dirname, "./TestExtension")

describe("01. Copy source directory", function() {
	this.timeout(10000)

	it("should copy source directory into output", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			done()
		})
	})
})
