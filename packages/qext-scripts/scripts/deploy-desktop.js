var fs = require('fs-extra');
var Rx = require('rxjs');

module.exports = function(extensionName, serverConfig) {
  return Rx.Observable.create(observer => {
    var dist = `./dist/${extensionName}`;
    var destination = serverConfig.desktopDestination +'/' +extensionName;
    var emptyDir = fs.emptyDir(destination);

    var copyDist = emptyDir.then(() => {
      return fs.copy(dist, destination);
    })

    copyDist.then(() => {
      observer.next(extensionName);
      observer.complete();
    })
  })
}