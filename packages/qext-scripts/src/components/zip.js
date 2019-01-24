import { Observable } from "rxjs"
import { map, switchMap } from 'rxjs/operators'
import zipdir from 'zip-dir'

export default inputAccessorFunction => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return obs$ => obs$.pipe(
    map(accessorFunction),
    switchMap(extension => Observable.create(observer => {
      // Define output of zip file
      const outputDir = './dist'
      // Define inupt directory to be zipped
      const inputDir = `${outputDir}/${extension}`

      zipdir(
        inputDir,
        { saveTo: `${outputDir}/${extension}.zip` },
        (err, buffer) => {
          observer.next('zipped')
          if(err !== null) observer.error(err)
          observer.complete()
        }
      )
    }))
  )
}