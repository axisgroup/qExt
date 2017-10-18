const fs = require('fs-extra');
const path = require('path');

const create = function(extensionName) {
  console.log('Creating package.json');

  const root = path.resolve(extensionName);
  const appName = path.basename(root);
  console.log(appName);

  // New directory
  const dir = `./${extensionName}`;
  fs.ensureDirSync(dir);

  // Make package object
  const packageJson = {
    name: extensionName,
    version: '0.1.0'
  };

  // 
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  return;
};

exports.create = create;