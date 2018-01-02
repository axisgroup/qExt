var zipdir = require('zip-dir');
var Rx = require('rxjs');

module.exports = function(extensionName) {
  return Rx.Observable.create(observer => {
    // Define output of .zip file
    var outputDir = './dist';
    // Define input directory to be zipped
    var inputDir = `${outputDir}/${extensionName}`;

    // Zip and Store
    zipdir(
      inputDir,
      { saveTo: `${outputDir}/${extensionName}.zip` },
      (err, buffer) => {
        observer.next(extensionName);
        observer.complete();
      }
    )
  })
}