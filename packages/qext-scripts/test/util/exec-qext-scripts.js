const path = require("path")
const { exec } = require("child_process")

const qextScripts = path.resolve(__dirname, "../../bin/qext-scripts.js")

module.exports = (testExtensionDir, cbFunc) => {
	exec(`node "${qextScripts}" -d`, { cwd: testExtensionDir }, cbFunc)
}
