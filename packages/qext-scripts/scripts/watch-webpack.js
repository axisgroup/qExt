var Rx = require('rxjs');

module.exports = function(object) {
  return Rx.Observable.create(observer => {
    object.compiler.watch({}, (err, stats) => {
      console.log("[webpack:build]", stats.toString({ colors: true }));
      observer.next(object.extensionName);
    })
  })
}