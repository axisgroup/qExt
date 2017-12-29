'use strict';

var Rx = require('rxjs');
var webpack = require('webpack');

module.exports = function(extensionName) {
  return Rx.Observable.create(observer => {
    // Define webpack compiler
    const compiler = webpack({
      entry: [`./src/${extensionName}.js`],
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


    // Compile once, then complete Observable
    compiler.watch({}, (err, stats) => {
      console.log("[webpack:build]", stats.toString({colors: true}));
      observer.next(extensionName);
    })
  })
}