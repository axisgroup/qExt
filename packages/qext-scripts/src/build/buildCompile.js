import CopyWebpackPlugin from "copy-webpack-plugin"
import path from "path"
import { Observable } from "rxjs"
import { map, tap } from "rxjs/operators"
import webpack from "webpack"

export default ({ config, watch }) =>
	Observable.create(observer => {
		let webpackConfigPr

		if (config.compile.altWebpackConfig) {
			const altWebpackConfigPath = path.resolve(process.cwd(), config.compile.altWebpackConfig)
			const altWebpackConfig = import(altWebpackConfigPath)
			webpackConfigPr = altWebpackConfig.then(({ default: defaultExport, named }) => {
				return defaultExport({
					entry: config.compile.entry,
					output: config.output,
					extension: config.extension,
					qext: config.compile.qext,
					static: config.compile.static,
				})
			})
		} else {
			webpackConfigPr = new Promise(res => {
				res({
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
							...(config.compile.static
								? [
										{
											from: path.resolve(process.cwd(), config.compile.static),
											to: path.resolve(process.cwd(), `${config.output}/${config.extension}/static`),
										},
								  ]
								: []),
						]),
					],
				})
			})
		}

		webpackConfigPr.then(webpackConfig => {
			const compiler = webpack(webpackConfig)

			if (watch) {
				compiler.watch({}, (err, stats) => {
					if (config.compile.webpackComments !== false)
						console.log("[webpack:build]", stats.toString({ colors: true }), "\n")

					observer.next({ config, message: "built" })
					if (err !== null) observer.error(err)
				})
			} else {
				compiler.run((err, stats) => {
					if (config.compile.webpackComments !== false)
						console.log("[webpack:build]", stats.toString({ colors: true }), "\n")

					if (err !== null) observer.error(err)

					observer.next({ config, message: "built" })
					observer.complete()
				})
			}
		})
	}).pipe(
		tap(({ message }) => console.log(`${message}\n`)),
		map(({ config }) => config)
	)
