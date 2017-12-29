'use strict';

var fs = require('fs-extra');
var Rx = require('rxjs');

module.exports = function(extensionName) {
  return Rx.Observable.create(observer => {
    const readStream = fs.createReadStream(`./src/${extensionName}.qext`);
    const writeStream = fs.createWriteStream(`./dist/${extensionName}/${extensionName}.qext`);
    const stream = readStream.pipe(writeStream);

    stream.on('finish', function() {
      observer.next(extensionName);
      observer.complete();
    })
  })
}