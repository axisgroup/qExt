#!/usr/bin/env node

// Delete 0 and 1 argument
var args = process.argv.splice(process.execArgv.length + 2);

// Retrieve first argument
var name = args[0];

var myLibrary = require('../lib/index.js');

// Displays the text in the console
myLibrary.say('Hello ' +name);