const execQextScripts = require("../util/exec-qext-scripts")
const watchQextScripts = require("../util/watch-qext-scripts")
const path = require("path")
const should = require("chai").should()
const fs = require("fs-extra")

describe("build", function() {
	this.timeout(20000)

	describe("vanilla builds", function() {
		it("should copy the input directory into the output directory in vanilla build", done => {
			const extensionDir = path.resolve(__dirname, "./vanilla-build-src")
			const deleteDist = fs.remove(path.resolve(__dirname, `./vanilla-build-src/dist`))
			deleteDist.then(() => {
				execQextScripts(extensionDir, (error, stdout, stderr) => {
					const output = path.resolve(__dirname, `./vanilla-build-src/dist`)
					const distExists = fs.pathExists(output)
					const indexExists = fs.pathExists(`${output}/index.js`)
					Promise.all([distExists, indexExists]).then(([distExistsRes, indexExistsRes]) => {
						distExistsRes.should.equal(true)
						indexExistsRes.should.equal(true)
						done()
					})
				})
			})
		})

		it("should copy the static directory into the output directory when defined in vanilla config", done => {
			const extensionDir = path.resolve(__dirname, "./vanilla-build-static")
			const deleteDist = fs.remove(path.resolve(__dirname, `./vanilla-build-static/dist`))
			deleteDist.then(() => {
				execQextScripts(extensionDir, (error, stdout, stderr) => {
					const output = path.resolve(__dirname, `./vanilla-build-static/dist`)
					const distExists = fs.pathExists(output)
					const indexExists = fs.pathExists(`${output}/index.js`)
					const staticExists = fs.pathExists(`${output}/static`)
					Promise.all([distExists, indexExists, staticExists]).then(
						([distExistsRes, indexExistsRes, staticExistsResp]) => {
							distExistsRes.should.equal(true)
							indexExistsRes.should.equal(true)
							staticExistsResp.should.equal(true)
							done()
						}
					)
				})
			})
		})

		it("should watch the input src directory in watch mode", done => {
			const extensionDir = path.resolve(__dirname, "./vanilla-build-src")
			const deleteDist = fs.remove(path.resolve(__dirname, `./vanilla-build-src/dist`))

			const entry = path.resolve(extensionDir, `./src`)
			const output = path.resolve(extensionDir, `./dist`)

			const initializeIndexFile = fs.writeFile(`${entry}/index.js`, "const a = 1", "utf8")

			Promise.all([deleteDist, initializeIndexFile]).then(() => {
				watchQextScripts(
					extensionDir,
					(error, stdout, stderr) => {},
					child => {
						const start = new Promise(resolve => setTimeout(() => resolve(), 3000))
						const initialDistIndex = start.then(() =>
							fs.readFile(`${output}/index.js`, "utf8").then(contents => {
								contents.should.equal("const a = 1")
								return
							})
						)

						const updateIndex = initialDistIndex.then(() => fs.writeFile(`${entry}/index.js`, "const a = 2", "utf8"))

						updateIndex.then(() =>
							fs.watchFile(`${output}/index.js`, () => {
								const newDistIndex = updateIndex.then(() => fs.readFile(`${output}/index.js`, "utf8"))
								newDistIndex.then(contents => {
									contents.should.equal("const a = 2")
									done()
									child.kill()
									fs.unwatchFile(`${output}/index.js`)
								})
							})
						)
					}
				)
			})
		})

		it("should watch the input static directory in watch mode", done => {
			const extensionDir = path.resolve(__dirname, "./vanilla-build-static")
			const deleteDist = fs.remove(path.resolve(extensionDir, "./dist"))

			const entry = path.resolve(extensionDir, "./static")
			const output = path.resolve(extensionDir, "./dist")

			const initializeFile = fs.writeFile(`${entry}/file.txt`, "a", "utf8")

			Promise.all([deleteDist, initializeFile]).then(() => {
				watchQextScripts(
					extensionDir,
					() => {},
					child => {
						const start = new Promise(resolve => setTimeout(() => resolve(), 3000))
						const initialDistFile = start.then(() => fs.readFile(`${output}/static/file.txt`, "utf8"))

						const updateFile = initialDistFile.then(contents => {
							contents.should.equal("a")
							return fs.writeFile(`${entry}/file.txt`, "b", "utf8")
						})

						updateFile.then(() =>
							fs.watchFile(`${output}/static/file.txt`, () => {
								const newDistFile = fs.readFile(`${output}/static/file.txt`, "utf8")

								newDistFile.then(contents => {
									contents.should.equal("b")
									done()
									child.kill()
									fs.unwatchFile(`${output}/static/file.txt`)
								})
							})
						)
					}
				)
			})
		})
	})
})
