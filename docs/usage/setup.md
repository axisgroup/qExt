# Setup

in this section, we'll go over setting up a qlik extension project. there are 2 ways we can do this, the first is we can manually set up our own project folder and directories. alternatively, we can use the qext cli to generate a project directory for us

## Manual Setup

this section shows the bare minimum needed to set up an extension project with qext-scripts. following this method is especially helpful for scenarios when you already have a qlik extension project set up that you want to incorporate qext-scripts into. to set up a project environment, first create a directory where our project resources will live

```
$ mkdir MyExtension
$ cd MyExtension
```

let's initialize an npm package in this directory, and then install qext-scripts for us to call when we're ready

```
$ npm init -y
$ npm install --save-dev qext-scripts
```

next, create a src folder, where all of our main code that is used for the extension will live. within it, also create a file my-extension.qext and my-extension.js

```
MyExtension
├── src
│   ├── my-extension.qext
│   ├── my-extension.js
```

### my-extension.qext

fill the contents of the qext file with the extension meta data json object

example:

```json
{
	"name": "My Extension",
	"description": "Extension Hello World Example",
	"type": "visualization",
	"verson": "0.1.0",
	"author": "john bellizzi"
}
```

### my-extension.js

fill the js file with the script that will control our extension

example:

```javascript
define(["jquery"], function($) {
	return {
		paint: function($element, layout) {
			var $helloWorld = $(document.createElement("div"))
			$helloWorld.html('Hello World from the extension "SimpleHelloWorld"<br/>')
			$element.append($helloWorld)

			// layout contains the properties and calculated data of our object
			console.log(layout)
		},
	}
})
```

### qext.config.json

to tell qext-scripts how to build and deploy our projects, we need to define the configuration in the `qext.config.json` file at the root of the project. the full property configuration is defined in the [qext.config.json config documentation](../configuration/qext-config-json.md). for this example, we'll implement the bare minimum in the config. this includes the name of our extension, the output directory where the built files will be written to, and the type of build we will implement. the config below shows an example of a vanilla build, where the project files are simply copied into the distribution folder. examples of compiling the project with babel and webpack can be found [here](../recipes/compile-mode.md)

```json
{
	"extension": "my-extension",
	"output": "./dist",
	"vanilla": {
		"entry": "./src"
	}
}
```

### build

finally, add a build script to `package.json` that we can call to build and zip our extension

```json
// package.json
{
  ...
  "scripts": {
    "build": "qext-scripts"
  },
  ...
}
```

```
$ npm run build
```

we'll now see a dist folder that has a directory containing the files that can be deployed to a qlik environment, and the directory zipped for ease of importing. again, this setup is the simplest version, but read on to see how we can start compiling our code and deploying it to a qlik server

## qExt cli setup

if we're starting a new project and don't want to manually set up these directories manually, we can use the qext cli library to generate the project for us. first install the qext library so we can use it globally

```
$ npm install -g qext
```

once installed, open a terminal where you want to host your project files, and run

```
$ qext -c my-extension -t vanilla-base -i
$ cd my-extension
```

this will create a new folder `my-extension` with a `src` directory, `package.json` set up with build scripts, dependencies installed, and a qext and main script file as `qext-template.js` and `qext-template.qext`. be sure to rename these to the name of your extension as it should show on the qlik server

you can run `npm run build` here and qext-scripts will handle copying and zipping the files into a dist directory
