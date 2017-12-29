#!/usr/bin/env node

'use strict';

var childProcess = require('child_process');
var program = require('commander');
var path = require('path');

var Build = require(path.resolve(__dirname, '../scripts/build.js'));
var Deploy = require(path.resolve(__dirname, '../scripts/deploy.js'));
var Watch = require(path.resolve(__dirname, '../scripts/watch.js'));

program
  .version('0.2.0')
  .option('-b, --bundle', 'Bundle')
  .option('-d, --deploy', 'Deploy')
  .option('-w, --watch', 'Watch')
  .parse(process.argv);

if(program.bundle) Build();
else if(program.deploy) Deploy();
else if(program.watch) Watch();
