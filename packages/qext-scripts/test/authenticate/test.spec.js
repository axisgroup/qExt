const execQextScripts = require("../util/exec-qext-scripts")
const path = require("path")
const should = require("chai").should()

describe("authenticate", function() {
	this.timeout(20000)

	it("should not prompt for authentication if serverDeploy.windowsAuth not set", done => {
		const extensionDir = path.resolve(__dirname, "./no-authentication")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal("")
			done()
		})
	})

	it("should prompt for authentication if serverDeploy.windowsAuth set", done => {
		const extensionDir = path.resolve(__dirname, "./authentication")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stdout.indexOf("authentication successful").should.not.equal(-1)
			done()
		})
	})

	it("should fail authentication if wrong password", done => {
		const extensionDir = path.resolve(__dirname, "./wrong-password")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stdout.indexOf("authentication failed").should.not.equal(-1)
			done()
		})
	})
})
