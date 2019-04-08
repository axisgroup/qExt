import childProcess from "child_process"

export default extensionName => {
	childProcess.spawn("npm", ["install"], {
		env: process.env,
		cwd: process.cwd() + `/${extensionName}`,
		shell: true,
		stdio: "inherit",
	})
}
