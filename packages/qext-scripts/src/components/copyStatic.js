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
      const copyStatic = fs.copy(
        `./static`,
        `./dist/${extension}/static`
      )
  
      copyStatic.then(() => {
        observer.next('static copied')
        observer.complete()
      })
    }))
  )
}
