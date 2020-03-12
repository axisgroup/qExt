const should = require("chai").should()

const path = require("path")
const execQextScripts = require("../../util/exec-qext-scripts")

const testExtensionDir = path.resolve(__dirname, "./TestExtension")

describe("00. No qext.config.json file", function() {
	this.timeout(20000)

	it("should fail when qext-scripts is run with message './qext.config.json not found'", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			stderr.should.equal("./qext.config.json not found\n")

			done()
		})
	})
})
