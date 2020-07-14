# qExt

qExt is a tool to help with the automation of building and deploying of your Qlik Sense visualization extensions. It can set you up with boiler-plate extension development environments and an easier method of importing compiled code to your Qlik server so you don't have to manually delete and import an extension each time.

Check out the [full documentation here](https://opensrc.axisgroup.com/qext/)

## Quick Start

read through this to quickly install qext tools and set up a new project

### Install qExt

install the main qext tool globally

```
$ npm install -g qext
```

### Create a new extension

open a terminal window where you want your project to live, and use the qext cli tool to create and install a new extension project

```
$ qext --create-extension my-extension --install
$ cd my-extension
```

_by default, qext will setup a [`starter`](https://opensrc.axisgroup.com/qext/templates/starter.html) template project. other templates can be passed in via the template flag. available templates can be found [here](https://opensrc.axisgroup.com/qext/templates/index.html)_

### Build extension

update your extension source files as needed, then run

```
$ npm run build
```

the extension project will be compiled and zipped in the output directory

### Watch extension

run the qext watch command

```
$ npm run watch
```

any changes you make and save to your source files will automatically be rebuilt into your output directory

### Deploy extension

add the following deployment configuration to your qext.config.json file

```json
{
	...,
	"serverDeploy": {
		"host": "hostname",
		"isSecure": true,
		"windowsAuth": true
	}
}
```

then run

```
$ npm run deploy
```

the terminal window will prompt for your credentials. provide the credentials for a user with write access to qlik sense extensions and the new extension will be deployed to the server

_the serverDeploy configuration may require other paramters based on server configuration. check [qExt config](https://opensrc.axisgroup.com/qext/configuration/qext-config-json.html) for full configuration settings_

alternatively, you can authenticate using header authentication. checkout the [using header auth](https://opensrc.axisgroup.com/qext/usage/header-auth.html) section for more info
