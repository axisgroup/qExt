const fs = require('fs-extra')
import { Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'

export default inputAccessorFunction => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return extension$ => extension$.pipe(
    map(accessorFunction),
    switchMap(config => Observable.create(observer => {
      const copySrc = fs.copy(
        `${config.vanilla.entry}`,
        `${config.output}/${config.extension}`
      )

      copySrc.then(() => {
        observer.next('source copied')
        observer.complete()
      })
    })),
    tap(sourceStatus => console.log(`${sourceStatus}\n`))
  )
}
