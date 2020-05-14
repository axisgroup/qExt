# Anatomy of a Qlik Sense Extension

Qlik Sense extensions allow us to create our own visualization and functional objects within a Qlik Sense application. Extensions are typically used to extend the visualization capabilities of Qlik for users who are using Qlik applications in a self-service manner. More on qlik sense extension objects can be found on Qlik's site [here](https://help.qlik.com/en-US/sense-developer/April2020/Content/Sense_Helpsites/extend-qlik-sense.htm)

all extension files should be maintained in a single project folder, and at a minimum must include a [qext file](#qext-file) and a main [script file](#script-file)

## qext File

the qext file in an extension project contains a json object that defines the meta data of the extension object. The name of the file is the unique name Qlik will use to identify the extension, and should match the script file name.

at a minimum, the qext file should include a name and type property. (full qext properties can be found [here](https://help.qlik.com/en-US/sense-developer/April2020/Subsystems/Extensions/Content/Sense_Extensions/Overview/qext-file-overview.htm))

example qext file:

```json
// hello-world.qext
{
	"name": "Hello World",
	"description": "Hello world example",
	"type": "visualization",
	"version": "1.0.0",
	"author": "john bellizzi"
}
```

## Script File

the script file in an extension project is a javascript file containing all the logic of how your extension works. it defines how data comes into the object, what is rendered within the object, properties that can be set on the object and more. the name of the file should match your qext file

there are numerous configuration settings of a script file, and most can be found in the tutorial [here](https://help.qlik.com/en-US/sense-developer/April2020/Subsystems/Extensions/Content/Sense_Extensions/extensions-introduction.htm). a basic script uses the define function to load any required resources, and returns a javascript object containing functions that control data flowing through the extension

the most common method used within an extension is the `paint` method, which runs any time there is a change in the application state, or a resize so that we can render updates to the extension object container. Here is an example of a script file

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

## Deployment

when deploying an extension to a qlik server, the proper method is to compress the entire extension directory into a zip file, and then navigate to the extensions section of the qmc and import the zipped extension file. if there is already an extension deployed with the same name, it must first be deleted from the server using the delete button in the extensions section of the qmc

on qlik sense desktop, the extension project simply needs to be placed at the folder location `C:\Users\[UserName]\Documents\Qlik\Sense\Extensions\`. any changes to the extension files will be reflected in the extension when the application page is reloaded

check out the [next section](./why-qext.md) to see how qExt helps with setting up these projects and automating deployment
