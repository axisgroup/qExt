const fs = require('fs-extra')
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

export default () => extension$ => 
  extension$.pipe(
    switchMap(extension => Observable.create(observer => {
      // Create dist folder if it doesn't exist
      const createDistFolderPr = fs.ensureDir(`./dist/${extension}`)
  
      createDistFolderPr.then(() => {
        observer.next(extension)
        observer.complete()
      })
    }))
  )
