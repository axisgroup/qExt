#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rxjs = require('rxjs');
var operators = require('rxjs/operators');
var fs$2 = require('fs-extra');
var fs$2__default = _interopDefault(fs$2);
var path = _interopDefault(require('path'));
var webpack = _interopDefault(require('webpack'));
var CopyPlugin = _interopDefault(require('copy-webpack-plugin'));
var DisableOutputWebpackPlugin = _interopDefault(require('disable-output-webpack-plugin'));
var zipdir = _interopDefault(require('zip-dir'));
var httpInsecure = _interopDefault(require('http'));
var httpSecure = _interopDefault(require('https'));
var child_process = require('child_process');
var prompt = _interopDefault(require('prompt'));
var program = _interopDefault(require('commander'));

var qextConfig = inputAccessorFunction => {
	let accessorFunction;

	if (inputAccessorFunction) accessorFunction = inputAccessorFunction;
	else accessorFunction = a => a;

	return extension$ =>
		extension$.pipe(
			operators.map(accessorFunction),
			operators.switchMap(configFile =>
				rxjs.Observable.create(observer => {
					const getConfigFile = fs$2.stat(configFile);

					const configFileExists = getConfigFile
						.then(() => fs$2.readJson(configFile))
						.catch(err => observer.error(`${configFile} not found`));

					configFileExists
						.then(config => {
							// extension property not defined
							if (config.extension === undefined) observer.error(`extension property not defined in ${configFile}`);
							// Property defined
							else {
								// output property not defined
								if (config.output === undefined) observer.error(`output property not defined in ${configFile}`);
								// mode property not defined
								else if (config.mode === undefined) observer.error(`mode property not defined in ${configFile}`);
								// mode value not vanilla or compile
								else if (["vanilla", "compile"].indexOf(config.mode) === -1)
									observer.error(`mode value must be set to "vanilla" or "compile"`);
								// Vanilla mode
								else if (config.mode === "vanilla") {
									// vanilla property not defined
									if (config.vanilla === undefined) observer.error(`vanilla property not defined in ${configFile}`);
									// vanilla-entry property not defined
									else if (config.vanilla.entry === undefined) observer.error(`entry property not defined in "vanilla"`);
								}
								// Compile mode
								else if (config.mode === "compile") {
									// compile property not defined
									if (config.compile === undefined) observer.error(`compile property not defined in ${configFile}`);
									// compile-entry property not defined
									else if (config.compile.entry === undefined) observer.error(`entry property not defined in "compile"`);
									// compile-qext property not defined
									else if (config.compile.qext === undefined) observer.error(`qext property not defined in "compile"`);
								}

								// Deploy Desktop
								if (config.deploy === "desktop") {
									// desktopConfig not defined
									if (config.desktopConfig === undefined)
										observer.error(`desktopConfig property not defined in ${configFile}`);
									// desktopConfig-destination property not defined
									else if (config.desktopConfig.destination === undefined)
										observer.error(`destination not defined in "desktopConfig"`);
								}
								// Deploy Server
								else if (config.deploy === "server") {
									// serverConfig not defined
									if (config.serverConfig === undefined)
										observer.error(`serverConfig property not defined in ${configFile}`);
									// authenticate not defined
									else if (config.authenticate === undefined)
										observer.error(`authenticate property not defined in ${configFile}`);
									else {
										// Header Authentication
										if (config.authenticate === "header") {
											// host not defined
											if (config.serverConfig.host === undefined)
												observer.error(`host property not defined in serverConfig`);
											// hdr-usr not defined
											else if (config.serverConfig["hdr-usr"] === undefined)
												observer.error(`hdr-usr property not defined in serverConfig`);
										}
										// Windows Authentication
										if (config.authenticate === "windows") {
											// host not defined
											if (config.serverConfig.host === undefined)
												observer.error(`host property not defined in serverConfig`);
										}
									}
								}
							}

							observer.next(config);
							observer.complete();
						})
						.catch(err => observer.error(`${configFile} cannot be read`));
				})
			)
		)
};

const fs = require('fs-extra');

var deleteDist = inputAccessorFunction => {
  let accessorFunction;

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction;
  else accessorFunction = a => a;

  return extension$ => extension$.pipe(
    operators.map(accessorFunction),
    operators.switchMap(output => rxjs.Observable.create(observer => {
      const removeDist = fs.remove(`${output}`);
  
      removeDist.then(() => {
        observer.next(`${output} removed`);
        observer.complete();
      });
    })),
    operators.tap(distStatus => console.log(`\n${distStatus}\n`)),
  )
};

var defineWebpack = inputAccessorFunction => {
	let accessorFunction;

	if (inputAccessorFunction) accessorFunction = inputAccessorFunction;
	else accessorFunction = a => a;

	return obs$ =>
		obs$.pipe(
			operators.map(accessorFunction),
			operators.switchMap(config =>
				rxjs.Observable.create(observer => {
					let webpackConfig;

					switch (config.mode) {
						/** Compile Config */
						case "compile":
							const entryExists = fs$2.stat(path.resolve(process.cwd(), config.compile.entry));

							webpackConfig = entryExists
								.then(() => ({
									entry: [`${config.compile.entry}`],
									output: {
										path: `${path.resolve(process.cwd(), config.output + "/" + config.extension)}`,
										filename: `${config.extension}.js`,
									},
									mode: "development",
									module: {
										rules: [
											{
												test: /\.js$/,
												exclude: /node_modules/,
												loader: "babel-loader",
												options: {
													presets: ["@babel/preset-env"],
													plugins: [
														"@babel/plugin-proposal-object-rest-spread",
														"@babel/plugin-transform-modules-commonjs",
													],
												},
											},
											{
												test: /\.html$/,
												loader: "html-loader",
											},
											{
												test: /\.css$/,
												use: [{ loader: "style-loader" }, { loader: "css-loader" }],
											},
										],
									},
									plugins: [
										new CopyPlugin([
											{
												// qext
												from: path.resolve(process.cwd(), `${config.compile.qext}`),
												to: path.resolve(
													process.cwd(),
													`${config.output}/${config.extension}/${config.extension}.qext`
												),
											},
											...(config.compile.state
												? {
														// static
														from: path.resolve(process.cwd(), config.compile.static),
														to: path.resolve(process.cwd(), `${config.output}/${config.extension}/static`),
												  }
												: {}),
										]),
									],
								}))
								.catch(() => observer.error(`entry not found\n`));

							break

						/** Vanilla Config */
						case "vanilla":
							const entryContents = fs$2.readdir(path.resolve(process.cwd(), config.vanilla.entry))
								.then(files => files.filter(file => file.indexOf(".js") > -1))
								.then(jsFiles => `${config.vanilla.entry}/${jsFiles[0]}`);

							webpackConfig = entryContents.then(entryFile => {
								const webpackConfig = {
									entry: [entryFile],
									mode: "development",
									plugins: [
										new DisableOutputWebpackPlugin(),
										new CopyPlugin([
											{
												// qext
												from: path.resolve(process.cwd(), `${config.vanilla.entry}`),
												to: path.resolve(process.cwd(), `${config.output}/${config.extension}`),
											},
											...(config.vanilla.static
												? {
														// static
														from: path.resolve(process.cwd(), config.vanilla.static),
														to: path.resolve(process.cwd(), `${config.output}/${config.extension}/static`),
												  }
												: {}),
										]),
									],
								};
								console.log(webpackConfig);
								return webpackConfig
							});

							break

						default:
							observer.error("mode not defined correctly");
					}

					webpackConfig.then(config => {
						observer.next(webpack(config));
						observer.complete();
					});
				})
			)
		)
};

var build = inputAccessorFunction => {
	let accessorFunction;

	if (inputAccessorFunction) accessorFunction = inputAccessorFunction;
	else accessorFunction = a => a;

	return obs$ =>
		obs$.pipe(
			operators.map(accessorFunction),
			operators.switchMap(({ compiler, config, watch }) =>
				rxjs.Observable.create(observer => {
					console.log(`building ${config.extension}...\n`);
					/* Watch */
					if (watch) {
						compiler.watch({}, (err, stats) => {
							console.log(
								"[webpack:build]",
								stats.toString({ colors: true }),
								"\n"
							);

							observer.next("built");
							if (err !== null) observer.error(err);
						});
					} else {
						/* Build */
						compiler.run((err, stats) => {
							console.log(
								"[webpack:build]",
								stats.toString({ colors: true }),
								"\n"
							);

							if (err !== null) observer.error(err);

							observer.next("built");
							observer.complete();
						});
					}
				})
			)
		)
};

var zip = inputAccessorFunction => {
  let accessorFunction;

  if(inputAccessorFunction) accessorFunction = inputAccessorFunction;
  else accessorFunction = a => a;

  return obs$ => obs$.pipe(
    operators.map(accessorFunction),
    operators.switchMap(config => rxjs.Observable.create(observer => {
      // Define output of zip file
      const outputDir = config.output;
      // Define inupt directory to be zipped
      const inputDir = `${outputDir}/${config.extension}`;

      zipdir(
        inputDir,
        { saveTo: `${outputDir}/${config.extension}.zip` },
        (err, buffer) => {
          observer.next('zipped');
          if(err !== null) observer.error(err);
          observer.complete();
        }
      );
    }))
  )
};

var uploadExtension = inputAccessorFunction => {
	let accessorFunction;

	if (inputAccessorFunction) accessorFunction = inputAccessorFunction;
	else accessorFunction = a => a;

	return obs$ =>
		obs$.pipe(
			operators.map(accessorFunction),
			operators.switchMap(({ config, cookie }) =>
				rxjs.Observable.create(observer => {
					const http = config.serverConfig.isSecure ? httpSecure : httpInsecure;
					const prefix = config.serverConfig.prefix
						? `/${config.serverConfig.prefix}`
						: "";

					const headers =
						config.authenticate === "windows"
							? {
									"x-qlik-xrfkey": "123456789abcdefg",
									"content-type": "application/zip",
									Cookie: `X-Qlik-Session=${cookie}`,
							  }
							: config.authenticate === "header"
							? {
									"x-qlik-xrfkey": "123456789abcdefg",
									"content-type": "application/zip",
									"hdr-usr": config.serverConfig["hdr-usr"],
							  }
							: {
									"x-qlik-xrfkey": "123456789abcdefg",
									"content-type": "application/zip",
							  };

					const options = {
						method: "DELETE",
						rejectUnauthorized:
							config.serverConfig.allowSelfSignedCertificate === true
								? false
								: true,
						host: config.serverConfig.host,
						port: config.serverConfig.port ? config.serverConfig.port : null,
						path: `${prefix}/qrs/extension/name/${
							config.extension
						}?xrfkey=123456789abcdefg`,
						headers,
					};

					const request = http.request(options, res => {
						let chunks = [];

						res
							.on("data", chunk => chunks.push(chunk))
							.on("end", () => {
								if (res.statusCode === 403) {
									observer.error({ authenticate: true });
								} else if (res.statusCode === 400) {
									observer.next({
										message: "not found",
										config,
										cookie,
									});
									observer.complete();
								} else if (res.statusCode >= 200 && res.statusCode < 300) {
									observer.next({
										message: "deleted",
										config,
										cookie,
									});
									observer.complete();
								} else {
									observer.error({
										statusCode: res.statusCode,
										statusMessage: res.statusMessage,
									});
								}
							})
							.on("error", err => {
								observer.error(err);
							});
					});

					request.end();
				})
			),
			operators.switchMap(({ config, cookie }) =>
				rxjs.Observable.create(observer => {
					const http = config.serverConfig.isSecure ? httpSecure : httpInsecure;
					const prefix = config.serverConfig.prefix
						? `/${config.serverConfig.prefix}`
						: "";

					const headers =
						config.authenticate === "windows"
							? {
									"x-qlik-xrfkey": "123456789abcdefg",
									"content-type": "application/zip",
									Cookie: `X-Qlik-Session=${cookie}`,
							  }
							: config.authenticate === "header"
							? {
									"x-qlik-xrfkey": "123456789abcdefg",
									"content-type": "application/zip",
									"hdr-usr": config.serverConfig["hdr-usr"],
							  }
							: {
									"x-qlik-xrfkey": "123456789abcdefg",
									"content-type": "application/zip",
							  };

					const extensionPath = `${config.output}/${config.extension}.zip`;

					const options = {
						method: "POST",
						rejectUnauthorized:
							config.serverConfig.allowSelfSignedCertificate === true
								? false
								: true,
						host: config.serverConfig.host,
						port: config.serverConfig.port ? config.serverConfig.port : null,
						path: `${prefix}/qrs/extension/upload?xrfkey=123456789abcdefg`,
						headers,
					};

					const readZipFile = fs$2__default.readFile(extensionPath);

					readZipFile.then(data => {
						const request = http.request(options, res => {
							let chunks = [];
							res
								.on("data", chunk => chunks.push(chunk))
								.on("end", () => {
									if (res.statusCode === 403 || res.statusCode === 302) {
										observer.error({ authenticate: true });
									} else if (res.statusCode >= 200 && res.statusCode < 300) {
										observer.next("uploaded");
										observer.complete();
									} else {
										observer.error({
											statusCode: res.statusCode,
											statusMessage: res.statusMessage,
										});
									}
								})
								.on("error", err => {
									observer.error(err);
								});
						});

						request.write(data);
						request.end();
					});
				})
			),
			operators.tap(uplodStatus => console.log(`uploaded\n`))
		)
};

var authenticate = (config, cookieJar$) =>
	rxjs.Observable.create(observer => {
		console.log("\nauthenticate:\n");

		const schema = {
			properties: {
				user: {
					required: true,
				},
				password: {
					hidden: true,
				},
			},
		};

		const execCurl = (user, password) => {
			child_process.exec(
				`curl -s -L --ntlm -u ${user}:${password} --insecure -c - https://${
					config.serverConfig.host
				}/qrs/about?xrfkey=0123456789abcdef --header "x-qlik-xrfkey: 0123456789abcdef" --header "User-Agent: Windows"`,
				(error, stdout, stderr) => {
					if (error !== null) {
						observer.error(error);
					} else if (stdout.length === 0) {
						observer.error({
							message: "authentication failed",
							authenticate: true,
						});
					} else {
						cookieJar$.next(stdout.split("X-Qlik-Session")[1].trim());
						observer.next({ message: "authentication successful" });
						observer.complete();
					}
				}
			);
		};

		if (config.serverConfig.user && config.serverConfig.password) {
			execCurl(config.serverConfig.user, config.serverConfig.password);
		} else {
			prompt.start();

			prompt.get(schema, (err, result) => {
				execCurl(result.user, result.password);
			});
		}
	}).pipe(
		operators.retryWhen(errors =>
			errors.pipe(
				operators.take(3),
				operators.filter(err => err.authenticate),
				operators.tap(t => console.log(`\n\n${t.message}`))
			)
		),
		operators.tap(auth => console.log(`${auth.message}\n`))
	);

const fs$1 = require("fs-extra");

var deployToDesktop = inputAccessorFunction => {
	let accessorFunction;

	if (inputAccessorFunction) accessorFunction = inputAccessorFunction;
	else accessorFunction = a => a;

	return extension$ =>
		extension$.pipe(
			operators.map(accessorFunction),
			operators.switchMap(config =>
				rxjs.Observable.create(observer => {
					const emptyDest = fs$1.emptyDir(
						`${config.desktopConfig.destination}/${config.extension}`
					);

					const copyDist = emptyDest.then(() =>
						fs$1.copy(
							`${config.output}/${config.extension}`,
							`${config.desktopConfig.destination}/${config.extension}`
						)
					);

					copyDist
						.then(() => {
							observer.next("dist copied");
							observer.complete();
						})
						.catch(err => observer.error(err));
				})
			)
		)
};

program.option("-w, --watch", "Watch").parse(process.argv);

/* Get Config */
const configFile = "./qext.config.json";

const qextConfig$ = rxjs.of(configFile).pipe(
	qextConfig(),
	operators.share(1)
);

/* Cookie Jar */
const cookieJar$ = new rxjs.BehaviorSubject(null);

/* Initialize authentication */
const authenticate$ = qextConfig$.pipe(
	operators.mergeMap(config =>
		rxjs.iif(
			/* if deploying.. */
			() => config.authenticate === "windows",

			/* authenticate */
			authenticate(config, cookieJar$),

			/* else, skip authentication */
			rxjs.of("skipping authentication")
		)
	),
	operators.share(1)
);

/* Remove Dist */
const removeDist$ = authenticate$.pipe(
	operators.withLatestFrom(qextConfig$),
	deleteDist(([authStatus, config]) => config.output),
	operators.share(1)
);

const webpack$ = removeDist$.pipe(
	operators.withLatestFrom(qextConfig$),
	operators.pluck(1),
	defineWebpack(),
	operators.share(1)
);

/* Build */
const build$ = webpack$.pipe(
	operators.withLatestFrom(qextConfig$),
	build(([webpack, config]) => ({
		compiler: webpack,
		config,
		watch: program.watch,
	})),
	operators.share(1)
);

/* Zip */
const zip$ = build$.pipe(
	operators.withLatestFrom(qextConfig$),
	operators.pluck(1),
	zip()
);

/* Upload */
const upload$ = zip$.pipe(
	operators.withLatestFrom(qextConfig$),
	operators.pluck(1),
	operators.filter(config => config.deploy === "server"),
	operators.withLatestFrom(cookieJar$),
	uploadExtension(([config, cookie]) => ({
		config,
		cookie,
	}))
);

/* Deploy */
const deployToDesktop$ = build$.pipe(
	operators.withLatestFrom(qextConfig$),
	operators.pluck(1),
	operators.filter(config => config.deploy === "desktop"),
	deployToDesktop()
);

rxjs.merge(upload$, deployToDesktop$).subscribe(() => {}, err => console.error(err));

process.on("SIGINT", () => {
	console.info("\nqExt Ended.");
	process.exit();
});
