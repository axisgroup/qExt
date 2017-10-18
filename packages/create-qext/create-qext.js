'use strict';

const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');

// Delete 0 and 1 argument
var args = process.argv.splice(process.execArgv.length + 2);

// Retrieve first argument
var extensionName = args[0];

createPackage(extensionName);
installDependencies();
copySourceFiles();


function createPackage(extensionName) {
  const root = path.resolve(extensionName);

  // New directory
  const dir = `./${extensionName}`;
  fs.ensureDirSync(dir);

  // Make package object
  const packageJson = {
    name: extensionName,
    version: '0.1.0',
    scripts: {
      start: 'qext-scripts start'
    }
  };

  // Create package.json
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
}


function installDependencies() {
  // install qext-scripts
  childProcess.spawn(
    'npm', 
    ['install', '--save', 'qext-scripts'], 
    { env: process.env, cwd: process.cwd() +`/${extensionName}`, stdio: 'inherit' }
  )
}


function copySourceFiles() {
  fs.copySync(path.resolve(__dirname, './src_files'), `./${extensionName}/src`);
  fs.copySync(path.resolve(__dirname, './config'), `./${extensionName}/config`);
}