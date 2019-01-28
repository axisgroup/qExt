import { stat, readJson } from 'fs-extra';
import { Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'

export default inputAccessorFunction => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return extension$ => extension$.pipe(
    map(accessorFunction),
    switchMap(configFile => Observable.create(observer => {
      const getConfigFile = stat(configFile)

      const configFileExists = getConfigFile
        .then(() => readJson(configFile))
        .catch(err => observer.error(`${configFile} not found`))

      configFileExists
        .then(config => {
          observer.next(config)
          observer.complete()
        })
        .catch(err => observer.error(`${configFile} cannot be read`))

    }))
  )
}
