#!/usr/bin/env node

import { iif, of, from } from "rxjs"
import { share, mergeMap, switchMap, mapTo } from "rxjs/operators"
import { remove } from "fs-extra"
import delve from "dlv"

import { validateQextConfig } from "./validate"
import { authenticate } from "./authenticate"
import { buildVanilla, buildCompile, zip } from "./build"
import { deployToServer, deployToDesktop } from "./deploy"

import program from "commander"

program
	.option("-w, --watch", "Watch")
	.option("-d, --deploy", "Deploy")
	.parse(process.argv)

/* Get Config */
const configFile = "./qext.config.json"

/** Validate Qext Config File */
const validateQextConfig$ = validateQextConfig(configFile).pipe(share(1))

/** Authentication */
const authenticated$ = validateQextConfig$.pipe(
	mergeMap(config =>
		iif(
			/** if deploying with windowsAuth */
			() => delve(config, "serverDeploy.windowsAuth", false) && program.deploy,

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

/** Deploy */
const deploy$ = zip$.pipe(
	switchMap(config => {
		if (config.serverDeploy && program.deploy) return deployToServer(config)
		else if (config.desktopDeploy && program.deploy) return deployToDesktop(config)
		else return of(config)
	})
)

deploy$.subscribe(() => {}, console.error)

process.on("SIGINT", () => {
	console.info(`\nqExt Ended`)
	process.exit()
})
