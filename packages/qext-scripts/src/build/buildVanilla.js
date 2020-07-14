import fs from "fs-extra"
import path from "path"
import { Observable } from "rxjs"
import { tap, map } from "rxjs/operators"
import chokidar from "chokidar"

export default ({ config, watch }) =>
	Observable.create(observer => {
		const entry = path.resolve(process.cwd(), config.vanilla.entry)
		const staticEntry = config.vanilla.static ? path.resolve(process.cwd(), config.vanilla.static) : null
		const dist = path.resolve(process.cwd(), config.output)
		const output = `${dist}/${config.extension}`

		const copySrcFiles = fs.copy(entry, output)
		const copyStaticFiles = copySrcFiles.then(() =>
			staticEntry !== null
				? fs.copy(staticEntry, `${output}/${config.vanilla.static}`)
				: new Promise(resolve => resolve("no static directory"))
		)

		Promise.all([copySrcFiles, copyStaticFiles]).then(() => {
			observer.next({ config, message: "vanilla built" })
		})

		if (watch) {
			const copyFiles = (evt, path) => {
				const deleteOutput = fs.remove(dist)
				const copySrcFiles = deleteOutput.then(() => fs.copy(entry, output))

				const copyStaticFiles = copySrcFiles.then(() => {
					staticEntry !== null
						? fs.copy(staticEntry, `${output}/${config.vanilla.static}`)
						: new Promise(resolve => resolve("no static directory"))
				})

				copyStaticFiles.then(() => {
					observer.next({ config, message: "vanilla built" })
				})
			}

			chokidar.watch(entry, { ignoreInitial: true }).on("all", copyFiles)
			if (staticEntry !== null) chokidar.watch(staticEntry, { ignoreInitial: true }).on("all", copyFiles)
		} else {
			observer.complete()
		}
	}).pipe(
		tap(({ message }) => console.log(`${message}\n`)),
		map(({ config, message }) => config)
	)
