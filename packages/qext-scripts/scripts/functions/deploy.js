'use strict';

var RxQ = require('rxq');
var Rx = require('rxjs');
var fs = require('fs-extra');
var serverConfig = require(process.cwd() +'/server.config.json');

module.exports = function(extensionName) {
  const qrs = RxQ.connectQRS(serverConfig, 'cold');

  return new DeleteExtension(qrs, extensionName)
    .mergeMap(o => new UploadExtension(qrs, o));

  /* =============================
      Delete Extension
  ============================= */
  function DeleteExtension(qrs, extensionName) {
    return Rx.Observable.create(function(observer) {
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

      const http = qrs.http;

      const req = http.request(options, function(res) {
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
  };


  /* =============================
      Upload Extension
  ============================= */
  function UploadExtension(qrs, extensionName) {
    return Rx.Observable.create(function(observer) {
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

      var POST_DATA = fs.readFileSync(extensionPath);

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
    });
  }
}