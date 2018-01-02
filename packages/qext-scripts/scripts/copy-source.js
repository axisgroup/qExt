var fs = require('fs-extra');
var Rx = require('rxjs');

module.exports = function(extensionName) {
  return Rx.Observable.create(observer => {
    var src = `./src`;
    var dist = `./dist/${extensionName}`

    var copySource = fs.copy(src, dist);

    copySource.then(() => {
      observer.next(extensionName);
      observer.complete();
    })
  })
}