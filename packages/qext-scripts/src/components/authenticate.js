import { Observable } from "rxjs"
import { exec } from 'child_process'
import prompt from 'prompt'
import { tap, retryWhen, filter, take } from "rxjs/operators";

export default (cookieJar$) => Observable.create(observer => {
  console.log('\nauthenticate:\n')

  const schema = {
    properties: {
      user: {
        required: true
      },
      password: {
        hidden: true
      }
    }
  }

  prompt.start()

  prompt.get(schema, (err, result) => {

    exec(`curl -s -L --ntlm -u ${result.user}:${result.password} --insecure -c - https://172.16.84.102/qrs/about?xrfkey=0123456789abcdef --header "x-qlik-xrfkey: 0123456789abcdef" --header "User-Agent: Windows"`, (error, stdout, stderr) => {
      
      if(error !== null) {
        observer.error(error)
      }
      else if(stdout.length === 0) {
        observer.error({ 
          message: 'authentication failed',
          authenticate: true
        })
      }
      else {
        cookieJar$.next(stdout.split('X-Qlik-Session')[1].trim())
        observer.next({ message: 'authentication successful' })
        observer.complete()
      }
    })
  })
}).pipe(
  retryWhen(errors => errors.pipe(
    take(3),
    filter(err => err.authenticate),
    tap(t => console.log(`\n\n${t.message}`))
  ))
)