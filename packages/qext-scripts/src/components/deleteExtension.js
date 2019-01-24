import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import http from 'http'


export default inputAccessorFunction => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return obs$ => obs$.pipe(
    map(accessorFunction),
    switchMap(obj => Observable.create(observer => {
      const options = {
        method: "DELETE",
        host: "172.16.84.102",
        port: null,
        path: `/qrs/extension/name/${obj.extension}?xrfkey=123456789abcdefg`,
        headers: {
          "x-qlik-xrfkey": "123456789abcdefg",
          "content-type": "application/zip",
          "Cookie": `X-Qlik-Session=${obj.cookie}`
        }
      }

      const request = http.request(options, res => {
        let chunks = []

        res
          .on('data', chunk => chunks.push(chunk))
          .on('end', () => {
            if(res.statusCode === 403) {
              observer.error({ authenticate: true })
            }
            else if(res.statusCode === 400) {
              observer.next({
                message: 'not found',
                ...obj
              })
              observer.complete()
            }
            else if(res.statusCode >= 200 && res.statusCode < 300) {
              observer.next({
                message: 'deleted',
                ...obj
              })
              observer.complete()
            }
            else {
              observer.error({
                statusCode: res.statusCode,
                statusMessage: res.statusMessage
              })
            }
          })
          .on('error', err => {
            observer.error(err)
          })
      })

      request.end()
    }))
  )
}