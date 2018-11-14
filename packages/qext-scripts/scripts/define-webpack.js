var Rx = require("rxjs");
var webpack = require("webpack");

module.exports = function(extensionName) {
  return Rx.Observable.create(observer => {
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
            loader: "babel-loader"
          },
          {
            test: /\.html$/,
            loader: "html-loader"
          },
          {
            test: /\.scss$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              { loader: "sass-loader" }
            ]
          },
          {
            test: /\.css$/,
            use: [{ loader: "style-loader" }, { loader: "css-loader" }]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "[name].[ext]",
                  publicPath: `/extensions/${extensionName}/`
                }
              }
            ]
          }
        ]
      }
    });

    observer.next({ extensionName: extensionName, compiler: compiler });
    observer.complete();
  });
};
