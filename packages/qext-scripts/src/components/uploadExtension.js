import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import http from 'http'
import fs from 'fs-extra'

export default inputAccessorFunction => {
  let accessorFunction

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction
  else accessorFunction = a => a

  return obs$ => obs$.pipe(
    map(accessorFunction),
    switchMap(({ config, cookie }) => Observable.create(observer => {
      const options = {
        method: "DELETE",
        host: "172.16.84.102",
        port: null,
        path: `/qrs/extension/name/${config.extension}?xrfkey=123456789abcdefg`,
        headers: {
          "x-qlik-xrfkey": "123456789abcdefg",
          "content-type": "application/zip",
          "Cookie": `X-Qlik-Session=${cookie}`
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
                config,
                cookie
              })
              observer.complete()
            }
            else if(res.statusCode >= 200 && res.statusCode < 300) {
              observer.next({
                message: 'deleted',
                config,
                cookie
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
    })),
    switchMap(({ config, cookie }) => Observable.create(observer => {
      const extensionPath = `${config.output}/${config.extension}.zip`

      const options = {
        method: "POST",
        host: "172.16.84.102",
        port: null,
        path: "/qrs/extension/upload?xrfkey=123456789abcdefg",
        headers: {
          "x-qlik-xrfkey": "123456789abcdefg",
          "content-type": "application/zip",
          "Cookie": `X-Qlik-Session=${cookie}`
        }
      }

      const readZipFile = fs.readFile(extensionPath)

      readZipFile.then(data => {
        const request = http.request(options, res => {
          
          let chunks = []
          res.on('data', chunk => chunks.push(chunk))
            .on('end', () => {
              if(res.statusCode === 403 || res.statusCode === 302) {
                observer.error({ authenticate: true })
              }
              else if(res.statusCode >= 200 && res.statusCode < 300) {
                observer.next('uploaded')
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

        request.write(data)
        request.end()
      })
    })),
  )
}