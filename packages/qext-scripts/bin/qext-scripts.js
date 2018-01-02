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
var WebpackWatch = require(path.resolve(__dirname, '../scripts/webpack-watch.js'));
var WebpackBuild = require(path.resolve(__dirname, '../scripts/webpack-build.js'));

var WatchSource = require(path.resolve(__dirname, '../scripts/watch-source.js'));
var CopySource = require(path.resolve(__dirname, '../scripts/copy-source.js'));

var ZipDist = require(path.resolve(__dirname, '../scripts/zip-dist.js'));

var DeleteExtension = require(path.resolve(__dirname, '../scripts/delete-extension.js'));
var UploadExtension = require(path.resolve(__dirname, '../scripts/upload-extension.js'));


/* ================================
    Options
================================ */
program
  .version(require(path.resolve(__dirname, '../package.json')).version)
  .option('-b, --bundle', 'Bundle')
  .option('-w, --watch', 'Watch')
  .option('-B, --build-source', 'Build Source')
  .option('-W, --watch-source', 'Watch Source')
  .option('-d, --deploy', 'Deploy')
  .parse(process.argv);


/* ================================
    Extension Define
================================ */
var extensionName = require(`${process.cwd()}/package.json`).name;
var extension$ = new Rx.Subject();


/* ================================
    Distribution
================================ */
var webpackWatch$ = new Rx.Subject(),
    webpackBuild$ = new Rx.Subject(),
    watchSource$ = new Rx.Subject(),
    buildSource$ = new Rx.Subject();


if(program.watch || program.bundle) { // If -w or -b flag is set, we are bundling with webpack
  var defineWebpack$ = extension$
    .switchMap(o => new CopyQEXT(o))
    .switchMap(o => new DefineWebpack(o))
    .publish();
  
  defineWebpack$.connect();
}


if(program.watch) { // if -w flag, webpack --watch
  var webpackWatch$ = defineWebpack$
    .switchMap(o => new WebpackWatch(o))
    .publish();

  webpackWatch$.connect();
} else if(program.bundle) { // else if -b flag, webpack --build
  var webpackBuild$ = defineWebpack$
    .switchMap(o => new WebpackBuild(o))
    .publish();

  webpackBuild$.connect();
} else if(program.watchSource) { // else if -W flag is set, Watch any changes in src file
  var watchSource$ = extension$
    .switchMap(o => new WatchSource(o))
    .switchMap(o => new CopySource(o))
    .publish();

  watchSource$.connect();
} else if(program.buildSource) { // else if -B flag is set, Copy Source once
  var buildSource$ = extension$
    .switchMap(o => new CopySource(o))
    .publish();

  buildSource$.connect();
}

/* If any of the above build/watch observables returns something,
    Zip the dist folder */
var zipDist$ = Rx.Observable.merge(
    webpackWatch$,
    webpackBuild$,
    watchSource$,
    buildSource$
  ).switchMap(o => new ZipDist(o))
  .publish();

zipDist$.connect();


/* ================================
    Deployment
================================ */
if(program.deploy) {
  var serverConfig = require(`${process.cwd()}/server.config.json`);

  if(program.watch
    || program.bundle
    || program.watchSource
    || program.buildSource) {
      
      var deployExtension$ = zipDist$
        .switchMap(o => new DeleteExtension(o, serverConfig))
        .switchMap(o => new UploadExtension(o, serverConfig))
        .publish();
      
      deployExtension$.connect();
    } else {
      var deployExtension$ = extension$
        .switchMap(o => new DeleteExtension(o, serverConfig))
        .switchMap(o => new UploadExtension(o, serverConfig))
        .publish();
      
      deployExtension$.connect();
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
