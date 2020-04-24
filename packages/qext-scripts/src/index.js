#!/usr/bin/env node

import { merge, BehaviorSubject, iif, empty, of, from, combineLatest, Observable } from "rxjs"
import { share, mergeMap, switchMap, map, tap, mapTo, filter } from "rxjs/operators"
import { remove } from "fs-extra"
import delve from "dlv"

import { validateQextConfig } from "./validate"
import { authenticate } from "./authenticate"
import { buildVanilla, buildCompile, zip } from "./build"
import { deployToServer } from "./deploy"

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

import program from "commander"

program.option("-w, --watch", "Watch").parse(process.argv)

/* Get Config */
const configFile = "./qext.config.json"

/** Validate Qext Config File */
const validateQextConfig$ = validateQextConfig(configFile).pipe(share(1))

// /** Cookie Jar */
// const cookieJar$ = new BehaviorSubject(null)

/** Authentication */
const authenticated$ = validateQextConfig$.pipe(
	mergeMap(config =>
		iif(
			/** if deploying with windowsAuth */
			() => delve(config, "serverDeploy.windowsAuth", false),

			/** Authenticate */
			authenticate(config),

			/** else, skip authentication */
			of(config)
		)
	),
	share(1)
)

/** Remove Dist folder */
const removeDist$ = authenticated$.pipe(switchMap(config => from(remove(config.output)).pipe(mapTo(config))))

const build$ = removeDist$.pipe(
	switchMap(config => {
		if (config.vanilla) return buildVanilla({ config, watch: program.watch })
		else if (config.compile) return buildCompile({ config, watch: program.watch })
	})
)

/** Zip */
const zip$ = build$.pipe(switchMap(zip))

const deployToServer$ = zip$.pipe(
	filter(config => config.serverDeploy !== undefined),
	switchMap(deployToServer)
)

deployToServer$.subscribe(() => {}, console.error)

process.on("SIGINT", () => {
	console.info(`\nqExt Ended`)
	process.exit()
})

// /** Define Webpack */
// const webpack$ = authenticated$

// combineLatest(removeDist$, webpack$).subscribe(console.log)
// console.log,
// console.error
// .pipe(build(([removeDist, { webpack, config }]) => ({ compiler: webpack, config, watch: program.watch })))

// merge(removeDist$).subscribe(
// 	next => {
// 		// console.log(next)
// 	},
// 	err => console.error(err)
// )

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
