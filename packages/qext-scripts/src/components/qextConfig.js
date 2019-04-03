import { stat, readJson } from "fs-extra"
import { Observable } from "rxjs"
import { map, switchMap, tap } from "rxjs/operators"

export default inputAccessorFunction => {
	let accessorFunction

	if (inputAccessorFunction) accessorFunction = inputAccessorFunction
	else accessorFunction = a => a

	return extension$ =>
		extension$.pipe(
			map(accessorFunction),
			switchMap(configFile =>
				Observable.create(observer => {
					const getConfigFile = stat(configFile)

					const configFileExists = getConfigFile
						.then(() => readJson(configFile))
						.catch(err => observer.error(`${configFile} not found`))

					configFileExists
						.then(config => {
							// extension property not defined
							if (config.extension === undefined)
								observer.error(
									`extension property not defined in ${configFile}`
								)
							// output property not defined
							else if (config.output === undefined)
								observer.error(`output property not defined in ${configFile}`)
							// mode property not defined
							else if (config.mode === undefined)
								observer.error(`mode property not defined in ${configFile}`)
							// mode value not vanilla or compile
							else if (["vanilla", "compile"].indexOf(config.mode) === -1)
								observer.error(
									`mode value must be set to "vanilla" or "compile"`
								)
							// Vanilla mode
							else if (config.mode === "vanilla") {
								// vanilla property not defined
								if (config.vanilla === undefined)
									observer.error(
										`vanilla property not defined in ${configFile}`
									)
								// vanilla-entry property not defined
								else if (config.vanilla.entry === undefined)
									observer.error(`entry property not defined in "vanilla"`)
								// Deploy Desktop
								else if (config.deploy === "desktop") {
									// desktopConfig not defined
									if (config.desktopConfig === undefined)
										observer.error(
											`desktopConfig property not defined in ${configFile}`
										)
									// desktopConfig-destination property not defined
									else if (config.desktopConfig.destination === undefined)
										observer.error(`destination not defined in "desktopConfig"`)
									// pass
									else {
										observer.next(config)
										observer.complete()
									}
								}
								// pass
								else {
									observer.next(config)
									observer.complete()
								}
							}
							// pass
							else {
								observer.next(config)
								observer.complete()
							}
						})
						.catch(err => observer.error(`${configFile} cannot be read`))
				})
			)
		)
}
