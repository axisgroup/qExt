const should = require("chai").should()

const fs = require("fs-extra")
const path = require("path")
const { exec } = require("child_process")

describe("Base Requirements", function() {
	this.timeout(20000)
	/** Define Extension Directory */
	const testExtensionDirectory = path.resolve(__dirname, "./TestExtension")

	const qextScriptsPath = path.join(path.resolve(), "bin/qext-scripts.js")

	const execQextScripts = cbFunc => {
		exec(`node "${qextScriptsPath}"`, { cwd: testExtensionDirectory }, cbFunc)
	}

	/** Create new TestExtension Folder */
	before("Creating TestExtension directory", () => {
		return new Promise(resolve => {
			// Create new TestExtension Directory
			fs.ensureDir(testExtensionDirectory).then(() => {
				// Resolve Promise
				resolve()
			})
		})
	})

	/** TestExtension directory should be created before this test
	 * is run
	 */
	it("should have a directory called TestExtension", done => {
		// Read testExtensionDirectory
		fs.readdir(testExtensionDirectory)
			// If found, pass
			.then(() => {
				done()
			})
			// If not, catch error
			.catch(() => console.error(`${testExtensionDirectory} not found`))
	})

	/** running qext-scripts should return an error before
	 * qext.config.json is created
	 */
	it("should fail when qext-scripts is run with message './qext.config.json not found'", done => {
		execQextScripts((error, stdout, stderr) => {
			stderr.should.equal("./qext.config.json not found\n")
			done()
		})
	})

	/**
	 * Create qext.config.json
	 */
	describe("Create qext.config.json", function() {
		const qextConfigFileName = "qext.config.json"
		/** Define qext.config.json file */
		const qextConfigFile = `${testExtensionDirectory}/${qextConfigFileName}`

		/** Create qext.config.json file with empty object */
		before("Creating qext.config.json file", () => {
			return new Promise(resolve => {
				fs.outputJson(qextConfigFile, {})
					.then(() => resolve())
					.catch(console.log)
			})
		})

		/** qext.config.json should exist and be empty */
		it("should exist and contain an empty object", done => {
			// Read qext.config.json file
			fs.readJson(qextConfigFile)
				.then(obj => {
					const EMPTY_OBJ = {}
					obj.should.deep.equal(EMPTY_OBJ)

					done()
				})
				.catch(console.log)
		})

		/** qext-scripts should fail when extension property not defined */
		it("should fail when extension property not defined and return specified error message", done => {
			execQextScripts((error, stdout, stderr) => {
				stderr.should.equal(
					`extension property not defined in ./${qextConfigFileName}\n`
				)
				done()
			})
		})

		/** define extension property */
		describe("define extension property in qext.config.json", function() {
			/** define property */
			before("Defining extension property", () => {
				return new Promise(resolve => {
					fs.readJson(qextConfigFile)
						.then(obj => Object.assign(obj, { extension: "test-extension" }))
						.then(obj => fs.writeJson(qextConfigFile, obj))
						.then(() => resolve())
						.catch(console.log)
				})
			})

			/** qext-scripts should fail when output property not defined */
			it("should fail when output property not defined", done => {
				execQextScripts((error, stdout, stderr) => {
					stderr.should.equal(
						`output property not defined in ./${qextConfigFileName}\n`
					)
					done()
				})
			})
		})
	})

	/** Tear down TestExtension after tests */
	after("Tearing down TestExtension directory", () => {
		return new Promise(resolve => {
			fs.remove(`${testExtensionDirectory}`).then(() => {
				resolve()
			})
		})
	})
})
