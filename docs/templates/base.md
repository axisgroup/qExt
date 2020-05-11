# Base Template

the base template is the basic template used for compiling extension source code with babel and webpack

## Project directory

```
├── src
│ ├── index.qext
│ ├── index.js
├── static
├── package.json
├── qext.config.json
```

### src directory

the source directory has 2 source files, `index.qext` and `index.js`

### qext.config.json

```json
{
	"extension": "qext-template",
	"output": "./dist",
	"compile": {
		"entry": "./src/index.js",
		"qext": "./src/index.qext",
		"static": "./static"
	}
}
```

the qext config file is set up with the extension name set to qext-template and for building in compile mode. when the project is built, webpack will compile the files via the compile.entry file, and place the compiled files in the output directory. it will also copy the qext file into the output directory
