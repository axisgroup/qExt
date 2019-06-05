import { readdir, copy, stat } from "fs-extra"
import { Observable } from "rxjs"
import { map, switchMap, tap } from "rxjs/operators"

export default inputAccessorFunction => {
	let accessorFunction

	if (inputAccessorFunction) accessorFunction = inputAccessorFunction
	else accessorFunction = a => a

	return extension$ =>
		extension$.pipe(
			map(accessorFunction),
			switchMap(({ config }) =>
				Observable.create(observer => {
					const qextFileExists = readdir(`${process.cwd()}/src`).then(files => {
						const qextFiles = files.filter(file => file.indexOf(".qext") > -1)

						if (qextFiles.length === 1) return true
						else
							observer.error(`qext file not found in ${config.vanilla.entry}\n`)
					})

					const copySrc = qextFileExists.then(() =>
						copy(
							`${config.vanilla.entry}`,
							`${config.output}/${config.extension}`
						)
					)

					copySrc
						.then(() => {
							observer.next("source copied")
							observer.complete()
						})
						.catch(err => observer.error(`${config.vanilla.entry} not found\n`))
				})
			),
			tap(sourceStatus => console.log(`${sourceStatus}\n`))
		)
}
