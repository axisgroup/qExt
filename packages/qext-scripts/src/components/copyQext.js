const fs = require('fs-extra')
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

export default (inputAccessorFunction) => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return obs$ => obs$.pipe(
    map(accessorFunction),
    switchMap(extension => Observable.create(observer => {
      const copyQext = fs.copy(
        `./src/${extension}.qext`, 
        `./dist/${extension}/${extension}.qext`
      )
  
      copyQext.then(() => {
        observer.next('qext copied')
        observer.complete()
      })
      .catch(err => observer.error(err))
    }))
  )
}