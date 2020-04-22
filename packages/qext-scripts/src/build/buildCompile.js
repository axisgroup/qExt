import { Observable } from "rxjs"
import webpack from "webpack"
import CopyWebpackPlugin from "copy-webpack-plugin"
import path from "path"

export default ({ config, watch }) =>
	Observable.create(observer => {
		const webpackConfig = {
			entry: [config.compile.entry],
			output: {
				path: path.resolve(process.cwd(), `${config.output}/${config.extension}`),
				filename: `${config.extension}.js`,
			},
			mode: "production",
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
							plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/plugin-transform-modules-commonjs"],
						},
					},
					{ test: /\.html$/, loader: "html-loader" },
					{ test: /\.css$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }] },
				],
			},
			plugins: [
				new CopyWebpackPlugin([
					{
						from: path.resolve(process.cwd(), config.compile.qext),
						to: path.resolve(process.cwd(), `${config.output}/${config.extension}/${config.extension}.qext`),
					},
				]),
			],
		}

		const compiler = webpack(webpackConfig)

		if (watch) {
			compiler.watch({}, (err, stats) => {
				console.log("[webpack:build]", stats.toString({ colors: true }), "\n")

				observer.next({ config, message: "built" })
				if (err !== null) observer.error(err)
			})
		} else {
			compiler.run((err, stats) => {
				console.log("[webpack:build]", stats.toString({ colors: true }), "\n")

				if (err !== null) observer.error(err)

				observer.next({ config, message: "built" })
				observer.complete()
			})
		}
	})
