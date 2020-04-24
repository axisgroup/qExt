import commonjs from "@rollup/plugin-commonjs"
import hashbang from "rollup-plugin-hashbang"

export default [
	{
		input: "src/index.js",
		output: { file: "bin/qext-scripts.js", format: "cjs" },
		plugins: [hashbang(), commonjs()],
	},
]
