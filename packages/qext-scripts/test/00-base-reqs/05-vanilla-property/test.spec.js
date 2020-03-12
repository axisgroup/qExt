const should = require("chai").should()
const path = require("path")
const execQextScripts = require("../../util/exec-qext-scripts")
const testExtensionDir = path.resolve(__dirname, "./TestExtension")

describe("05. Vanilla property not set", function() {
	this.timeout(10000)

	it("should fail when vanilla property is not defined", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			stderr.should.equal(
				"vanilla property not defined in ./qext.config.json\n"
			)
			done()
		})
	})
})
