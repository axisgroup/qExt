import { object, string, number, bool } from "@hapi/joi"
import { Observable } from "rxjs"
import { stat, readJSON } from "fs-extra"

export default configFile =>
	Observable.create(observer => {
		if (configFile !== "./qext.config.json") observer.error("config should come from ./qext.config.json")

		const configFileStat = stat(configFile)

		const config = configFileStat
			.then(() => readJSON(configFile))
			.catch(() => observer.error(`${configFile} not found`))

		config.then(config => {
			const schema = object({
				extension: string().required(),
				output: string().required(),
				vanilla: object({
					entry: string().required(),
					static: string(),
				}),
				compile: object({
					entry: string().required(),
					qext: string().required(),
					static: string(),
					webpackComments: bool().default(true),
					altWebpackConfig: string(),
				}),
				serverDeploy: object({
					host: string().required(),
					port: number(),
					prefix: string(),
					isSecure: bool().default(true),
					allowSelfSignedSignature: bool().default(false),
					hdrAuthUser: string(),
					windowsAuth: bool().valid(true),
					user: string(),
					password: string(),
				}),
				desktopDeploy: object({
					destination: string().required(),
				}),
			})
				.unknown(true)
				.xor("vanilla", "compile")
				.oxor("serverDeploy.hdrAuthUser", "serverDeploy.windowsAuth")
				.oxor("serverDeploy", "desktopDeploy")

			const { error, value } = schema.validate(config)

			if (error) observer.error(error.details[0].message.replace(/"value"/g, "config"))
			else {
				observer.next(config)
				observer.complete()
			}
		})
	})
