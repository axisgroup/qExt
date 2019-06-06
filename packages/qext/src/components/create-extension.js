import fs from "fs-extra"
import path from "path"

export default ({ extensionName, templateType }) => {
	/** directory path */
	const rootPath = path.resolve(extensionName)
	const templateFiles = path.resolve(__dirname, `../templates/${templateType}`)

	/** Create new directory */
	const createRootDirectory = fs.ensureDir(rootPath)

	const qextPackageJsonPath = path.resolve(
		__dirname,
		"../../qext-scripts/package.json"
	)
	const qextScriptsVersion_Pr = fs
		.readJson(qextPackageJsonPath)
		.then(qextPackageJson => qextPackageJson.version)

	/**
	 * PACKAGE JSON
	 */
	const templatePackageJsonPath = path.join(templateFiles, "package.json")
	const createPackageJson = Promise.all([
		fs.readJson(templatePackageJsonPath),
		qextScriptsVersion_Pr,
	])
		.then(([packageObj, qextScriptsVersion]) => ({
			...packageObj,
			name: extensionName,
			devDependencies: {
				...packageObj.devDependencies,
				"qext-scripts": qextScriptsVersion,
			},
		}))
		.catch(console.error)

	/** Create package.json */
	Promise.all([createRootDirectory, createPackageJson])
		.then(([rootDirectory, packageJson]) =>
			fs.writeJson(path.join(rootPath, "package.json"), packageJson, {
				spaces: 2,
			})
		)
		.catch(console.error)

	/**
	 * QEXT CONFIG
	 */
	const templateQextConfigPath = path.join(templateFiles, "qext.config.json")
	const createQextConfigFile = fs
		.readJson(templateQextConfigPath)
		.then(qextConfig => ({
			...qextConfig,
			extension: extensionName,
		}))
		.catch(console.error)

	/** Create qext.config.json */
	Promise.all([createRootDirectory, createQextConfigFile])
		.then(([rootDirectory, qextConfig]) =>
			fs.writeJson(path.join(rootPath, "qext.config.json"), qextConfig, {
				spaces: 2,
			})
		)
		.catch(console.error)

	/**
	 * STATIC
	 */
	createRootDirectory
		.then(() => fs.ensureDir(path.join(rootPath, "static")))
		.catch(console.error)

	/**
	 * SOURCE
	 */
	const templateSrcPath = path.join(templateFiles, "src")
	createRootDirectory
		.then(() => fs.copy(templateSrcPath, path.join(rootPath, "src")))
		.catch(console.error)
}
