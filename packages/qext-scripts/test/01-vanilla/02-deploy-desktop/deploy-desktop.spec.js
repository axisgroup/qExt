const should = require("chai").should()
const path = require("path")
const fs = require("fs-extra")
const execQextScripts = require("../../util/exec-qext-scripts")

const testExtensionDir = path.resolve(__dirname, "./TestExtension")
const extensionName = "test-extension"

describe("02. Deploy to desktop", function() {
	this.timeout(10000)

	it("should deploy to destination location", done => {
		execQextScripts(testExtensionDir, (error, stdout, stderr) => {
			const distDirectory = fs.readdir(
				`${testExtensionDir}/dist/${extensionName}`
			)
			const desktopDestination = fs
				.readJson(`${testExtensionDir}/qext.config.json`)
				.then(config => config.desktopConfig.destination)

			const desktopDirectory = desktopDestination.then(destination =>
				fs.readdir(`${destination}/${extensionName}`)
			)

			Promise.all([distDirectory, desktopDirectory]).then(
				([distDirectory, desktopDirectory]) => {
					desktopDirectory.should.deep.equal(distDirectory)
					done()
				}
			)
		})
	})
})
