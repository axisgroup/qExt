#!/usr/bin/env node

'use strict';

var path = require('path');
var program = require('commander');
var childProcess = require('child_process');

var CreateExtension = require(path.resolve(__dirname, '../scripts/create-Extension.js'));

program
  .version('0.1.4')
  .option('-c, --create-extension [name]', 'Create New Extension')
  .parse(process.argv);


var extensionName = typeof(program.createExtension) === 'boolean' ? 'new-extension' : program.createExtension;

if(program.createExtension) CreateExtension(extensionName);