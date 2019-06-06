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

The above command will create a new project directory with whatever name was passed to the `--create-extension` flag, using the starter template and installing all necessary dependencies. See more [qext configuration here](https://github.com/axisgroup/qExt/tree/master/packages/qext/README.md)

## Configuration

While `qext` will help you get started with project files, `qext-scripts` is where all the power of qExt comes from. Check out the [qext-scripts documentation](https://github.com/axisgroup/qExt/tree/master/packages/qext-scripts) for more info
