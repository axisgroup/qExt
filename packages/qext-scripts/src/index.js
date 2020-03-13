#!/usr/bin/env node

import { validateQextConfig } from "./validate"
import { share } from "rxjs/operators"
import { merge } from "rxjs"
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
const configFile = "./qext.config.json"

const validateQextConfig$ = validateQextConfig(configFile).pipe(share(1))

// validateQextConfig$.subscribe()

merge(validateQextConfig$).subscribe(() => {}, err => console.error(err))

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
