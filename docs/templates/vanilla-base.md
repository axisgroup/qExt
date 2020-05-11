# Vanilla Base Template

the vanilla base template is the most basic template you can start with using qExt.

## Project directory

```
├── src
│ ├── qext-template.qext
│ ├── qext-template.js
├── static
├── package.json
├── qext.config.json
```

### src directory

the source directory has 2 source files, `qext-template.qext` and `qext-template.js`. these files should be renamed to the name of the extension as it should be stored in Qlik Sense (this is the name you see when viewing extensions in the QMC).

### qext.config.json

```json
{
	"extension": "qext-template",
	"output": "./dist",
	"vanilla": {
		"entry": "./src",
		"static": "./static"
	}
}
```

the qext config file is set up with the extension name set to qext-template and for building in vanilla mode. when the project is built, the files will be copied from source into the output directory as is
