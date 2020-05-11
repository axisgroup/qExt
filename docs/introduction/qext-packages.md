# qExt Packages

the qExt library is actually comprised of 2 different packages that help us with extension development

1. qext-scripts - tool that is run within our extension development environment to compile code and deploy it to qlik sense environments
2. qext - cli tool that allows us to create a new extension project with a defined template

## qext-scripts

if we look back at the 3 problems qExt solves in [why qExt section](../qlik-extensions/why-qext.md), qext-scripts mainly helps us to solve the first 2 problems. it supports next-gen javascript development by compiling our code into a backwards compatible format, and it streamlines our deployment process by automatically zipping up the compiled code and shipping it out to the environments that we need to update

if you have an extension development environment already set up, you can easily incorporate qext-scripts into it by installing it from npm into your extension project

```
$ npm install --save-dev qext-scripts
```

## qext

the qext library helps us solve the third problem we asked in why qExt, implementing boiler-code templates. it is primarily a command line interface that we can run globally to create a project with a specified directory template. it will also install the qext-scripts dependency automatically

qext is best installed globally so projects can be set up wherever you call it from

```
$ npm install -g qext
```
