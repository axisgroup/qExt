import { Observable } from "rxjs"
import path from "path"
import zipdir from "zip-dir"

export default config =>
	Observable.create(observer => {
		const outputDir = path.resolve(process.cwd(), config.output)
		const inputDir = `${outputDir}/${config.extension}`

		zipdir(inputDir, { saveTo: `${outputDir}/${config.extension}.zip` }, (err, buffer) => {
			if (err !== null) observer.error(err)

			observer.next(config)
			observer.complete()
		})
	})
