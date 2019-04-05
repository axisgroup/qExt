import { Observable } from "rxjs"
import { exec } from "child_process"
import prompt from "prompt"
import { tap, retryWhen, filter, take } from "rxjs/operators"

export default (config, cookieJar$) =>
	Observable.create(observer => {
		console.log("\nauthenticate:\n")

		const schema = {
			properties: {
				user: {
					required: true,
				},
				password: {
					hidden: true,
				},
			},
		}

		const execCurl = (user, password) => {
			exec(
				`curl -s -L --ntlm -u ${user}:${password} --insecure -c - https://${
					config.serverConfig.host
				}/qrs/about?xrfkey=0123456789abcdef --header "x-qlik-xrfkey: 0123456789abcdef" --header "User-Agent: Windows"`,
				(error, stdout, stderr) => {
					if (error !== null) {
						observer.error(error)
					} else if (stdout.length === 0) {
						observer.error({
							message: "authentication failed",
							authenticate: true,
						})
					} else {
						cookieJar$.next(stdout.split("X-Qlik-Session")[1].trim())
						observer.next({ message: "authentication successful" })
						observer.complete()
					}
				}
			)
		}

		if (config.serverConfig.user && config.serverConfig.password) {
			execCurl(config.serverConfig.user, config.serverConfig.password)
		} else {
			prompt.start()

			prompt.get(schema, (err, result) => {
				execCurl(result.user, result.password)
			})
		}
	}).pipe(
		retryWhen(errors =>
			errors.pipe(
				take(3),
				filter(err => err.authenticate),
				tap(t => console.log(`\n\n${t.message}`))
			)
		),
		tap(auth => console.log(`${auth.message}\n`))
	)
