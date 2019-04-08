const program = require("commander")
const webpack = require("webpack")
const nodeExternals = require("webpack-node-externals")

/** List for command paramters */
program.option("-w, --watch", "Watch").parse(process.argv)

const compiler = webpack({
	entry: ["./src/index.js"],
	output: {
		path: `${process.cwd()}/bin`,
		filename: "qext.js",
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
				options: {
					plugins: ["transform-object-rest-spread"],
				},
			},
		],
	},
	plugins: [
		new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
	],
})

if (program.watch) {
	compiler.watch({}, (err, stats) => {
		console.log("[webpack:build]", stats.toString({ colors: true }), "\n")

		if (err !== null) console.log(err)
	})
} else {
	compiler.run((err, stats) => {
		console.log("[webpack:build]", stats.toString({ colors: true }), "\n")

		if (err !== null) console.log(err)
	})
}
