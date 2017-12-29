module.exports = function(extensionName) {
  var fs = require('fs-extra');
  var path = require('path');

  var CreatePackage = require(path.resolve(__dirname, './functions/create-package.js'));
  var CopyExtensionFiles = require(path.resolve(__dirname, './functions/copy-extension-files.js'));

  CreatePackage(extensionName);
  CopyExtensionFiles(extensionName);
}
