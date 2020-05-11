# Starter Template

the starter template sets up your project directory with commonly used extension methods

## Project directory

```
├── src
│ ├── index.qext
│ ├── index.js
│ ├── style.css
│ ├── methods
│ │ ├── controller.js
│ │ ├── definition.js
│ │ ├── index.js
│ │ ├── initial-properties.js
│ │ ├── paint.js
│ │ ├── resize.js
│ │ ├── template.html
├── static
├── package.json
├── qext.config.json
```

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

### src/index.qext

```json
{
	"type": "visualization",
	"name": "qExt Template"
}
```

this is the metadata of the extension. the name property should be updated to the name seen by the end user in the extension object pane of a qlik application. the file will get renamed to the `extension` property value in `qext.config.json`

### src/index.js

```js
import { initialProperties, template, definition, controller, paint, resize } from "./methods"
import "./style.css"

window.define([], function() {
	return {
		initialProperties,
		template,
		definition,
		controller,
		paint,
		resize,
	}
})
```

### src/style.css

this is the css file used to define any styles for our extension object. note that all classes should be pre-selected with the class name of the extension object, which will be in the format of <extension-name>-qv-object. for example, if you want to set the background color of an element with the class `container` in your extension object, and your extension's name is `my-extension`, your css should look like

```css
.my-extension-qv-object .container {
	background-color: lightblue;
}
```

### src/methods/initial-properties.js

```js
export default {
	qHyperCubeDef: {
		qDimensions: [],
		qMeasures: [],
		qInitialDataFetch: [],
	},
}
```

initial-properties defines the object properties definition when it is first created by a qlik sense user. the template sets up the properties with a HyperCubeDef, but this can be changed to other qlik definitions, such as a ListObjectDef, or custom properties

### src/methods/definition.js

```js
export default {
	type: "items",
	component: "accordion",
	items: {
		settings: {
			uses: "settings",
		},
	},
}
```

the definition object defines the configuration of the properties panel of the extension. it is the primary way in which a user adding the extension to a qlik sheet can configure and change settings of the extension, including dimensions, measures, colors and more

more on how to configure the definition object can be found [here](https://help.qlik.com/en-US/sense-developer/April2020/Subsystems/Extensions/Content/Sense_Extensions/extensions-build-properties-panel.htm)

### src/methods/paint.js

```js
export default function($element, layout) {
	// ..paint code here
}
```

the paint function runs everytime there is an update to the layout of our extension object. this can be triggered by a change in the selection state of the qlik sense application, and also a resize in the window size. this allows to "re-paint" our extension when there is a change, so that the rendered output displays the most updated version of the data being passed into the extension. `$element` contains the dom element reference to the extension object that can be used to control what is rendered in the extension dom, and layout contains the calculated object layout of the extension, including any hypercube outputs and property settings

### src/methods/resize.js

```js
export default function($element, layout) {
	// ..resize code here
}
```

the resize methods gives us some finer control over how our extension re-renders during different types of updates. in cases where the updates required from a selection change and a resize change are different, we can separate the resize change into the resize method function. it is important to note that if a resize method is returned, in our `src/index.js` file, paint will not run when there is a window resize

### src/methods/template.html

```html
<div class="chart-container">qExt Template</div>
```

the template file defines the initial html that is rendered in our extension. this html can be seen in the `$element` dom that is passed to the paint and resize functions

### src/methods/controller.js

```js
export default [
	"$scope",
	"$element",
	function($scope, $element) {
		// ..controller code here
	},
]
```

the controller function is run when the extension is initialized. this can be useful to set up initial configuration and streams for the extension when it is initialized on screen.

### src/methods/index.js

```js
export { default as initialProperties } from "./initial-properties"
export { default as template } from "./template.html"
export { default as definition } from "./definition"
export { default as controller } from "./controller"
export { default as paint } from "./paint"
export { default as resize } from "./resize"
```

this file exports all modules from the `methods` directory
