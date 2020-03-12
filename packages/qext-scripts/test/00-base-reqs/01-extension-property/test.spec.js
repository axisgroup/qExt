const should = require("chai").should()
const path = require("path")
const execQextScripts = require("../../util/exec-qext-scripts")
const testExtensionDir = path.resolve(__dirname, "./TestExtension")

describe("01. No extension property in qext.config.json object", function() {
	this.timeout(10000)

	it("should fail when extension property is not defined", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			stderr.should.equal(
				"extension property not defined in ./qext.config.json\n"
			)
			done()
		})
	})
})
