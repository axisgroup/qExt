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
      "build": "qext-scripts -b",
      "watch": "qext-scripts -w",
      "deploy": "qext-scripts -d",
      "build-deploy": "qext-scripts -b -d",
      "watch-deploy": "qext-scripts -w -d",
      "build-source": "qext-scripts -B",
      "watch-source": "qext-scripts -W",
      "build-deploy-source": "qext-scripts -B -d",
      "watch-deploy-source": "qext-scripts -W -d",
      "start": "qext-scripts -w -d"
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
  fs.copySync(path.resolve(__dirname, '../new-extension'), `./${extensionName}/src`);

  fs.moveSync(path.resolve(`${process.cwd()}/${extensionName}/src/new-extension.js`), `${process.cwd()}/${extensionName}/src/${extensionName}.js`);
  fs.moveSync(path.resolve(`${process.cwd()}/${extensionName}/src/new-extension.qext`), `${process.cwd()}/${extensionName}/src/${extensionName}.qext`);

  fs.copySync(path.resolve(__dirname, '../config/server.config.json'), `./${extensionName}/server.config.json`);
}
