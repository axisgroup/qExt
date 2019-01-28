const fs = require('fs-extra')
import { Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'

export default inputAccessorFunction => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return extension$ => extension$.pipe(
    map(accessorFunction),
    switchMap(output => Observable.create(observer => {
      const removeDist = fs.remove(`${output}`)
  
      removeDist.then(() => {
        observer.next(`${output} removed`)
        observer.complete()
      })
    })),
    tap(distStatus => console.log(`\n${distStatus}\n`)),
  )
}
