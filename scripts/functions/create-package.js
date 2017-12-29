module.exports = function(extensionName) {
  var path = require('path');
  var fs = require('fs-extra');

  

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
      "build-extension": "qext-scripts -b",
      "deploy-extension": "qext-scripts -d",
      "start": "qext-scripts -w"
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
}