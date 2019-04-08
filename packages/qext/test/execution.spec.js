const should = require("chai").should()
const { exec } = require("child_process")
const path = require("path")
const fs = require("fs-extra")

const qext = path.resolve(__dirname, "../bin/qext.js")
const testDir = path.resolve(__dirname)

const extensionName = "test-extension"
const extensionDir = path.join(testDir, extensionName)

describe("Execute qext", function() {
	/** --create-extension flag not on */
	it("should prompt if --create-extension argument not set", done => {
		exec(`node "${qext}"`, (error, stdout, stderr) => {
			stderr.should.equal(
				'set "-c, --create-extension <name>" flag to create extension\n'
			)

			done()
		})
	})

	/** --create-extension flag no value */
	it("should prompt if --create-extension flag on with no value", done => {
		exec(`node "${qext}" -c`, (error, stdout, stderr) => {
			stderr.should.equal(
				"error: option `-c, --create-extension <name>' argument missing\n"
			)

			done()
		})
	})

	describe("Create Extension Files", function() {
		before("creating extension files", () => {
			return new Promise((resolve, reject) => {
				exec(
					`node "${qext}" -c ${extensionName}`,
					{ cwd: testDir },
					(error, stdout, stderr) => {
						console.log(stdout)
						resolve()
					}
				)
			})
		})

		/** Check development directory */
		it(`${extensionName} directory should exist`, done => {
			fs.stat(extensionDir)
				.then(() => done())
				.catch(console.error)
		})

		/** package.json */
		it(`${extensionName} should have a package.json file`, done => {
			fs.readdir(extensionDir).then(extensionContents => {
				extensionContents.should.contain("package.json")
				done()
			})
		})

		/** qext.config.json */
		it(`${extensionName} should contain a qext.config.json file`, done => {
			fs.readdir(extensionDir)
				.then(extensionContents => {
					extensionContents.should.contain("qext.config.json")
					done()
				})
				.catch(console.error)
		})

		/** static */
		it(`${extensionName} should contain a static directory`, done => {
			fs.readdir(extensionDir)
				.then(extensionContents => {
					extensionContents.should.contain("static")
					done()
				})
				.catch(console.error)
		})

		/** src */
		it(`${extensionName} should contain a src directory`, done => {
			fs.readdir(extensionDir)
				.then(extensionContents => {
					extensionContents.should.contain("src")
					done()
				})
				.catch(console.error)
		})

		/** Source index.js */
		it(`${extensionName}/src should contain file "index.js"`, done => {
			fs.readdir(path.join(testDir, extensionName, "src"))
				.then(contents => {
					contents.should.contain("index.js")
					done()
				})
				.catch(console.error)
		})

		/** Source index.qext */
		it(`${extensionName}/src should contain file "index.qext"`, done => {
			fs.readdir(path.join(testDir, extensionName, "src"))
				.then(contents => {
					contents.should.contain("index.qext")
					done()
				})
				.catch(console.error)
		})

		/** DESTROY */
		after("destroying extension files", () => {
			fs.remove(extensionDir).catch(console.error)
		})
	})
})
