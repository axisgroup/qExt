'use strict';

const
  fs = require('fs-extra'),
  path = require('path'),
  webpack = require('webpack'),
  Rx = require('rxjs'),
  RxQ = require('rxq'),
  zipdir = require('zip-dir');

const serverConfig = require(process.cwd() +'/config/server.config.json');
const extensionName = require(process.cwd() +'/package.json').name;
const hostname = serverConfig.host;
const user = serverConfig.headers['hdr-usr'];


// =========== Observables ===========
// Create subject
const extension$ = new Rx.Subject();

// Create Observable
const deploy$ = extension$
  .mergeMap(o => new BundleObservable(o))
  .mergeMap(o => new CopyQEXT(o))
  .mergeMap(o => new ZipFiles(o))
  .mergeMap(o => new DeployObservable(o))
  .publish();

deploy$.connect();


// =========== Trigger Observables ===========
// Try to connect to src directory
fs.stat('src', function(err, stats) {
  if(err) console.log("src directory doesn't exist");
  else if(stats.isDirectory()) extension$.next(extensionName);
})


// =========== Functions ===========
/* Bundle extension using Webpack */
function BundleObservable(extensionName) {
  return Rx.Observable.create(observer => {
    // Create webpack compiler
    const compiler = webpack({
      entry: [`./src/index.js`],
      output: {
        path: `${process.cwd()}/dist/${extensionName}`,
        filename: `${extensionName}.js`
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            test: /\.scss$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'sass-loader' }
            ]
          }
        ]
      }
    });


    compiler.run((err, stats) => {
      console.log('[webpack:build]', stats.toString({ colors: true }));
      observer.next(extensionName);
      observer.complete();
    })
  })
}


/* Copy QEXt file and rename to input */
function CopyQEXT(extensionName) {
  return Rx.Observable.create(observer => {
    const readStream = fs.createReadStream('./src/index.qext');
    const writeStream = fs.createWriteStream(`./dist/${extensionName}/${extensionName}.qext`);
    readStream.pipe(writeStream);

    observer.next(extensionName);
    observer.complete();
  })
}


/* Zip file */
function ZipFiles(extensionName) {
  return Rx.Observable.create(function(observer) {
    // Define output of .zip file
    const outputDir = './dist';
    // Define input directory to be zipped
    const inputDir = outputDir +'/' +extensionName;

    // Zip and store
    zipdir(
      inputDir,
      { saveTo: outputDir +'/' +extensionName +'.zip' },
      function(err, buffer) {
        observer.next(extensionName);
        observer.complete();
      }
    )
  })
}


/* Deploy to Server */
function DeployObservable(extensionName) {
  const qrs = RxQ.connectQRS(serverConfig, 'cold');

  return new DeleteExtensionObservable(qrs, extensionName)
    .mergeMap(o => new UploadExtensionObservable(qrs, o));
}


/* Delete current extension */
function DeleteExtensionObservable(qrs, extensionName) {
  return Rx.Observable.create(function(observer) {
    const options = {
      "method": "DELETE",
      "hostname": hostname,
      "port": null,
      "path": "hdr/qrs/extension/name/" +extensionName +"?Xrfkey=123456789ABCDEFG",
      "headers": {
        "x-qlik-xrfkey": "123456789ABCDEFG",
        "hdr-usr": user,
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

        try {
          data = JSON.parse(rawData);
        } catch(err) {
          data = rawData;
        }
        observer.next(extensionName);
        observer.complete();
      })
    });

    req.end();
  })
}


/* Upload Extension */
function UploadExtensionObservable(qrs, extensionName) {
  return Rx.Observable.create(function(observer) {
    const extensionPath = `./dist/${extensionName}.zip`;

    const options = {
      "method": "POST",
      "hostname": hostname,
      "port": null,
      "path": "hdr/qrs/extension/upload?Xrfkey=123456789ABCDEFG",
      "headers": {
        "x-qlik-xrfkey": "123456789ABCDEFG",
        "hdr-usr": user,
        "content-type": "application/zip"
      }
    };

    const http = qrs.http;

    const POST_DATA = fs.readFileSync(extensionPath);

    const req = http.request(options, res => {
      var chunks = [];

      res.on('data', chunk => chunks.push(chunk));

      res.on('end', () => {
        const body = Buffer.concat(chunks);
        observer.next(extensionName);
        observer.complete();
      });
    });

    req.write(POST_DATA);
    req.end();
  })
}