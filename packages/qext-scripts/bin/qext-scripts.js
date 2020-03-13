#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rxjs = require('rxjs');
var operators = require('rxjs/operators');
var fsExtra = require('fs-extra');
var delve = _interopDefault(require('dlv'));
var joi = require('@hapi/joi');
var child_process = require('child_process');
var prompt = _interopDefault(require('prompt'));

var validateQextConfig = configFile =>
	rxjs.Observable.create(observer => {
		if (configFile !== "./qext.config.json") observer.error("config should come from ./qext.config.json");

		const configFileStat = fsExtra.stat(configFile);

		const config = configFileStat
			.then(() => fsExtra.readJSON(configFile))
			.catch(() => observer.error(`${configFile} not found`));

		config.then(config => {
			const schema = joi.object({
				extension: joi.string().required(),
				output: joi.string().required(),
				vanilla: joi.object({
					entry: joi.string().required(),
				}),
				compile: joi.object({
					entry: joi.string().required(),
					qext: joi.string().required(),
					static: joi.string(),
				}),
				serverDeploy: joi.object({
					host: joi.string().required(),
					port: joi.number(),
					prefix: joi.string(),
					isSecure: joi.bool().default(true),
					allowSelfSignedSignature: joi.bool().default(false),
					hdrAuthUser: joi.string(),
					windowsAuth: joi.bool().valid(true),
					user: joi.string(),
					password: joi.string(),
				}),
				desktopDeploy: joi.object({
					destination: joi.string().required(),
				}),
			})
				.unknown(true)
				.xor("vanilla", "compile")
				.oxor("serverDeploy.hdrAuthUser", "serverDeploy.windowsAuth")
				.oxor("serverDeploy", "desktopDeploy");

			const { error, value } = schema.validate(config);

			if (error) observer.error(error.details[0].message.replace(/"value"/g, "config"));
			else {
				observer.next(config);
				observer.complete();
			}
		});
	});

var authenticate = config => {
	const serverDeploy = config.serverDeploy;
	return rxjs.Observable.create(observer => {
		const authSchema = {
			properties: {
				user: { required: true },
				password: { hidden: true },
			},
		};

		/** Curl Execution statement that authenticates a user against Qlik Sense */
		const execCurl = (user, password) => {
			child_process.exec(
				`curl -s -L --ntlm -u ${user}:${password} --insecure -c - ${serverDeploy.isSecure ? "https" : "http"}://${
					serverDeploy.host
				}/qrs/about?xrfkey=0123456789abcdef --header "x-qlik-xrfkey: 0123456789abcdef" --header "User-Agent: Windows"`,
				/** Callback */
				(error, stdout, stderr) => {
					/** Error */
					if (error !== null) observer.error(error);
					// No Response
					else if (stdout.indexOf("X-Qlik-Session") === -1)
						observer.error({ message: "authentication failed", reAuthenticate: true });
					// Success
					else {
						/** pass the session id on for calling apis */
						observer.next({
							message: "authentication successful",
							session: stdout.split("X-Qlik-Session")[1].trim(),
						});
						observer.complete();
					}
				}
			);
		};

		/** username & password passed in via config */
		if (serverDeploy.user && serverDeploy.password) execCurl(serverDeploy.user, serverDeploy.password);
		else {
			/** prompt user for username and password */
			console.log("\nauthenticate:\n");
			prompt.start();
			prompt.get(authSchema, (err, result) => {
				execCurl(result.user, result.password);
			});
		}
	}).pipe(
		/** retry up to 3 times when authentication fails */
		operators.retryWhen(errors =>
			errors.pipe(
				operators.take(serverDeploy.user && serverDeploy.password ? 1 : 3),
				operators.filter(err => err.reAuthenticate),
				operators.tap(({ message }) => console.log(`\n\n${message}`))
			)
		),
		operators.tap(({ message }) => console.log(`${message}\n`)),
		operators.map(({ session }) => ({ ...config, session }))
	)
};

// import { of, iif, merge, BehaviorSubject } from "rxjs"
// import { withLatestFrom, share, mergeMap, filter, pluck } from "rxjs/operators"

// import {
// 	qextConfig,
// 	authenticate,
// 	deleteDist,
// 	defineWebpack,
// 	build,
// 	zip,
// 	uploadExtension,
// 	deployToDesktop,
// } from "./components"

// import program from "commander"

// program.option("-w, --watch", "Watch").parse(process.argv)

/* Get Config */
const configFile = "./qext.config.json";

/** Validate Qext Config File */
const validateQextConfig$ = validateQextConfig(configFile).pipe(operators.share(1));

// /** Cookie Jar */
// const cookieJar$ = new BehaviorSubject(null)

/** Authentication */
const authenticated$ = validateQextConfig$.pipe(
	operators.mergeMap(config =>
		rxjs.iif(
			/** if deploying with windowsAuth */
			() => delve(config, "serverDeploy.windowsAuth", false),

			/** Authenticate */
			authenticate(config),

			/** else, skip authentication */
			rxjs.of(config)
		)
	),
	operators.share(1)
);

/** Remove Dist folder */
const removeDist$ = authenticated$.pipe(operators.switchMap(config => rxjs.from(fsExtra.remove(config.output)).pipe(operators.mapTo(config))));

rxjs.merge(removeDist$).subscribe(
	next => {
		// console.log(next)
	},
	err => console.error(err)
);

// const qextConfig$ = of(configFile).pipe(
// 	qextConfig(),
// 	share(1)
// )

// /* Cookie Jar */
// const cookieJar$ = new BehaviorSubject(null)

// /* Initialize authentication */
// const authenticate$ = qextConfig$.pipe(
// 	mergeMap(config =>
// 		iif(
// 			/* if deploying.. */
// 			() => config.authenticate === "windows",

// 			/* authenticate */
// 			authenticate(config, cookieJar$),

// 			/* else, skip authentication */
// 			of("skipping authentication")
// 		)
// 	),
// 	share(1)
// )

// /* Remove Dist */
// const removeDist$ = authenticate$.pipe(
// 	withLatestFrom(qextConfig$),
// 	deleteDist(([authStatus, config]) => config.output),
// 	share(1)
// )

// const webpack$ = removeDist$.pipe(
// 	withLatestFrom(qextConfig$),
// 	pluck(1),
// 	defineWebpack(),
// 	share(1)
// )

// /* Build */
// const build$ = webpack$.pipe(
// 	withLatestFrom(qextConfig$),
// 	build(([webpack, config]) => ({
// 		compiler: webpack,
// 		config,
// 		watch: program.watch,
// 	})),
// 	share(1)
// )

// /* Zip */
// const zip$ = build$.pipe(
// 	withLatestFrom(qextConfig$),
// 	pluck(1),
// 	zip()
// )

// /* Upload */
// const upload$ = zip$.pipe(
// 	withLatestFrom(qextConfig$),
// 	pluck(1),
// 	filter(config => config.deploy === "server"),
// 	withLatestFrom(cookieJar$),
// 	uploadExtension(([config, cookie]) => ({
// 		config,
// 		cookie,
// 	}))
// )

// /* Deploy */
// const deployToDesktop$ = build$.pipe(
// 	withLatestFrom(qextConfig$),
// 	pluck(1),
// 	filter(config => config.deploy === "desktop"),
// 	deployToDesktop()
// )

// merge(upload$, deployToDesktop$).subscribe(() => {}, err => console.error(err))

// process.on("SIGINT", () => {
// 	console.info("\nqExt Ended.")
// 	process.exit()
// })
