const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const webpack = require("webpack")

module.exports = function({ entry, output, extension, qext, static }) {
	return {
		entry: [entry],
		output: {
			path: path.resolve(process.cwd(), `${output}/${extension}`),
			filename: `${extension}.js`,
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
					from: path.resolve(process.cwd(), qext),
					to: path.resolve(process.cwd(), `${output}/${extension}/${extension}.qext`),
				},
				...(static
					? [
							{
								from: path.resolve(process.cwd(), static),
								to: path.resolve(process.cwd(), `${output}/${extension}/static`),
							},
					  ]
					: []),
			]),
			new webpack.BannerPlugin({
				banner: "MY BANNER",
			}),
		],
	}
}
