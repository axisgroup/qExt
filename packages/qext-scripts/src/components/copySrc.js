import { copy, stat } from 'fs-extra'
import { Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'

export default inputAccessorFunction => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return extension$ => extension$.pipe(
    map(accessorFunction),
    switchMap(config => Observable.create(observer => {
      const qextFileExists = stat(`${config.vanilla.entry}/*qext`)

      qextFileExists.then((err, stats) => {
        console.log(err, stats)
      })

      const copySrc = copy(
        `${config.vanilla.entry}`,
        `${config.output}/${config.extension}`
      )

      copySrc
        .then(() => {
          observer.next('source copied')
          observer.complete()
        })
        .catch(err => observer.error(`${config.vanilla.entry} not found\n`))
    })),
    tap(sourceStatus => console.log(`${sourceStatus}\n`))
  )
}
