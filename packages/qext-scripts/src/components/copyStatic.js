const fs = require("fs-extra")
import { Observable } from "rxjs"

export default config =>
	Observable.create(observer => {
		const copyStatic = fs.copy(
			config.compile.static,
			`./dist/${config.extension}/static`
		)

		copyStatic
			.then(() => {
				observer.next("static copied")
				observer.complete()
			})
			.catch(err => observer.error(`${config.compile.static} not found\n`))
	})
