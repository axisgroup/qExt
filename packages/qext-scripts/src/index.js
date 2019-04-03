import { Subject, combineLatest, of, iif, merge } from "rxjs"
import { withLatestFrom, share, mergeMap, filter, pluck } from "rxjs/operators"

import {
	qextConfig,
	deleteDist,
	copyQext,
	copyStatic,
	copySrc,
	defineWebpack,
	build,
	zip,
	uploadExtension,
	authenticate,
} from "./components/component-exports"

/* Get Config */
const configFile = "./qext.config.json"

const qextConfig$ = of(configFile).pipe(
	qextConfig(),
	share(1)
)

/* Cookie Jar */
const cookieJar$ = new Subject()

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
	copySrc()
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
	/* Only copy static directory if compiling */
	filter(config => config.mode === "compile"),
	copyStatic()
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
	build(([webpack, config]) => ({ webpack, config }))
)

/* Distribute */
const dist$ = merge(build$, copySource$)

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
// /* Ship to desktop extension location if
//     config.deploy === "desktop" */
// const deployToDesktop$ = dist$.pipe(
//   withLatestFrom(qextConfig$),
//   pluck(1),
//   filter(config => config.deploy === "desktop"),
//   deployToDesktop()
// )

// merge(upload$, deployToDesktop$).subscribe(
//   () => {},
//   err => console.error(err)
// )

upload$.subscribe(() => {}, err => console.error(err))
