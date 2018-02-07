var fs = require('fs-extra');
var Rx = require('rxjs');

module.exports = function(extensionName) {
  return Rx.Observable.create(observer => {
    var src = `./src`;
    var dist = `./dist/${extensionName}`

    // Ensure Dist folder exists
    var ensureDir = fs.ensureDir(dist);

    // Copy src contents into dist folder
    var copySource = ensureDir.then(() => {
      return fs.copy(src, dist);
    });

    copySource.then(() => {
      observer.next(extensionName);
      observer.complete();
    });
  })
}