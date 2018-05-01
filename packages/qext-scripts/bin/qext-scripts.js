#!/usr/bin/env node

/* ================================
    Import
================================ */
// Node Internal Modules
var fs = require('fs-extra');
var childProcess = require('child_process');
var path = require('path');

// Node External Modules
var program = require('commander');
var Rx = require('rxjs');


// Script Modules
var CopyQEXT = require(path.resolve(__dirname, '../scripts/copy-qext.js'));
var DefineWebpack = require(path.resolve(__dirname, '../scripts/define-webpack.js'));
var WatchWebpack = require(path.resolve(__dirname, '../scripts/watch-webpack.js'));
var WatchQEXT = require(path.resolve(__dirname, '../scripts/watch-qext.js'));
var BuildWebpack = require(path.resolve(__dirname, '../scripts/build-webpack.js'));

var WatchVanilla = require(path.resolve(__dirname, '../scripts/watch-vanilla.js'));
var CopySource = require(path.resolve(__dirname, '../scripts/copy-source.js'));
var WatchStatic = require(path.resolve(__dirname, '../scripts/watch-static.js'));
var CopyStatic = require(path.resolve(__dirname, '../scripts/copy-static.js'));

var ZipDist = require(path.resolve(__dirname, '../scripts/zip-dist.js'));

var DeployDesktop = require(path.resolve(__dirname, '../scripts/deploy-desktop.js'));
var DeleteExtension = require(path.resolve(__dirname, '../scripts/delete-extension.js'));
var UploadExtension = require(path.resolve(__dirname, '../scripts/upload-extension.js'));


/* ================================
    Options
================================ */
program
  .version(require(path.resolve(__dirname, '../package.json')).version)
  .option('-b, --build-webpack', 'Build with Webpack')
  .option('-w, --watch-webpack', 'Watch with Webpack')
  .option('-B, --build-vanilla', 'Build Vanilla Source')
  .option('-W, --watch-vanilla', 'Watch Vanilla Source')
  .option('-d, --deploy-server', 'Deploy to Server')
  .option('-D, --deploy-desktop', 'Deploy to Desktop')
  .parse(process.argv);


/* ================================
    Extension Define
================================ */
var extensionName = require(`${process.cwd()}/package.json`).name;
var extension$ = new Rx.Subject();


/* ================================
    Distribution
================================ */
var watchWebpack$ = new Rx.Subject(),
    buildWebpack$ = new Rx.Subject(),
    watchVanilla$ = new Rx.Subject(),
    buildVanilla$ = new Rx.Subject();


if(program.watchWebpack || program.buildWebpack) { // If -w or -b flag is set, we are bundling with webpack
  var defineWebpack$ = extension$
    .switchMap(o => new CopyQEXT(o))
    .switchMap(o => new CopyStatic(o))
    .switchMap(o => new DefineWebpack(o))
    .publish();
  
  defineWebpack$.connect();
}


if(program.watchWebpack) { // if -w flag, webpack --watch
  var watchWebpack$ = defineWebpack$
    .switchMap(o => new WatchWebpack(o))
    .switchMap(o => new WatchQEXT(o))
    .switchMap(o => new CopyQEXT(o))
    .switchMap(o => new WatchStatic(o))
    .switchMap(o => new CopyStatic(o))
    .publish();

    watchWebpack$.connect();
} else if(program.buildWebpack) { // else if -b flag, webpack --build
  var buildWebpack$ = defineWebpack$
    .switchMap(o => new BuildWebpack(o))
    .publish();

    buildWebpack$.connect();
} else if(program.watchVanilla) { // else if -W flag is set, Watch any changes in src file
  var watchVanilla$ = extension$
    .switchMap(o => new WatchVanilla(o))
    .switchMap(o => new CopySource(o))
    .publish();

  watchVanilla$.connect();
} else if(program.buildVanilla) { // else if -B flag is set, Copy Source once
  var buildVanilla$ = extension$
    .switchMap(o => new CopySource(o))
    .publish();

  buildVanilla$.connect();
}

/* If any of the above build/watch observables returns something,
    Zip the dist folder */
var zipDist$ = Rx.Observable.merge(
    watchWebpack$,
    buildWebpack$,
    watchVanilla$,
    buildVanilla$
  ).switchMap(o => new ZipDist(o))
  .publish();

zipDist$.connect();


/* ================================
    Deployment
================================ */
var serverConfig = require(`${process.cwd()}/deployment.config.json`).server;
var desktopConfig = require(`${process.cwd()}/deployment.config.json`).desktop;
// Deploy to Server
if(program.deployServer) {

  // if extension being built or watched, wait for output of zip file
  if(program.watchWebpack
    || program.buildWebpack
    || program.watchVanilla
    || program.buildVanilla) {
      
      var deployExtension$ = zipDist$
        .switchMap(o => new DeleteExtension(o, serverConfig))
        .switchMap(o => new UploadExtension(o, serverConfig))
        .publish();
      
      deployExtension$.connect();
    } 
    // otherwise, just take already existing zip file
    else {
      var deployExtension$ = extension$
        .switchMap(o => new DeleteExtension(o, serverConfig))
        .switchMap(o => new UploadExtension(o, serverConfig))
        .publish();
      
      deployExtension$.connect();
    }
}
// Deploy to Desktop
else if(program.deployDesktop) {
  // if extension being built or watched, wait for output of Build
  if(program.watchWebpack
  || program.buildWebpack
  || program.watchVanilla
  || program.buildVanilla) {
    var extensionBuild$ = Rx.Observable.merge(
      watchWebpack$,
      buildWebpack$,
      watchVanilla$,
      buildVanilla$
    )
    .publish();
  
    extensionBuild$.connect();

    var deployDesktop$ = extensionBuild$
      .switchMap(o => new DeployDesktop(o, desktopConfig))
      .publish();

    deployDesktop$.connect();
  }
  // else, just take already existing build
  else {
    var deployDesktop$ = extension$
      .switchMap(o => new DeployDesktop(o, desktopConfig))
      .publish();

    deployDesktop$.connect();
  }
}


/* ================================
    Trigger Processes
================================ */
// Check for src directory
fs.stat('src', (err, stats) => {
  if(err) console.log('src directory does not exist');
  else if(stats.isDirectory()) extension$.next(extensionName);
})
