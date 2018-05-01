var fs = require('fs-extra');
var Rx = require('rxjs');

module.exports = function(extensionName) {
  return Rx.Observable.create(observer => {
    observer.next(extensionName); 
    
    if(fs.pathExistsSync('static')) {
      fs.watch('static', { recursive: true }, (e, file) => {
        console.log(file +' change');
        observer.next(extensionName);
      })
    }
  }) 
}