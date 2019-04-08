import program from "commander"
import fs from "fs-extra"
import path from "path"
import CreateExtension from "./components/create-extension"
import InstallDependencies from "./components/install-dependencies"

const packagePath = path.resolve(__dirname, "../package.json")

const version = fs
	.readJson(packagePath)
	.then(packageObj => packageObj.version)
	.catch(console.error)

version.then(version => {
	program
		.version(version)
		.option("-c, --create-extension <name>", "Create New Extension")
		.option("-i, --install", "Install Dependencies")
		.parse(process.argv)

	if (!program.createExtension)
		return console.error(
			'set "-c, --create-extension <name>" flag to create extension'
		)
	else {
		CreateExtension(program.createExtension)

		if (program.install) InstallDependencies(program.createExtension)
	}
})
