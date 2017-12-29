'use strict';

var zipdir = require('zip-dir');
var Rx = require('rxjs');

module.exports = function(extensionName) {
  return Rx.Observable.create(function(observer) {
    // Define output of .zip file
    var outputDir = './dist';
    // Define input directory to be zipped
    var inputDir = outputDir +'/' +extensionName;

    // Zip and store
    zipdir(
      inputDir,
      { saveTo: outputDir +'/' +extensionName +'.zip' },
      function(err, buffer) {
        observer.next(extensionName);
        observer.complete();
      }
    )
  })
}