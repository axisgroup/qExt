#!/usr/bin/env node
'use strict';

var joi = require('@hapi/joi');
var rxjs = require('rxjs');
var fsExtra = require('fs-extra');
var operators = require('rxjs/operators');

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
					isSecure: joi.bool().default(false),
					allowSelfSignedSignature: joi.bool().default(false),
					hdrAuthUser: joi.string(),
					windowsAuth: joi.bool().valid(true),
				}),
				desktopDeploy: joi.object({
					destination: joi.string().required(),
				}),
			})
				.unknown(true)
				.xor("vanilla", "compile")
				.xor("serverDeploy.hdrAuthUser", "serverDeploy.windowsAuth")
				.oxor("serverDeploy", "desktopDeploy");

			const { error, value } = schema.validate(config);

			if (error) observer.error(error.details[0].message.replace(/"value"/g, "config"));
			else {
				observer.next(config);
				observer.complete();
			}
		});
	});

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

const validateQextConfig$ = validateQextConfig(configFile).pipe(operators.share(1));

// validateQextConfig$.subscribe()

rxjs.merge(validateQextConfig$).subscribe(() => {}, err => console.error(err));

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
