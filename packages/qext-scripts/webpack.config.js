const nodeExternals = require("webpack-node-externals")
const { BannerPlugin } = require("webpack")

module.exports = {
	entry: [`./src/index.js`],
	output: {
		path: `${process.cwd()}/bin`,
		filename: "qext-scripts.js",
	},
	mode: "development",
	target: "node",
	node: {
		__dirname: false,
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
		],
	},
	plugins: [new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })],
}
