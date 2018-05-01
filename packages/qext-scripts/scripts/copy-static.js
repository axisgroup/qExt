var fs = require('fs-extra');
var Rx = require('rxjs');

module.exports = function(extensionName) {
  return Rx.Observable.create(observer => {
    var static = `${process.cwd()}/static`;
    var dist = `${process.cwd()}/dist/${extensionName}`;

    // Ensure Dist folder exists
    var ensureDir = fs.ensureDir(dist);

    var copyStatic;

    if(fs.pathExistsSync(static)) {
      copyStatic = ensureDir.then(() => fs.copy(static, `${dist}/static`));
    } else {
      console.log('static directory not found');
      copyStatic = ensureDir.then(() => fs.ensureDir(`./dist/${extensionName}/static`));
    }


    copyStatic.then(() => {
      observer.next(extensionName);
      observer.complete();
    });
  })
}