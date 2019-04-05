const should = require("chai").should()
const path = require("path")
const fs = require("fs-extra")
const execQextScripts = require("../../util/exec-qext-scripts")

const testExtensionDir = path.resolve(__dirname, "./TestExtension")
const extensionName = "test-extension"

describe("16. Compile-Qext property not set", function() {
	this.timeout(10000)

	it("should fail if qext property is not within compile", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			stderr.should.equal(`qext property not defined in "compile"\n`)
			done()
		})
	})
})
