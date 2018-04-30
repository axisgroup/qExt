var fs = require('fs-extra');
var Rx = require('rxjs');

module.exports = function(extensionName) {
  return Rx.Observable.create(observer => {
    observer.next(extensionName);

    fs.watch(`src/${extensionName}.qext`, { recursive: true }, (e, file) => {
      console.log(file +' change');
      observer.next(extensionName);
    })
  })
}