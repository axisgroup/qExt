const fs = require('fs-extra')
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

export default inputAccessorFunction => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return extension$ => extension$.pipe(
    map(accessorFunction),
    switchMap(extension => Observable.create(observer => {
      const copySrc = fs.copy(
        `./src`,
        `./dist/${extension}`
      )

      copySrc.then(() => {
        observer.next('source copied')
        observer.complete
      })
    }))
  )
}
