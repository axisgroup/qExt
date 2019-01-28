import {
  Subject,
  combineLatest,
  of,
  iif,
  merge
} from 'rxjs'
import {
  withLatestFrom,
  share,
  mergeMap,
  filter,
  pluck
} from 'rxjs/operators'

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
  authenticate
} from './components/component-exports'

/* Get Config */
const configFile = './qext.config.json'

const qextConfig$ = of(configFile).pipe(
  qextConfig(),
  share(1)
)


/* Cookie Jar */
const cookieJar$ = new Subject()

/* Initialize authentication */
const authenticate$ = qextConfig$.pipe(
  mergeMap(config => iif(
    /* if deploying.. */
    () => config.deploy,

    /* authenticate */
    authenticate(cookieJar$),

    /* else, skip authentication */
    of('skipping authentication')
  ))
)


/* Remove Dist */
const removeDist$ = authenticate$.pipe(
  withLatestFrom(qextConfig$),
  deleteDist(([authStatus, config]) => config.output),
  share(1)
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


/* Copy Source */
const copySource$ = removeDist$.pipe(
  withLatestFrom(qextConfig$),
  pluck(1),
  filter(config => config.mode === "vanilla"),
  copySrc()
)


/* Define Webpack */
const webpack$ = qextConfig$.pipe(
  filter(config => config.mode === 'compile'),
  defineWebpack(),
  share(1)
)


/* Build */
const build$ = webpack$.pipe(
  withLatestFrom(qextConfig$),
  build(([webpack, config]) => ({ webpack, config }))
)


/* Distribute */
const dist$ = merge(
  combineLatest(
    copyStatic$,
    copyQext$,
    build$
  ),
  copySource$
)


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
  filter(config => config.deploy),
  withLatestFrom(cookieJar$),
  uploadExtension(([config, cookie]) => ({
    config,
    cookie
  }))
)


upload$.subscribe(
  console.log,
  err => console.error(err)
)
