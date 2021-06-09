import { Observable } from "rxjs"
import { exec } from "child_process"
import prompt from "prompt"
import { take, retryWhen, tap, map, filter } from "rxjs/operators"

export default config => {
	const serverDeploy = config.serverDeploy
	return Observable.create(observer => {
		const authSchema = {
			properties: {
				user: { required: true },
				password: { hidden: true },
			},
		}

		/** Curl Execution statement that authenticates a user against Qlik Sense */
		const execCurl = (user, password) => {
			exec(
				`curl -s -L --ntlm -u ${user}:${password} --insecure -c - ${serverDeploy.isSecure ? "https" : "http"}://${
					serverDeploy.host
				}${serverDeploy.prefix ? "/" : ""}${serverDeploy.prefix}/qrs/about?xrfkey=0123456789abcdef --header "x-qlik-xrfkey: 0123456789abcdef" --header "User-Agent: Windows"`,
				/** Callback */
				(error, stdout, stderr) => {
					/** Error */
					if (error !== null) observer.error(error)
					// No Response
					else if (stdout.indexOf("X-Qlik-Session") === -1)
						observer.error({ message: "authentication failed", reAuthenticate: true })
					// Success
					else {
						/** pass the session id on for calling apis */
						observer.next({
							message: "authentication successful",
							session: stdout.split("X-Qlik-Session")[1].trim(),
						})
						observer.complete()
					}
				}
			)
		}

		/** username & password passed in via config */
		if (serverDeploy.user && serverDeploy.password) execCurl(serverDeploy.user, serverDeploy.password)
		else {
			/** prompt user for username and password */
			console.log("\nauthenticate:\n")
			prompt.start()
			prompt.get(authSchema, (err, result) => {
				execCurl(result.user, result.password)
			})
		}
	}).pipe(
		/** retry up to 3 times when authentication fails */
		retryWhen(errors =>
			errors.pipe(
				take(serverDeploy.user && serverDeploy.password ? 1 : 3),
				filter(err => err.reAuthenticate),
				tap(({ message }) => console.log(`\n\n${message}`))
			)
		),
		tap(({ message }) => console.log(`${message}\n`)),
		map(({ session }) => ({ ...config, session }))
	)
}
