# qExt

qExt is a tool to help you with automating building and deployment of your Qlik Sense extensions.

---

## Setup

To get started, it is best to install the `qext` project setup package globally so that a new extension project can be started from any location

```
npm install -g qext
```

</br>

---

## Usage

`qext` is run from the command line.

```
qext --create-extension my-extension --template starter --install
```

The above command will create a new project directory with whatever name was passed to the `--create-extension` flag, using the starter template and installing all necessary dependencies. See more [qext templates here](https://github.com/axisgroup/qExt/tree/master/packages/qext#template-projects)

### Running qExt

qExt Scripts can be run by adding the qext-scripts command to your package.json scripts to run qext-scripts, with the option of running it in watch-mode where it will watch your src files for changes.

Example:

```json
{
	"name": "my-extension",
	"scripts": {
		"qext-scripts": "qext-scripts",
		"watch-qext-scripts": "qext-scripts -w"
	}
}
```

</br>

---

## Configuration

When running qExt, there are two main pieces of the configuration that need to be set. The first is the build-mode, which can be `compile` or `vanilla`, and the second is deploy-mode, which is either `server` or `desktop`. When deploying to `server`, you also have the option of authenticating using `windows` authentication, or `header` authentication. Below are examples that should help with setting up your configuration, but full configuration can be found [here](https://github.com/axisgroup/qExt/blob/master/packages/qext-scripts/docs/configuration.md)

### `compile` mode

Compile mode uses webpack and babel to compile your extension files from ES6 spec into ES5 that can be read by most modern browsers. It checks your source files to make sure you have a source `.js` file as well as a `.qext` file. It also appropriately names your extension files and zips them up so they can be imported to a Sense Server when necessary.

**Example:**
Assume you have a project structure:

```
|-my-extension
| |-src
| | |-index.js
| | |-index.qext
```

The following configuration will compile the index.js file and any dependent files into an extension within the `dist` directory, copy the qext file into `dist`, and then zip the directory

```json
{
	"extension": "my-extension",
	"output": "./dist",
	"mode": "compile",
	"compile": {
		"entry": "index.js",
		"qext": "index.qext"
	}
}
```

output:

```
|-my-extension
| |-src
| | |-index.js
| | |-index.qext
| |-dist
| | |-my-extension.js
| | |-my-extension.qext
```

_**NOTE: make sure your javascript file attaches your define function to the window**_

```js
window.define([], function() {
	return {
		//...paint function and others defined here
	}
})
```

</br>

### `vanilla` mode

Vanilla mode will simply copy the contents of the defined entry directory into the output directory, and then zip that directory up

**Example:**
Assume you have a project structure as such:

```
|-my-extension
| |-src
| | |-my-extension.js
| | |-my-extension.qext
```

The following configuration will copy the contents of the `src` directory to a new extension directory within `dist` and then zip up the directory.

```json
{
	"extension": "my-extension",
	"output": "./dist",
	"mode": "vanilla",
	"vanilla": {
		"entry": "./src"
	}
}
```

The output would be:

```
|-my-extension
| |-src/
| | |-..src files
| |-dist
| | |-my-extension/
| | | |-my-extension.js
| | | |-my-extension.qext
| | |-my-extension.zip
```

_**NOTE - unlike compile mode, vanilla mode will not check the contents of the source directory for a .qext file or for correct naming standards. It is up to you to make sure the files are in the correct format for Qlik Sense to consume.**_

</br>

---

## Deploy Modes

qext.config.json also has the ability to accept deployment configurations. The deploy property can be either `server` or `desktop`.

### `server`

One of the great features of qExt Scripts is the ability to automatically deploy your extensions to a Qlik Sense Server. When in server deploy mode, you need to authenticate with Qlik Sense using either header authentication, or windows authentication.

#### `header` authentication

Header authentication works through a virtual proxy set up on the Qlik Sense server you want to deploy to. Go [here](https://help.qlik.com/en-US/sense-developer/November2017/Subsystems/Platform/Content/Examples/config-header-authentication.htm) for more information on setting up a virtual proxy in Qlik Sense.

Example:

```json
{
	"extension": "my-extension",
	"output": "./dist",
	"mode": "compile",
	"deploy": "server",
	"authenticate": "header",
	"serverConfig": {
		"host": "<hostname>",
		"hdr-usr": "DOMAIN\\username",
		"prefix": "hdr"
	}
}
```

#### `windows` authentication

You can also have qext-scripts log connect to the engine using your sign in credentials

Example:

```json
{
	"extension": "my-extension",
	"output": "./dist",
	"mode": "compile",
	"deploy": "server",
	"authenticate": "windows",
	"serverConfig": {
		"host": "<hostname>"
	}
}
```

</br>

### `desktop`

If you're developing and testing your extension against a Qlik Sense Desktop instance, qExt can still help. by setting `deploy` to `desktop`, and then defining the deployment location of extension objects, your extension can automatically be deployed to that location from wherever you're developing

Example:

```json
{
	"extension": "my-extension",
	"output": "./dist",
	"mode": "compile",
	"deploy": "desktop",
	"desktopConfig": {
		"destination": "C:\\Users\\%username%\\Documents\\Qlik\\Sense\\Extensions"
	}
}
```
