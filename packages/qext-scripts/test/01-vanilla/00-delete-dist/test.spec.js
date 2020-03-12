const should = require("chai").should()
const path = require("path")
const fs = require("fs-extra")
const execQextScripts = require("../../util/exec-qext-scripts")
const testExtensionDir = path.resolve(__dirname, "./TestExtension")

describe("00. Delete output directory", function() {
	this.timeout(10000)

	before("creating output directory", () => {
		return new Promise(resolve => {
			// Read in output directory name
			fs.readJson(`${testExtensionDir}/qext.config.json`)
				.then(config => config.output)
				.then(output => fs.ensureDir(path.resolve(testExtensionDir, output)))
				.then(resolve)
				.catch(console.log)
		})
	})

	it("should delete output directory", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			fs.readJson(`${testExtensionDir}/qext.config.json`)
				.then(config => config.output)
				.then(output => fs.stat(path.resolve(testExtensionDir, output)))
				.catch(err => {
					done()
				})
		})
	})
})
