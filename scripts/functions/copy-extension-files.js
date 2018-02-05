module.exports = function(extensionName) {
  var fs = require('fs-extra');
  var path = require('path');

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