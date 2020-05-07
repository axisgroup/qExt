#!/usr/bin/env/node
import program from "commander"
import { readJSON } from "fs-extra"
import path from "path"
import { createExtension, installDependencies } from "./components"

const packagePath = path.resolve(__dirname, "../package.json")

const version = readJSON(packagePath)
	.then(({ version }) => version)
	.catch(console.error)

version.then(version => {
	program
		.version(version)
		.option("-c, --create-extension <name>", "Create New Extension")
		.option("-i, --install", "Install Dependencies")
		.option("-t, --template [type]", "Template", /^(starter|base|vanilla-base)$/i, "starter")
		.parse(process.argv)

	if (!program.createExtension) {
		return console.error(`set "-c, --create-extension <name>" flag to create extension`)
	} else {
		createExtension({ extensionName: program.createExtension, templateType: program.template })

		if (program.install) installDependencies(program.createExtension)
	}
})
