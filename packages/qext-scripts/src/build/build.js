import { map, switchMap } from "rxjs/operators"
import { Observable } from "rxjs"

export default (accessorFunction = a => a) => {
	return obs$ =>
		obs$.pipe(
			map(accessorFunction),
			switchMap(({ compiler, config, watch }) =>
				Observable.create(observer => {
					console.log(`building ${config.extension}...\n`)

					/** Watch */
					if (watch) {
						compiler.watch({}, (err, stats) => {
							console.log("[webpack:build]", stats.toString({ colors: true }), "\n")

							observer.next("built")
							if (err !== null) observer.error(err)
						})
					} else {
						/** Build */
						compiler.run((err, stats) => {
							console.log("[webpack:build]", stats.toString({ colors: true }), "\n")

							if (err !== null) observer.error(err)

							observer.next("built")
							observer.complete()
						})
					}
				})
			)
		)
}
