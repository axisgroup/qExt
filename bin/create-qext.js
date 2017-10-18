#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

// Delete 0 and 1 argument
var args = process.argv.splice(process.execArgv.length + 2);

// Retrieve first argument
var extensionName = args[0];

const create = function(extensionName) {
  console.log('Creating package.json');

  const root = path.resolve(extensionName);

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

create(extensionName);


