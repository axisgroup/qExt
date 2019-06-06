# qExt

While the `qext-scripts` package helps with automating the build and deployment of your extensions, `qext` will help you get your extension development environment started with template project directories and configuration settings

---

## Setup

It is recommended to install qext globally so that a new extension project can be started from any location

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

The above command will create a new project directory with whatever name was passed to the `--create-extension` flag.

You have the option to set the `--template` flag to either `starter`, `base`, or `vanilla-base`. By default, the starter templtate is built. Click below to see the contents of each template

- [starter](https://github.com/axisgroup/qExt/tree/master/packages/qext/templates/starter)
- [base](https://github.com/axisgroup/qExt/tree/master/packages/qext/templates/base)
- [vanilla-base](https://github.com/axisgroup/qExt/tree/master/packages/qext/templates/vanilla-base)

By including the `--install` flag, qext will automatically install the latest version of `qext-scripts` in your project.
