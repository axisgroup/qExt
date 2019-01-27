import fs from 'fs-extra'
import path from 'path'
import { Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import webpack from 'webpack'


export default inputAccessorFunction => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return obs$ => obs$.pipe(
    map(accessorFunction),
    switchMap(config => Observable.create(observer => {
      observer.next(webpack({
        entry: [`${config.compile.entry}`],
        output: {
          path: `${path.resolve(process.cwd(), config.output +'/' +config.extension)}`,
          filename: `${config.extension}.js`
        },
        mode: 'development',
        module: {
          rules: [
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
              test: /\.css$/,
              use: [
                { loader: 'style-loader'},
                { loader: 'css-loader' }
              ]
            }
          ]
        }
      }))
    }))
  )
}


// export default extension => webpack({
//   entry: [`./src/${extension}.js`],
//   output: {
//     path: `${process.cwd()}/dist/${extension}`,
//     filename: `${extension}.js`
//   },
//   mode: 'development',
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader'
//       },
//       {
//         test: /\.html$/,
//         loader: 'html-loader'
//       },
//       {
//         test: /\.css$/,
//         use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
//       },
//       {
//         test: /\.scss$/,
//         use: [
//           { loader: 'style-loader' },
//           { loader: 'css-loader' },
//           { loader: 'sass-loader' }
//         ]
//       },
//       {
//         test: /\.(png|svg|jpg|gif)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name].[ext]',
//               publicPath: `/extensions/${extension}/`
//             }
//           }
//         ]
//       }
//     ]
//   }
// })