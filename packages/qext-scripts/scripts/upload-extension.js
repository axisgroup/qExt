var fs = require('fs-extra');
var Rx = require('rxjs');
var RxQ = require('rxq');

module.exports = function(extensionName, serverConfig) {
  return Rx.Observable.create(observer => {
    var qrs = RxQ.connectQRS(serverConfig, 'cold');

    var extensionPath = `./dist/${extensionName}.zip`;

    var options = {
      "method": "POST",
      "hostname": serverConfig.host,
      "port": null,
      "path": "hdr/qrs/extension/upload?Xrfkey=123456789ABCDEFG",
      "headers": {
        "x-qlik-xrfkey": "123456789ABCDEFG",
        "hdr-usr": serverConfig.headers['hdr-usr'],
        "content-type": "application/zip"
      }
    };

    var http = qrs.http;
    var readZipFile = fs.readFile(extensionPath);

    readZipFile.then(POST_DATA => {
      var req = http.request(options, res => {
        var chunks = [];

        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          var body = Buffer.concat(chunks);
          observer.next(extensionName);
          observer.complete();
        });
      });

      req.write(POST_DATA);
      req.end();
    })
  })
}