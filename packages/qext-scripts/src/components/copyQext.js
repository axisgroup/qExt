import fs from 'fs-extra'
import { Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'

export default (inputAccessorFunction) => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return obs$ => obs$.pipe(
    map(accessorFunction),
    switchMap(config => Observable.create(observer => {
      const copyQext = fs.copy(
        config.compile.qext,
        `./dist/${config.extension}/${config.extension}.qext`
      )
  
      copyQext.then(() => {
        observer.next('qext copied')
        observer.complete()
      })
      .catch(err => observer.error(`${config.compile.qext} not found\n`))
    })),
    tap(qextStatus => console.log(`${qextStatus}\n`))
  )
}