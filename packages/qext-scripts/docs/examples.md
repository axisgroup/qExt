# qExt Examples

This section walks through some common use cases of qext-scripts

## Build Modes

When setting up the config file, first consider what type of build mode you are looking for, `compile` or `vanilla`. `compile` will build your extension project using webpack and babel, while `vanilla` only copies your files as-is.

### `compile`

Compile mode uses webpack and babel to compile your extension files from ES6 spec into ES5 that can be read by most modern browsers. It checks your source files to make sure you have a source `.js` file as well as a `.qext` file. It also appropriately names your extension files and zips them up so they can be imported to a Sense Server when necessary.

**Example:**
Assume you have a project structure:

```
|-my-extension
| |-src
| | |-index.js
| | |-index.qext
```

The following configuration will compile the index.js file and any dependent files into an extension within the `dist` directory and then zip the directory

```
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

```
window.define([], function() {
  return {
    //...paint function and others defined here
  }
})
```

</br>

---

### `vanilla`

Vanilla mode will simply copy the contents of the defined entry directory into the output directory, and then zip that directory up

**Example:**
Assume you have a project structure as such:

```
|-my-extension
| |-src/
```

The following configuration will copy the contents of the `src` directory to a new extension directory within `dist` and then zip up the directory.

```
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
| | | |-..src files
| | |-my-extension.zip
```

_**NOTE - unlike compile mode, vanilla mode will not check the contents of the source directory for .qext file or for correct naming standards. It is up to you to make sure the files are in the correct format for Qlik Sense to consume.**_

</br>

---

## Deploy Modes

qext.config.json also has the ability to accept deployment configurations. The deploy property can be either `server` or `desktop`.

### `server`

One of the great features of qExt Scripts is the ability to automatically deploy your extensions to a Qlik Sense Server. When in server deploy mode, you need to authenticate with Qlik Sense using either header authentication, or windows authentication.

#### `header` authentication

Header authentication works through a virtual proxy set up on the Qlik Sense server you want to deploy to. Go [here](https://help.qlik.com/en-US/sense-developer/November2017/Subsystems/Platform/Content/Examples/config-header-authentication.htm) for more information on setting up a virtual proxy in Qlik Sense.

Example:

```
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

```
{
  "extension": "my-extension",
  "output": "./dist",
  "mode": "compile",
  "deploy": "server",
  "authenticate": "header",
  "serverConfig": {
    "host": "<hostname>",
  }
}
```

### `desktop`

If you're developing and testing your extension against a Qlik Sense Desktop instance, qExt can still help. by setting `deploy` to `desktop`, and then defining the deployment location of extension objects, your extension can automatically be deployed to that location from wherever you're developing

Example:

```
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
