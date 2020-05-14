# Using qExt with a pre-existing extension

There may be times when you already have an extension project you've been working on, or you want to download and update an extension from [Qlik Branch](https://developer.qlik.com/garden). You can still use qExt even if you are starting with a pre-built extension

## Initialize an npm package in the project

If the project you are working on doesn't have an npm package already defined, you can do so by opening a terminal at the extension location and running `npm init`. This will set up a new npm package for you

## Installing qext-scripts

The main library that does all the compiling and deployment work of the qExt package is `qext-scripts`. From the terminal, install qext-scripts into this package

```
$ npm install --save-dev qext-scripts
```

## Set up qext.config.json

Create a new file at the root of this extension called `qext.config.json`. Define the qext config object to represent the extension name and properties on how it should be built

```json
{
	"extension": "my-extension",
	"output": "./dist",
	"vanilla": {
		"entry": "./src"
	}
}
```

Note, this example is for an extension whose files are placed inside a directory called `src` and that will be name `my-extension` when built and deployed. it is also configured to build in vanilla mode, meaning the relavent files will be copied into the output and zipped up as is.

## Add build scripts to package.json

To run qext-scripts, we need to add the build and deploy scripts to our package.json file. add the following to the scripts section of package.json

```json
{
	"scripts": {
		"build": "qext-scripts",
		"watch": "qext-scripts -w",
		"deploy": "qext-scripts -d",
		"watch-deploy": "qext-scripts -w -d"
	}
}
```

## Build

Now you can run `npm run build` to build and zip the files into the output directory. You can also add server deployment configuration to your qext.config.json file, as defined in the [server deployment](./server-deploy) section
