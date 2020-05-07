#!/usr/bin/env/node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var program = _interopDefault(require('commander'));
var fs = require('fs-extra');
var fs__default = _interopDefault(fs);
var path = _interopDefault(require('path'));
var childProcess = _interopDefault(require('child_process'));

var createExtension = ({ extensionName, templateType }) => {
	/** directory path */
	const rootPath = path.resolve(extensionName);
	const templateFiles = path.resolve(__dirname, `../templates/${templateType}`);

	/** Create new directory */
	const createRootDirectory = fs__default.ensureDir(rootPath);

	const qextPackageJsonPath = path.resolve(__dirname, "../package.json");
	const qextScriptsVersion_Pr = fs__default
		.readJson(qextPackageJsonPath)
		.then(qextPackageJson => qextPackageJson.qextScriptsVersion);

	/** PACKAGE JSON */
	const templatePackageJsonPath = path.join(templateFiles, "package.json");
	const createPackageJson = Promise.all([fs__default.readJson(templatePackageJsonPath), qextScriptsVersion_Pr])
		.then(([packageObj, qextScriptsVersion]) => ({
			...packageObj,
			name: extensionName,
			devDependencies: {
				...packageObj.devDependencies,
				"qext-scripts": qextScriptsVersion,
			},
		}))
		.catch(console.error);

	/** Create package.json */
	Promise.all([createRootDirectory, createPackageJson])
		.then(([rootDirectory, packageJson]) =>
			fs__default.writeJson(path.join(rootPath, "package.json"), packageJson, {
				spaces: 2,
			})
		)
		.catch(console.error);

	/** QEXT CONFIG */
	const templateQextConfigPath = path.join(templateFiles, "qext.config.json");
	const createQextConfigFile = fs__default
		.readJson(templateQextConfigPath)
		.then(qextConfig => ({
			...qextConfig,
			extension: extensionName,
		}))
		.catch(console.error);

	/** Create qext.config.json */
	Promise.all([createRootDirectory, createQextConfigFile])
		.then(([rootDirectory, qextConfig]) =>
			fs__default.writeJson(path.join(rootPath, "qext.config.json"), qextConfig, {
				spaces: 2,
			})
		)
		.catch(console.error);

	/** STATIC */
	createRootDirectory.then(() => fs__default.ensureDir(path.join(rootPath, "static"))).catch(console.error);

	/** SOURCE */
	const templateSrcPath = path.join(templateFiles, "src");
	createRootDirectory.then(() => fs__default.copy(templateSrcPath, path.join(rootPath, "src"))).catch(console.error);
};

var installDependencies = extensionName => {
	childProcess.spawn("npm", ["install"], {
		env: process.env,
		cwd: process.cwd() + `/${extensionName}`,
		shell: true,
		stdio: "inherit",
	});
};

const packagePath = path.resolve(__dirname, "../package.json");

const version = fs.readJSON(packagePath)
	.then(({ version }) => version)
	.catch(console.error);

version.then(version => {
	program
		.version(version)
		.option("-c, --create-extension <name>", "Create New Extension")
		.option("-i, --install", "Install Dependencies")
		.option("-t, --template [type]", "Template", /^(starter|base|vanilla-base)$/i, "starter")
		.parse(process.argv);

	if (!program.createExtension) {
		return console.error('set "-c, --create-extension <name>" flag to create extension')
	} else {
		createExtension({ extensionName: program.createExtension, templateType: program.template });

		if (program.install) installDependencies(program.createExtension);
	}
});
