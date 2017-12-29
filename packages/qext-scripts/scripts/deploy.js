'use strict';

module.exports = function() {
  var fs = require('fs-extra');
  var Rx = require('rxjs');
  var RxQ = require('rxjs');
  
  var WebpackBuild = require('./functions/webpack-build');
  var CopyQEXT = require('./functions/copy-qext');
  var ZipDir = require('./functions/zip-dir');
  var Deploy = require('./functions/deploy');
  
  var extensionName = require(process.cwd() +'/package.json').name;
  
  var extension$ = new Rx.Subject();
  
  
  var bundle$ = extension$
    .switchMap(o => new WebpackBuild(o))
    .switchMap(o => new CopyQEXT(o))
    .switchMap(o => new ZipDir(o))
    .switchMap(o => new Deploy(o))
    .publish();
  
  bundle$.connect();
  
  // Try to connect to src directory
  fs.stat('src', function(err, stats) {
    if(err) console.log('src directory does not exist');
    else if(stats.isDirectory()) extension$.next(extensionName);
  })
}
