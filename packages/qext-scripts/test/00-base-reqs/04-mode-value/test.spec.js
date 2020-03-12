const should = require("chai").should()
const path = require("path")
const execQextScripts = require("../../util/exec-qext-scripts")
const testExtensionDir = path.resolve(__dirname, "./TestExtension")

describe('04. Mode value not set to "vanilla" or "compile"', function() {
	this.timeout(10000)

	it('should fail when mode value not set to "vanilla" or "compile"', done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			stderr.should.equal('mode value must be set to "vanilla" or "compile"\n')
			done()
		})
	})
})
