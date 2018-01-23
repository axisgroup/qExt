var fs = require('fs-extra');
var Rx = require('rxjs');

module.exports = function(extensionName) {
  return Rx.Observable.create(observer => {
    var dist = `./dist/${extensionName}`;
    var destination = `/Users/johnbellizzi/Documents/Qlik/Sense/Extensions/${extensionName}`;

    var copyDist = fs.copy(dist, destination);

    copyDist.then(() => {
      observer.next(extensionName);
      observer.complete();
    })
  })
}