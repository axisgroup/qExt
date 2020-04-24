const path = require("path")
const { exec, execFile, spawn } = require("child_process")

const qextScripts = path.resolve(__dirname, "../../bin/qext-scripts.js")

module.exports = (testExtensionDir, cbFunc, testFn) => {
	const child = exec(`node "${qextScripts}" -w`, { cwd: testExtensionDir }, cbFunc)

	testFn(child)
}
