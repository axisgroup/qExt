const fs = require('fs-extra')
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

export default inputAccessorFunction => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return extension$ => extension$.pipe(
    map(accessorFunction),
    switchMap(config => Observable.create(observer => {
      const emptyDest = fs.emptyDir(`${config.desktopConfig.destination}/${config.extension}`)

      const copyDist = emptyDest.then(() => fs.copy(
        `${config.output}/${config.extension}`,
        `${config.desktopConfig.destination}/${config.extension}`
      ))

      copyDist
        .then(() => {
          observer.next('dist copied')
          observer.complete()
        })
        .catch(err => observer.error(err))
    }))
  )
}
