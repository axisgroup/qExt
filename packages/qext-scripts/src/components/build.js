import { Observable } from "rxjs";
import { map, switchMap, tap } from 'rxjs/operators'

export default ({ inputAccessorFunction, watch }) => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return obs$ => obs$.pipe(
    map(accessorFunction),
    switchMap(([compiler, config]) => Observable.create(observer => {
      console.log(`building ${config.extension}...\n`)
      /* Watch */
      if(config.compile.watch) {
        compiler.watch({}, (err, stats) => {
          console.log('[webpack:build]', stats.toString({ colors: true }), '\n')

          observer.next('built')
          if(err !== null) observer.error(err)
        })
      }

      /* Build */
      else {
        compiler.run((err, stats) => {
          console.log('[webpack:build]', stats.toString({ colors: true }), '\n')

          if(err !== null) observer.error(err)

          observer.next('built')
          observer.complete()
        })
      }
    }))
  )
}