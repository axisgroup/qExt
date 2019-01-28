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
      const copyStatic = fs.copy(
        config.compile.static,
        `./dist/${config.extension}/static`
      )
  
      copyStatic
        .then(() => {
          observer.next('static copied')
          observer.complete()
        })
        .catch(err => observer.error(`${config.compile.static} not found\n`))
    }))
  )
}
