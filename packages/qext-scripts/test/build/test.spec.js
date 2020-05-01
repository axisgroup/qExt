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
			const dist = `${extensionDir}/dist`
			const output = `${dist}/example`
			const deleteDist = fs.remove(dist)

			deleteDist.then(() => {
				execQextScripts(extensionDir, (error, stdout, stderr) => {
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
			const dist = `${extensionDir}/dist`
			const output = `${dist}/example`
			const deleteDist = fs.remove(dist)

			deleteDist.then(() => {
				execQextScripts(extensionDir, (error, stdout, stderr) => {
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
			const entry = path.resolve(extensionDir, `./src`)
			const dist = `${extensionDir}/dist`
			const output = `${dist}/example`
			const deleteDist = fs.remove(dist)

			const initializeIndexFile = fs.writeFile(`${entry}/index.js`, "const a = 1", "utf8")

			Promise.all([deleteDist, initializeIndexFile]).then(() => {
				watchQextScripts(
					extensionDir,
					(error, stdout, stderr) => {},
					child => {
						const start = new Promise(resolve => setTimeout(() => resolve(), 5000))
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
			const entry = `${extensionDir}/static`
			const dist = `${extensionDir}/dist`
			const output = `${dist}/example`
			const deleteDist = fs.remove(dist)

			const initializeFile = fs.writeFile(`${entry}/file.txt`, "a", "utf8")

			Promise.all([deleteDist, initializeFile]).then(() => {
				watchQextScripts(
					extensionDir,
					() => {},
					child => {
						const start = new Promise(resolve => setTimeout(() => resolve(), 5000))
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

	describe("compile builds", function() {
		it("should compile the input src directory into the output directory in compile mode", done => {
			const extensionDir = path.resolve(__dirname, "./compile-build-src")
			const output = path.resolve(extensionDir, "./dist")
			const deleteDist = fs.remove(output)

			deleteDist.then(() => {
				execQextScripts(extensionDir, (error, stdout, stderr) => {
					const indexExists = fs.pathExists(`${output}/example/example.js`)
					const qextExists = fs.pathExists(`${output}/example/example.qext`)

					Promise.all([indexExists, qextExists]).then(([indexRes, qextRes]) => {
						indexRes.should.equal(true)
						qextRes.should.equal(true)
						done()
					})
				})
			})
		})

		it("should copy the static directory into output when compiling", done => {
			const extensionDir = path.resolve(__dirname, "./compile-build-static")
			const output = path.resolve(extensionDir, "./dist")
			const deleteDist = fs.remove(output)

			deleteDist.then(() => {
				execQextScripts(extensionDir, (error, stdout, stderr) => {
					const staticFileExists = fs.pathExists(`${output}/example/static/file.txt`)

					staticFileExists.then(res => {
						res.should.equal(true)
						done()
					})
				})
			})
		})

		it("should compile css resources", done => {
			const extensionDir = path.resolve(__dirname, "./compile-css")
			const output = path.resolve(extensionDir, "./dist")
			const deleteDist = fs.remove(output)

			deleteDist.then(() => {
				execQextScripts(extensionDir, (error, stdout, stderr) => {
					stderr.should.equal("")
					done()
				})
			})
		})

		it("should compile html resources", done => {
			const extensionDir = path.resolve(__dirname, "./compile-html")
			const output = path.resolve(extensionDir, "./dist")
			const deleteDist = fs.remove(output)

			deleteDist.then(() => {
				execQextScripts(extensionDir, (error, stdout, stderr) => {
					stderr.should.equal("")
					done()
				})
			})
		})

		it("should watch and compile the src directory", done => {
			const extensionDir = path.resolve(__dirname, "./compile-build-src")
			const entry = path.resolve(extensionDir, "./src/index.js")
			const output = path.resolve(extensionDir, "./dist")
			const deleteDist = fs.remove(output)
			const outputFile = `${output}/example/example.js`

			const initializeIndexFile = fs.writeFile(entry, 'console.log("test")', "utf8")

			Promise.all([deleteDist, initializeIndexFile]).then(() => {
				watchQextScripts(
					extensionDir,
					() => {},
					child => {
						const start = new Promise(resolve => setTimeout(() => resolve(), 5000))
						const initialDistIndex = start.then(() => fs.readFile(outputFile, "utf8"))

						const updateFile = initialDistIndex.then(contents => {
							contents.indexOf(`console.log("test")`).should.be.above(-1)
							return fs.writeFile(entry, 'console.log("test update")', "utf8")
						})

						updateFile.then(() =>
							fs.watchFile(outputFile, () => {
								const newDistFile = fs.readFile(outputFile, "utf8")

								newDistFile.then(contents => {
									contents.indexOf(`console.log("test update")`).should.be.above(-1)
									done()
									child.kill()
									fs.unwatchFile(outputFile)
								})
							})
						)
					}
				)
			})
		})

		it("should watch and copy the static directory in compile mode", done => {
			const extensionDir = path.resolve(__dirname, "./compile-build-static")
			const entryFile = `${extensionDir}/static/file.txt`
			const output = `${extensionDir}/dist`
			const outputFile = `${output}/example/static/file.txt`

			const deleteDist = fs.remove(output)
			const initializeStaticFile = fs.writeFile(entryFile, "a", "utf8")

			Promise.all([deleteDist, initializeStaticFile]).then(() => {
				watchQextScripts(
					extensionDir,
					() => {},
					child => {
						const start = new Promise(resolve => setTimeout(() => resolve(), 5000))
						const initialDistIndex = start.then(() => fs.readFile(outputFile, "utf8"))

						const updateFile = initialDistIndex.then(contents => {
							contents.should.equal("a")
							return fs.writeFile(entryFile, "b", "utf8")
						})

						updateFile.then(() =>
							fs.watchFile(outputFile, () => {
								const newDistFile = fs.readFile(outputFile, "utf8")

								newDistFile.then(contents => {
									contents.should.equal("b")
									done()
									child.kill()
									fs.unwatchFile(outputFile)
								})
							})
						)
					}
				)
			})
		})
	})

	describe("zip", function() {
		it("should zip the distribution extension directory", done => {
			const extensionDir = path.resolve(__dirname, "./zip")
			const distDir = `${extensionDir}/dist`

			execQextScripts(extensionDir, (err, stdout, stderr) => {
				const zipFileExists = fs.pathExists(`${distDir}/example.zip`)

				zipFileExists.then(res => {
					res.should.equal(true)
					done()
				})
			})
		})
	})
})
