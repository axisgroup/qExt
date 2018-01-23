#!/usr/bin/env node

'use strict';

var path = require('path');
var program = require('commander');
var childProcess = require('child_process');

var CreateExtension = require(path.resolve(__dirname, '../scripts/create-extension.js'));
var InstallDependencies = require(path.resolve(__dirname, '../scripts/install-dependencies.js'));

program
  .version('0.1.4')
  .option('-c, --create-extension [name]', 'Create New Extension')
  .option('-i, --install', 'Install Dependencies')
  .parse(process.argv);


if(program.createExtension) { // if --create-extension flag executed..
  // if flag wasn't given a name, it will be of type boolean. Prompt user to enter name
  if(typeof(program.createExtension) === 'boolean') console.log('Provide a name for your extension');
  else { // if name provided..
    
    CreateExtension(program.createExtension);

    if(program.install) InstallDependencies(program.createExtension);
  }

}