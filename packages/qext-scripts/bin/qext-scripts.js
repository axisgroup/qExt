#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

function _interopNamespace(e) {
	if (e && e.__esModule) { return e; } else {
		var n = {};
		if (e) {
			Object.keys(e).forEach(function (k) {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () {
						return e[k];
					}
				});
			});
		}
		n['default'] = e;
		return n;
	}
}

var rxjs = require('rxjs');
var operators = require('rxjs/operators');
var fs = require('fs-extra');
var fs__default = _interopDefault(fs);
var delve = _interopDefault(require('dlv'));
var joi = require('@hapi/joi');
var child_process = require('child_process');
var prompt = _interopDefault(require('prompt'));
var path = _interopDefault(require('path'));
var chokidar = _interopDefault(require('chokidar'));
var CopyWebpackPlugin = _interopDefault(require('copy-webpack-plugin'));
var webpack = _interopDefault(require('webpack'));
var zipdir = _interopDefault(require('zip-dir'));
var httpInsecure = _interopDefault(require('http'));
var httpSecure = _interopDefault(require('https'));
var program = _interopDefault(require('commander'));

var validateQextConfig = configFile =>
	rxjs.Observable.create(observer => {
		if (configFile !== "./qext.config.json") observer.error("config should come from ./qext.config.json");

		const configFileStat = fs.stat(configFile);

		const config = configFileStat
			.then(() => fs.readJSON(configFile))
			.catch(() => observer.error(`${configFile} not found`));

		config.then(config => {
			const schema = joi.object({
				extension: joi.string().required(),
				output: joi.string().required(),
				vanilla: joi.object({
					entry: joi.string().required(),
					static: joi.string(),
				}),
				compile: joi.object({
					entry: joi.string().required(),
					qext: joi.string().required(),
					static: joi.string(),
					webpackComments: joi.bool().default(true),
					altWebpackConfig: joi.string(),
				}),
				serverDeploy: joi.object({
					host: joi.string().required(),
					port: joi.number(),
					prefix: joi.string(),
					isSecure: joi.bool().default(true),
					allowSelfSignedSignature: joi.bool().default(false),
					hdrAuthUser: joi.string(),
					hdrAuthHeaderName: joi.string(),
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

var buildVanilla = ({ config, watch }) =>
	rxjs.Observable.create(observer => {
		const entry = path.resolve(process.cwd(), config.vanilla.entry);
		const staticEntry = config.vanilla.static ? path.resolve(process.cwd(), config.vanilla.static) : null;
		const dist = path.resolve(process.cwd(), config.output);
		const output = `${dist}/${config.extension}`;

		const copySrcFiles = fs__default.copy(entry, output);
		const copyStaticFiles = copySrcFiles.then(() =>
			staticEntry !== null
				? fs__default.copy(staticEntry, `${output}/${config.vanilla.static}`)
				: new Promise(resolve => resolve("no static directory"))
		);

		Promise.all([copySrcFiles, copyStaticFiles]).then(() => {
			observer.next({ config, message: "vanilla built" });
		});

		if (watch) {
			const copyFiles = (evt, path) => {
				const deleteOutput = fs__default.remove(dist);
				const copySrcFiles = deleteOutput.then(() => fs__default.copy(entry, output));

				const copyStaticFiles = copySrcFiles.then(() => {
					staticEntry !== null
						? fs__default.copy(staticEntry, `${output}/${config.vanilla.static}`)
						: new Promise(resolve => resolve("no static directory"));
				});

				copyStaticFiles.then(() => {
					observer.next({ config, message: "vanilla built" });
				});
			};

			chokidar.watch(entry, { ignoreInitial: true }).on("all", copyFiles);
			if (staticEntry !== null) chokidar.watch(staticEntry, { ignoreInitial: true }).on("all", copyFiles);
		} else {
			observer.complete();
		}
	}).pipe(
		operators.tap(({ message }) => console.log(`${message}\n`)),
		operators.map(({ config, message }) => config)
	);

var buildCompile = ({ config, watch }) =>
	rxjs.Observable.create(observer => {
		let webpackConfigPr;

		if (config.compile.altWebpackConfig) {
			const altWebpackConfigPath = path.resolve(process.cwd(), config.compile.altWebpackConfig);
			const altWebpackConfig = Promise.resolve().then(function () { return _interopNamespace(require(altWebpackConfigPath)); });
			webpackConfigPr = altWebpackConfig.then(({ default: defaultExport, named }) => {
				return defaultExport({
					entry: config.compile.entry,
					output: config.output,
					extension: config.extension,
					qext: config.compile.qext,
					static: config.compile.static,
				})
			});
		} else {
			webpackConfigPr = new Promise(res => {
				res({
					entry: [config.compile.entry],
					output: {
						path: path.resolve(process.cwd(), `${config.output}/${config.extension}`),
						filename: `${config.extension}.js`,
					},
					mode: "production",
					module: {
						rules: [
							{
								test: /\.js$/,
								exclude: /node_modules/,
								loader: "babel-loader",
								options: {
									presets: ["@babel/preset-env"],
									plugins: ["@babel/plugin-proposal-object-rest-spread"],
								},
							},
							{ test: /\.html$/, loader: "html-loader" },
							{ test: /\.css$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }] },
						],
					},
					plugins: [
						new CopyWebpackPlugin([
							{
								from: path.resolve(process.cwd(), config.compile.qext),
								to: path.resolve(process.cwd(), `${config.output}/${config.extension}/${config.extension}.qext`),
							},
							...(config.compile.static
								? [
										{
											from: path.resolve(process.cwd(), config.compile.static),
											to: path.resolve(process.cwd(), `${config.output}/${config.extension}/static`),
										},
								  ]
								: []),
						]),
					],
				});
			});
		}

		webpackConfigPr.then(webpackConfig => {
			const compiler = webpack(webpackConfig);

			if (watch) {
				compiler.watch({}, (err, stats) => {
					if (config.compile.webpackComments !== false)
						console.log("[webpack:build]", stats.toString({ colors: true }), "\n");

					observer.next({ config, message: "built" });
					if (err !== null) observer.error(err);
				});
			} else {
				compiler.run((err, stats) => {
					if (config.compile.webpackComments !== false)
						console.log("[webpack:build]", stats.toString({ colors: true }), "\n");

					if (err !== null) observer.error(err);

					observer.next({ config, message: "built" });
					observer.complete();
				});
			}
		});
	}).pipe(
		operators.tap(({ message }) => console.log(`${message}\n`)),
		operators.map(({ config }) => config)
	);

var zip = config =>
	rxjs.Observable.create(observer => {
		const outputDir = path.resolve(process.cwd(), config.output);
		const inputDir = `${outputDir}/${config.extension}`;

		zipdir(inputDir, { saveTo: `${outputDir}/${config.extension}.zip` }, (err, buffer) => {
			if (err !== null) observer.error(err);

			observer.next(config);
			observer.complete();
		});
	});

var deployToServer = config =>
	rxjs.Observable.create(observer => {
		const { serverDeploy, session } = config;
		const { isSecure, hdrAuthUser, hdrAuthHeaderName, allowSelfSignedSignature, host, port } = serverDeploy;

		const http = isSecure ? httpSecure : httpInsecure;

		const headers = session
			? { "x-qlik-xrfkey": "123456789abcdefg", "content-type": "application/zip", Cookie: `X-Qlik-Session=${session}` }
			: hdrAuthUser
			? {
					"x-qlik-xrfkey": "123456789abcdefg",
					"content-type": "application/zip",
					[hdrAuthHeaderName ? hdrAuthHeaderName : "hdr-usr"]: hdrAuthUser,
			  }
			: { "x-qlik-xrfkey": "123456789abcdefg", "content-type": "application/zip" };

		const options = {
			rejectUnauthorized: allowSelfSignedSignature ? false : true,
			host: host,
			port: port ? port : null,
			headers,
		};

		observer.next({ config, options, http });
	}).pipe(
		operators.switchMap(({ config, options, http }) =>
			rxjs.Observable.create(observer => {
				const { extension, serverDeploy } = config;
				const prefix = serverDeploy.prefix ? `/${serverDeploy.prefix}` : "";

				const request = http.request(
					{ ...options, method: "DELETE", path: `${prefix}/qrs/extension/name/${extension}?xrfkey=123456789abcdefg` },
					res => {
						let chunks = [];

						res
							.on("data", chunk => chunks.push(chunk))
							.on("end", () => {
								const { statusCode, statusMessage } = res;
								if (statusCode === 403) {
									observer.error({
										message: `${statusCode}: ${statusMessage}`,
										//  authenticate: true, config
									});
								} else if (statusCode === 400) {
									observer.next({ message: "not found", config, options, http });
									observer.complete();
								} else if (statusCode >= 200 && res.statusCode < 300) {
									observer.next({ message: "old extension deleted", config, options, http });
									observer.complete();
								} else {
									observer.error({ config, message: `${statusCode}: ${statusMessage}` });
								}
							})
							.on("error", err => {
								observer.error(err);
							});
					}
				);
				request.end();
			})
		),
		operators.tap(({ message }) => console.log(`${message}\n`)),
		operators.switchMap(({ config, options, http }) =>
			rxjs.Observable.create(observer => {
				const { extension, output, serverDeploy } = config;
				const prefix = serverDeploy.prefix ? `/${serverDeploy.prefix}` : "";
				const extensionPath = path.resolve(process.cwd(), `${output}/${extension}.zip`);

				fs__default.readFile(extensionPath).then(data => {
					const request = http.request(
						{ ...options, method: "POST", path: `${prefix}/qrs/extension/upload?xrfkey=123456789abcdefg` },
						res => {
							let chunks = [];

							res
								.on("data", chunk => chunks.push(chunk))
								.on("end", () => {
									const { statusCode, statusMessage } = res;
									if (statusCode === 403 || statusCode === 302) {
										observer.error({ authenticate: true });
									} else if (statusCode >= 200 && statusCode < 300) {
										observer.next({ config, message: "updated" });
										observer.complete();
									} else {
										observer.error({ config, message: `${statusCode}: ${statusMessage}` });
									}
								})
								.on("error", err => {
									observer.error(err);
								});
						}
					);

					request.write(data);
					request.end();
				});
			})
		),
		operators.tap(({ message }) => console.log(`${message}\n`)),
		operators.map(({ config }) => config)
	);

var deployToDesktop = config =>
	rxjs.Observable.create(observer => {
		const { desktopDeploy, extension, output } = config;
		const { destination } = desktopDeploy;
		const emptyDestination = fs__default.emptyDir(`${destination}/${extension}`);

		const copyDistribution = emptyDestination.then(() =>
			fs__default.copy(`${output}/${extension}`, `${destination}/${extension}`)
		);

		copyDistribution
			.then(() => {
				observer.next(`${extension} copied`);
				observer.complete();
			})
			.catch(observer.error);
	});

program
	.option("-w, --watch", "Watch")
	.option("-d, --deploy", "Deploy")
	.parse(process.argv);

/* Get Config */
const configFile = "./qext.config.json";

/** Validate Qext Config File */
const validateQextConfig$ = validateQextConfig(configFile).pipe(operators.share(1));

/** Authentication */
const authenticated$ = validateQextConfig$.pipe(
	operators.mergeMap(config =>
		rxjs.iif(
			/** if deploying with windowsAuth */
			() => delve(config, "serverDeploy.windowsAuth", false) && program.deploy,

			/** Authenticate */
			authenticate(config),

			/** else, skip authentication */
			rxjs.of(config)
		)
	),
	operators.share(1)
);

/** Remove Dist folder */
const removeDist$ = authenticated$.pipe(operators.switchMap(config => rxjs.from(fs.remove(config.output)).pipe(operators.mapTo(config))));

const build$ = removeDist$.pipe(
	operators.switchMap(config => {
		if (config.vanilla) return buildVanilla({ config, watch: program.watch })
		else if (config.compile) return buildCompile({ config, watch: program.watch })
	})
);

/** Zip */
const zip$ = build$.pipe(operators.switchMap(zip));

/** Deploy */
const deploy$ = zip$.pipe(
	operators.switchMap(config => {
		if (config.serverDeploy && program.deploy) return deployToServer(config)
		else if (config.desktopDeploy && program.deploy) return deployToDesktop(config)
		else return rxjs.of(config)
	})
);

deploy$.subscribe(() => {}, console.error);

process.on("SIGINT", () => {
	console.info(`\nqExt Ended`);
	process.exit();
});
