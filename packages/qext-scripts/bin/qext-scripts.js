#!/usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ansi-colors/index.js":
/*!*******************************************!*\
  !*** ./node_modules/ansi-colors/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst colors = { enabled: true, visible: true, styles: {}, keys: {} };\n\nif ('FORCE_COLOR' in process.env) {\n  colors.enabled = process.env.FORCE_COLOR !== '0';\n}\n\nconst ansi = style => {\n  style.open = `\\u001b[${style.codes[0]}m`;\n  style.close = `\\u001b[${style.codes[1]}m`;\n  style.regex = new RegExp(`\\\\u001b\\\\[${style.codes[1]}m`, 'g');\n  return style;\n};\n\nconst wrap = (style, str, nl) => {\n  let { open, close, regex } = style;\n  str = open + (str.includes(close) ? str.replace(regex, close + open) : str) + close;\n  // see https://github.com/chalk/chalk/pull/92, thanks to the\n  // chalk contributors for this fix. However, we've confirmed that\n  // this issue is also present in Windows terminals\n  return nl ? str.replace(/\\r?\\n/g, `${close}$&${open}`) : str;\n};\n\nconst style = (input, stack) => {\n  if (input === '' || input == null) return '';\n  if (colors.enabled === false) return input;\n  if (colors.visible === false) return '';\n  let str = '' + input;\n  let nl = str.includes('\\n');\n  let n = stack.length;\n  while (n-- > 0) str = wrap(colors.styles[stack[n]], str, nl);\n  return str;\n};\n\nconst define = (name, codes, type) => {\n  colors.styles[name] = ansi({ name, codes });\n  let t = colors.keys[type] || (colors.keys[type] = []);\n  t.push(name);\n\n  Reflect.defineProperty(colors, name, {\n    get() {\n      let color = input => style(input, color.stack);\n      Reflect.setPrototypeOf(color, colors);\n      color.stack = this.stack ? this.stack.concat(name) : [name];\n      return color;\n    }\n  });\n};\n\ndefine('reset', [0, 0], 'modifier');\ndefine('bold', [1, 22], 'modifier');\ndefine('dim', [2, 22], 'modifier');\ndefine('italic', [3, 23], 'modifier');\ndefine('underline', [4, 24], 'modifier');\ndefine('inverse', [7, 27], 'modifier');\ndefine('hidden', [8, 28], 'modifier');\ndefine('strikethrough', [9, 29], 'modifier');\n\ndefine('black', [30, 39], 'color');\ndefine('red', [31, 39], 'color');\ndefine('green', [32, 39], 'color');\ndefine('yellow', [33, 39], 'color');\ndefine('blue', [34, 39], 'color');\ndefine('magenta', [35, 39], 'color');\ndefine('cyan', [36, 39], 'color');\ndefine('white', [37, 39], 'color');\ndefine('gray', [90, 39], 'color');\ndefine('grey', [90, 39], 'color');\n\ndefine('bgBlack', [40, 49], 'bg');\ndefine('bgRed', [41, 49], 'bg');\ndefine('bgGreen', [42, 49], 'bg');\ndefine('bgYellow', [43, 49], 'bg');\ndefine('bgBlue', [44, 49], 'bg');\ndefine('bgMagenta', [45, 49], 'bg');\ndefine('bgCyan', [46, 49], 'bg');\ndefine('bgWhite', [47, 49], 'bg');\n\ndefine('blackBright', [90, 39], 'bright');\ndefine('redBright', [91, 39], 'bright');\ndefine('greenBright', [92, 39], 'bright');\ndefine('yellowBright', [93, 39], 'bright');\ndefine('blueBright', [94, 39], 'bright');\ndefine('magentaBright', [95, 39], 'bright');\ndefine('cyanBright', [96, 39], 'bright');\ndefine('whiteBright', [97, 39], 'bright');\n\ndefine('bgBlackBright', [100, 49], 'bgBright');\ndefine('bgRedBright', [101, 49], 'bgBright');\ndefine('bgGreenBright', [102, 49], 'bgBright');\ndefine('bgYellowBright', [103, 49], 'bgBright');\ndefine('bgBlueBright', [104, 49], 'bgBright');\ndefine('bgMagentaBright', [105, 49], 'bgBright');\ndefine('bgCyanBright', [106, 49], 'bgBright');\ndefine('bgWhiteBright', [107, 49], 'bgBright');\n\n/* eslint-disable no-control-regex */\n// this is a modified, optimized version of\n// https://github.com/chalk/ansi-regex (MIT License)\nconst re = colors.ansiRegex = /[\\u001b\\u009b][[\\]#;?()]*(?:(?:(?:[^\\W_]*;?[^\\W_]*)\\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;\n\ncolors.hasColor = colors.hasAnsi = str => {\n  re.lastIndex = 0;\n  return !!str && typeof str === 'string' && re.test(str);\n};\n\ncolors.unstyle = str => {\n  re.lastIndex = 0;\n  return typeof str === 'string' ? str.replace(re, '') : str;\n};\n\ncolors.none = colors.clear = colors.noop = str => str; // no-op, for programmatic usage\ncolors.stripColor = colors.unstyle;\ncolors.symbols = __webpack_require__(/*! ./symbols */ \"./node_modules/ansi-colors/symbols.js\");\ncolors.define = define;\nmodule.exports = colors;\n\n\n//# sourceURL=webpack:///./node_modules/ansi-colors/index.js?");

/***/ }),

/***/ "./node_modules/ansi-colors/symbols.js":
/*!*********************************************!*\
  !*** ./node_modules/ansi-colors/symbols.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst isWindows = process.platform === 'win32';\nconst isLinux = process.platform === 'linux';\n\nconst windows = {\n  bullet: '•',\n  check: '√',\n  cross: '×',\n  ellipsis: '...',\n  heart: '❤',\n  info: 'i',\n  line: '─',\n  middot: '·',\n  minus: '－',\n  plus: '＋',\n  question: '?',\n  questionSmall: '﹖',\n  pointer: '>',\n  pointerSmall: '»',\n  warning: '‼'\n};\n\nconst other = {\n  ballotCross: '✘',\n  bullet: '•',\n  check: '✔',\n  cross: '✖',\n  ellipsis: '…',\n  heart: '❤',\n  info: 'ℹ',\n  line: '─',\n  middot: '·',\n  minus: '－',\n  plus: '＋',\n  question: '?',\n  questionFull: '？',\n  questionSmall: '﹖',\n  pointer: isLinux ? '▸' : '❯',\n  pointerSmall: isLinux ? '‣' : '›',\n  warning: '⚠'\n};\n\nmodule.exports = isWindows ? windows : other;\nReflect.defineProperty(module.exports, 'windows', { enumerable: false, value: windows });\nReflect.defineProperty(module.exports, 'other', { enumerable: false, value: other });\n\n\n//# sourceURL=webpack:///./node_modules/ansi-colors/symbols.js?");

/***/ }),

/***/ "./node_modules/array-union/index.js":
/*!*******************************************!*\
  !*** ./node_modules/array-union/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar arrayUniq = __webpack_require__(/*! array-uniq */ \"./node_modules/array-uniq/index.js\");\n\nmodule.exports = function () {\n\treturn arrayUniq([].concat.apply([], arguments));\n};\n\n\n//# sourceURL=webpack:///./node_modules/array-union/index.js?");

/***/ }),

/***/ "./node_modules/array-uniq/index.js":
/*!******************************************!*\
  !*** ./node_modules/array-uniq/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// there's 3 implementations written in increasing order of efficiency\n\n// 1 - no Set type is defined\nfunction uniqNoSet(arr) {\n\tvar ret = [];\n\n\tfor (var i = 0; i < arr.length; i++) {\n\t\tif (ret.indexOf(arr[i]) === -1) {\n\t\t\tret.push(arr[i]);\n\t\t}\n\t}\n\n\treturn ret;\n}\n\n// 2 - a simple Set type is defined\nfunction uniqSet(arr) {\n\tvar seen = new Set();\n\treturn arr.filter(function (el) {\n\t\tif (!seen.has(el)) {\n\t\t\tseen.add(el);\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\t});\n}\n\n// 3 - a standard Set type is defined and it has a forEach method\nfunction uniqSetWithForEach(arr) {\n\tvar ret = [];\n\n\t(new Set(arr)).forEach(function (el) {\n\t\tret.push(el);\n\t});\n\n\treturn ret;\n}\n\n// V8 currently has a broken implementation\n// https://github.com/joyent/node/issues/8449\nfunction doesForEachActuallyWork() {\n\tvar ret = false;\n\n\t(new Set([true])).forEach(function (el) {\n\t\tret = el;\n\t});\n\n\treturn ret === true;\n}\n\nif ('Set' in global) {\n\tif (typeof Set.prototype.forEach === 'function' && doesForEachActuallyWork()) {\n\t\tmodule.exports = uniqSetWithForEach;\n\t} else {\n\t\tmodule.exports = uniqSet;\n\t}\n} else {\n\tmodule.exports = uniqNoSet;\n}\n\n\n//# sourceURL=webpack:///./node_modules/array-uniq/index.js?");

/***/ }),

/***/ "./node_modules/copy-webpack-plugin/dist/cjs.js":
/*!******************************************************!*\
  !*** ./node_modules/copy-webpack-plugin/dist/cjs.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst plugin = __webpack_require__(/*! ./index */ \"./node_modules/copy-webpack-plugin/dist/index.js\");\n\nmodule.exports = plugin.default;\n\n//# sourceURL=webpack:///./node_modules/copy-webpack-plugin/dist/cjs.js?");

/***/ }),

/***/ "./node_modules/copy-webpack-plugin/dist/index.js":
/*!********************************************************!*\
  !*** ./node_modules/copy-webpack-plugin/dist/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _path = _interopRequireDefault(__webpack_require__(/*! path */ \"path\"));\n\nvar _webpackLog = _interopRequireDefault(__webpack_require__(/*! webpack-log */ \"./node_modules/webpack-log/src/index.js\"));\n\nvar _preProcessPattern = _interopRequireDefault(__webpack_require__(/*! ./preProcessPattern */ \"./node_modules/copy-webpack-plugin/dist/preProcessPattern.js\"));\n\nvar _processPattern = _interopRequireDefault(__webpack_require__(/*! ./processPattern */ \"./node_modules/copy-webpack-plugin/dist/processPattern.js\"));\n\nvar _postProcessPattern = _interopRequireDefault(__webpack_require__(/*! ./postProcessPattern */ \"./node_modules/copy-webpack-plugin/dist/postProcessPattern.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass CopyPlugin {\n  constructor(patterns = [], options = {}) {\n    if (!Array.isArray(patterns)) {\n      throw new Error('[copy-webpack-plugin] patterns must be an array');\n    }\n\n    this.patterns = patterns;\n    this.options = options;\n  }\n\n  apply(compiler) {\n    const fileDependencies = new Set();\n    const contextDependencies = new Set();\n    const written = {};\n    let context;\n\n    if (!this.options.context) {\n      ({\n        context\n      } = compiler.options);\n    } else if (!_path.default.isAbsolute(this.options.context)) {\n      context = _path.default.join(compiler.options.context, this.options.context);\n    } else {\n      ({\n        context\n      } = this.options);\n    }\n\n    const logger = (0, _webpackLog.default)({\n      name: 'copy-webpack-plugin',\n      level: this.options.logLevel || 'warn'\n    });\n    const plugin = {\n      name: 'CopyPlugin'\n    };\n    compiler.hooks.emit.tapAsync(plugin, (compilation, callback) => {\n      logger.debug('starting emit');\n      const globalRef = {\n        logger,\n        compilation,\n        written,\n        fileDependencies,\n        contextDependencies,\n        context,\n        inputFileSystem: compiler.inputFileSystem,\n        output: compiler.options.output.path,\n        ignore: this.options.ignore || [],\n        copyUnmodified: this.options.copyUnmodified,\n        concurrency: this.options.concurrency\n      };\n\n      if (globalRef.output === '/' && compiler.options.devServer && compiler.options.devServer.outputPath) {\n        globalRef.output = compiler.options.devServer.outputPath;\n      }\n\n      const {\n        patterns\n      } = this;\n      Promise.all(patterns.map(pattern => Promise.resolve().then(() => (0, _preProcessPattern.default)(globalRef, pattern)) // Every source (from) is assumed to exist here\n      // eslint-disable-next-line no-shadow\n      .then(pattern => (0, _processPattern.default)(globalRef, pattern).then(files => {\n        if (!files) {\n          return Promise.resolve();\n        }\n\n        return Promise.all(files.filter(Boolean).map(file => (0, _postProcessPattern.default)(globalRef, pattern, file)));\n      })))).catch(error => {\n        compilation.errors.push(error);\n      }).then(() => {\n        logger.debug('finishing emit');\n        callback();\n      });\n    });\n    compiler.hooks.afterEmit.tapAsync(plugin, (compilation, callback) => {\n      logger.debug('starting after-emit'); // Add file dependencies if they're not already tracked\n\n      for (const fileDependency of fileDependencies) {\n        if (compilation.fileDependencies.has(fileDependency)) {\n          logger.debug(`not adding '${fileDependency}' to change tracking, because it's already tracked`);\n        } else {\n          logger.debug(`adding '${fileDependency}' to change tracking`);\n          compilation.fileDependencies.add(fileDependency);\n        }\n      } // Add context dependencies if they're not already tracked\n\n\n      for (const contextDependency of contextDependencies) {\n        if (compilation.contextDependencies.has(contextDependency)) {\n          logger.debug(`not adding '${contextDependency}' to change tracking, because it's already tracked`);\n        } else {\n          logger.debug(`adding '${contextDependency}' to change tracking`);\n          compilation.contextDependencies.add(contextDependency);\n        }\n      }\n\n      logger.debug('finishing after-emit');\n      callback();\n    });\n  }\n\n}\n\nvar _default = CopyPlugin;\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/copy-webpack-plugin/dist/index.js?");

/***/ }),

/***/ "./node_modules/copy-webpack-plugin/dist/postProcessPattern.js":
/*!*********************************************************************!*\
  !*** ./node_modules/copy-webpack-plugin/dist/postProcessPattern.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = postProcessPattern;\n\nvar _path = _interopRequireDefault(__webpack_require__(/*! path */ \"path\"));\n\nvar _os = _interopRequireDefault(__webpack_require__(/*! os */ \"os\"));\n\nvar _crypto = _interopRequireDefault(__webpack_require__(/*! crypto */ \"crypto\"));\n\nvar _loaderUtils = _interopRequireDefault(__webpack_require__(/*! loader-utils */ \"loader-utils\"));\n\nvar _cacache = _interopRequireDefault(__webpack_require__(/*! cacache */ \"cacache\"));\n\nvar _serializeJavascript = _interopRequireDefault(__webpack_require__(/*! serialize-javascript */ \"serialize-javascript\"));\n\nvar _findCacheDir = _interopRequireDefault(__webpack_require__(/*! find-cache-dir */ \"find-cache-dir\"));\n\nvar _package = __webpack_require__(/*! ../package.json */ \"./node_modules/copy-webpack-plugin/package.json\");\n\nvar _promisify = __webpack_require__(/*! ./utils/promisify */ \"./node_modules/copy-webpack-plugin/dist/utils/promisify.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* eslint-disable no-param-reassign */\nfunction postProcessPattern(globalRef, pattern, file) {\n  const {\n    logger,\n    compilation,\n    fileDependencies,\n    written,\n    inputFileSystem,\n    copyUnmodified\n  } = globalRef;\n  logger.debug(`getting stats for '${file.absoluteFrom}' to write to assets`);\n  const getStats = pattern.stats ? Promise.resolve().then(() => pattern.stats) : (0, _promisify.stat)(inputFileSystem, file.absoluteFrom);\n  return getStats.then(stats => {\n    // We don't write empty directories\n    if (stats.isDirectory()) {\n      logger.debug(`skipping '${file.absoluteFrom}' because it is empty directory`);\n      return Promise.resolve();\n    } // If this came from a glob, add it to the file watchlist\n\n\n    if (pattern.fromType === 'glob') {\n      fileDependencies.add(file.absoluteFrom);\n    }\n\n    logger.debug(`reading '${file.absoluteFrom}' to write to assets`);\n    return (0, _promisify.readFile)(inputFileSystem, file.absoluteFrom).then(content => {\n      if (pattern.transform) {\n        logger.info(`transforming content for '${file.absoluteFrom}'`); // eslint-disable-next-line no-shadow\n\n        const transform = (content, absoluteFrom) => pattern.transform(content, absoluteFrom);\n\n        if (pattern.cache) {\n          if (!globalRef.cacheDir) {\n            globalRef.cacheDir = (0, _findCacheDir.default)({\n              name: 'copy-webpack-plugin'\n            }) || _os.default.tmpdir();\n          }\n\n          const cacheKey = pattern.cache.key ? pattern.cache.key : (0, _serializeJavascript.default)({\n            name: _package.name,\n            version: _package.version,\n            pattern,\n            hash: _crypto.default.createHash('md4').update(content).digest('hex')\n          });\n          return _cacache.default.get(globalRef.cacheDir, cacheKey).then(result => {\n            logger.debug(`getting cached transformation for '${file.absoluteFrom}'`);\n            return result.data;\n          }, () => Promise.resolve().then(() => transform(content, file.absoluteFrom)) // eslint-disable-next-line no-shadow\n          .then(content => {\n            logger.debug(`caching transformation for '${file.absoluteFrom}'`);\n            return _cacache.default.put(globalRef.cacheDir, cacheKey, content).then(() => content);\n          }));\n        }\n\n        content = transform(content, file.absoluteFrom);\n      }\n\n      return content;\n    }).then(content => {\n      if (pattern.toType === 'template') {\n        logger.info(`interpolating template '${file.webpackTo}' for '${file.relativeFrom}'`); // If it doesn't have an extension, remove it from the pattern\n        // ie. [name].[ext] or [name][ext] both become [name]\n\n        if (!_path.default.extname(file.relativeFrom)) {\n          file.webpackTo = file.webpackTo.replace(/\\.?\\[ext\\]/g, '');\n        }\n\n        file.webpackTo = _loaderUtils.default.interpolateName({\n          resourcePath: file.absoluteFrom\n        }, file.webpackTo, {\n          content,\n          regExp: file.webpackToRegExp,\n          context: pattern.context\n        }); // Bug in `loader-utils`, package convert `\\\\` to `/`, need fix in loader-utils\n\n        file.webpackTo = _path.default.normalize(file.webpackTo);\n      }\n\n      return content;\n    }).then(content => {\n      if (pattern.transformPath) {\n        logger.info(`transforming path '${file.webpackTo}' for '${file.absoluteFrom}'`);\n        return Promise.resolve(pattern.transformPath(file.webpackTo, file.absoluteFrom)).then(newPath => {\n          // Developers can use invalid slashes we should fix it\n          file.webpackTo = _path.default.normalize(newPath);\n        }).then(() => content);\n      }\n\n      return content;\n    }).then(content => {\n      const hash = _loaderUtils.default.getHashDigest(content);\n\n      if (!copyUnmodified && written[file.webpackTo] && written[file.webpackTo][file.absoluteFrom] && written[file.webpackTo][file.absoluteFrom] === hash) {\n        logger.info(`skipping '${file.webpackTo}', because content hasn't changed`);\n        return;\n      }\n\n      logger.debug(`adding '${file.webpackTo}' for tracking content changes`);\n\n      if (!written[file.webpackTo]) {\n        written[file.webpackTo] = {};\n      }\n\n      written[file.webpackTo][file.absoluteFrom] = hash;\n\n      if (compilation.assets[file.webpackTo] && !file.force) {\n        logger.info(`skipping '${file.webpackTo}', because it already exists`);\n        return;\n      }\n\n      logger.info(`writing '${file.webpackTo}' to compilation assets from '${file.absoluteFrom}'`);\n      compilation.assets[file.webpackTo] = {\n        size() {\n          return stats.size;\n        },\n\n        source() {\n          return content;\n        }\n\n      };\n    });\n  });\n}\n\n//# sourceURL=webpack:///./node_modules/copy-webpack-plugin/dist/postProcessPattern.js?");

/***/ }),

/***/ "./node_modules/copy-webpack-plugin/dist/preProcessPattern.js":
/*!********************************************************************!*\
  !*** ./node_modules/copy-webpack-plugin/dist/preProcessPattern.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = preProcessPattern;\n\nvar _path = _interopRequireDefault(__webpack_require__(/*! path */ \"path\"));\n\nvar _isGlob = _interopRequireDefault(__webpack_require__(/*! is-glob */ \"is-glob\"));\n\nvar _globParent = _interopRequireDefault(__webpack_require__(/*! glob-parent */ \"glob-parent\"));\n\nvar _normalize = _interopRequireDefault(__webpack_require__(/*! ./utils/normalize */ \"./node_modules/copy-webpack-plugin/dist/utils/normalize.js\"));\n\nvar _isTemplateLike = _interopRequireDefault(__webpack_require__(/*! ./utils/isTemplateLike */ \"./node_modules/copy-webpack-plugin/dist/utils/isTemplateLike.js\"));\n\nvar _isObject = _interopRequireDefault(__webpack_require__(/*! ./utils/isObject */ \"./node_modules/copy-webpack-plugin/dist/utils/isObject.js\"));\n\nvar _promisify = __webpack_require__(/*! ./utils/promisify */ \"./node_modules/copy-webpack-plugin/dist/utils/promisify.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* eslint-disable no-param-reassign */\nfunction preProcessPattern(globalRef, pattern) {\n  const {\n    logger,\n    context,\n    inputFileSystem,\n    fileDependencies,\n    contextDependencies,\n    compilation\n  } = globalRef;\n  pattern = typeof pattern === 'string' ? {\n    from: pattern\n  } : Object.assign({}, pattern);\n\n  if (pattern.from === '') {\n    const message = 'path \"from\" cannot be empty string';\n    logger.error(message);\n    compilation.errors.push(new Error(message));\n  }\n\n  pattern.to = pattern.to || '';\n  pattern.context = pattern.context || context;\n\n  if (!_path.default.isAbsolute(pattern.context)) {\n    pattern.context = _path.default.join(context, pattern.context);\n  }\n\n  const isFromGlobPatten = (0, _isObject.default)(pattern.from) && pattern.from.glob; // Todo remove this in next major\n\n  const isToDirectory = _path.default.extname(pattern.to) === '' || pattern.to.slice(-1) === _path.default.sep; // Normalize paths\n\n\n  pattern.from = isFromGlobPatten ? pattern.from : _path.default.normalize(pattern.from);\n  pattern.context = _path.default.normalize(pattern.context);\n  pattern.to = _path.default.normalize(pattern.to);\n  pattern.ignore = globalRef.ignore.concat(pattern.ignore || []);\n  logger.debug(`processing from: '${pattern.from}' to: '${pattern.to}'`);\n\n  switch (true) {\n    // if toType already exists\n    case !!pattern.toType:\n      break;\n\n    case (0, _isTemplateLike.default)(pattern.to):\n      pattern.toType = 'template';\n      break;\n\n    case isToDirectory:\n      pattern.toType = 'dir';\n      break;\n\n    default:\n      pattern.toType = 'file';\n  } // If we know it's a glob, then bail early\n\n\n  if (isFromGlobPatten) {\n    logger.debug(`determined '${pattern.absoluteFrom}' is a glob`);\n    pattern.fromType = 'glob';\n    const globOptions = Object.assign({}, pattern.from);\n    delete globOptions.glob;\n    pattern.glob = (0, _normalize.default)(pattern.context, pattern.from.glob);\n    pattern.globOptions = globOptions;\n    pattern.absoluteFrom = _path.default.resolve(pattern.context, pattern.from.glob);\n    return Promise.resolve(pattern);\n  }\n\n  if (_path.default.isAbsolute(pattern.from)) {\n    pattern.absoluteFrom = pattern.from;\n  } else {\n    pattern.absoluteFrom = _path.default.resolve(pattern.context, pattern.from);\n  }\n\n  logger.debug(`determined '${pattern.from}' to be read from '${pattern.absoluteFrom}'`);\n\n  const noStatsHandler = () => {\n    // If from doesn't appear to be a glob, then log a warning\n    if ((0, _isGlob.default)(pattern.from) || pattern.from.indexOf('*') !== -1) {\n      logger.debug(`determined '${pattern.absoluteFrom}' is a glob`);\n      pattern.fromType = 'glob';\n      pattern.glob = (0, _normalize.default)(pattern.context, pattern.from); // We need to add context directory as dependencies to avoid problems when new files added in directories\n      // when we already in watch mode and this directories are not in context dependencies\n      // `glob-parent` always return `/` we need normalize path\n\n      contextDependencies.add(_path.default.normalize((0, _globParent.default)(pattern.absoluteFrom)));\n    } else {\n      const newWarning = new Error(`unable to locate '${pattern.from}' at '${pattern.absoluteFrom}'`);\n      const hasWarning = compilation.warnings.some( // eslint-disable-next-line no-shadow\n      warning => warning.message === newWarning.message); // Only display the same message once\n\n      if (!hasWarning) {\n        logger.warn(newWarning.message);\n        compilation.warnings.push(newWarning);\n      }\n\n      pattern.fromType = 'nonexistent';\n    }\n  };\n\n  logger.debug(`getting stats for '${pattern.absoluteFrom}' to determinate 'fromType'`);\n  return (0, _promisify.stat)(inputFileSystem, pattern.absoluteFrom).catch(() => noStatsHandler()).then(stats => {\n    if (!stats) {\n      noStatsHandler();\n      return pattern;\n    }\n\n    if (stats.isDirectory()) {\n      logger.debug(`determined '${pattern.absoluteFrom}' is a directory`);\n      contextDependencies.add(pattern.absoluteFrom);\n      pattern.fromType = 'dir';\n      pattern.context = pattern.absoluteFrom;\n      pattern.glob = (0, _normalize.default)(pattern.absoluteFrom, '**/*');\n      pattern.absoluteFrom = _path.default.join(pattern.absoluteFrom, '**/*');\n      pattern.globOptions = {\n        dot: true\n      };\n    } else if (stats.isFile()) {\n      logger.debug(`determined '${pattern.absoluteFrom}' is a file`);\n      fileDependencies.add(pattern.absoluteFrom);\n      pattern.stats = stats;\n      pattern.fromType = 'file';\n      pattern.context = _path.default.dirname(pattern.absoluteFrom);\n      pattern.glob = (0, _normalize.default)(pattern.absoluteFrom);\n      pattern.globOptions = {\n        dot: true\n      };\n    } else if (!pattern.fromType) {\n      logger.warn(`unrecognized file type for ${pattern.from}`);\n    }\n\n    return pattern;\n  });\n}\n\n//# sourceURL=webpack:///./node_modules/copy-webpack-plugin/dist/preProcessPattern.js?");

/***/ }),

/***/ "./node_modules/copy-webpack-plugin/dist/processPattern.js":
/*!*****************************************************************!*\
  !*** ./node_modules/copy-webpack-plugin/dist/processPattern.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = processPattern;\n\nvar _path = _interopRequireDefault(__webpack_require__(/*! path */ \"path\"));\n\nvar _globby = _interopRequireDefault(__webpack_require__(/*! globby */ \"./node_modules/globby/index.js\"));\n\nvar _pLimit = _interopRequireDefault(__webpack_require__(/*! p-limit */ \"p-limit\"));\n\nvar _minimatch = _interopRequireDefault(__webpack_require__(/*! minimatch */ \"minimatch\"));\n\nvar _isObject = _interopRequireDefault(__webpack_require__(/*! ./utils/isObject */ \"./node_modules/copy-webpack-plugin/dist/utils/isObject.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction processPattern(globalRef, pattern) {\n  const {\n    logger,\n    output,\n    concurrency,\n    compilation\n  } = globalRef;\n  const globOptions = Object.assign({\n    cwd: pattern.context,\n    follow: true\n  }, pattern.globOptions || {});\n\n  if (pattern.fromType === 'nonexistent') {\n    return Promise.resolve();\n  }\n\n  const limit = (0, _pLimit.default)(concurrency || 100);\n  logger.info(`begin globbing '${pattern.glob}' with a context of '${pattern.context}'`);\n  return (0, _globby.default)(pattern.glob, globOptions).then(paths => Promise.all(paths.map(from => limit(() => {\n    const file = {\n      force: pattern.force,\n      absoluteFrom: _path.default.resolve(pattern.context, from)\n    };\n    file.relativeFrom = _path.default.relative(pattern.context, file.absoluteFrom);\n\n    if (pattern.flatten) {\n      file.relativeFrom = _path.default.basename(file.relativeFrom);\n    }\n\n    logger.debug(`found ${from}`); // Check the ignore list\n\n    let il = pattern.ignore.length; // eslint-disable-next-line no-plusplus\n\n    while (il--) {\n      const ignoreGlob = pattern.ignore[il];\n      let globParams = {\n        dot: true,\n        matchBase: true\n      };\n      let glob;\n\n      if (typeof ignoreGlob === 'string') {\n        glob = ignoreGlob;\n      } else if ((0, _isObject.default)(ignoreGlob)) {\n        glob = ignoreGlob.glob || '';\n        const ignoreGlobParams = Object.assign({}, ignoreGlob);\n        delete ignoreGlobParams.glob; // Overwrite minimatch defaults\n\n        globParams = Object.assign(globParams, ignoreGlobParams);\n      } else {\n        glob = '';\n      }\n\n      logger.debug(`testing ${glob} against ${file.relativeFrom}`);\n\n      if ((0, _minimatch.default)(file.relativeFrom, glob, globParams)) {\n        logger.info(`ignoring '${file.relativeFrom}', because it matches the ignore glob '${glob}'`);\n        return Promise.resolve();\n      }\n\n      logger.debug(`${glob} doesn't match ${file.relativeFrom}`);\n    } // Change the to path to be relative for webpack\n\n\n    if (pattern.toType === 'dir') {\n      file.webpackTo = _path.default.join(pattern.to, file.relativeFrom);\n    } else if (pattern.toType === 'file') {\n      file.webpackTo = pattern.to || file.relativeFrom;\n    } else if (pattern.toType === 'template') {\n      file.webpackTo = pattern.to;\n      file.webpackToRegExp = pattern.test;\n    }\n\n    if (_path.default.isAbsolute(file.webpackTo)) {\n      if (output === '/') {\n        const message = 'using older versions of webpack-dev-server, devServer.outputPath must be defined to write to absolute paths';\n        logger.error(message);\n        compilation.errors.push(new Error(message));\n      }\n\n      file.webpackTo = _path.default.relative(output, file.webpackTo);\n    }\n\n    logger.info(`determined that '${from}' should write to '${file.webpackTo}'`);\n    return file;\n  }))));\n}\n\n//# sourceURL=webpack:///./node_modules/copy-webpack-plugin/dist/processPattern.js?");

/***/ }),

/***/ "./node_modules/copy-webpack-plugin/dist/utils/isObject.js":
/*!*****************************************************************!*\
  !*** ./node_modules/copy-webpack-plugin/dist/utils/isObject.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _default = val => Object.prototype.toString.call(val) === '[object Object]';\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/copy-webpack-plugin/dist/utils/isObject.js?");

/***/ }),

/***/ "./node_modules/copy-webpack-plugin/dist/utils/isTemplateLike.js":
/*!***********************************************************************!*\
  !*** ./node_modules/copy-webpack-plugin/dist/utils/isTemplateLike.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _default = pattern => /(\\[ext\\])|(\\[name\\])|(\\[path\\])|(\\[folder\\])|(\\[emoji(?::(\\d+))?\\])|(\\[(?:([^:\\]]+):)?(?:hash|contenthash)(?::([a-z]+\\d*))?(?::(\\d+))?\\])|(\\[\\d+\\])/.test(pattern);\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./node_modules/copy-webpack-plugin/dist/utils/isTemplateLike.js?");

/***/ }),

/***/ "./node_modules/copy-webpack-plugin/dist/utils/normalize.js":
/*!******************************************************************!*\
  !*** ./node_modules/copy-webpack-plugin/dist/utils/normalize.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = normalize;\n\nvar _path = _interopRequireDefault(__webpack_require__(/*! path */ \"path\"));\n\nvar _normalizePath = _interopRequireDefault(__webpack_require__(/*! normalize-path */ \"normalize-path\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction escape(context, from) {\n  if (from && _path.default.isAbsolute(from)) {\n    return from;\n  } // Ensure context is escaped before globbing\n  // Handles special characters in paths\n\n\n  const absoluteContext = _path.default.resolve(context) // Need refactor\n  // eslint-disable-next-line no-useless-escape\n  .replace(/[\\*|\\?|\\!|\\(|\\)|\\[|\\]|\\{|\\}]/g, substring => `[${substring}]`);\n\n  if (!from) {\n    return absoluteContext;\n  } // Cannot use path.join/resolve as it \"fixes\" the path separators\n\n\n  if (absoluteContext.endsWith('/')) {\n    return `${absoluteContext}${from}`;\n  }\n\n  return `${absoluteContext}/${from}`;\n}\n\nfunction normalize(context, from) {\n  return (0, _normalizePath.default)(escape(context, from));\n}\n\n//# sourceURL=webpack:///./node_modules/copy-webpack-plugin/dist/utils/normalize.js?");

/***/ }),

/***/ "./node_modules/copy-webpack-plugin/dist/utils/promisify.js":
/*!******************************************************************!*\
  !*** ./node_modules/copy-webpack-plugin/dist/utils/promisify.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.readFile = exports.stat = void 0;\n\nconst stat = (inputFileSystem, path) => new Promise((resolve, reject) => {\n  inputFileSystem.stat(path, (err, stats) => {\n    if (err) {\n      reject(err);\n    }\n\n    resolve(stats);\n  });\n});\n\nexports.stat = stat;\n\nconst readFile = (inputFileSystem, path) => new Promise((resolve, reject) => {\n  inputFileSystem.readFile(path, (err, stats) => {\n    if (err) {\n      reject(err);\n    }\n\n    resolve(stats);\n  });\n});\n\nexports.readFile = readFile;\n\n//# sourceURL=webpack:///./node_modules/copy-webpack-plugin/dist/utils/promisify.js?");

/***/ }),

/***/ "./node_modules/copy-webpack-plugin/package.json":
/*!*******************************************************!*\
  !*** ./node_modules/copy-webpack-plugin/package.json ***!
  \*******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, babel, bugs, bundleDependencies, commitlint, dependencies, deprecated, description, devDependencies, engines, files, homepage, husky, keywords, license, lint-staged, main, name, peerDependencies, prettier, repository, scripts, version, default */
/***/ (function(module) {

eval("module.exports = {\"_from\":\"copy-webpack-plugin\",\"_id\":\"copy-webpack-plugin@5.0.3\",\"_inBundle\":false,\"_integrity\":\"sha512-PlZRs9CUMnAVylZq+vg2Juew662jWtwOXOqH4lbQD9ZFhRG9R7tVStOgHt21CBGVq7k5yIJaz8TXDLSjV+Lj8Q==\",\"_location\":\"/copy-webpack-plugin\",\"_phantomChildren\":{\"is-extglob\":\"2.1.1\"},\"_requested\":{\"type\":\"tag\",\"registry\":true,\"raw\":\"copy-webpack-plugin\",\"name\":\"copy-webpack-plugin\",\"escapedName\":\"copy-webpack-plugin\",\"rawSpec\":\"\",\"saveSpec\":null,\"fetchSpec\":\"latest\"},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"https://registry.npmjs.org/copy-webpack-plugin/-/copy-webpack-plugin-5.0.3.tgz\",\"_shasum\":\"2179e3c8fd69f13afe74da338896f1f01a875b5c\",\"_spec\":\"copy-webpack-plugin\",\"_where\":\"/Users/johnbellizzi/Desktop/Internal Projects/qExt/Development/qext-alpha/packages/qext-scripts\",\"author\":{\"name\":\"Len Boyette\"},\"babel\":{\"presets\":[[\"@babel/preset-env\",{\"targets\":{\"node\":\"6.9.0\"}}]]},\"bugs\":{\"url\":\"https://github.com/webpack-contrib/copy-webpack-plugin/issues\"},\"bundleDependencies\":false,\"commitlint\":{\"extends\":[\"@commitlint/config-conventional\"]},\"dependencies\":{\"cacache\":\"^11.3.2\",\"find-cache-dir\":\"^2.1.0\",\"glob-parent\":\"^3.1.0\",\"globby\":\"^7.1.1\",\"is-glob\":\"^4.0.1\",\"loader-utils\":\"^1.2.3\",\"minimatch\":\"^3.0.4\",\"normalize-path\":\"^3.0.0\",\"p-limit\":\"^2.2.0\",\"schema-utils\":\"^1.0.0\",\"serialize-javascript\":\"^1.7.0\",\"webpack-log\":\"^2.0.0\"},\"deprecated\":false,\"description\":\"Copy files && directories with webpack\",\"devDependencies\":{\"@babel/cli\":\"^7.4.3\",\"@babel/core\":\"^7.4.3\",\"@babel/preset-env\":\"^7.4.3\",\"@commitlint/cli\":\"^7.5.2\",\"@commitlint/config-conventional\":\"^7.5.0\",\"@webpack-contrib/defaults\":\"^3.1.2\",\"@webpack-contrib/eslint-config-webpack\":\"^3.0.0\",\"babel-jest\":\"^24.7.1\",\"cross-env\":\"^5.2.0\",\"del\":\"^4.1.0\",\"del-cli\":\"^1.1.0\",\"enhanced-resolve\":\"^4.1.0\",\"eslint\":\"^5.16.0\",\"eslint-plugin-import\":\"^2.17.2\",\"eslint-plugin-prettier\":\"^3.0.1\",\"husky\":\"^1.3.1\",\"is-gzip\":\"^2.0.0\",\"jest\":\"^24.7.1\",\"lint-staged\":\"^8.1.5\",\"memory-fs\":\"^0.4.1\",\"mkdirp\":\"^0.5.1\",\"prettier\":\"^1.17.0\",\"standard-version\":\"^5.0.2\",\"webpack\":\"^4.30.0\"},\"engines\":{\"node\":\">= 6.9.0\"},\"files\":[\"dist\"],\"homepage\":\"https://github.com/webpack-contrib/copy-webpack-plugin\",\"husky\":{\"hooks\":{\"pre-commit\":\"lint-staged\",\"commit-msg\":\"commitlint -E HUSKY_GIT_PARAMS\"}},\"keywords\":[\"webpack\",\"plugin\",\"transfer\",\"move\",\"copy\"],\"license\":\"MIT\",\"lint-staged\":{\"*.js\":[\"eslint --fix\",\"git add\"]},\"main\":\"dist/cjs.js\",\"name\":\"copy-webpack-plugin\",\"peerDependencies\":{\"webpack\":\"^4.0.0\"},\"prettier\":{\"singleQuote\":true,\"trailingComma\":\"es5\",\"arrowParens\":\"always\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/webpack-contrib/copy-webpack-plugin.git\"},\"scripts\":{\"build\":\"cross-env NODE_ENV=production babel src -d dist --ignore 'src/**/*.test.js' --copy-files\",\"ci:coverage\":\"npm run test:coverage -- --runInBand\",\"ci:lint\":\"npm run lint && npm run security\",\"ci:lint:commits\":\"commitlint --from=origin/master --to=${CIRCLE_SHA1}\",\"ci:test\":\"npm run test:only -- --runInBand\",\"clean\":\"del-cli dist\",\"commitlint\":\"commitlint --from=master\",\"defaults\":\"webpack-defaults\",\"lint\":\"eslint --cache src test\",\"prebuild\":\"npm run clean\",\"prepare\":\"npm run build\",\"pretest\":\"npm run lint\",\"release\":\"standard-version\",\"security\":\"npm audit\",\"start\":\"npm run build -- -w\",\"test\":\"npm run test:only\",\"test:coverage\":\"jest --collectCoverageFrom='src/**/*.js' --coverage\",\"test:only\":\"jest\",\"test:watch\":\"jest --watch\"},\"version\":\"5.0.3\"};\n\n//# sourceURL=webpack:///./node_modules/copy-webpack-plugin/package.json?");

/***/ }),

/***/ "./node_modules/dir-glob/index.js":
/*!****************************************!*\
  !*** ./node_modules/dir-glob/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst path = __webpack_require__(/*! path */ \"path\");\nconst pathType = __webpack_require__(/*! path-type */ \"./node_modules/path-type/index.js\");\n\nconst getExtensions = extensions => extensions.length > 1 ? `{${extensions.join(',')}}` : extensions[0];\n\nconst getPath = (filepath, cwd) => {\n\tconst pth = filepath[0] === '!' ? filepath.slice(1) : filepath;\n\treturn path.isAbsolute(pth) ? pth : path.join(cwd, pth);\n};\n\nconst addExtensions = (file, extensions) => {\n\tif (path.extname(file)) {\n\t\treturn `**/${file}`;\n\t}\n\n\treturn `**/${file}.${getExtensions(extensions)}`;\n};\n\nconst getGlob = (dir, opts) => {\n\tif (opts.files && !Array.isArray(opts.files)) {\n\t\tthrow new TypeError(`Expected \\`files\\` to be of type \\`Array\\` but received type \\`${typeof opts.files}\\``);\n\t}\n\n\tif (opts.extensions && !Array.isArray(opts.extensions)) {\n\t\tthrow new TypeError(`Expected \\`extensions\\` to be of type \\`Array\\` but received type \\`${typeof opts.extensions}\\``);\n\t}\n\n\tif (opts.files && opts.extensions) {\n\t\treturn opts.files.map(x => path.join(dir, addExtensions(x, opts.extensions)));\n\t}\n\n\tif (opts.files) {\n\t\treturn opts.files.map(x => path.join(dir, `**/${x}`));\n\t}\n\n\tif (opts.extensions) {\n\t\treturn [path.join(dir, `**/*.${getExtensions(opts.extensions)}`)];\n\t}\n\n\treturn [path.join(dir, '**')];\n};\n\nmodule.exports = (input, opts) => {\n\topts = Object.assign({cwd: process.cwd()}, opts);\n\n\tif (typeof opts.cwd !== 'string') {\n\t\treturn Promise.reject(new TypeError(`Expected \\`cwd\\` to be of type \\`string\\` but received type \\`${typeof opts.cwd}\\``));\n\t}\n\n\treturn Promise.all([].concat(input).map(x => pathType.dir(getPath(x, opts.cwd))\n\t\t.then(isDir => isDir ? getGlob(x, opts) : x)))\n\t\t.then(globs => [].concat.apply([], globs));\n};\n\nmodule.exports.sync = (input, opts) => {\n\topts = Object.assign({cwd: process.cwd()}, opts);\n\n\tif (typeof opts.cwd !== 'string') {\n\t\tthrow new TypeError(`Expected \\`cwd\\` to be of type \\`string\\` but received type \\`${typeof opts.cwd}\\``);\n\t}\n\n\tconst globs = [].concat(input).map(x => pathType.dirSync(getPath(x, opts.cwd)) ? getGlob(x, opts) : x);\n\treturn [].concat.apply([], globs);\n};\n\n\n//# sourceURL=webpack:///./node_modules/dir-glob/index.js?");

/***/ }),

/***/ "./node_modules/disable-output-webpack-plugin/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/disable-output-webpack-plugin/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function DisableOutputWebpackPlugin() {}\n\nDisableOutputWebpackPlugin.prototype.apply = function(compiler) {\n  compiler.hooks.emit.tapAsync('DisableOutputWebpackPlugin', (compilation, callback) => {\n    Object.keys(compilation.assets).forEach(asset => delete compilation.assets[asset]);\n    callback();\n  });\n};\n\nmodule.exports = DisableOutputWebpackPlugin;\n\n\n\n//# sourceURL=webpack:///./node_modules/disable-output-webpack-plugin/index.js?");

/***/ }),

/***/ "./node_modules/glob/common.js":
/*!*************************************!*\
  !*** ./node_modules/glob/common.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports.alphasort = alphasort\nexports.alphasorti = alphasorti\nexports.setopts = setopts\nexports.ownProp = ownProp\nexports.makeAbs = makeAbs\nexports.finish = finish\nexports.mark = mark\nexports.isIgnored = isIgnored\nexports.childrenIgnored = childrenIgnored\n\nfunction ownProp (obj, field) {\n  return Object.prototype.hasOwnProperty.call(obj, field)\n}\n\nvar path = __webpack_require__(/*! path */ \"path\")\nvar minimatch = __webpack_require__(/*! minimatch */ \"minimatch\")\nvar isAbsolute = __webpack_require__(/*! path-is-absolute */ \"path-is-absolute\")\nvar Minimatch = minimatch.Minimatch\n\nfunction alphasorti (a, b) {\n  return a.toLowerCase().localeCompare(b.toLowerCase())\n}\n\nfunction alphasort (a, b) {\n  return a.localeCompare(b)\n}\n\nfunction setupIgnores (self, options) {\n  self.ignore = options.ignore || []\n\n  if (!Array.isArray(self.ignore))\n    self.ignore = [self.ignore]\n\n  if (self.ignore.length) {\n    self.ignore = self.ignore.map(ignoreMap)\n  }\n}\n\n// ignore patterns are always in dot:true mode.\nfunction ignoreMap (pattern) {\n  var gmatcher = null\n  if (pattern.slice(-3) === '/**') {\n    var gpattern = pattern.replace(/(\\/\\*\\*)+$/, '')\n    gmatcher = new Minimatch(gpattern, { dot: true })\n  }\n\n  return {\n    matcher: new Minimatch(pattern, { dot: true }),\n    gmatcher: gmatcher\n  }\n}\n\nfunction setopts (self, pattern, options) {\n  if (!options)\n    options = {}\n\n  // base-matching: just use globstar for that.\n  if (options.matchBase && -1 === pattern.indexOf(\"/\")) {\n    if (options.noglobstar) {\n      throw new Error(\"base matching requires globstar\")\n    }\n    pattern = \"**/\" + pattern\n  }\n\n  self.silent = !!options.silent\n  self.pattern = pattern\n  self.strict = options.strict !== false\n  self.realpath = !!options.realpath\n  self.realpathCache = options.realpathCache || Object.create(null)\n  self.follow = !!options.follow\n  self.dot = !!options.dot\n  self.mark = !!options.mark\n  self.nodir = !!options.nodir\n  if (self.nodir)\n    self.mark = true\n  self.sync = !!options.sync\n  self.nounique = !!options.nounique\n  self.nonull = !!options.nonull\n  self.nosort = !!options.nosort\n  self.nocase = !!options.nocase\n  self.stat = !!options.stat\n  self.noprocess = !!options.noprocess\n  self.absolute = !!options.absolute\n\n  self.maxLength = options.maxLength || Infinity\n  self.cache = options.cache || Object.create(null)\n  self.statCache = options.statCache || Object.create(null)\n  self.symlinks = options.symlinks || Object.create(null)\n\n  setupIgnores(self, options)\n\n  self.changedCwd = false\n  var cwd = process.cwd()\n  if (!ownProp(options, \"cwd\"))\n    self.cwd = cwd\n  else {\n    self.cwd = path.resolve(options.cwd)\n    self.changedCwd = self.cwd !== cwd\n  }\n\n  self.root = options.root || path.resolve(self.cwd, \"/\")\n  self.root = path.resolve(self.root)\n  if (process.platform === \"win32\")\n    self.root = self.root.replace(/\\\\/g, \"/\")\n\n  // TODO: is an absolute `cwd` supposed to be resolved against `root`?\n  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')\n  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)\n  if (process.platform === \"win32\")\n    self.cwdAbs = self.cwdAbs.replace(/\\\\/g, \"/\")\n  self.nomount = !!options.nomount\n\n  // disable comments and negation in Minimatch.\n  // Note that they are not supported in Glob itself anyway.\n  options.nonegate = true\n  options.nocomment = true\n\n  self.minimatch = new Minimatch(pattern, options)\n  self.options = self.minimatch.options\n}\n\nfunction finish (self) {\n  var nou = self.nounique\n  var all = nou ? [] : Object.create(null)\n\n  for (var i = 0, l = self.matches.length; i < l; i ++) {\n    var matches = self.matches[i]\n    if (!matches || Object.keys(matches).length === 0) {\n      if (self.nonull) {\n        // do like the shell, and spit out the literal glob\n        var literal = self.minimatch.globSet[i]\n        if (nou)\n          all.push(literal)\n        else\n          all[literal] = true\n      }\n    } else {\n      // had matches\n      var m = Object.keys(matches)\n      if (nou)\n        all.push.apply(all, m)\n      else\n        m.forEach(function (m) {\n          all[m] = true\n        })\n    }\n  }\n\n  if (!nou)\n    all = Object.keys(all)\n\n  if (!self.nosort)\n    all = all.sort(self.nocase ? alphasorti : alphasort)\n\n  // at *some* point we statted all of these\n  if (self.mark) {\n    for (var i = 0; i < all.length; i++) {\n      all[i] = self._mark(all[i])\n    }\n    if (self.nodir) {\n      all = all.filter(function (e) {\n        var notDir = !(/\\/$/.test(e))\n        var c = self.cache[e] || self.cache[makeAbs(self, e)]\n        if (notDir && c)\n          notDir = c !== 'DIR' && !Array.isArray(c)\n        return notDir\n      })\n    }\n  }\n\n  if (self.ignore.length)\n    all = all.filter(function(m) {\n      return !isIgnored(self, m)\n    })\n\n  self.found = all\n}\n\nfunction mark (self, p) {\n  var abs = makeAbs(self, p)\n  var c = self.cache[abs]\n  var m = p\n  if (c) {\n    var isDir = c === 'DIR' || Array.isArray(c)\n    var slash = p.slice(-1) === '/'\n\n    if (isDir && !slash)\n      m += '/'\n    else if (!isDir && slash)\n      m = m.slice(0, -1)\n\n    if (m !== p) {\n      var mabs = makeAbs(self, m)\n      self.statCache[mabs] = self.statCache[abs]\n      self.cache[mabs] = self.cache[abs]\n    }\n  }\n\n  return m\n}\n\n// lotta situps...\nfunction makeAbs (self, f) {\n  var abs = f\n  if (f.charAt(0) === '/') {\n    abs = path.join(self.root, f)\n  } else if (isAbsolute(f) || f === '') {\n    abs = f\n  } else if (self.changedCwd) {\n    abs = path.resolve(self.cwd, f)\n  } else {\n    abs = path.resolve(f)\n  }\n\n  if (process.platform === 'win32')\n    abs = abs.replace(/\\\\/g, '/')\n\n  return abs\n}\n\n\n// Return true, if pattern ends with globstar '**', for the accompanying parent directory.\n// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents\nfunction isIgnored (self, path) {\n  if (!self.ignore.length)\n    return false\n\n  return self.ignore.some(function(item) {\n    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))\n  })\n}\n\nfunction childrenIgnored (self, path) {\n  if (!self.ignore.length)\n    return false\n\n  return self.ignore.some(function(item) {\n    return !!(item.gmatcher && item.gmatcher.match(path))\n  })\n}\n\n\n//# sourceURL=webpack:///./node_modules/glob/common.js?");

/***/ }),

/***/ "./node_modules/glob/glob.js":
/*!***********************************!*\
  !*** ./node_modules/glob/glob.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Approach:\n//\n// 1. Get the minimatch set\n// 2. For each pattern in the set, PROCESS(pattern, false)\n// 3. Store matches per-set, then uniq them\n//\n// PROCESS(pattern, inGlobStar)\n// Get the first [n] items from pattern that are all strings\n// Join these together.  This is PREFIX.\n//   If there is no more remaining, then stat(PREFIX) and\n//   add to matches if it succeeds.  END.\n//\n// If inGlobStar and PREFIX is symlink and points to dir\n//   set ENTRIES = []\n// else readdir(PREFIX) as ENTRIES\n//   If fail, END\n//\n// with ENTRIES\n//   If pattern[n] is GLOBSTAR\n//     // handle the case where the globstar match is empty\n//     // by pruning it out, and testing the resulting pattern\n//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)\n//     // handle other cases.\n//     for ENTRY in ENTRIES (not dotfiles)\n//       // attach globstar + tail onto the entry\n//       // Mark that this entry is a globstar match\n//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)\n//\n//   else // not globstar\n//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)\n//       Test ENTRY against pattern[n]\n//       If fails, continue\n//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])\n//\n// Caveat:\n//   Cache all stats and readdirs results to minimize syscall.  Since all\n//   we ever care about is existence and directory-ness, we can just keep\n//   `true` for files, and [children,...] for directories, or `false` for\n//   things that don't exist.\n\nmodule.exports = glob\n\nvar fs = __webpack_require__(/*! fs */ \"fs\")\nvar rp = __webpack_require__(/*! fs.realpath */ \"fs.realpath\")\nvar minimatch = __webpack_require__(/*! minimatch */ \"minimatch\")\nvar Minimatch = minimatch.Minimatch\nvar inherits = __webpack_require__(/*! inherits */ \"inherits\")\nvar EE = __webpack_require__(/*! events */ \"events\").EventEmitter\nvar path = __webpack_require__(/*! path */ \"path\")\nvar assert = __webpack_require__(/*! assert */ \"assert\")\nvar isAbsolute = __webpack_require__(/*! path-is-absolute */ \"path-is-absolute\")\nvar globSync = __webpack_require__(/*! ./sync.js */ \"./node_modules/glob/sync.js\")\nvar common = __webpack_require__(/*! ./common.js */ \"./node_modules/glob/common.js\")\nvar alphasort = common.alphasort\nvar alphasorti = common.alphasorti\nvar setopts = common.setopts\nvar ownProp = common.ownProp\nvar inflight = __webpack_require__(/*! inflight */ \"inflight\")\nvar util = __webpack_require__(/*! util */ \"util\")\nvar childrenIgnored = common.childrenIgnored\nvar isIgnored = common.isIgnored\n\nvar once = __webpack_require__(/*! once */ \"once\")\n\nfunction glob (pattern, options, cb) {\n  if (typeof options === 'function') cb = options, options = {}\n  if (!options) options = {}\n\n  if (options.sync) {\n    if (cb)\n      throw new TypeError('callback provided to sync glob')\n    return globSync(pattern, options)\n  }\n\n  return new Glob(pattern, options, cb)\n}\n\nglob.sync = globSync\nvar GlobSync = glob.GlobSync = globSync.GlobSync\n\n// old api surface\nglob.glob = glob\n\nfunction extend (origin, add) {\n  if (add === null || typeof add !== 'object') {\n    return origin\n  }\n\n  var keys = Object.keys(add)\n  var i = keys.length\n  while (i--) {\n    origin[keys[i]] = add[keys[i]]\n  }\n  return origin\n}\n\nglob.hasMagic = function (pattern, options_) {\n  var options = extend({}, options_)\n  options.noprocess = true\n\n  var g = new Glob(pattern, options)\n  var set = g.minimatch.set\n\n  if (!pattern)\n    return false\n\n  if (set.length > 1)\n    return true\n\n  for (var j = 0; j < set[0].length; j++) {\n    if (typeof set[0][j] !== 'string')\n      return true\n  }\n\n  return false\n}\n\nglob.Glob = Glob\ninherits(Glob, EE)\nfunction Glob (pattern, options, cb) {\n  if (typeof options === 'function') {\n    cb = options\n    options = null\n  }\n\n  if (options && options.sync) {\n    if (cb)\n      throw new TypeError('callback provided to sync glob')\n    return new GlobSync(pattern, options)\n  }\n\n  if (!(this instanceof Glob))\n    return new Glob(pattern, options, cb)\n\n  setopts(this, pattern, options)\n  this._didRealPath = false\n\n  // process each pattern in the minimatch set\n  var n = this.minimatch.set.length\n\n  // The matches are stored as {<filename>: true,...} so that\n  // duplicates are automagically pruned.\n  // Later, we do an Object.keys() on these.\n  // Keep them as a list so we can fill in when nonull is set.\n  this.matches = new Array(n)\n\n  if (typeof cb === 'function') {\n    cb = once(cb)\n    this.on('error', cb)\n    this.on('end', function (matches) {\n      cb(null, matches)\n    })\n  }\n\n  var self = this\n  this._processing = 0\n\n  this._emitQueue = []\n  this._processQueue = []\n  this.paused = false\n\n  if (this.noprocess)\n    return this\n\n  if (n === 0)\n    return done()\n\n  var sync = true\n  for (var i = 0; i < n; i ++) {\n    this._process(this.minimatch.set[i], i, false, done)\n  }\n  sync = false\n\n  function done () {\n    --self._processing\n    if (self._processing <= 0) {\n      if (sync) {\n        process.nextTick(function () {\n          self._finish()\n        })\n      } else {\n        self._finish()\n      }\n    }\n  }\n}\n\nGlob.prototype._finish = function () {\n  assert(this instanceof Glob)\n  if (this.aborted)\n    return\n\n  if (this.realpath && !this._didRealpath)\n    return this._realpath()\n\n  common.finish(this)\n  this.emit('end', this.found)\n}\n\nGlob.prototype._realpath = function () {\n  if (this._didRealpath)\n    return\n\n  this._didRealpath = true\n\n  var n = this.matches.length\n  if (n === 0)\n    return this._finish()\n\n  var self = this\n  for (var i = 0; i < this.matches.length; i++)\n    this._realpathSet(i, next)\n\n  function next () {\n    if (--n === 0)\n      self._finish()\n  }\n}\n\nGlob.prototype._realpathSet = function (index, cb) {\n  var matchset = this.matches[index]\n  if (!matchset)\n    return cb()\n\n  var found = Object.keys(matchset)\n  var self = this\n  var n = found.length\n\n  if (n === 0)\n    return cb()\n\n  var set = this.matches[index] = Object.create(null)\n  found.forEach(function (p, i) {\n    // If there's a problem with the stat, then it means that\n    // one or more of the links in the realpath couldn't be\n    // resolved.  just return the abs value in that case.\n    p = self._makeAbs(p)\n    rp.realpath(p, self.realpathCache, function (er, real) {\n      if (!er)\n        set[real] = true\n      else if (er.syscall === 'stat')\n        set[p] = true\n      else\n        self.emit('error', er) // srsly wtf right here\n\n      if (--n === 0) {\n        self.matches[index] = set\n        cb()\n      }\n    })\n  })\n}\n\nGlob.prototype._mark = function (p) {\n  return common.mark(this, p)\n}\n\nGlob.prototype._makeAbs = function (f) {\n  return common.makeAbs(this, f)\n}\n\nGlob.prototype.abort = function () {\n  this.aborted = true\n  this.emit('abort')\n}\n\nGlob.prototype.pause = function () {\n  if (!this.paused) {\n    this.paused = true\n    this.emit('pause')\n  }\n}\n\nGlob.prototype.resume = function () {\n  if (this.paused) {\n    this.emit('resume')\n    this.paused = false\n    if (this._emitQueue.length) {\n      var eq = this._emitQueue.slice(0)\n      this._emitQueue.length = 0\n      for (var i = 0; i < eq.length; i ++) {\n        var e = eq[i]\n        this._emitMatch(e[0], e[1])\n      }\n    }\n    if (this._processQueue.length) {\n      var pq = this._processQueue.slice(0)\n      this._processQueue.length = 0\n      for (var i = 0; i < pq.length; i ++) {\n        var p = pq[i]\n        this._processing--\n        this._process(p[0], p[1], p[2], p[3])\n      }\n    }\n  }\n}\n\nGlob.prototype._process = function (pattern, index, inGlobStar, cb) {\n  assert(this instanceof Glob)\n  assert(typeof cb === 'function')\n\n  if (this.aborted)\n    return\n\n  this._processing++\n  if (this.paused) {\n    this._processQueue.push([pattern, index, inGlobStar, cb])\n    return\n  }\n\n  //console.error('PROCESS %d', this._processing, pattern)\n\n  // Get the first [n] parts of pattern that are all strings.\n  var n = 0\n  while (typeof pattern[n] === 'string') {\n    n ++\n  }\n  // now n is the index of the first one that is *not* a string.\n\n  // see if there's anything else\n  var prefix\n  switch (n) {\n    // if not, then this is rather simple\n    case pattern.length:\n      this._processSimple(pattern.join('/'), index, cb)\n      return\n\n    case 0:\n      // pattern *starts* with some non-trivial item.\n      // going to readdir(cwd), but not include the prefix in matches.\n      prefix = null\n      break\n\n    default:\n      // pattern has some string bits in the front.\n      // whatever it starts with, whether that's 'absolute' like /foo/bar,\n      // or 'relative' like '../baz'\n      prefix = pattern.slice(0, n).join('/')\n      break\n  }\n\n  var remain = pattern.slice(n)\n\n  // get the list of entries.\n  var read\n  if (prefix === null)\n    read = '.'\n  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {\n    if (!prefix || !isAbsolute(prefix))\n      prefix = '/' + prefix\n    read = prefix\n  } else\n    read = prefix\n\n  var abs = this._makeAbs(read)\n\n  //if ignored, skip _processing\n  if (childrenIgnored(this, read))\n    return cb()\n\n  var isGlobStar = remain[0] === minimatch.GLOBSTAR\n  if (isGlobStar)\n    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)\n  else\n    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)\n}\n\nGlob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {\n  var self = this\n  this._readdir(abs, inGlobStar, function (er, entries) {\n    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)\n  })\n}\n\nGlob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {\n\n  // if the abs isn't a dir, then nothing can match!\n  if (!entries)\n    return cb()\n\n  // It will only match dot entries if it starts with a dot, or if\n  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.\n  var pn = remain[0]\n  var negate = !!this.minimatch.negate\n  var rawGlob = pn._glob\n  var dotOk = this.dot || rawGlob.charAt(0) === '.'\n\n  var matchedEntries = []\n  for (var i = 0; i < entries.length; i++) {\n    var e = entries[i]\n    if (e.charAt(0) !== '.' || dotOk) {\n      var m\n      if (negate && !prefix) {\n        m = !e.match(pn)\n      } else {\n        m = e.match(pn)\n      }\n      if (m)\n        matchedEntries.push(e)\n    }\n  }\n\n  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)\n\n  var len = matchedEntries.length\n  // If there are no matched entries, then nothing matches.\n  if (len === 0)\n    return cb()\n\n  // if this is the last remaining pattern bit, then no need for\n  // an additional stat *unless* the user has specified mark or\n  // stat explicitly.  We know they exist, since readdir returned\n  // them.\n\n  if (remain.length === 1 && !this.mark && !this.stat) {\n    if (!this.matches[index])\n      this.matches[index] = Object.create(null)\n\n    for (var i = 0; i < len; i ++) {\n      var e = matchedEntries[i]\n      if (prefix) {\n        if (prefix !== '/')\n          e = prefix + '/' + e\n        else\n          e = prefix + e\n      }\n\n      if (e.charAt(0) === '/' && !this.nomount) {\n        e = path.join(this.root, e)\n      }\n      this._emitMatch(index, e)\n    }\n    // This was the last one, and no stats were needed\n    return cb()\n  }\n\n  // now test all matched entries as stand-ins for that part\n  // of the pattern.\n  remain.shift()\n  for (var i = 0; i < len; i ++) {\n    var e = matchedEntries[i]\n    var newPattern\n    if (prefix) {\n      if (prefix !== '/')\n        e = prefix + '/' + e\n      else\n        e = prefix + e\n    }\n    this._process([e].concat(remain), index, inGlobStar, cb)\n  }\n  cb()\n}\n\nGlob.prototype._emitMatch = function (index, e) {\n  if (this.aborted)\n    return\n\n  if (isIgnored(this, e))\n    return\n\n  if (this.paused) {\n    this._emitQueue.push([index, e])\n    return\n  }\n\n  var abs = isAbsolute(e) ? e : this._makeAbs(e)\n\n  if (this.mark)\n    e = this._mark(e)\n\n  if (this.absolute)\n    e = abs\n\n  if (this.matches[index][e])\n    return\n\n  if (this.nodir) {\n    var c = this.cache[abs]\n    if (c === 'DIR' || Array.isArray(c))\n      return\n  }\n\n  this.matches[index][e] = true\n\n  var st = this.statCache[abs]\n  if (st)\n    this.emit('stat', e, st)\n\n  this.emit('match', e)\n}\n\nGlob.prototype._readdirInGlobStar = function (abs, cb) {\n  if (this.aborted)\n    return\n\n  // follow all symlinked directories forever\n  // just proceed as if this is a non-globstar situation\n  if (this.follow)\n    return this._readdir(abs, false, cb)\n\n  var lstatkey = 'lstat\\0' + abs\n  var self = this\n  var lstatcb = inflight(lstatkey, lstatcb_)\n\n  if (lstatcb)\n    fs.lstat(abs, lstatcb)\n\n  function lstatcb_ (er, lstat) {\n    if (er && er.code === 'ENOENT')\n      return cb()\n\n    var isSym = lstat && lstat.isSymbolicLink()\n    self.symlinks[abs] = isSym\n\n    // If it's not a symlink or a dir, then it's definitely a regular file.\n    // don't bother doing a readdir in that case.\n    if (!isSym && lstat && !lstat.isDirectory()) {\n      self.cache[abs] = 'FILE'\n      cb()\n    } else\n      self._readdir(abs, false, cb)\n  }\n}\n\nGlob.prototype._readdir = function (abs, inGlobStar, cb) {\n  if (this.aborted)\n    return\n\n  cb = inflight('readdir\\0'+abs+'\\0'+inGlobStar, cb)\n  if (!cb)\n    return\n\n  //console.error('RD %j %j', +inGlobStar, abs)\n  if (inGlobStar && !ownProp(this.symlinks, abs))\n    return this._readdirInGlobStar(abs, cb)\n\n  if (ownProp(this.cache, abs)) {\n    var c = this.cache[abs]\n    if (!c || c === 'FILE')\n      return cb()\n\n    if (Array.isArray(c))\n      return cb(null, c)\n  }\n\n  var self = this\n  fs.readdir(abs, readdirCb(this, abs, cb))\n}\n\nfunction readdirCb (self, abs, cb) {\n  return function (er, entries) {\n    if (er)\n      self._readdirError(abs, er, cb)\n    else\n      self._readdirEntries(abs, entries, cb)\n  }\n}\n\nGlob.prototype._readdirEntries = function (abs, entries, cb) {\n  if (this.aborted)\n    return\n\n  // if we haven't asked to stat everything, then just\n  // assume that everything in there exists, so we can avoid\n  // having to stat it a second time.\n  if (!this.mark && !this.stat) {\n    for (var i = 0; i < entries.length; i ++) {\n      var e = entries[i]\n      if (abs === '/')\n        e = abs + e\n      else\n        e = abs + '/' + e\n      this.cache[e] = true\n    }\n  }\n\n  this.cache[abs] = entries\n  return cb(null, entries)\n}\n\nGlob.prototype._readdirError = function (f, er, cb) {\n  if (this.aborted)\n    return\n\n  // handle errors, and cache the information\n  switch (er.code) {\n    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205\n    case 'ENOTDIR': // totally normal. means it *does* exist.\n      var abs = this._makeAbs(f)\n      this.cache[abs] = 'FILE'\n      if (abs === this.cwdAbs) {\n        var error = new Error(er.code + ' invalid cwd ' + this.cwd)\n        error.path = this.cwd\n        error.code = er.code\n        this.emit('error', error)\n        this.abort()\n      }\n      break\n\n    case 'ENOENT': // not terribly unusual\n    case 'ELOOP':\n    case 'ENAMETOOLONG':\n    case 'UNKNOWN':\n      this.cache[this._makeAbs(f)] = false\n      break\n\n    default: // some unusual error.  Treat as failure.\n      this.cache[this._makeAbs(f)] = false\n      if (this.strict) {\n        this.emit('error', er)\n        // If the error is handled, then we abort\n        // if not, we threw out of here\n        this.abort()\n      }\n      if (!this.silent)\n        console.error('glob error', er)\n      break\n  }\n\n  return cb()\n}\n\nGlob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {\n  var self = this\n  this._readdir(abs, inGlobStar, function (er, entries) {\n    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)\n  })\n}\n\n\nGlob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {\n  //console.error('pgs2', prefix, remain[0], entries)\n\n  // no entries means not a dir, so it can never have matches\n  // foo.txt/** doesn't match foo.txt\n  if (!entries)\n    return cb()\n\n  // test without the globstar, and with every child both below\n  // and replacing the globstar.\n  var remainWithoutGlobStar = remain.slice(1)\n  var gspref = prefix ? [ prefix ] : []\n  var noGlobStar = gspref.concat(remainWithoutGlobStar)\n\n  // the noGlobStar pattern exits the inGlobStar state\n  this._process(noGlobStar, index, false, cb)\n\n  var isSym = this.symlinks[abs]\n  var len = entries.length\n\n  // If it's a symlink, and we're in a globstar, then stop\n  if (isSym && inGlobStar)\n    return cb()\n\n  for (var i = 0; i < len; i++) {\n    var e = entries[i]\n    if (e.charAt(0) === '.' && !this.dot)\n      continue\n\n    // these two cases enter the inGlobStar state\n    var instead = gspref.concat(entries[i], remainWithoutGlobStar)\n    this._process(instead, index, true, cb)\n\n    var below = gspref.concat(entries[i], remain)\n    this._process(below, index, true, cb)\n  }\n\n  cb()\n}\n\nGlob.prototype._processSimple = function (prefix, index, cb) {\n  // XXX review this.  Shouldn't it be doing the mounting etc\n  // before doing stat?  kinda weird?\n  var self = this\n  this._stat(prefix, function (er, exists) {\n    self._processSimple2(prefix, index, er, exists, cb)\n  })\n}\nGlob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {\n\n  //console.error('ps2', prefix, exists)\n\n  if (!this.matches[index])\n    this.matches[index] = Object.create(null)\n\n  // If it doesn't exist, then just mark the lack of results\n  if (!exists)\n    return cb()\n\n  if (prefix && isAbsolute(prefix) && !this.nomount) {\n    var trail = /[\\/\\\\]$/.test(prefix)\n    if (prefix.charAt(0) === '/') {\n      prefix = path.join(this.root, prefix)\n    } else {\n      prefix = path.resolve(this.root, prefix)\n      if (trail)\n        prefix += '/'\n    }\n  }\n\n  if (process.platform === 'win32')\n    prefix = prefix.replace(/\\\\/g, '/')\n\n  // Mark this as a match\n  this._emitMatch(index, prefix)\n  cb()\n}\n\n// Returns either 'DIR', 'FILE', or false\nGlob.prototype._stat = function (f, cb) {\n  var abs = this._makeAbs(f)\n  var needDir = f.slice(-1) === '/'\n\n  if (f.length > this.maxLength)\n    return cb()\n\n  if (!this.stat && ownProp(this.cache, abs)) {\n    var c = this.cache[abs]\n\n    if (Array.isArray(c))\n      c = 'DIR'\n\n    // It exists, but maybe not how we need it\n    if (!needDir || c === 'DIR')\n      return cb(null, c)\n\n    if (needDir && c === 'FILE')\n      return cb()\n\n    // otherwise we have to stat, because maybe c=true\n    // if we know it exists, but not what it is.\n  }\n\n  var exists\n  var stat = this.statCache[abs]\n  if (stat !== undefined) {\n    if (stat === false)\n      return cb(null, stat)\n    else {\n      var type = stat.isDirectory() ? 'DIR' : 'FILE'\n      if (needDir && type === 'FILE')\n        return cb()\n      else\n        return cb(null, type, stat)\n    }\n  }\n\n  var self = this\n  var statcb = inflight('stat\\0' + abs, lstatcb_)\n  if (statcb)\n    fs.lstat(abs, statcb)\n\n  function lstatcb_ (er, lstat) {\n    if (lstat && lstat.isSymbolicLink()) {\n      // If it's a symlink, then treat it as the target, unless\n      // the target does not exist, then treat it as a file.\n      return fs.stat(abs, function (er, stat) {\n        if (er)\n          self._stat2(f, abs, null, lstat, cb)\n        else\n          self._stat2(f, abs, er, stat, cb)\n      })\n    } else {\n      self._stat2(f, abs, er, lstat, cb)\n    }\n  }\n}\n\nGlob.prototype._stat2 = function (f, abs, er, stat, cb) {\n  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {\n    this.statCache[abs] = false\n    return cb()\n  }\n\n  var needDir = f.slice(-1) === '/'\n  this.statCache[abs] = stat\n\n  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())\n    return cb(null, false, stat)\n\n  var c = true\n  if (stat)\n    c = stat.isDirectory() ? 'DIR' : 'FILE'\n  this.cache[abs] = this.cache[abs] || c\n\n  if (needDir && c === 'FILE')\n    return cb()\n\n  return cb(null, c, stat)\n}\n\n\n//# sourceURL=webpack:///./node_modules/glob/glob.js?");

/***/ }),

/***/ "./node_modules/glob/sync.js":
/*!***********************************!*\
  !*** ./node_modules/glob/sync.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = globSync\nglobSync.GlobSync = GlobSync\n\nvar fs = __webpack_require__(/*! fs */ \"fs\")\nvar rp = __webpack_require__(/*! fs.realpath */ \"fs.realpath\")\nvar minimatch = __webpack_require__(/*! minimatch */ \"minimatch\")\nvar Minimatch = minimatch.Minimatch\nvar Glob = __webpack_require__(/*! ./glob.js */ \"./node_modules/glob/glob.js\").Glob\nvar util = __webpack_require__(/*! util */ \"util\")\nvar path = __webpack_require__(/*! path */ \"path\")\nvar assert = __webpack_require__(/*! assert */ \"assert\")\nvar isAbsolute = __webpack_require__(/*! path-is-absolute */ \"path-is-absolute\")\nvar common = __webpack_require__(/*! ./common.js */ \"./node_modules/glob/common.js\")\nvar alphasort = common.alphasort\nvar alphasorti = common.alphasorti\nvar setopts = common.setopts\nvar ownProp = common.ownProp\nvar childrenIgnored = common.childrenIgnored\nvar isIgnored = common.isIgnored\n\nfunction globSync (pattern, options) {\n  if (typeof options === 'function' || arguments.length === 3)\n    throw new TypeError('callback provided to sync glob\\n'+\n                        'See: https://github.com/isaacs/node-glob/issues/167')\n\n  return new GlobSync(pattern, options).found\n}\n\nfunction GlobSync (pattern, options) {\n  if (!pattern)\n    throw new Error('must provide pattern')\n\n  if (typeof options === 'function' || arguments.length === 3)\n    throw new TypeError('callback provided to sync glob\\n'+\n                        'See: https://github.com/isaacs/node-glob/issues/167')\n\n  if (!(this instanceof GlobSync))\n    return new GlobSync(pattern, options)\n\n  setopts(this, pattern, options)\n\n  if (this.noprocess)\n    return this\n\n  var n = this.minimatch.set.length\n  this.matches = new Array(n)\n  for (var i = 0; i < n; i ++) {\n    this._process(this.minimatch.set[i], i, false)\n  }\n  this._finish()\n}\n\nGlobSync.prototype._finish = function () {\n  assert(this instanceof GlobSync)\n  if (this.realpath) {\n    var self = this\n    this.matches.forEach(function (matchset, index) {\n      var set = self.matches[index] = Object.create(null)\n      for (var p in matchset) {\n        try {\n          p = self._makeAbs(p)\n          var real = rp.realpathSync(p, self.realpathCache)\n          set[real] = true\n        } catch (er) {\n          if (er.syscall === 'stat')\n            set[self._makeAbs(p)] = true\n          else\n            throw er\n        }\n      }\n    })\n  }\n  common.finish(this)\n}\n\n\nGlobSync.prototype._process = function (pattern, index, inGlobStar) {\n  assert(this instanceof GlobSync)\n\n  // Get the first [n] parts of pattern that are all strings.\n  var n = 0\n  while (typeof pattern[n] === 'string') {\n    n ++\n  }\n  // now n is the index of the first one that is *not* a string.\n\n  // See if there's anything else\n  var prefix\n  switch (n) {\n    // if not, then this is rather simple\n    case pattern.length:\n      this._processSimple(pattern.join('/'), index)\n      return\n\n    case 0:\n      // pattern *starts* with some non-trivial item.\n      // going to readdir(cwd), but not include the prefix in matches.\n      prefix = null\n      break\n\n    default:\n      // pattern has some string bits in the front.\n      // whatever it starts with, whether that's 'absolute' like /foo/bar,\n      // or 'relative' like '../baz'\n      prefix = pattern.slice(0, n).join('/')\n      break\n  }\n\n  var remain = pattern.slice(n)\n\n  // get the list of entries.\n  var read\n  if (prefix === null)\n    read = '.'\n  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {\n    if (!prefix || !isAbsolute(prefix))\n      prefix = '/' + prefix\n    read = prefix\n  } else\n    read = prefix\n\n  var abs = this._makeAbs(read)\n\n  //if ignored, skip processing\n  if (childrenIgnored(this, read))\n    return\n\n  var isGlobStar = remain[0] === minimatch.GLOBSTAR\n  if (isGlobStar)\n    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)\n  else\n    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)\n}\n\n\nGlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {\n  var entries = this._readdir(abs, inGlobStar)\n\n  // if the abs isn't a dir, then nothing can match!\n  if (!entries)\n    return\n\n  // It will only match dot entries if it starts with a dot, or if\n  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.\n  var pn = remain[0]\n  var negate = !!this.minimatch.negate\n  var rawGlob = pn._glob\n  var dotOk = this.dot || rawGlob.charAt(0) === '.'\n\n  var matchedEntries = []\n  for (var i = 0; i < entries.length; i++) {\n    var e = entries[i]\n    if (e.charAt(0) !== '.' || dotOk) {\n      var m\n      if (negate && !prefix) {\n        m = !e.match(pn)\n      } else {\n        m = e.match(pn)\n      }\n      if (m)\n        matchedEntries.push(e)\n    }\n  }\n\n  var len = matchedEntries.length\n  // If there are no matched entries, then nothing matches.\n  if (len === 0)\n    return\n\n  // if this is the last remaining pattern bit, then no need for\n  // an additional stat *unless* the user has specified mark or\n  // stat explicitly.  We know they exist, since readdir returned\n  // them.\n\n  if (remain.length === 1 && !this.mark && !this.stat) {\n    if (!this.matches[index])\n      this.matches[index] = Object.create(null)\n\n    for (var i = 0; i < len; i ++) {\n      var e = matchedEntries[i]\n      if (prefix) {\n        if (prefix.slice(-1) !== '/')\n          e = prefix + '/' + e\n        else\n          e = prefix + e\n      }\n\n      if (e.charAt(0) === '/' && !this.nomount) {\n        e = path.join(this.root, e)\n      }\n      this._emitMatch(index, e)\n    }\n    // This was the last one, and no stats were needed\n    return\n  }\n\n  // now test all matched entries as stand-ins for that part\n  // of the pattern.\n  remain.shift()\n  for (var i = 0; i < len; i ++) {\n    var e = matchedEntries[i]\n    var newPattern\n    if (prefix)\n      newPattern = [prefix, e]\n    else\n      newPattern = [e]\n    this._process(newPattern.concat(remain), index, inGlobStar)\n  }\n}\n\n\nGlobSync.prototype._emitMatch = function (index, e) {\n  if (isIgnored(this, e))\n    return\n\n  var abs = this._makeAbs(e)\n\n  if (this.mark)\n    e = this._mark(e)\n\n  if (this.absolute) {\n    e = abs\n  }\n\n  if (this.matches[index][e])\n    return\n\n  if (this.nodir) {\n    var c = this.cache[abs]\n    if (c === 'DIR' || Array.isArray(c))\n      return\n  }\n\n  this.matches[index][e] = true\n\n  if (this.stat)\n    this._stat(e)\n}\n\n\nGlobSync.prototype._readdirInGlobStar = function (abs) {\n  // follow all symlinked directories forever\n  // just proceed as if this is a non-globstar situation\n  if (this.follow)\n    return this._readdir(abs, false)\n\n  var entries\n  var lstat\n  var stat\n  try {\n    lstat = fs.lstatSync(abs)\n  } catch (er) {\n    if (er.code === 'ENOENT') {\n      // lstat failed, doesn't exist\n      return null\n    }\n  }\n\n  var isSym = lstat && lstat.isSymbolicLink()\n  this.symlinks[abs] = isSym\n\n  // If it's not a symlink or a dir, then it's definitely a regular file.\n  // don't bother doing a readdir in that case.\n  if (!isSym && lstat && !lstat.isDirectory())\n    this.cache[abs] = 'FILE'\n  else\n    entries = this._readdir(abs, false)\n\n  return entries\n}\n\nGlobSync.prototype._readdir = function (abs, inGlobStar) {\n  var entries\n\n  if (inGlobStar && !ownProp(this.symlinks, abs))\n    return this._readdirInGlobStar(abs)\n\n  if (ownProp(this.cache, abs)) {\n    var c = this.cache[abs]\n    if (!c || c === 'FILE')\n      return null\n\n    if (Array.isArray(c))\n      return c\n  }\n\n  try {\n    return this._readdirEntries(abs, fs.readdirSync(abs))\n  } catch (er) {\n    this._readdirError(abs, er)\n    return null\n  }\n}\n\nGlobSync.prototype._readdirEntries = function (abs, entries) {\n  // if we haven't asked to stat everything, then just\n  // assume that everything in there exists, so we can avoid\n  // having to stat it a second time.\n  if (!this.mark && !this.stat) {\n    for (var i = 0; i < entries.length; i ++) {\n      var e = entries[i]\n      if (abs === '/')\n        e = abs + e\n      else\n        e = abs + '/' + e\n      this.cache[e] = true\n    }\n  }\n\n  this.cache[abs] = entries\n\n  // mark and cache dir-ness\n  return entries\n}\n\nGlobSync.prototype._readdirError = function (f, er) {\n  // handle errors, and cache the information\n  switch (er.code) {\n    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205\n    case 'ENOTDIR': // totally normal. means it *does* exist.\n      var abs = this._makeAbs(f)\n      this.cache[abs] = 'FILE'\n      if (abs === this.cwdAbs) {\n        var error = new Error(er.code + ' invalid cwd ' + this.cwd)\n        error.path = this.cwd\n        error.code = er.code\n        throw error\n      }\n      break\n\n    case 'ENOENT': // not terribly unusual\n    case 'ELOOP':\n    case 'ENAMETOOLONG':\n    case 'UNKNOWN':\n      this.cache[this._makeAbs(f)] = false\n      break\n\n    default: // some unusual error.  Treat as failure.\n      this.cache[this._makeAbs(f)] = false\n      if (this.strict)\n        throw er\n      if (!this.silent)\n        console.error('glob error', er)\n      break\n  }\n}\n\nGlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {\n\n  var entries = this._readdir(abs, inGlobStar)\n\n  // no entries means not a dir, so it can never have matches\n  // foo.txt/** doesn't match foo.txt\n  if (!entries)\n    return\n\n  // test without the globstar, and with every child both below\n  // and replacing the globstar.\n  var remainWithoutGlobStar = remain.slice(1)\n  var gspref = prefix ? [ prefix ] : []\n  var noGlobStar = gspref.concat(remainWithoutGlobStar)\n\n  // the noGlobStar pattern exits the inGlobStar state\n  this._process(noGlobStar, index, false)\n\n  var len = entries.length\n  var isSym = this.symlinks[abs]\n\n  // If it's a symlink, and we're in a globstar, then stop\n  if (isSym && inGlobStar)\n    return\n\n  for (var i = 0; i < len; i++) {\n    var e = entries[i]\n    if (e.charAt(0) === '.' && !this.dot)\n      continue\n\n    // these two cases enter the inGlobStar state\n    var instead = gspref.concat(entries[i], remainWithoutGlobStar)\n    this._process(instead, index, true)\n\n    var below = gspref.concat(entries[i], remain)\n    this._process(below, index, true)\n  }\n}\n\nGlobSync.prototype._processSimple = function (prefix, index) {\n  // XXX review this.  Shouldn't it be doing the mounting etc\n  // before doing stat?  kinda weird?\n  var exists = this._stat(prefix)\n\n  if (!this.matches[index])\n    this.matches[index] = Object.create(null)\n\n  // If it doesn't exist, then just mark the lack of results\n  if (!exists)\n    return\n\n  if (prefix && isAbsolute(prefix) && !this.nomount) {\n    var trail = /[\\/\\\\]$/.test(prefix)\n    if (prefix.charAt(0) === '/') {\n      prefix = path.join(this.root, prefix)\n    } else {\n      prefix = path.resolve(this.root, prefix)\n      if (trail)\n        prefix += '/'\n    }\n  }\n\n  if (process.platform === 'win32')\n    prefix = prefix.replace(/\\\\/g, '/')\n\n  // Mark this as a match\n  this._emitMatch(index, prefix)\n}\n\n// Returns either 'DIR', 'FILE', or false\nGlobSync.prototype._stat = function (f) {\n  var abs = this._makeAbs(f)\n  var needDir = f.slice(-1) === '/'\n\n  if (f.length > this.maxLength)\n    return false\n\n  if (!this.stat && ownProp(this.cache, abs)) {\n    var c = this.cache[abs]\n\n    if (Array.isArray(c))\n      c = 'DIR'\n\n    // It exists, but maybe not how we need it\n    if (!needDir || c === 'DIR')\n      return c\n\n    if (needDir && c === 'FILE')\n      return false\n\n    // otherwise we have to stat, because maybe c=true\n    // if we know it exists, but not what it is.\n  }\n\n  var exists\n  var stat = this.statCache[abs]\n  if (!stat) {\n    var lstat\n    try {\n      lstat = fs.lstatSync(abs)\n    } catch (er) {\n      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {\n        this.statCache[abs] = false\n        return false\n      }\n    }\n\n    if (lstat && lstat.isSymbolicLink()) {\n      try {\n        stat = fs.statSync(abs)\n      } catch (er) {\n        stat = lstat\n      }\n    } else {\n      stat = lstat\n    }\n  }\n\n  this.statCache[abs] = stat\n\n  var c = true\n  if (stat)\n    c = stat.isDirectory() ? 'DIR' : 'FILE'\n\n  this.cache[abs] = this.cache[abs] || c\n\n  if (needDir && c === 'FILE')\n    return false\n\n  return c\n}\n\nGlobSync.prototype._mark = function (p) {\n  return common.mark(this, p)\n}\n\nGlobSync.prototype._makeAbs = function (f) {\n  return common.makeAbs(this, f)\n}\n\n\n//# sourceURL=webpack:///./node_modules/glob/sync.js?");

/***/ }),

/***/ "./node_modules/globby/gitignore.js":
/*!******************************************!*\
  !*** ./node_modules/globby/gitignore.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst glob = __webpack_require__(/*! glob */ \"./node_modules/glob/glob.js\");\nconst gitIgnore = __webpack_require__(/*! ignore */ \"./node_modules/ignore/ignore.js\");\nconst pify = __webpack_require__(/*! pify */ \"pify\");\nconst slash = __webpack_require__(/*! slash */ \"./node_modules/slash/index.js\");\n\nconst globP = pify(glob);\nconst readFileP = pify(fs.readFile);\n\nconst mapGitIgnorePatternTo = base => ignore => {\n\tif (ignore.startsWith('!')) {\n\t\treturn '!' + path.posix.join(base, ignore.substr(1));\n\t}\n\n\treturn path.posix.join(base, ignore);\n};\n\nconst parseGitIgnore = (content, opts) => {\n\tconst base = slash(path.relative(opts.cwd, path.dirname(opts.fileName)));\n\n\treturn content\n\t\t.split(/\\r?\\n/)\n\t\t.filter(Boolean)\n\t\t.filter(l => l.charAt(0) !== '#')\n\t\t.map(mapGitIgnorePatternTo(base));\n};\n\nconst reduceIgnore = files => {\n\treturn files.reduce((ignores, file) => {\n\t\tignores.add(parseGitIgnore(file.content, {\n\t\t\tcwd: file.cwd,\n\t\t\tfileName: file.filePath\n\t\t}));\n\t\treturn ignores;\n\t}, gitIgnore());\n};\n\nconst getIsIgnoredPredecate = (ignores, cwd) => {\n\treturn p => ignores.ignores(slash(path.relative(cwd, p)));\n};\n\nconst getFile = (file, cwd) => {\n\tconst filePath = path.join(cwd, file);\n\treturn readFileP(filePath, 'utf8')\n\t\t.then(content => ({\n\t\t\tcontent,\n\t\t\tcwd,\n\t\t\tfilePath\n\t\t}));\n};\n\nconst getFileSync = (file, cwd) => {\n\tconst filePath = path.join(cwd, file);\n\tconst content = fs.readFileSync(filePath, 'utf8');\n\n\treturn {\n\t\tcontent,\n\t\tcwd,\n\t\tfilePath\n\t};\n};\n\nconst normalizeOpts = opts => {\n\topts = opts || {};\n\tconst ignore = opts.ignore || [];\n\tconst cwd = opts.cwd || process.cwd();\n\treturn {ignore, cwd};\n};\n\nmodule.exports = o => {\n\tconst opts = normalizeOpts(o);\n\n\treturn globP('**/.gitignore', {ignore: opts.ignore, cwd: opts.cwd})\n\t\t.then(paths => Promise.all(paths.map(file => getFile(file, opts.cwd))))\n\t\t.then(files => reduceIgnore(files))\n\t\t.then(ignores => getIsIgnoredPredecate(ignores, opts.cwd));\n};\n\nmodule.exports.sync = o => {\n\tconst opts = normalizeOpts(o);\n\n\tconst paths = glob.sync('**/.gitignore', {ignore: opts.ignore, cwd: opts.cwd});\n\tconst files = paths.map(file => getFileSync(file, opts.cwd));\n\tconst ignores = reduceIgnore(files);\n\treturn getIsIgnoredPredecate(ignores, opts.cwd);\n};\n\n\n//# sourceURL=webpack:///./node_modules/globby/gitignore.js?");

/***/ }),

/***/ "./node_modules/globby/index.js":
/*!**************************************!*\
  !*** ./node_modules/globby/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst arrayUnion = __webpack_require__(/*! array-union */ \"./node_modules/array-union/index.js\");\nconst glob = __webpack_require__(/*! glob */ \"./node_modules/glob/glob.js\");\nconst pify = __webpack_require__(/*! pify */ \"pify\");\nconst dirGlob = __webpack_require__(/*! dir-glob */ \"./node_modules/dir-glob/index.js\");\nconst gitignore = __webpack_require__(/*! ./gitignore */ \"./node_modules/globby/gitignore.js\");\n\nconst globP = pify(glob);\nconst DEFAULT_FILTER = () => false;\n\nconst isNegative = pattern => pattern[0] === '!';\n\nconst assertPatternsInput = patterns => {\n\tif (!patterns.every(x => typeof x === 'string')) {\n\t\tthrow new TypeError('Patterns must be a string or an array of strings');\n\t}\n};\n\nconst generateGlobTasks = (patterns, taskOpts) => {\n\tpatterns = [].concat(patterns);\n\tassertPatternsInput(patterns);\n\n\tconst globTasks = [];\n\n\ttaskOpts = Object.assign({\n\t\tcache: Object.create(null),\n\t\tstatCache: Object.create(null),\n\t\trealpathCache: Object.create(null),\n\t\tsymlinks: Object.create(null),\n\t\tignore: [],\n\t\texpandDirectories: true,\n\t\tnodir: true\n\t}, taskOpts);\n\n\tpatterns.forEach((pattern, i) => {\n\t\tif (isNegative(pattern)) {\n\t\t\treturn;\n\t\t}\n\n\t\tconst ignore = patterns\n\t\t\t.slice(i)\n\t\t\t.filter(isNegative)\n\t\t\t.map(pattern => pattern.slice(1));\n\n\t\tconst opts = Object.assign({}, taskOpts, {\n\t\t\tignore: taskOpts.ignore.concat(ignore)\n\t\t});\n\n\t\tglobTasks.push({pattern, opts});\n\t});\n\n\treturn globTasks;\n};\n\nconst globDirs = (task, fn) => {\n\tif (Array.isArray(task.opts.expandDirectories)) {\n\t\treturn fn(task.pattern, {files: task.opts.expandDirectories});\n\t}\n\n\tif (typeof task.opts.expandDirectories === 'object') {\n\t\treturn fn(task.pattern, task.opts.expandDirectories);\n\t}\n\n\treturn fn(task.pattern);\n};\n\nconst getPattern = (task, fn) => task.opts.expandDirectories ? globDirs(task, fn) : [task.pattern];\n\nmodule.exports = (patterns, opts) => {\n\tlet globTasks;\n\n\ttry {\n\t\tglobTasks = generateGlobTasks(patterns, opts);\n\t} catch (err) {\n\t\treturn Promise.reject(err);\n\t}\n\n\tconst getTasks = Promise.all(globTasks.map(task => Promise.resolve(getPattern(task, dirGlob))\n\t\t.then(globs => Promise.all(globs.map(glob => ({\n\t\t\tpattern: glob,\n\t\t\topts: task.opts\n\t\t}))))\n\t))\n\t\t.then(tasks => arrayUnion.apply(null, tasks));\n\n\tconst getFilter = () => {\n\t\treturn Promise.resolve(\n\t\t\topts && opts.gitignore ?\n\t\t\t\tgitignore({cwd: opts.cwd, ignore: opts.ignore}) :\n\t\t\t\tDEFAULT_FILTER\n\t\t);\n\t};\n\n\treturn getFilter()\n\t\t.then(filter => {\n\t\t\treturn getTasks\n\t\t\t\t.then(tasks => Promise.all(tasks.map(task => globP(task.pattern, task.opts))))\n\t\t\t\t.then(paths => arrayUnion.apply(null, paths))\n\t\t\t\t.then(paths => paths.filter(p => !filter(p)));\n\t\t});\n};\n\nmodule.exports.sync = (patterns, opts) => {\n\tconst globTasks = generateGlobTasks(patterns, opts);\n\n\tconst getFilter = () => {\n\t\treturn opts && opts.gitignore ?\n\t\t\tgitignore.sync({cwd: opts.cwd, ignore: opts.ignore}) :\n\t\t\tDEFAULT_FILTER;\n\t};\n\n\tconst tasks = globTasks.reduce((tasks, task) => {\n\t\tconst newTask = getPattern(task, dirGlob.sync).map(glob => ({\n\t\t\tpattern: glob,\n\t\t\topts: task.opts\n\t\t}));\n\t\treturn tasks.concat(newTask);\n\t}, []);\n\n\tconst filter = getFilter();\n\n\treturn tasks.reduce(\n\t\t(matches, task) => arrayUnion(matches, glob.sync(task.pattern, task.opts)),\n\t\t[]\n\t).filter(p => !filter(p));\n};\n\nmodule.exports.generateGlobTasks = generateGlobTasks;\n\nmodule.exports.hasMagic = (patterns, opts) => []\n\t.concat(patterns)\n\t.some(pattern => glob.hasMagic(pattern, opts));\n\nmodule.exports.gitignore = gitignore;\n\n\n//# sourceURL=webpack:///./node_modules/globby/index.js?");

/***/ }),

/***/ "./node_modules/ignore/ignore.js":
/*!***************************************!*\
  !*** ./node_modules/ignore/ignore.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nmodule.exports = function () {\n  return new IgnoreBase();\n};\n\n// A simple implementation of make-array\nfunction make_array(subject) {\n  return Array.isArray(subject) ? subject : [subject];\n}\n\nvar REGEX_BLANK_LINE = /^\\s+$/;\nvar REGEX_LEADING_EXCAPED_EXCLAMATION = /^\\\\\\!/;\nvar REGEX_LEADING_EXCAPED_HASH = /^\\\\#/;\nvar SLASH = '/';\nvar KEY_IGNORE = typeof Symbol !== 'undefined' ? Symbol.for('node-ignore')\n/* istanbul ignore next */\n: 'node-ignore';\n\nvar IgnoreBase = function () {\n  function IgnoreBase() {\n    _classCallCheck(this, IgnoreBase);\n\n    this._rules = [];\n    this[KEY_IGNORE] = true;\n    this._initCache();\n  }\n\n  _createClass(IgnoreBase, [{\n    key: '_initCache',\n    value: function _initCache() {\n      this._cache = {};\n    }\n\n    // @param {Array.<string>|string|Ignore} pattern\n\n  }, {\n    key: 'add',\n    value: function add(pattern) {\n      this._added = false;\n\n      if (typeof pattern === 'string') {\n        pattern = pattern.split(/\\r?\\n/g);\n      }\n\n      make_array(pattern).forEach(this._addPattern, this);\n\n      // Some rules have just added to the ignore,\n      // making the behavior changed.\n      if (this._added) {\n        this._initCache();\n      }\n\n      return this;\n    }\n\n    // legacy\n\n  }, {\n    key: 'addPattern',\n    value: function addPattern(pattern) {\n      return this.add(pattern);\n    }\n  }, {\n    key: '_addPattern',\n    value: function _addPattern(pattern) {\n      // #32\n      if (pattern && pattern[KEY_IGNORE]) {\n        this._rules = this._rules.concat(pattern._rules);\n        this._added = true;\n        return;\n      }\n\n      if (this._checkPattern(pattern)) {\n        var rule = this._createRule(pattern);\n        this._added = true;\n        this._rules.push(rule);\n      }\n    }\n  }, {\n    key: '_checkPattern',\n    value: function _checkPattern(pattern) {\n      // > A blank line matches no files, so it can serve as a separator for readability.\n      return pattern && typeof pattern === 'string' && !REGEX_BLANK_LINE.test(pattern)\n\n      // > A line starting with # serves as a comment.\n      && pattern.indexOf('#') !== 0;\n    }\n  }, {\n    key: 'filter',\n    value: function filter(paths) {\n      var _this = this;\n\n      return make_array(paths).filter(function (path) {\n        return _this._filter(path);\n      });\n    }\n  }, {\n    key: 'createFilter',\n    value: function createFilter() {\n      var _this2 = this;\n\n      return function (path) {\n        return _this2._filter(path);\n      };\n    }\n  }, {\n    key: 'ignores',\n    value: function ignores(path) {\n      return !this._filter(path);\n    }\n  }, {\n    key: '_createRule',\n    value: function _createRule(pattern) {\n      var origin = pattern;\n      var negative = false;\n\n      // > An optional prefix \"!\" which negates the pattern;\n      if (pattern.indexOf('!') === 0) {\n        negative = true;\n        pattern = pattern.substr(1);\n      }\n\n      pattern = pattern\n      // > Put a backslash (\"\\\") in front of the first \"!\" for patterns that begin with a literal \"!\", for example, `\"\\!important!.txt\"`.\n      .replace(REGEX_LEADING_EXCAPED_EXCLAMATION, '!')\n      // > Put a backslash (\"\\\") in front of the first hash for patterns that begin with a hash.\n      .replace(REGEX_LEADING_EXCAPED_HASH, '#');\n\n      var regex = make_regex(pattern, negative);\n\n      return {\n        origin: origin,\n        pattern: pattern,\n        negative: negative,\n        regex: regex\n      };\n    }\n\n    // @returns `Boolean` true if the `path` is NOT ignored\n\n  }, {\n    key: '_filter',\n    value: function _filter(path, slices) {\n      if (!path) {\n        return false;\n      }\n\n      if (path in this._cache) {\n        return this._cache[path];\n      }\n\n      if (!slices) {\n        // path/to/a.js\n        // ['path', 'to', 'a.js']\n        slices = path.split(SLASH);\n      }\n\n      slices.pop();\n\n      return this._cache[path] = slices.length\n      // > It is not possible to re-include a file if a parent directory of that file is excluded.\n      // If the path contains a parent directory, check the parent first\n      ? this._filter(slices.join(SLASH) + SLASH, slices) && this._test(path)\n\n      // Or only test the path\n      : this._test(path);\n    }\n\n    // @returns {Boolean} true if a file is NOT ignored\n\n  }, {\n    key: '_test',\n    value: function _test(path) {\n      // Explicitly define variable type by setting matched to `0`\n      var matched = 0;\n\n      this._rules.forEach(function (rule) {\n        // if matched = true, then we only test negative rules\n        // if matched = false, then we test non-negative rules\n        if (!(matched ^ rule.negative)) {\n          matched = rule.negative ^ rule.regex.test(path);\n        }\n      });\n\n      return !matched;\n    }\n  }]);\n\n  return IgnoreBase;\n}();\n\n// > If the pattern ends with a slash,\n// > it is removed for the purpose of the following description,\n// > but it would only find a match with a directory.\n// > In other words, foo/ will match a directory foo and paths underneath it,\n// > but will not match a regular file or a symbolic link foo\n// >  (this is consistent with the way how pathspec works in general in Git).\n// '`foo/`' will not match regular file '`foo`' or symbolic link '`foo`'\n// -> ignore-rules will not deal with it, because it costs extra `fs.stat` call\n//      you could use option `mark: true` with `glob`\n\n// '`foo/`' should not continue with the '`..`'\n\n\nvar DEFAULT_REPLACER_PREFIX = [\n\n// > Trailing spaces are ignored unless they are quoted with backslash (\"\\\")\n[\n// (a\\ ) -> (a )\n// (a  ) -> (a)\n// (a \\ ) -> (a  )\n/\\\\?\\s+$/, function (match) {\n  return match.indexOf('\\\\') === 0 ? ' ' : '';\n}],\n\n// replace (\\ ) with ' '\n[/\\\\\\s/g, function () {\n  return ' ';\n}],\n\n// Escape metacharacters\n// which is written down by users but means special for regular expressions.\n\n// > There are 12 characters with special meanings:\n// > - the backslash \\,\n// > - the caret ^,\n// > - the dollar sign $,\n// > - the period or dot .,\n// > - the vertical bar or pipe symbol |,\n// > - the question mark ?,\n// > - the asterisk or star *,\n// > - the plus sign +,\n// > - the opening parenthesis (,\n// > - the closing parenthesis ),\n// > - and the opening square bracket [,\n// > - the opening curly brace {,\n// > These special characters are often called \"metacharacters\".\n[/[\\\\\\^$.|?*+()\\[{]/g, function (match) {\n  return '\\\\' + match;\n}],\n\n// leading slash\n[\n\n// > A leading slash matches the beginning of the pathname.\n// > For example, \"/*.c\" matches \"cat-file.c\" but not \"mozilla-sha1/sha1.c\".\n// A leading slash matches the beginning of the pathname\n/^\\//, function () {\n  return '^';\n}],\n\n// replace special metacharacter slash after the leading slash\n[/\\//g, function () {\n  return '\\\\/';\n}], [\n// > A leading \"**\" followed by a slash means match in all directories.\n// > For example, \"**/foo\" matches file or directory \"foo\" anywhere,\n// > the same as pattern \"foo\".\n// > \"**/foo/bar\" matches file or directory \"bar\" anywhere that is directly under directory \"foo\".\n// Notice that the '*'s have been replaced as '\\\\*'\n/^\\^*\\\\\\*\\\\\\*\\\\\\//,\n\n// '**/foo' <-> 'foo'\nfunction () {\n  return '^(?:.*\\\\/)?';\n}]];\n\nvar DEFAULT_REPLACER_SUFFIX = [\n// starting\n[\n// there will be no leading '/' (which has been replaced by section \"leading slash\")\n// If starts with '**', adding a '^' to the regular expression also works\n/^(?=[^\\^])/, function () {\n  return !/\\/(?!$)/.test(this)\n  // > If the pattern does not contain a slash /, Git treats it as a shell glob pattern\n  // Actually, if there is only a trailing slash, git also treats it as a shell glob pattern\n  ? '(?:^|\\\\/)'\n\n  // > Otherwise, Git treats the pattern as a shell glob suitable for consumption by fnmatch(3)\n  : '^';\n}],\n\n// two globstars\n[\n// Use lookahead assertions so that we could match more than one `'/**'`\n/\\\\\\/\\\\\\*\\\\\\*(?=\\\\\\/|$)/g,\n\n// Zero, one or several directories\n// should not use '*', or it will be replaced by the next replacer\n\n// Check if it is not the last `'/**'`\nfunction (match, index, str) {\n  return index + 6 < str.length\n\n  // case: /**/\n  // > A slash followed by two consecutive asterisks then a slash matches zero or more directories.\n  // > For example, \"a/**/b\" matches \"a/b\", \"a/x/b\", \"a/x/y/b\" and so on.\n  // '/**/'\n  ? '(?:\\\\/[^\\\\/]+)*'\n\n  // case: /**\n  // > A trailing `\"/**\"` matches everything inside.\n\n  // #21: everything inside but it should not include the current folder\n  : '\\\\/.+';\n}],\n\n// intermediate wildcards\n[\n// Never replace escaped '*'\n// ignore rule '\\*' will match the path '*'\n\n// 'abc.*/' -> go\n// 'abc.*'  -> skip this rule\n/(^|[^\\\\]+)\\\\\\*(?=.+)/g,\n\n// '*.js' matches '.js'\n// '*.js' doesn't match 'abc'\nfunction (match, p1) {\n  return p1 + '[^\\\\/]*';\n}],\n\n// trailing wildcard\n[/(\\^|\\\\\\/)?\\\\\\*$/, function (match, p1) {\n  return (p1\n  // '\\^':\n  // '/*' does not match ''\n  // '/*' does not match everything\n\n  // '\\\\\\/':\n  // 'abc/*' does not match 'abc/'\n  ? p1 + '[^/]+'\n\n  // 'a*' matches 'a'\n  // 'a*' matches 'aa'\n  : '[^/]*') + '(?=$|\\\\/$)';\n}], [\n// unescape\n/\\\\\\\\\\\\/g, function () {\n  return '\\\\';\n}]];\n\nvar POSITIVE_REPLACERS = [].concat(DEFAULT_REPLACER_PREFIX, [\n\n// 'f'\n// matches\n// - /f(end)\n// - /f/\n// - (start)f(end)\n// - (start)f/\n// doesn't match\n// - oof\n// - foo\n// pseudo:\n// -> (^|/)f(/|$)\n\n// ending\n[\n// 'js' will not match 'js.'\n// 'ab' will not match 'abc'\n/(?:[^*\\/])$/,\n\n// 'js*' will not match 'a.js'\n// 'js/' will not match 'a.js'\n// 'js' will match 'a.js' and 'a.js/'\nfunction (match) {\n  return match + '(?=$|\\\\/)';\n}]], DEFAULT_REPLACER_SUFFIX);\n\nvar NEGATIVE_REPLACERS = [].concat(DEFAULT_REPLACER_PREFIX, [\n\n// #24, #38\n// The MISSING rule of [gitignore docs](https://git-scm.com/docs/gitignore)\n// A negative pattern without a trailing wildcard should not\n// re-include the things inside that directory.\n\n// eg:\n// ['node_modules/*', '!node_modules']\n// should ignore `node_modules/a.js`\n[/(?:[^*])$/, function (match) {\n  return match + '(?=$|\\\\/$)';\n}]], DEFAULT_REPLACER_SUFFIX);\n\n// A simple cache, because an ignore rule only has only one certain meaning\nvar cache = {};\n\n// @param {pattern}\nfunction make_regex(pattern, negative) {\n  var r = cache[pattern];\n  if (r) {\n    return r;\n  }\n\n  var replacers = negative ? NEGATIVE_REPLACERS : POSITIVE_REPLACERS;\n\n  var source = replacers.reduce(function (prev, current) {\n    return prev.replace(current[0], current[1].bind(pattern));\n  }, pattern);\n\n  return cache[pattern] = new RegExp(source, 'i');\n}\n\n// Windows\n// --------------------------------------------------------------\n/* istanbul ignore if  */\nif (\n// Detect `process` so that it can run in browsers.\ntypeof process !== 'undefined' && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === 'win32')) {\n\n  var filter = IgnoreBase.prototype._filter;\n  var make_posix = function make_posix(str) {\n    return (/^\\\\\\\\\\?\\\\/.test(str) || /[^\\x00-\\x80]+/.test(str) ? str : str.replace(/\\\\/g, '/')\n    );\n  };\n\n  IgnoreBase.prototype._filter = function (path, slices) {\n    path = make_posix(path);\n    return filter.call(this, path, slices);\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/ignore/ignore.js?");

/***/ }),

/***/ "./node_modules/path-type/index.js":
/*!*****************************************!*\
  !*** ./node_modules/path-type/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst pify = __webpack_require__(/*! pify */ \"pify\");\n\nfunction type(fn, fn2, fp) {\n\tif (typeof fp !== 'string') {\n\t\treturn Promise.reject(new TypeError(`Expected a string, got ${typeof fp}`));\n\t}\n\n\treturn pify(fs[fn])(fp)\n\t\t.then(stats => stats[fn2]())\n\t\t.catch(err => {\n\t\t\tif (err.code === 'ENOENT') {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tthrow err;\n\t\t});\n}\n\nfunction typeSync(fn, fn2, fp) {\n\tif (typeof fp !== 'string') {\n\t\tthrow new TypeError(`Expected a string, got ${typeof fp}`);\n\t}\n\n\ttry {\n\t\treturn fs[fn](fp)[fn2]();\n\t} catch (err) {\n\t\tif (err.code === 'ENOENT') {\n\t\t\treturn false;\n\t\t}\n\n\t\tthrow err;\n\t}\n}\n\nexports.file = type.bind(null, 'stat', 'isFile');\nexports.dir = type.bind(null, 'stat', 'isDirectory');\nexports.symlink = type.bind(null, 'lstat', 'isSymbolicLink');\nexports.fileSync = typeSync.bind(null, 'statSync', 'isFile');\nexports.dirSync = typeSync.bind(null, 'statSync', 'isDirectory');\nexports.symlinkSync = typeSync.bind(null, 'lstatSync', 'isSymbolicLink');\n\n\n//# sourceURL=webpack:///./node_modules/path-type/index.js?");

/***/ }),

/***/ "./node_modules/slash/index.js":
/*!*************************************!*\
  !*** ./node_modules/slash/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports = function (str) {\n\tvar isExtendedLengthPath = /^\\\\\\\\\\?\\\\/.test(str);\n\tvar hasNonAscii = /[^\\x00-\\x80]+/.test(str);\n\n\tif (isExtendedLengthPath || hasNonAscii) {\n\t\treturn str;\n\t}\n\n\treturn str.replace(/\\\\/g, '/');\n};\n\n\n//# sourceURL=webpack:///./node_modules/slash/index.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex;\n  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\n  return ([bth[buf[i++]], bth[buf[i++]], \n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]]]).join('');\n}\n\nmodule.exports = bytesToUuid;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/rng.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/lib/rng.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Unique ID creation requires a high quality random # generator.  In node.js\n// this is pretty straight-forward - we use the crypto API.\n\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\nmodule.exports = function nodeRNG() {\n  return crypto.randomBytes(16);\n};\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"./node_modules/uuid/lib/rng.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"./node_modules/uuid/lib/bytesToUuid.js\");\n\nfunction v4(options, buf, offset) {\n  var i = buf && offset || 0;\n\n  if (typeof(options) == 'string') {\n    buf = options === 'binary' ? new Array(16) : null;\n    options = null;\n  }\n  options = options || {};\n\n  var rnds = options.random || (options.rng || rng)();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = (rnds[6] & 0x0f) | 0x40;\n  rnds[8] = (rnds[8] & 0x3f) | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    for (var ii = 0; ii < 16; ++ii) {\n      buf[i + ii] = rnds[ii];\n    }\n  }\n\n  return buf || bytesToUuid(rnds);\n}\n\nmodule.exports = v4;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/v4.js?");

/***/ }),

/***/ "./node_modules/webpack-log/src/index.js":
/*!**********************************!*\
  !*** (webpack)-log/src/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* global window: true */\n/* eslint-disable\n  no-shadow,\n  no-param-reassign,\n  space-before-function-paren\n*/\nconst uuid = __webpack_require__(/*! uuid/v4 */ \"./node_modules/uuid/v4.js\");\nconst colors = __webpack_require__(/*! ansi-colors */ \"./node_modules/ansi-colors/index.js\");\nconst loglevel = __webpack_require__(/*! ./loglevel */ \"./node_modules/webpack-log/src/loglevel/index.js\");\n\nconst symbols = {\n  trace: colors.grey('₸'),\n  debug: colors.cyan('➤'),\n  info: colors.blue(colors.symbols.info),\n  warn: colors.yellow(colors.symbols.warning),\n  error: colors.red(colors.symbols.cross)\n};\n\nconst defaults = {\n  name: '<unknown>',\n  level: 'info',\n  unique: true\n};\n\nconst prefix = {\n  level (options) {\n    return symbols[options.level];\n  },\n  template: `{{level}} ${colors.gray('｢{{name}}｣')}: `\n};\n\nfunction log (options) {\n  const opts = Object.assign({}, defaults, options);\n  const { id } = options;\n\n  opts.prefix = Object.assign({}, prefix, options.prefix);\n  delete opts.id;\n\n  Object.defineProperty(opts, 'id', {\n    get() {\n      if (!id) {\n        return this.name + (opts.unique ? `-${uuid()}` : '');\n      }\n\n      return id;\n    }\n  });\n\n  if (opts.timestamp) {\n    opts.prefix.template = `[{{time}}] ${opts.prefix.template}`;\n  }\n\n  const log = loglevel.getLogger(opts);\n\n  if (!Object.prototype.hasOwnProperty.call(log, 'id')) {\n    Object.defineProperty(log, 'id', {\n      get() {\n        return opts.id;\n      }\n    });\n  }\n\n  return log;\n}\n\nmodule.exports = log;\n// NOTE: this is exported so that consumers of webpack-log can use the same\n// version of ansi-colors to decorate log messages without incurring additional\n// dependency overhead\nmodule.exports.colors = colors;\n// NOTE: This is an undocumented function solely for the purpose of tests.\n// Do not use this method in production code. Using in production code\n// may result in strange behavior.\nmodule.exports.delLogger = function delLogger(name) {\n  delete loglevel.loggers[name];\n};\n\nmodule.exports.factories = loglevel.factories;\n\n\n//# sourceURL=webpack:///(webpack)-log/src/index.js?");

/***/ }),

/***/ "./node_modules/webpack-log/src/loglevel/LogLevel.js":
/*!**********************************************!*\
  !*** (webpack)-log/src/loglevel/LogLevel.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* global window: true */\n/* eslint-disable\n  multiline-ternary,\n  no-param-reassign\n*/\nconst PrefixFactory = __webpack_require__(/*! ./PrefixFactory */ \"./node_modules/webpack-log/src/loglevel/PrefixFactory.js\");\nconst MethodFactory = __webpack_require__(/*! ./MethodFactory */ \"./node_modules/webpack-log/src/loglevel/MethodFactory.js\");\n\nconst defaults = {\n  name: +new Date(),\n  level: 'warn',\n  prefix: null,\n  factory: null\n};\n\nclass LogLevel {\n  constructor(options) {\n    // implement for some _very_ loose type checking. avoids getting into a\n    // circular require between MethodFactory and LogLevel\n    this.type = 'LogLevel';\n    this.options = Object.assign({}, defaults, options);\n    this.methodFactory = options.factory;\n\n    if (!this.methodFactory) {\n      const factory = options.prefix\n        ? new PrefixFactory(this, options.prefix)\n        : new MethodFactory(this);\n\n      this.methodFactory = factory;\n    }\n\n    if (!this.methodFactory.logger) {\n      this.methodFactory.logger = this;\n    }\n\n    this.name = options.name || '<unknown>';\n    // this.level is a setter, do this after setting up the factory\n    this.level = this.options.level;\n  }\n\n  get factory() {\n    return this.methodFactory;\n  }\n\n  set factory(factory) {\n    factory.logger = this;\n\n    this.methodFactory = factory;\n    this.methodFactory.replaceMethods(this.level);\n  }\n\n  enable() {\n    this.level = this.levels.TRACE;\n  }\n\n  disable() {\n    this.level = this.levels.SILENT;\n  }\n\n  get level() {\n    return this.currentLevel;\n  }\n\n  set level(logLevel) {\n    const level = this.methodFactory.distillLevel(logLevel);\n\n    if (level == null) {\n      throw new Error(\n        `loglevel: setLevel() called with invalid level: ${logLevel}`\n      );\n    }\n\n    this.currentLevel = level;\n    this.methodFactory.replaceMethods(level);\n\n    if (typeof console === 'undefined' && level < this.levels.SILENT) {\n      // eslint-disable-next-line no-console\n      console.warn(\n        'loglevel: console is undefined. The log will produce no output'\n      );\n    }\n  }\n\n  get levels() { // eslint-disable-line class-methods-use-this\n    return this.methodFactory.levels;\n  }\n}\n\nmodule.exports = LogLevel;\n\n\n//# sourceURL=webpack:///(webpack)-log/src/loglevel/LogLevel.js?");

/***/ }),

/***/ "./node_modules/webpack-log/src/loglevel/MethodFactory.js":
/*!***************************************************!*\
  !*** (webpack)-log/src/loglevel/MethodFactory.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* eslint-disable\n  arrow-parens,\n  multiline-ternary,\n  consistent-return,\n  no-param-reassign,\n  prefer-destructuring\n*/\nconst noop = () => {};\n\nconst levels = Symbol('levels');\nconst instance = Symbol('instance');\n\nclass MethodFactory {\n  constructor(logger) {\n    this[levels] = {\n      TRACE: 0,\n      DEBUG: 1,\n      INFO: 2,\n      WARN: 3,\n      ERROR: 4,\n      SILENT: 5\n    };\n\n    this[instance] = logger;\n  }\n\n  set logger(logger) {\n    this[instance] = logger;\n  }\n\n  get logger() {\n    return this[instance];\n  }\n\n  get levels() {\n    return this[levels];\n  }\n\n  get methods() {\n    return Object.keys(this.levels)\n      .map((key) => key.toLowerCase())\n      .filter((key) => key !== 'silent');\n  }\n\n  distillLevel(level) {\n    let result = level;\n\n    if (\n      typeof result === 'string' &&\n      typeof this.levels[result.toUpperCase()] !== 'undefined'\n    ) {\n      result = this.levels[result.toUpperCase()];\n    }\n\n    if (this.levelValid(result)) {\n      return result;\n    }\n  }\n\n  levelValid(level) {\n    if (\n      typeof level === 'number' && level >= 0 &&\n      level <= this.levels.SILENT\n    ) {\n      return true;\n    }\n\n    return false;\n  }\n  /**\n   * Build the best logging method possible for this env\n   * Wherever possible we want to bind, not wrap, to preserve stack traces.\n   * Since we're targeting modern browsers, there's no need to wait for the\n   * console to become available.\n   */\n  // eslint-disable-next-line class-methods-use-this\n  make(method) {\n    if (method === 'debug') {\n      method = 'log';\n    }\n\n    /* eslint-disable no-console */\n    if (typeof console[method] !== 'undefined') {\n      return this.bindMethod(console, method);\n    } else if (typeof console.log !== 'undefined') {\n      return this.bindMethod(console, 'log');\n    }\n\n    /* eslint-enable no-console */\n    return noop;\n  }\n\n  // eslint-disable-next-line class-methods-use-this\n  bindMethod(obj, name) {\n    const method = obj[name];\n\n    if (typeof method.bind === 'function') {\n      return method.bind(obj);\n    }\n\n    try {\n      return Function.prototype.bind.call(method, obj);\n    } catch (err) {\n      // Missing bind shim or IE8 + Modernizr, fallback to wrapping\n      return function result() {\n        // eslint-disable-next-line prefer-rest-params\n        return Function.prototype.apply.apply(method, [obj, arguments]);\n      };\n    }\n  }\n\n  replaceMethods(logLevel) {\n    const level = this.distillLevel(logLevel);\n\n    if (level == null) {\n      throw new Error(\n        `loglevel: replaceMethods() called with invalid level: ${logLevel}`\n      );\n    }\n\n    if (!this.logger || this.logger.type !== 'LogLevel') {\n      throw new TypeError(\n        'loglevel: Logger is undefined or invalid. Please specify a valid Logger instance.'\n      );\n    }\n\n    this.methods.forEach((method) => {\n      this.logger[method] = (this.levels[method.toUpperCase()] < level)\n        ? noop\n        : this.make(method);\n    });\n\n    // Define log.log as an alias for log.debug\n    this.logger.log = this.logger.debug;\n  }\n}\n\nmodule.exports = MethodFactory;\n\n\n//# sourceURL=webpack:///(webpack)-log/src/loglevel/MethodFactory.js?");

/***/ }),

/***/ "./node_modules/webpack-log/src/loglevel/PrefixFactory.js":
/*!***************************************************!*\
  !*** (webpack)-log/src/loglevel/PrefixFactory.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* eslint-disable\n  no-param-reassign,\n  space-before-function-paren\n*/\nconst MethodFactory = __webpack_require__(/*! ./MethodFactory */ \"./node_modules/webpack-log/src/loglevel/MethodFactory.js\");\n\nconst defaults = {\n  name (options) {\n    return options.logger.name;\n  },\n  time () {\n    return new Date().toTimeString().split(' ')[0];\n  },\n  level (options) {\n    return `[${options.level}]`;\n  },\n  template: '{{time}} {{level}} '\n};\n\nclass PrefixFactory extends MethodFactory {\n  constructor(logger, options) {\n    super(logger);\n\n    this.options = Object.assign({}, defaults, options);\n  }\n\n  interpolate(level) {\n    return this.options.template.replace(/{{([^{}]*)}}/g, (stache, prop) => {\n      const fn = this.options[prop];\n\n      if (fn) {\n        return fn({ level, logger: this.logger });\n      }\n\n      return stache;\n    });\n  }\n\n  make(method) {\n    const og = super.make(method);\n\n    return (...args) => {\n      const [first] = args;\n\n      const output = this.interpolate(method);\n\n      if (typeof first === 'string') {\n        args[0] = output + first;\n      } else {\n        args.unshift(output);\n      }\n\n      og(...args);\n    };\n  }\n}\n\nmodule.exports = PrefixFactory;\n\n\n//# sourceURL=webpack:///(webpack)-log/src/loglevel/PrefixFactory.js?");

/***/ }),

/***/ "./node_modules/webpack-log/src/loglevel/index.js":
/*!*******************************************!*\
  !*** (webpack)-log/src/loglevel/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* global window: true */\n/* eslint-disable\n  no-shadow,\n  no-param-reassign,\n  space-before-function-paren\n*/\nconst LogLevel = __webpack_require__(/*! ./LogLevel */ \"./node_modules/webpack-log/src/loglevel/LogLevel.js\");\nconst MethodFactory = __webpack_require__(/*! ./MethodFactory */ \"./node_modules/webpack-log/src/loglevel/MethodFactory.js\");\nconst PrefixFactory = __webpack_require__(/*! ./PrefixFactory */ \"./node_modules/webpack-log/src/loglevel/PrefixFactory.js\");\n\nconst defaultLogger = new LogLevel({ name: 'default' });\nconst cache = { default: defaultLogger };\n\n// Grab the current global log variable in case of overwrite\nconst existing = (typeof window !== 'undefined') ? window.log : null;\n\nconst loglevel = Object.assign(defaultLogger, {\n  get factories() {\n    return {\n      MethodFactory,\n      PrefixFactory\n    };\n  },\n  get loggers() {\n    return cache;\n  },\n  getLogger(options) {\n    if (typeof options === 'string') {\n      options = { name: options };\n    }\n\n    if (!options.id) {\n      options.id = options.name;\n    }\n\n    const { name, id } = options;\n    const defaults = { level: defaultLogger.level };\n\n    if (typeof name !== 'string' || !name || !name.length) {\n      throw new TypeError('You must supply a name when creating a logger');\n    }\n\n    let logger = cache[id];\n\n    if (!logger) {\n      logger = new LogLevel(Object.assign({}, defaults, options));\n\n      cache[id] = logger;\n    }\n\n    return logger;\n  },\n  noConflict() {\n    if (typeof window !== 'undefined' && window.log === defaultLogger) {\n      window.log = existing;\n    }\n\n    return defaultLogger;\n  }\n});\n\nmodule.exports = loglevel;\n\n\n//# sourceURL=webpack:///(webpack)-log/src/loglevel/index.js?");

/***/ }),

/***/ "./src/components/authenticate.js":
/*!****************************************!*\
  !*** ./src/components/authenticate.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _prompt = _interopRequireDefault(__webpack_require__(/*! prompt */ \"prompt\"));\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar _default = function _default(config, cookieJar$) {\n  return _rxjs.Observable.create(function (observer) {\n    console.log(\"\\nauthenticate:\\n\");\n    var schema = {\n      properties: {\n        user: {\n          required: true\n        },\n        password: {\n          hidden: true\n        }\n      }\n    };\n\n    var execCurl = function execCurl(user, password) {\n      (0, _child_process.exec)(\"curl -s -L --ntlm -u \".concat(user, \":\").concat(password, \" --insecure -c - https://\").concat(config.serverConfig.host, \"/qrs/about?xrfkey=0123456789abcdef --header \\\"x-qlik-xrfkey: 0123456789abcdef\\\" --header \\\"User-Agent: Windows\\\"\"), function (error, stdout, stderr) {\n        if (error !== null) {\n          observer.error(error);\n        } else if (stdout.length === 0) {\n          observer.error({\n            message: \"authentication failed\",\n            authenticate: true\n          });\n        } else {\n          cookieJar$.next(stdout.split(\"X-Qlik-Session\")[1].trim());\n          observer.next({\n            message: \"authentication successful\"\n          });\n          observer.complete();\n        }\n      });\n    };\n\n    if (config.serverConfig.user && config.serverConfig.password) {\n      execCurl(config.serverConfig.user, config.serverConfig.password);\n    } else {\n      _prompt[\"default\"].start();\n\n      _prompt[\"default\"].get(schema, function (err, result) {\n        execCurl(result.user, result.password);\n      });\n    }\n  }).pipe((0, _operators.retryWhen)(function (errors) {\n    return errors.pipe((0, _operators.take)(3), (0, _operators.filter)(function (err) {\n      return err.authenticate;\n    }), (0, _operators.tap)(function (t) {\n      return console.log(\"\\n\\n\".concat(t.message));\n    }));\n  }), (0, _operators.tap)(function (auth) {\n    return console.log(\"\".concat(auth.message, \"\\n\"));\n  }));\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/authenticate.js?");

/***/ }),

/***/ "./src/components/build.js":
/*!*********************************!*\
  !*** ./src/components/build.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _default = function _default(inputAccessorFunction) {\n  var accessorFunction;\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n  return function (obs$) {\n    return obs$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (_ref) {\n      var compiler = _ref.compiler,\n          config = _ref.config,\n          watch = _ref.watch;\n      return _rxjs.Observable.create(function (observer) {\n        console.log(\"building \".concat(config.extension, \"...\\n\"));\n        /* Watch */\n\n        if (watch) {\n          compiler.watch({}, function (err, stats) {\n            console.log(\"[webpack:build]\", stats.toString({\n              colors: true\n            }), \"\\n\");\n            observer.next(\"built\");\n            if (err !== null) observer.error(err);\n          });\n        } else {\n          /* Build */\n          compiler.run(function (err, stats) {\n            console.log(\"[webpack:build]\", stats.toString({\n              colors: true\n            }), \"\\n\");\n            if (err !== null) observer.error(err);\n            observer.next(\"built\");\n            observer.complete();\n          });\n        }\n      });\n    }));\n  };\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/build.js?");

/***/ }),

/***/ "./src/components/defineWebpack.js":
/*!*****************************************!*\
  !*** ./src/components/defineWebpack.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _fsExtra = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _path = _interopRequireDefault(__webpack_require__(/*! path */ \"path\"));\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _webpack = _interopRequireDefault(__webpack_require__(/*! webpack */ \"webpack\"));\n\nvar _copyWebpackPlugin = _interopRequireDefault(__webpack_require__(/*! copy-webpack-plugin */ \"./node_modules/copy-webpack-plugin/dist/cjs.js\"));\n\nvar _disableOutputWebpackPlugin = _interopRequireDefault(__webpack_require__(/*! disable-output-webpack-plugin */ \"./node_modules/disable-output-webpack-plugin/index.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar _default = function _default(inputAccessorFunction) {\n  var accessorFunction;\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n  return function (obs$) {\n    return obs$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (config) {\n      return _rxjs.Observable.create(function (observer) {\n        var webpackConfig;\n\n        switch (config.mode) {\n          /** Compile Config */\n          case \"compile\":\n            var entryExists = (0, _fsExtra.stat)(_path[\"default\"].resolve(process.cwd(), config.compile.entry));\n            webpackConfig = entryExists.then(function () {\n              return {\n                entry: [\"\".concat(config.compile.entry)],\n                output: {\n                  path: \"\".concat(_path[\"default\"].resolve(process.cwd(), config.output + \"/\" + config.extension)),\n                  filename: \"\".concat(config.extension, \".js\")\n                },\n                mode: \"development\",\n                module: {\n                  rules: [{\n                    test: /\\.js$/,\n                    exclude: /node_modules/,\n                    loader: \"babel-loader\",\n                    options: {\n                      presets: [\"@babel/preset-env\"],\n                      plugins: [\"@babel/plugin-proposal-object-rest-spread\", \"@babel/plugin-transform-modules-commonjs\"]\n                    }\n                  }, {\n                    test: /\\.html$/,\n                    loader: \"html-loader\"\n                  }, {\n                    test: /\\.css$/,\n                    use: [{\n                      loader: \"style-loader\"\n                    }, {\n                      loader: \"css-loader\"\n                    }]\n                  }]\n                },\n                plugins: [new _copyWebpackPlugin[\"default\"]([{\n                  // qext\n                  from: _path[\"default\"].resolve(process.cwd(), \"\".concat(config.compile.qext)),\n                  to: _path[\"default\"].resolve(process.cwd(), \"\".concat(config.output, \"/\").concat(config.extension, \"/\").concat(config.extension, \".qext\"))\n                }, {\n                  // static\n                  from: _path[\"default\"].resolve(process.cwd(), config.compile[\"static\"]),\n                  to: _path[\"default\"].resolve(process.cwd(), \"\".concat(config.output, \"/\").concat(config.extension, \"/static\"))\n                }])]\n              };\n            })[\"catch\"](function () {\n              return observer.error(\"entry not found\\n\");\n            });\n            break;\n\n          /** Vanilla Config */\n\n          case \"vanilla\":\n            var entryContents = (0, _fsExtra.readdir)(_path[\"default\"].resolve(process.cwd(), config.vanilla.entry)).then(function (files) {\n              return files.filter(function (file) {\n                return file.indexOf(\".js\") > -1;\n              });\n            }).then(function (jsFiles) {\n              return \"\".concat(config.vanilla.entry, \"/\").concat(jsFiles[0]);\n            });\n            webpackConfig = entryContents.then(function (entryFile) {\n              return {\n                entry: [entryFile],\n                mode: \"development\",\n                plugins: [new _disableOutputWebpackPlugin[\"default\"](), new _copyWebpackPlugin[\"default\"]([{\n                  // qext\n                  from: _path[\"default\"].resolve(process.cwd(), \"\".concat(config.vanilla.entry)),\n                  to: _path[\"default\"].resolve(process.cwd(), \"\".concat(config.output, \"/\").concat(config.extension))\n                }, {\n                  // static\n                  from: _path[\"default\"].resolve(process.cwd(), config.vanilla[\"static\"]),\n                  to: _path[\"default\"].resolve(process.cwd(), \"\".concat(config.output, \"/\").concat(config.extension, \"/static\"))\n                }])]\n              };\n            });\n            break;\n\n          default:\n            observer.error(\"mode not defined correctly\");\n        }\n\n        webpackConfig.then(function (config) {\n          observer.next((0, _webpack[\"default\"])(config));\n          observer.complete();\n        });\n      });\n    }));\n  };\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/defineWebpack.js?");

/***/ }),

/***/ "./src/components/deleteDist.js":
/*!**************************************!*\
  !*** ./src/components/deleteDist.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar fs = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _default = function _default(inputAccessorFunction) {\n  var accessorFunction;\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n  return function (extension$) {\n    return extension$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (output) {\n      return _rxjs.Observable.create(function (observer) {\n        var removeDist = fs.remove(\"\".concat(output));\n        removeDist.then(function () {\n          observer.next(\"\".concat(output, \" removed\"));\n          observer.complete();\n        });\n      });\n    }), (0, _operators.tap)(function (distStatus) {\n      return console.log(\"\\n\".concat(distStatus, \"\\n\"));\n    }));\n  };\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/deleteDist.js?");

/***/ }),

/***/ "./src/components/deployToDesktop.js":
/*!*******************************************!*\
  !*** ./src/components/deployToDesktop.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar fs = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _default = function _default(inputAccessorFunction) {\n  var accessorFunction;\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n  return function (extension$) {\n    return extension$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (config) {\n      return _rxjs.Observable.create(function (observer) {\n        var emptyDest = fs.emptyDir(\"\".concat(config.desktopConfig.destination, \"/\").concat(config.extension));\n        var copyDist = emptyDest.then(function () {\n          return fs.copy(\"\".concat(config.output, \"/\").concat(config.extension), \"\".concat(config.desktopConfig.destination, \"/\").concat(config.extension));\n        });\n        copyDist.then(function () {\n          observer.next(\"dist copied\");\n          observer.complete();\n        })[\"catch\"](function (err) {\n          return observer.error(err);\n        });\n      });\n    }));\n  };\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/deployToDesktop.js?");

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nObject.defineProperty(exports, \"qextConfig\", {\n  enumerable: true,\n  get: function get() {\n    return _qextConfig[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"deleteDist\", {\n  enumerable: true,\n  get: function get() {\n    return _deleteDist[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"defineWebpack\", {\n  enumerable: true,\n  get: function get() {\n    return _defineWebpack[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"build\", {\n  enumerable: true,\n  get: function get() {\n    return _build[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"zip\", {\n  enumerable: true,\n  get: function get() {\n    return _zip[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"uploadExtension\", {\n  enumerable: true,\n  get: function get() {\n    return _uploadExtension[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"authenticate\", {\n  enumerable: true,\n  get: function get() {\n    return _authenticate[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"deployToDesktop\", {\n  enumerable: true,\n  get: function get() {\n    return _deployToDesktop[\"default\"];\n  }\n});\n\nvar _qextConfig = _interopRequireDefault(__webpack_require__(/*! ./qextConfig */ \"./src/components/qextConfig.js\"));\n\nvar _deleteDist = _interopRequireDefault(__webpack_require__(/*! ./deleteDist */ \"./src/components/deleteDist.js\"));\n\nvar _defineWebpack = _interopRequireDefault(__webpack_require__(/*! ./defineWebpack */ \"./src/components/defineWebpack.js\"));\n\nvar _build = _interopRequireDefault(__webpack_require__(/*! ./build */ \"./src/components/build.js\"));\n\nvar _zip = _interopRequireDefault(__webpack_require__(/*! ./zip */ \"./src/components/zip.js\"));\n\nvar _uploadExtension = _interopRequireDefault(__webpack_require__(/*! ./uploadExtension */ \"./src/components/uploadExtension.js\"));\n\nvar _authenticate = _interopRequireDefault(__webpack_require__(/*! ./authenticate */ \"./src/components/authenticate.js\"));\n\nvar _deployToDesktop = _interopRequireDefault(__webpack_require__(/*! ./deployToDesktop */ \"./src/components/deployToDesktop.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n//# sourceURL=webpack:///./src/components/index.js?");

/***/ }),

/***/ "./src/components/qextConfig.js":
/*!**************************************!*\
  !*** ./src/components/qextConfig.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _fsExtra = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _default = function _default(inputAccessorFunction) {\n  var accessorFunction;\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n  return function (extension$) {\n    return extension$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (configFile) {\n      return _rxjs.Observable.create(function (observer) {\n        var getConfigFile = (0, _fsExtra.stat)(configFile);\n        var configFileExists = getConfigFile.then(function () {\n          return (0, _fsExtra.readJson)(configFile);\n        })[\"catch\"](function (err) {\n          return observer.error(\"\".concat(configFile, \" not found\"));\n        });\n        configFileExists.then(function (config) {\n          // extension property not defined\n          if (config.extension === undefined) observer.error(\"extension property not defined in \".concat(configFile)); // Property defined\n          else {\n              // output property not defined\n              if (config.output === undefined) observer.error(\"output property not defined in \".concat(configFile)); // mode property not defined\n              else if (config.mode === undefined) observer.error(\"mode property not defined in \".concat(configFile)); // mode value not vanilla or compile\n                else if ([\"vanilla\", \"compile\"].indexOf(config.mode) === -1) observer.error(\"mode value must be set to \\\"vanilla\\\" or \\\"compile\\\"\"); // Vanilla mode\n                  else if (config.mode === \"vanilla\") {\n                      // vanilla property not defined\n                      if (config.vanilla === undefined) observer.error(\"vanilla property not defined in \".concat(configFile)); // vanilla-entry property not defined\n                      else if (config.vanilla.entry === undefined) observer.error(\"entry property not defined in \\\"vanilla\\\"\");\n                    } // Compile mode\n                    else if (config.mode === \"compile\") {\n                        // compile property not defined\n                        if (config.compile === undefined) observer.error(\"compile property not defined in \".concat(configFile)); // compile-entry property not defined\n                        else if (config.compile.entry === undefined) observer.error(\"entry property not defined in \\\"compile\\\"\"); // compile-qext property not defined\n                          else if (config.compile.qext === undefined) observer.error(\"qext property not defined in \\\"compile\\\"\");\n                      } // Deploy Desktop\n\n              if (config.deploy === \"desktop\") {\n                // desktopConfig not defined\n                if (config.desktopConfig === undefined) observer.error(\"desktopConfig property not defined in \".concat(configFile)); // desktopConfig-destination property not defined\n                else if (config.desktopConfig.destination === undefined) observer.error(\"destination not defined in \\\"desktopConfig\\\"\");\n              } // Deploy Server\n              else if (config.deploy === \"server\") {\n                  // serverConfig not defined\n                  if (config.serverConfig === undefined) observer.error(\"serverConfig property not defined in \".concat(configFile)); // authenticate not defined\n                  else if (config.authenticate === undefined) observer.error(\"authenticate property not defined in \".concat(configFile));else {\n                      // Header Authentication\n                      if (config.authenticate === \"header\") {\n                        // host not defined\n                        if (config.serverConfig.host === undefined) observer.error(\"host property not defined in serverConfig\"); // hdr-usr not defined\n                        else if (config.serverConfig[\"hdr-usr\"] === undefined) observer.error(\"hdr-usr property not defined in serverConfig\");\n                      } // Windows Authentication\n\n\n                      if (config.authenticate === \"windows\") {\n                        // host not defined\n                        if (config.serverConfig.host === undefined) observer.error(\"host property not defined in serverConfig\");\n                      }\n                    }\n                }\n            }\n          observer.next(config);\n          observer.complete();\n        })[\"catch\"](function (err) {\n          return observer.error(\"\".concat(configFile, \" cannot be read\"));\n        });\n      });\n    }));\n  };\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/qextConfig.js?");

/***/ }),

/***/ "./src/components/uploadExtension.js":
/*!*******************************************!*\
  !*** ./src/components/uploadExtension.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _http = _interopRequireDefault(__webpack_require__(/*! http */ \"http\"));\n\nvar _https = _interopRequireDefault(__webpack_require__(/*! https */ \"https\"));\n\nvar _fsExtra = _interopRequireDefault(__webpack_require__(/*! fs-extra */ \"fs-extra\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar _default = function _default(inputAccessorFunction) {\n  var accessorFunction;\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n  return function (obs$) {\n    return obs$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (_ref) {\n      var config = _ref.config,\n          cookie = _ref.cookie;\n      return _rxjs.Observable.create(function (observer) {\n        var http = config.serverConfig.isSecure ? _https[\"default\"] : _http[\"default\"];\n        var prefix = config.serverConfig.prefix ? \"/\".concat(config.serverConfig.prefix) : \"\";\n        var headers = config.authenticate === \"windows\" ? {\n          \"x-qlik-xrfkey\": \"123456789abcdefg\",\n          \"content-type\": \"application/zip\",\n          Cookie: \"X-Qlik-Session=\".concat(cookie)\n        } : config.authenticate === \"header\" ? {\n          \"x-qlik-xrfkey\": \"123456789abcdefg\",\n          \"content-type\": \"application/zip\",\n          \"hdr-usr\": config.serverConfig[\"hdr-usr\"]\n        } : {\n          \"x-qlik-xrfkey\": \"123456789abcdefg\",\n          \"content-type\": \"application/zip\"\n        };\n        var options = {\n          method: \"DELETE\",\n          rejectUnauthorized: config.serverConfig.allowSelfSignedCertificate === true ? false : true,\n          host: config.serverConfig.host,\n          port: config.serverConfig.port ? config.serverConfig.port : null,\n          path: \"\".concat(prefix, \"/qrs/extension/name/\").concat(config.extension, \"?xrfkey=123456789abcdefg\"),\n          headers: headers\n        };\n        var request = http.request(options, function (res) {\n          var chunks = [];\n          res.on(\"data\", function (chunk) {\n            return chunks.push(chunk);\n          }).on(\"end\", function () {\n            if (res.statusCode === 403) {\n              observer.error({\n                authenticate: true\n              });\n            } else if (res.statusCode === 400) {\n              observer.next({\n                message: \"not found\",\n                config: config,\n                cookie: cookie\n              });\n              observer.complete();\n            } else if (res.statusCode >= 200 && res.statusCode < 300) {\n              observer.next({\n                message: \"deleted\",\n                config: config,\n                cookie: cookie\n              });\n              observer.complete();\n            } else {\n              observer.error({\n                statusCode: res.statusCode,\n                statusMessage: res.statusMessage\n              });\n            }\n          }).on(\"error\", function (err) {\n            observer.error(err);\n          });\n        });\n        request.end();\n      });\n    }), (0, _operators.switchMap)(function (_ref2) {\n      var config = _ref2.config,\n          cookie = _ref2.cookie;\n      return _rxjs.Observable.create(function (observer) {\n        var http = config.serverConfig.isSecure ? _https[\"default\"] : _http[\"default\"];\n        var prefix = config.serverConfig.prefix ? \"/\".concat(config.serverConfig.prefix) : \"\";\n        var headers = config.authenticate === \"windows\" ? {\n          \"x-qlik-xrfkey\": \"123456789abcdefg\",\n          \"content-type\": \"application/zip\",\n          Cookie: \"X-Qlik-Session=\".concat(cookie)\n        } : config.authenticate === \"header\" ? {\n          \"x-qlik-xrfkey\": \"123456789abcdefg\",\n          \"content-type\": \"application/zip\",\n          \"hdr-usr\": config.serverConfig[\"hdr-usr\"]\n        } : {\n          \"x-qlik-xrfkey\": \"123456789abcdefg\",\n          \"content-type\": \"application/zip\"\n        };\n        var extensionPath = \"\".concat(config.output, \"/\").concat(config.extension, \".zip\");\n        var options = {\n          method: \"POST\",\n          rejectUnauthorized: config.serverConfig.allowSelfSignedCertificate === true ? false : true,\n          host: config.serverConfig.host,\n          port: config.serverConfig.port ? config.serverConfig.port : null,\n          path: \"\".concat(prefix, \"/qrs/extension/upload?xrfkey=123456789abcdefg\"),\n          headers: headers\n        };\n\n        var readZipFile = _fsExtra[\"default\"].readFile(extensionPath);\n\n        readZipFile.then(function (data) {\n          var request = http.request(options, function (res) {\n            var chunks = [];\n            res.on(\"data\", function (chunk) {\n              return chunks.push(chunk);\n            }).on(\"end\", function () {\n              if (res.statusCode === 403 || res.statusCode === 302) {\n                observer.error({\n                  authenticate: true\n                });\n              } else if (res.statusCode >= 200 && res.statusCode < 300) {\n                observer.next(\"uploaded\");\n                observer.complete();\n              } else {\n                observer.error({\n                  statusCode: res.statusCode,\n                  statusMessage: res.statusMessage\n                });\n              }\n            }).on(\"error\", function (err) {\n              observer.error(err);\n            });\n          });\n          request.write(data);\n          request.end();\n        });\n      });\n    }), (0, _operators.tap)(function (uplodStatus) {\n      return console.log(\"uploaded\\n\");\n    }));\n  };\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/uploadExtension.js?");

/***/ }),

/***/ "./src/components/zip.js":
/*!*******************************!*\
  !*** ./src/components/zip.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _zipDir = _interopRequireDefault(__webpack_require__(/*! zip-dir */ \"zip-dir\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar _default = function _default(inputAccessorFunction) {\n  var accessorFunction;\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n  return function (obs$) {\n    return obs$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (config) {\n      return _rxjs.Observable.create(function (observer) {\n        // Define output of zip file\n        var outputDir = config.output; // Define inupt directory to be zipped\n\n        var inputDir = \"\".concat(outputDir, \"/\").concat(config.extension);\n        (0, _zipDir[\"default\"])(inputDir, {\n          saveTo: \"\".concat(outputDir, \"/\").concat(config.extension, \".zip\")\n        }, function (err, buffer) {\n          observer.next('zipped');\n          if (err !== null) observer.error(err);\n          observer.complete();\n        });\n      });\n    }));\n  };\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/zip.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _components = __webpack_require__(/*! ./components */ \"./src/components/index.js\");\n\nvar _commander = _interopRequireDefault(__webpack_require__(/*! commander */ \"commander\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n_commander[\"default\"].option(\"-w, --watch\", \"Watch\").parse(process.argv);\n/* Get Config */\n\n\nvar configFile = \"./qext.config.json\";\nvar qextConfig$ = (0, _rxjs.of)(configFile).pipe((0, _components.qextConfig)(), (0, _operators.share)(1));\n/* Cookie Jar */\n\nvar cookieJar$ = new _rxjs.BehaviorSubject(null);\n/* Initialize authentication */\n\nvar authenticate$ = qextConfig$.pipe((0, _operators.mergeMap)(function (config) {\n  return (0, _rxjs.iif)(\n  /* if deploying.. */\n  function () {\n    return config.authenticate === \"windows\";\n  },\n  /* authenticate */\n  (0, _components.authenticate)(config, cookieJar$),\n  /* else, skip authentication */\n  (0, _rxjs.of)(\"skipping authentication\"));\n}), (0, _operators.share)(1));\n/* Remove Dist */\n\nvar removeDist$ = authenticate$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _components.deleteDist)(function (_ref) {\n  var _ref2 = _slicedToArray(_ref, 2),\n      authStatus = _ref2[0],\n      config = _ref2[1];\n\n  return config.output;\n}), (0, _operators.share)(1));\nvar webpack$ = removeDist$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _components.defineWebpack)(), (0, _operators.share)(1));\n/* Build */\n\nvar build$ = webpack$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _components.build)(function (_ref3) {\n  var _ref4 = _slicedToArray(_ref3, 2),\n      webpack = _ref4[0],\n      config = _ref4[1];\n\n  return {\n    compiler: webpack,\n    config: config,\n    watch: _commander[\"default\"].watch\n  };\n}), (0, _operators.share)(1));\n/* Zip */\n\nvar zip$ = build$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _components.zip)());\n/* Upload */\n\nvar upload$ = zip$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _operators.filter)(function (config) {\n  return config.deploy === \"server\";\n}), (0, _operators.withLatestFrom)(cookieJar$), (0, _components.uploadExtension)(function (_ref5) {\n  var _ref6 = _slicedToArray(_ref5, 2),\n      config = _ref6[0],\n      cookie = _ref6[1];\n\n  return {\n    config: config,\n    cookie: cookie\n  };\n}));\n/* Deploy */\n\nvar deployToDesktop$ = build$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _operators.filter)(function (config) {\n  return config.deploy === \"desktop\";\n}), (0, _components.deployToDesktop)());\n(0, _rxjs.merge)(upload$, deployToDesktop$).subscribe(function () {}, function (err) {\n  return console.error(err);\n});\nprocess.on(\"SIGINT\", function () {\n  console.info(\"\\nqExt Ended.\");\n  process.exit();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"assert\");\n\n//# sourceURL=webpack:///external_%22assert%22?");

/***/ }),

/***/ "cacache":
/*!**************************!*\
  !*** external "cacache" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cacache\");\n\n//# sourceURL=webpack:///external_%22cacache%22?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "commander":
/*!****************************!*\
  !*** external "commander" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"commander\");\n\n//# sourceURL=webpack:///external_%22commander%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"events\");\n\n//# sourceURL=webpack:///external_%22events%22?");

/***/ }),

/***/ "find-cache-dir":
/*!*********************************!*\
  !*** external "find-cache-dir" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"find-cache-dir\");\n\n//# sourceURL=webpack:///external_%22find-cache-dir%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs-extra\");\n\n//# sourceURL=webpack:///external_%22fs-extra%22?");

/***/ }),

/***/ "fs.realpath":
/*!******************************!*\
  !*** external "fs.realpath" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs.realpath\");\n\n//# sourceURL=webpack:///external_%22fs.realpath%22?");

/***/ }),

/***/ "glob-parent":
/*!******************************!*\
  !*** external "glob-parent" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"glob-parent\");\n\n//# sourceURL=webpack:///external_%22glob-parent%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

/***/ }),

/***/ "inflight":
/*!***************************!*\
  !*** external "inflight" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"inflight\");\n\n//# sourceURL=webpack:///external_%22inflight%22?");

/***/ }),

/***/ "inherits":
/*!***************************!*\
  !*** external "inherits" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"inherits\");\n\n//# sourceURL=webpack:///external_%22inherits%22?");

/***/ }),

/***/ "is-glob":
/*!**************************!*\
  !*** external "is-glob" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"is-glob\");\n\n//# sourceURL=webpack:///external_%22is-glob%22?");

/***/ }),

/***/ "loader-utils":
/*!*******************************!*\
  !*** external "loader-utils" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"loader-utils\");\n\n//# sourceURL=webpack:///external_%22loader-utils%22?");

/***/ }),

/***/ "minimatch":
/*!****************************!*\
  !*** external "minimatch" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"minimatch\");\n\n//# sourceURL=webpack:///external_%22minimatch%22?");

/***/ }),

/***/ "normalize-path":
/*!*********************************!*\
  !*** external "normalize-path" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"normalize-path\");\n\n//# sourceURL=webpack:///external_%22normalize-path%22?");

/***/ }),

/***/ "once":
/*!***********************!*\
  !*** external "once" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"once\");\n\n//# sourceURL=webpack:///external_%22once%22?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os\");\n\n//# sourceURL=webpack:///external_%22os%22?");

/***/ }),

/***/ "p-limit":
/*!**************************!*\
  !*** external "p-limit" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"p-limit\");\n\n//# sourceURL=webpack:///external_%22p-limit%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "path-is-absolute":
/*!***********************************!*\
  !*** external "path-is-absolute" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path-is-absolute\");\n\n//# sourceURL=webpack:///external_%22path-is-absolute%22?");

/***/ }),

/***/ "pify":
/*!***********************!*\
  !*** external "pify" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pify\");\n\n//# sourceURL=webpack:///external_%22pify%22?");

/***/ }),

/***/ "prompt":
/*!*************************!*\
  !*** external "prompt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"prompt\");\n\n//# sourceURL=webpack:///external_%22prompt%22?");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rxjs\");\n\n//# sourceURL=webpack:///external_%22rxjs%22?");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rxjs/operators\");\n\n//# sourceURL=webpack:///external_%22rxjs/operators%22?");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serialize-javascript\");\n\n//# sourceURL=webpack:///external_%22serialize-javascript%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "zip-dir":
/*!**************************!*\
  !*** external "zip-dir" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"zip-dir\");\n\n//# sourceURL=webpack:///external_%22zip-dir%22?");

/***/ })

/******/ });