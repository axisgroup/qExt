var fs = require('fs-extra');
var Rx = require('rxjs');

module.exports = function(extensionName) {
  return Rx.Observable.create(observer => {
    // Create folder if it doesn't exist yet
    var createDistFolder = fs.ensureDir(`./dist/${extensionName}`);

    // Copy .qext file
    var copyQEXT = createDistFolder.then(() => {
      var dist = `./dist/${extensionName}`;
    
      var srcQEXT = `./src/${extensionName}.qext`;
      var distQEXT = `./dist/${extensionName}/${extensionName}.qext`;

      return fs.copy(srcQEXT, distQEXT);
    });

    // Complete Observable after copied
    copyQEXT.then(() => {
      observer.next(extensionName);
      observer.complete();
    })
  })
}