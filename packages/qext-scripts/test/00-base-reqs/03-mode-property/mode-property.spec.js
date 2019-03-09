const should = require("chai").should()
const path = require("path")
const execQextScripts = require("../../util/exec-qext-scripts")
const testExtensionDir = path.resolve(__dirname, "./TestExtension")

describe("No mode property in qext.config.json object", function() {
	this.timeout(10000)

	it("should fail when mode property is not defined", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			stderr.should.equal("mode property not defined in ./qext.config.json\n")
			done()
		})
	})
})
