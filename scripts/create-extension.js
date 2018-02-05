var fs = require('fs-extra');
var path = require('path');

module.exports = function(extensionName) {
  /* ===============================
      Create Package
  =============================== */
  // Get new project directory path
  const root = path.resolve(extensionName);

  // Create new directory
  var dir = `./${extensionName}`;
  fs.ensureDirSync(dir);

  // Make package object
  const packageJson = {
    name: extensionName,
    version: '0.1.0',
    scripts: {
      "build-webpack": "qext-scripts -b",
      "watch-webpack": "qext-scripts -w",

      "build-vanilla": "qext-scripts -B",
      "watch-vanilla": "qext-scripts -W",

      "deploy-server": "qext-scripts -d",
      "deploy-desktop": "qext-scripts -D",

      "build-webpack-deploy-server": "qext-scripts -b -d",
      "watch-webpack-deploy-server": "qext-scripts -w -d",
      "build-webpack-deploy-desktop": "qext-scripts -b -D",
      "watch-webpack-deploy-desktop": "qext-scripts -w -D",

      "build-vanilla-deploy-server": "qext-scripts -B -d",
      "watch-vanilla-deploy-server": "qext-scripts -W -d",
      "build-vanilla-deploy-desktop": "qext-scripts -B -D",
      "watch-vanilla-deploy-desktop": "qext-scripts -W -D"
    },
    devDependencies: {
      "qext-scripts": "0.x"
    }
  };

  // Create package.json
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );


  /* ===============================
      Copy Extension Files
  =============================== */
  if(!fs.pathExistsSync(path.resolve(`${process.cwd()}/${extensionName}/src`))) {
    // Copy Template extension files into new project
    fs.copySync(path.resolve(__dirname, '../../new-extension'), `./${extensionName}/src`);

    // Rename main js and qext files to extension name
    fs.moveSync(path.resolve(`${process.cwd()}/${extensionName}/src/new-extension.js`), `${process.cwd()}/${extensionName}/src/${extensionName}.js`);
    fs.moveSync(path.resolve(`${process.cwd()}/${extensionName}/src/new-extension.qext`), `${process.cwd()}/${extensionName}/src/${extensionName}.qext`);

    fs.copySync(path.resolve(__dirname, '../../config/server.config.json'), `./${extensionName}/server.config.json`);
  } else {
    console.error('Project already exists');
  }
}
