#!/usr/bin/env node

'use strict';

const path = require('path');
const childProcess = require('child_process');

const args = process.argv.slice(2);
const script = args[0];

switch(script) {
  case 'build':
  case 'deploy':
  case 'start': {
    childProcess.fork(path.resolve(__dirname, `../scripts/${script}.js`))
    break;
  }
  default: 
    console.log('Unknown script ' +script);
    break;
}
