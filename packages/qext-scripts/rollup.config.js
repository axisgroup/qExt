import commonjs from "@rollup/plugin-commonjs"
import hashbang from "rollup-plugin-hashbang"

const plugins = [hashbang(), commonjs()]

export default [
	{
		input: "src/index.js",
		output: { file: "bin/qext-scripts.js", format: "cjs" },
		plugins,
	},
]
