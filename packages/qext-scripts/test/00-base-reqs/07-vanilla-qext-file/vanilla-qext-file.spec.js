const should = require("chai").should()
const path = require("path")
const execQextScripts = require("../../util/exec-qext-scripts")
const testExtensionDir = path.resolve(__dirname, "./TestExtension")

describe("07. Vanilla qext file not found", function() {
	this.timeout(10000)

	it("should fail in vanilla mode when qext file not found", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			stderr.should.equal("qext file not found in ./src\n\n")
			done()
		})
	})
})
