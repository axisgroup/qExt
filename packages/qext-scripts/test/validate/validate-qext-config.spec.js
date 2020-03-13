const execQextScripts = require("../util/exec-qext-scripts")
const path = require("path")
const should = require("chai").should()

describe("validate-qext-config", function() {
	this.timeout(20000)

	it("should fail when no qext.config.json file exists", done => {
		const extensionDir = path.resolve(__dirname, "./no-qext-config")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal("./qext.config.json not found\n")
			done()
		})
	})

	it("should fail when extension not defined", done => {
		const extensionDir = path.resolve(__dirname, "./extension-not-defined")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal('"extension" is required\n')
			done()
		})
	})

	it("should fail when output not defined", done => {
		const extensionDir = path.resolve(__dirname, "./output-not-defined")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal('"output" is required\n')
			done()
		})
	})

	it("should fail if neither vanilla nor compile is defined", done => {
		const extensionDir = path.resolve(__dirname, "./vanilla-and-compile-not-defined")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal("config must contain at least one of [vanilla, compile]\n")
			done()
		})
	})

	it("should fail if vanilla.entry not defined", done => {
		const extensionDir = path.resolve(__dirname, "./vanilla.entry-not-defined")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal('"vanilla.entry" is required\n')
			done()
		})
	})

	it("should fail if compile.entry not defined", done => {
		const extensionDir = path.resolve(__dirname, "./compile.entry-not-defined")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal('"compile.entry" is required\n')
			done()
		})
	})

	it("should fail if compile.qext not defined", done => {
		const extensionDir = path.resolve(__dirname, "./compile.qext-not-defined")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal('"compile.qext" is required\n')
			done()
		})
	})

	it("should fail if both vanilla and compile are defined", done => {
		const extensionDir = path.resolve(__dirname, "./vanilla-and-compile-both-defined")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal("config contains a conflict between exclusive peers [vanilla, compile]\n")
			done()
		})
	})

	it("should fail if desktopDeploy.destination not defined", done => {
		const extensionDir = path.resolve(__dirname, "./desktopDeploy.destination-not-defined")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal('"desktopDeploy.destination" is required\n')
			done()
		})
	})

	it("should fail if serverDeploy.host not defined", done => {
		const extensionDir = path.resolve(__dirname, "./serverDeploy.host-not-defined")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal('"serverDeploy.host" is required\n')
			done()
		})
	})

	it("should fail if neither serverDeploy.hdrAuthUser nor serverDeploy.windowsAuth defined", done => {
		const extensionDir = path.resolve(__dirname, "./serverDeploy.hdrAuthUser-and-serverDeploy.windowsAuth-not-defined")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal("config must contain at least one of [serverDeploy.hdrAuthUser, serverDeploy.windowsAuth]\n")
			done()
		})
	})

	it("should fail if both serverDeploy.hdrAuthUser and serverDeploy.windowsAuth defined", done => {
		const extensionDir = path.resolve(__dirname, "./serverDeploy.hdrAuthUser-and-serverDeploy.windowsAuth-both-defined")
		execQextScripts(extensionDir, (error, stdout, stderr) => {
			stderr.should.equal(
				"config contains a conflict between exclusive peers [serverDeploy.hdrAuthUser, serverDeploy.windowsAuth]\n"
			)
			done()
		})
	})
})
