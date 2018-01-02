var Rx = require('rxjs');
var RxQ = require('rxq');

module.exports = function(extensionName, serverConfig) {
  return Rx.Observable.create(observer => {
    var qrs = RxQ.connectQRS(serverConfig, 'cold');

    var options = {
      "method": "DELETE",
      "hostname": serverConfig.host,
      "port": null,
      "path": `hdr/qrs/extension/name/${extensionName}?Xrfkey=123456789ABCDEFG`,
      "headers": {
        "x-qlik-xrfkey": "123456789ABCDEFG",
        "hdr-usr": serverConfig.headers['hdr-usr'],
        "content-type": "application/zip"
      }
    };

    var http = qrs.http;

    var req = http.request(options, res => {
      var chunks = [];

      res.on('data', chunk => chunks.push(chunk));
      res.on('error', err => {});
      res.on('end', e => {
        var rawData = chunks.join('');
        var data;

        try { data = JSON.parse(rawData); }
        catch(err) { data = rawData; }

        observer.next(extensionName);
        observer.complete();
      });
    });

    req.end();
  })
}