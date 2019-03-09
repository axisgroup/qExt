const should = require("chai").should()
const path = require("path")
const execQextScripts = require("../../util/exec-qext-scripts")
const testExtensionDir = path.resolve(__dirname, "./TestExtension")

describe("Vanilla property not set", function() {
	this.timeout(10000)

	it("should fail when vanilla-entry property is not defined", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			stderr.should.equal('entry property not defined in "vanilla"\n')
			done()
		})
	})
})
