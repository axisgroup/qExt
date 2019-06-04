import { Subject, combineLatest, of, iif, merge, BehaviorSubject } from "rxjs"
import {
	withLatestFrom,
	share,
	mergeMap,
	filter,
	pluck,
	tap,
} from "rxjs/operators"

import {
	qextConfig,
	authenticate,
	deleteDist,
	copySrc,
	copyQext,
	copyStatic,
	defineWebpack,
	build,
	zip,
	uploadExtension,
	deployToDesktop,
} from "./components"

import program from "commander"

program.option("-w, --watch", "Watch").parse(process.argv)

/* Get Config */
const configFile = "./qext.config.json"

const qextConfig$ = of(configFile).pipe(
	qextConfig(),
	share(1)
)

/* Cookie Jar */
const cookieJar$ = new BehaviorSubject(null)

/* Initialize authentication */
const authenticate$ = qextConfig$.pipe(
	mergeMap(config =>
		iif(
			/* if deploying.. */
			() => config.authenticate === "windows",

			/* authenticate */
			authenticate(config, cookieJar$),

			/* else, skip authentication */
			of("skipping authentication")
		)
	),
	share(1)
)

/* Remove Dist */
const removeDist$ = authenticate$.pipe(
	withLatestFrom(qextConfig$),
	deleteDist(([authStatus, config]) => config.output),
	share(1)
)

/* Copy Source */
const copySource$ = removeDist$.pipe(
	withLatestFrom(qextConfig$),
	pluck(1),
	filter(config => config.mode === "vanilla"),
	copySrc(config => ({ config, watch: program.watch }))
)

/* Copy qext file */
const copyQext$ = removeDist$.pipe(
	withLatestFrom(qextConfig$),
	pluck(1),
	/* Only copy qext if we are compiling */
	filter(config => config.mode === "compile"),
	copyQext()
)

/* Copy Static Directory */
const copyStatic$ = removeDist$.pipe(
	withLatestFrom(qextConfig$),
	pluck(1),
	filter(config => config.mode === "compile"),
	/* Only copy static directory if compiling */
	mergeMap(config =>
		iif(
			/* if static property defined.. */
			() => config.compile.static !== undefined,

			/* copy static */
			copyStatic(config),

			/* else, don't copy */
			of("no static directory")
		)
	)
)

/* Define Webpack */
const webpack$ = combineLatest(copyQext$, copyStatic$).pipe(
	withLatestFrom(qextConfig$),
	pluck(1),
	filter(config => config.mode === "compile"),
	defineWebpack(),
	share(1)
)

/* Build */
const build$ = webpack$.pipe(
	withLatestFrom(qextConfig$),
	build(([webpack, config]) => ({
		compiler: webpack,
		config,
		watch: program.watch,
	}))
)

/* Distribute */
const dist$ = merge(build$, copySource$).pipe(share(1))

/* Zip */
const zip$ = dist$.pipe(
	withLatestFrom(qextConfig$),
	pluck(1),
	zip()
)

/* Upload */
const upload$ = zip$.pipe(
	withLatestFrom(qextConfig$),
	pluck(1),
	filter(config => config.deploy === "server"),
	withLatestFrom(cookieJar$),
	uploadExtension(([config, cookie]) => ({
		config,
		cookie,
	}))
)

/* Deploy */
const deployToDesktop$ = dist$.pipe(
	withLatestFrom(qextConfig$),
	pluck(1),
	filter(config => config.deploy === "desktop"),
	deployToDesktop()
)

merge(upload$, deployToDesktop$).subscribe(() => {}, err => console.error(err))
