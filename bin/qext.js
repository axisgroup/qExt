#!/usr/bin/env node

'use strict';

var path = require('path');
var program = require('commander');

var CreateExtension = require(path.resolve(__dirname, '../scripts/create-extension.js'));
var InstallDependencies = require(path.resolve(__dirname, '../scripts/install-dependencies.js'));

program
  .version('0.1.4')
  .option('-c, --create-extension [name]', 'Create New Extension')
  .option('-i, --install', 'Install Dependencies')
  .parse(process.argv);


if(program.createExtension) {
  if(typeof(program.createExtension) === 'boolean') console.log('Provide a name for your extension');
  else {
    CreateExtension(program.createExtension);

    if(program.install) InstallDependencies(program.createExtension);
  }

}