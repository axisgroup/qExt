# qExt Scripts

qExt Scripts is a library that helps you with Qlik Sense Extension development, providing build/compiling tools as well as deployment options.

---

## Setup

Install qext-scripts

```
npm install --save qext-scripts
```

qExt Scripts references a `qext.config.json` file at the root of your directory. See [examples on setting up the config file](https://github.com/axisgroup/qExt/blob/master/packages/qext-scripts/docs/examples.md). Also check out the full [configuration documentation](https://github.com/axisgroup/qExt/blob/master/packages/qext-scripts/docs/configuration.md)

## Usage

qExt Scripts can be run by adding the qext-scripts command to your package.json scripts

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

from your project root directory, you can execute `npm run qext-scripts` to run once, or `npm run watch-qext-scripts` to keep it running and watch any changes to your source files.
