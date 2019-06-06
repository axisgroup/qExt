import { stat, readdir } from "fs-extra"
import path from "path"
import { Observable } from "rxjs"
import { map, switchMap, tap } from "rxjs/operators"
import webpack from "webpack"
import CopyPlugin from "copy-webpack-plugin"
import DisableOutputWebpackPlugin from "disable-output-webpack-plugin"

export default inputAccessorFunction => {
	let accessorFunction

	if (inputAccessorFunction) accessorFunction = inputAccessorFunction
	else accessorFunction = a => a

	return obs$ =>
		obs$.pipe(
			map(accessorFunction),
			switchMap(config =>
				Observable.create(observer => {
					let webpackConfig

					switch (config.mode) {
						/** Compile Config */
						case "compile":
							const entryExists = stat(
								path.resolve(process.cwd(), config.compile.entry)
							)

							webpackConfig = entryExists
								.then(() => ({
									entry: [`${config.compile.entry}`],
									output: {
										path: `${path.resolve(
											process.cwd(),
											config.output + "/" + config.extension
										)}`,
										filename: `${config.extension}.js`,
									},
									mode: "development",
									module: {
										rules: [
											{
												test: /\.js$/,
												exclude: /node_modules/,
												loader: "babel-loader",
												options: {
													presets: ["@babel/preset-env"],
													plugins: [
														"@babel/plugin-proposal-object-rest-spread",
														"@babel/plugin-transform-modules-commonjs",
													],
												},
											},
											{
												test: /\.html$/,
												loader: "html-loader",
											},
											{
												test: /\.css$/,
												use: [
													{ loader: "style-loader" },
													{ loader: "css-loader" },
												],
											},
										],
									},
									plugins: [
										new CopyPlugin([
											{
												// qext
												from: path.resolve(
													process.cwd(),
													`${config.compile.qext}`
												),
												to: path.resolve(
													process.cwd(),
													`${config.output}/${config.extension}/${
														config.extension
													}.qext`
												),
											},
											{
												// static
												from: path.resolve(
													process.cwd(),
													config.compile.static
												),
												to: path.resolve(
													process.cwd(),
													`${config.output}/${config.extension}/static`
												),
											},
										]),
									],
								}))
								.catch(() => observer.error(`entry not found\n`))

							break

						/** Vanilla Config */
						case "vanilla":
							const entryContents = readdir(
								path.resolve(process.cwd(), config.vanilla.entry)
							)
								.then(files => files.filter(file => file.indexOf(".js") > -1))
								.then(jsFiles => `${config.vanilla.entry}/${jsFiles[0]}`)

							webpackConfig = entryContents.then(entryFile => ({
								entry: [entryFile],
								mode: "development",
								plugins: [
									new DisableOutputWebpackPlugin(),
									new CopyPlugin([
										{
											// qext
											from: path.resolve(
												process.cwd(),
												`${config.vanilla.entry}`
											),
											to: path.resolve(
												process.cwd(),
												`${config.output}/${config.extension}`
											),
										},
										{
											// static
											from: path.resolve(process.cwd(), config.vanilla.static),
											to: path.resolve(
												process.cwd(),
												`${config.output}/${config.extension}/static`
											),
										},
									]),
								],
							}))

							break

						default:
							observer.error("mode not defined correctly")
					}

					webpackConfig.then(config => {
						observer.next(webpack(config))
						observer.complete()
					})
				})
			)
		)
}
