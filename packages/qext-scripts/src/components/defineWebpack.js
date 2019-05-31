import { stat } from "fs-extra"
import path from "path"
import { Observable } from "rxjs"
import { map, switchMap, tap } from "rxjs/operators"
import webpack from "webpack"

export default inputAccessorFunction => {
	let accessorFunction

	if (inputAccessorFunction) accessorFunction = inputAccessorFunction
	else accessorFunction = a => a

	return obs$ =>
		obs$.pipe(
			map(accessorFunction),
			switchMap(config =>
				Observable.create(observer => {
					const entryExists = stat(config.compile.entry)

					entryExists
						.then(() => {
							observer.next(
								webpack({
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
								})
							)
							observer.complete()
						})
						.catch(() => observer.error(`${config.compile.entry} not found\n`))
				})
			)
		)
}
