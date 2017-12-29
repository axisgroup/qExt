module.exports = function(extensionName) {
  var fs = require('fs-extra');
  var path = require('path');

  fs.copySync(path.resolve(__dirname, '../../new-extension'), `./${extensionName}/src`);

  fs.moveSync(path.resolve(`${process.cwd()}/${extensionName}/src/new-extension.js`), `${process.cwd()}/${extensionName}/src/${extensionName}.js`);
  fs.moveSync(path.resolve(`${process.cwd()}/${extensionName}/src/new-extension.qext`), `${process.cwd()}/${extensionName}/src/${extensionName}.qext`);

  fs.copySync(path.resolve(__dirname, '../../config/server.config.json'), `./${extensionName}/server.config.json`);
}