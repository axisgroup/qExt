import fs from "fs-extra"
import path from "path"
import { Observable } from "rxjs"
import { tap, map } from "rxjs/operators"

export default ({ config, watch }) =>
	Observable.create(observer => {
		const entry = path.resolve(process.cwd(), config.vanilla.entry)
		const staticEntry = config.vanilla.static ? path.resolve(process.cwd(), config.vanilla.static) : null
		const output = path.resolve(process.cwd(), config.output)

		const copySrcFiles = fs.copy(entry, output)
		const copyStaticFiles = copySrcFiles.then(() =>
			staticEntry !== null
				? fs.copy(staticEntry, `${output}/${config.vanilla.static}`)
				: new Promise(resolve => resolve("no static directory"))
		)

		if (watch) {
			const copyFiles = () => {
				const deleteOutput = fs.remove(output)
				const copySrcFiles = deleteOutput.then(() => fs.copy(entry, output))

				const copyStaticFiles = copySrcFiles.then(() =>
					staticEntry !== null
						? fs.copy(staticEntry, `${output}/${config.vanilla.static}`)
						: new Promise(resolve => resolve("no static directory"))
				)

				copyStaticFiles.then(() => {
					observer.next({ config, message: "vanilla built" })
				})
			}

			fs.watch(entry, { recursive: true }, copyFiles)
			if (staticEntry !== null) fs.watch(staticEntry, { recursive: true }, copyFiles)
		} else {
			copyStaticFiles.then(() => {
				observer.next({ config, message: "vanilla built" })
				observer.complete()
			})
		}
	}).pipe(
		tap(({ message }) => console.log(`${message}\n`)),
		map(({ config, message }) => config)
	)
