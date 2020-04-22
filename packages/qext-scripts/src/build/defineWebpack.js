import { map, tap, switchMap } from "rxjs/operators"
import CopyWebpackPlugin from "copy-webpack-plugin"
import DisableOutputWebpackPlugin from "disable-output-webpack-plugin"
import path from "path"
import webpack from "webpack"

export default (accessorFunction = a => a) => {
	return obs$ =>
		obs$.pipe(
			map(accessorFunction),
			map(config => {
				const webpackConfig = config.vanilla
					? {
							entry: `${path.resolve(process.cwd(), config.vanilla.entry)}/example.js`,
							// context: path.resolve(process.cwd(), config.vanilla.entry),
							plugins: [
								new DisableOutputWebpackPlugin(),
								new CopyWebpackPlugin([
									{
										from: path.resolve(process.cwd(), config.vanilla.entry),
										to: path.resolve(process.cwd(), config.output),
									},
									...(config.vanilla.static
										? [
												{
													from: path.resolve(process.cwd(), config.vanilla.static),
													to: path.resolve(process.cwd(), config.output),
												},
										  ]
										: []),
								]),
							],
					  }
					: {}

				return { webpack: webpack(webpackConfig), config }
			})
		)
}
