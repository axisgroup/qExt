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

/***/ "./src/components/authenticate.js":
/*!****************************************!*\
  !*** ./src/components/authenticate.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _child_process = __webpack_require__(/*! child_process */ \"child_process\");\n\nvar _prompt = __webpack_require__(/*! prompt */ \"prompt\");\n\nvar _prompt2 = _interopRequireDefault(_prompt);\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (config, cookieJar$) {\n  return _rxjs.Observable.create(function (observer) {\n    console.log('\\nauthenticate:\\n');\n\n    var schema = {\n      properties: {\n        user: {\n          required: true\n        },\n        password: {\n          hidden: true\n        }\n      }\n    };\n\n    _prompt2.default.start();\n\n    _prompt2.default.get(schema, function (err, result) {\n\n      (0, _child_process.exec)('curl -s -L --ntlm -u ' + result.user + ':' + result.password + ' --insecure -c - https://' + config.serverConfig.host + '/qrs/about?xrfkey=0123456789abcdef --header \"x-qlik-xrfkey: 0123456789abcdef\" --header \"User-Agent: Windows\"', function (error, stdout, stderr) {\n\n        if (error !== null) {\n          observer.error(error);\n        } else if (stdout.length === 0) {\n          observer.error({\n            message: 'authentication failed',\n            authenticate: true\n          });\n        } else {\n          cookieJar$.next(stdout.split('X-Qlik-Session')[1].trim());\n          observer.next({ message: 'authentication successful' });\n          observer.complete();\n        }\n      });\n    });\n  }).pipe((0, _operators.retryWhen)(function (errors) {\n    return errors.pipe((0, _operators.take)(3), (0, _operators.filter)(function (err) {\n      return err.authenticate;\n    }), (0, _operators.tap)(function (t) {\n      return console.log('\\n\\n' + t.message);\n    }));\n  }), (0, _operators.tap)(function (auth) {\n    return console.log(auth.message + '\\n');\n  }));\n};\n\n//# sourceURL=webpack:///./src/components/authenticate.js?");

/***/ }),

/***/ "./src/components/build.js":
/*!*********************************!*\
  !*** ./src/components/build.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nexports.default = function (_ref) {\n  var inputAccessorFunction = _ref.inputAccessorFunction,\n      watch = _ref.watch;\n\n  var accessorFunction = void 0;\n\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n\n  return function (obs$) {\n    return obs$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (_ref2) {\n      var _ref3 = _slicedToArray(_ref2, 2),\n          compiler = _ref3[0],\n          config = _ref3[1];\n\n      return _rxjs.Observable.create(function (observer) {\n        console.log('building ' + config.extension + '...\\n');\n        /* Watch */\n        if (config.compile.watch) {\n          compiler.watch({}, function (err, stats) {\n            console.log('[webpack:build]', stats.toString({ colors: true }), '\\n');\n\n            observer.next('built');\n            if (err !== null) observer.error(err);\n          });\n        }\n\n        /* Build */\n        else {\n            compiler.run(function (err, stats) {\n              console.log('[webpack:build]', stats.toString({ colors: true }), '\\n');\n\n              if (err !== null) observer.error(err);\n\n              observer.next('built');\n              observer.complete();\n            });\n          }\n      });\n    }));\n  };\n};\n\n//# sourceURL=webpack:///./src/components/build.js?");

/***/ }),

/***/ "./src/components/component-exports.js":
/*!*********************************************!*\
  !*** ./src/components/component-exports.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.authenticate = exports.uploadExtension = exports.zip = exports.build = exports.defineWebpack = exports.copySrc = exports.copyStatic = exports.copyQext = exports.deleteDist = exports.qextConfig = undefined;\n\nvar _qextConfig = __webpack_require__(/*! ./qextConfig */ \"./src/components/qextConfig.js\");\n\nvar _qextConfig2 = _interopRequireDefault(_qextConfig);\n\nvar _deleteDist = __webpack_require__(/*! ./deleteDist */ \"./src/components/deleteDist.js\");\n\nvar _deleteDist2 = _interopRequireDefault(_deleteDist);\n\nvar _copyQext = __webpack_require__(/*! ./copyQext */ \"./src/components/copyQext.js\");\n\nvar _copyQext2 = _interopRequireDefault(_copyQext);\n\nvar _copyStatic = __webpack_require__(/*! ./copyStatic */ \"./src/components/copyStatic.js\");\n\nvar _copyStatic2 = _interopRequireDefault(_copyStatic);\n\nvar _copySrc = __webpack_require__(/*! ./copySrc */ \"./src/components/copySrc.js\");\n\nvar _copySrc2 = _interopRequireDefault(_copySrc);\n\nvar _defineWebpack = __webpack_require__(/*! ./defineWebpack */ \"./src/components/defineWebpack.js\");\n\nvar _defineWebpack2 = _interopRequireDefault(_defineWebpack);\n\nvar _build = __webpack_require__(/*! ./build */ \"./src/components/build.js\");\n\nvar _build2 = _interopRequireDefault(_build);\n\nvar _zip = __webpack_require__(/*! ./zip */ \"./src/components/zip.js\");\n\nvar _zip2 = _interopRequireDefault(_zip);\n\nvar _uploadExtension = __webpack_require__(/*! ./uploadExtension */ \"./src/components/uploadExtension.js\");\n\nvar _uploadExtension2 = _interopRequireDefault(_uploadExtension);\n\nvar _authenticate = __webpack_require__(/*! ./authenticate */ \"./src/components/authenticate.js\");\n\nvar _authenticate2 = _interopRequireDefault(_authenticate);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.qextConfig = _qextConfig2.default;\nexports.deleteDist = _deleteDist2.default;\nexports.copyQext = _copyQext2.default;\nexports.copyStatic = _copyStatic2.default;\nexports.copySrc = _copySrc2.default;\nexports.defineWebpack = _defineWebpack2.default;\nexports.build = _build2.default;\nexports.zip = _zip2.default;\nexports.uploadExtension = _uploadExtension2.default;\nexports.authenticate = _authenticate2.default;\n\n//# sourceURL=webpack:///./src/components/component-exports.js?");

/***/ }),

/***/ "./src/components/copyQext.js":
/*!************************************!*\
  !*** ./src/components/copyQext.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _fsExtra = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _fsExtra2 = _interopRequireDefault(_fsExtra);\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (inputAccessorFunction) {\n  var accessorFunction = void 0;\n\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n\n  return function (obs$) {\n    return obs$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (config) {\n      return _rxjs.Observable.create(function (observer) {\n        var copyQext = _fsExtra2.default.copy(config.compile.qext, './dist/' + config.extension + '/' + config.extension + '.qext');\n\n        copyQext.then(function () {\n          observer.next('qext copied');\n          observer.complete();\n        }).catch(function (err) {\n          return observer.error(config.compile.qext + ' not found\\n');\n        });\n      });\n    }), (0, _operators.tap)(function (qextStatus) {\n      return console.log(qextStatus + '\\n');\n    }));\n  };\n};\n\n//# sourceURL=webpack:///./src/components/copyQext.js?");

/***/ }),

/***/ "./src/components/copySrc.js":
/*!***********************************!*\
  !*** ./src/components/copySrc.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _fsExtra = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nexports.default = function (inputAccessorFunction) {\n\tvar accessorFunction = void 0;\n\n\tif (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n\t\treturn a;\n\t};\n\n\treturn function (extension$) {\n\t\treturn extension$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (config) {\n\t\t\treturn _rxjs.Observable.create(function (observer) {\n\t\t\t\tvar qextFileExists = (0, _fsExtra.readdir)(process.cwd() + \"/src\").then(function (files) {\n\t\t\t\t\tvar qextFiles = files.filter(function (file) {\n\t\t\t\t\t\treturn file.indexOf(\".qext\") > -1;\n\t\t\t\t\t});\n\n\t\t\t\t\tif (qextFiles.length === 1) return true;else observer.error(\"qext file not found in \" + config.vanilla.entry + \"\\n\");\n\t\t\t\t});\n\n\t\t\t\tvar copySrc = qextFileExists.then(function () {\n\t\t\t\t\treturn (0, _fsExtra.copy)(\"\" + config.vanilla.entry, config.output + \"/\" + config.extension);\n\t\t\t\t});\n\n\t\t\t\tcopySrc.then(function () {\n\t\t\t\t\tobserver.next(\"source copied\");\n\t\t\t\t\tobserver.complete();\n\t\t\t\t}).catch(function (err) {\n\t\t\t\t\treturn observer.error(config.vanilla.entry + \" not found\\n\");\n\t\t\t\t});\n\t\t\t});\n\t\t}), (0, _operators.tap)(function (sourceStatus) {\n\t\t\treturn console.log(sourceStatus + \"\\n\");\n\t\t}));\n\t};\n};\n\n//# sourceURL=webpack:///./src/components/copySrc.js?");

/***/ }),

/***/ "./src/components/copyStatic.js":
/*!**************************************!*\
  !*** ./src/components/copyStatic.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar fs = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nexports.default = function (inputAccessorFunction) {\n  var accessorFunction = void 0;\n\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n\n  return function (extension$) {\n    return extension$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (config) {\n      return _rxjs.Observable.create(function (observer) {\n        var copyStatic = fs.copy(config.compile.static, './dist/' + config.extension + '/static');\n\n        copyStatic.then(function () {\n          observer.next('static copied');\n          observer.complete();\n        }).catch(function (err) {\n          return observer.error(config.compile.static + ' not found\\n');\n        });\n      });\n    }));\n  };\n};\n\n//# sourceURL=webpack:///./src/components/copyStatic.js?");

/***/ }),

/***/ "./src/components/defineWebpack.js":
/*!*****************************************!*\
  !*** ./src/components/defineWebpack.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _fsExtra = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar _webpack2 = _interopRequireDefault(_webpack);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (inputAccessorFunction) {\n  var accessorFunction = void 0;\n\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n\n  return function (obs$) {\n    return obs$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (config) {\n      return _rxjs.Observable.create(function (observer) {\n        var entryExists = (0, _fsExtra.stat)(config.compile.entry);\n\n        entryExists.then(function () {\n          observer.next((0, _webpack2.default)({\n            entry: ['' + config.compile.entry],\n            output: {\n              path: '' + _path2.default.resolve(process.cwd(), config.output + '/' + config.extension),\n              filename: config.extension + '.js'\n            },\n            mode: 'development',\n            module: {\n              rules: [{\n                test: /\\.js$/,\n                exclude: /node_modules/,\n                loader: 'babel-loader'\n              }, {\n                test: /\\.html$/,\n                loader: 'html-loader'\n              }, {\n                test: /\\.css$/,\n                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]\n              }]\n            }\n          }));\n          observer.complete();\n        }).catch(function () {\n          return observer.error(config.compile.entry + ' not found\\n');\n        });\n      });\n    }));\n  };\n};\n\n//# sourceURL=webpack:///./src/components/defineWebpack.js?");

/***/ }),

/***/ "./src/components/deleteDist.js":
/*!**************************************!*\
  !*** ./src/components/deleteDist.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar fs = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nexports.default = function (inputAccessorFunction) {\n  var accessorFunction = void 0;\n\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n\n  return function (extension$) {\n    return extension$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (output) {\n      return _rxjs.Observable.create(function (observer) {\n        var removeDist = fs.remove('' + output);\n\n        removeDist.then(function () {\n          observer.next(output + ' removed');\n          observer.complete();\n        });\n      });\n    }), (0, _operators.tap)(function (distStatus) {\n      return console.log('\\n' + distStatus + '\\n');\n    }));\n  };\n};\n\n//# sourceURL=webpack:///./src/components/deleteDist.js?");

/***/ }),

/***/ "./src/components/deployToDesktop.js":
/*!*******************************************!*\
  !*** ./src/components/deployToDesktop.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar fs = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nexports.default = function (inputAccessorFunction) {\n\tvar accessorFunction = void 0;\n\n\tif (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n\t\treturn a;\n\t};\n\n\treturn function (extension$) {\n\t\treturn extension$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (config) {\n\t\t\treturn _rxjs.Observable.create(function (observer) {\n\t\t\t\tvar emptyDest = fs.emptyDir(config.desktopConfig.destination + \"/\" + config.extension);\n\n\t\t\t\tvar copyDist = emptyDest.then(function () {\n\t\t\t\t\treturn fs.copy(config.output + \"/\" + config.extension, config.desktopConfig.destination + \"/\" + config.extension);\n\t\t\t\t});\n\n\t\t\t\tcopyDist.then(function () {\n\t\t\t\t\tobserver.next(\"dist copied\");\n\t\t\t\t\tobserver.complete();\n\t\t\t\t}).catch(function (err) {\n\t\t\t\t\treturn observer.error(err);\n\t\t\t\t});\n\t\t\t});\n\t\t}));\n\t};\n};\n\n//# sourceURL=webpack:///./src/components/deployToDesktop.js?");

/***/ }),

/***/ "./src/components/qextConfig.js":
/*!**************************************!*\
  !*** ./src/components/qextConfig.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _fsExtra = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nexports.default = function (inputAccessorFunction) {\n\tvar accessorFunction = void 0;\n\n\tif (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n\t\treturn a;\n\t};\n\n\treturn function (extension$) {\n\t\treturn extension$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (configFile) {\n\t\t\treturn _rxjs.Observable.create(function (observer) {\n\t\t\t\tvar getConfigFile = (0, _fsExtra.stat)(configFile);\n\n\t\t\t\tvar configFileExists = getConfigFile.then(function () {\n\t\t\t\t\treturn (0, _fsExtra.readJson)(configFile);\n\t\t\t\t}).catch(function (err) {\n\t\t\t\t\treturn observer.error(configFile + \" not found\");\n\t\t\t\t});\n\n\t\t\t\tconfigFileExists.then(function (config) {\n\t\t\t\t\t// extension property not defined\n\t\t\t\t\tif (config.extension === undefined) observer.error(\"extension property not defined in \" + configFile);\n\t\t\t\t\t// output property not defined\n\t\t\t\t\telse if (config.output === undefined) observer.error(\"output property not defined in \" + configFile);\n\t\t\t\t\t\t// mode property not defined\n\t\t\t\t\t\telse if (config.mode === undefined) observer.error(\"mode property not defined in \" + configFile);\n\t\t\t\t\t\t\t// mode value not vanilla or compile\n\t\t\t\t\t\t\telse if ([\"vanilla\", \"compile\"].indexOf(config.mode) === -1) observer.error(\"mode value must be set to \\\"vanilla\\\" or \\\"compile\\\"\");\n\t\t\t\t\t\t\t\t// Vanilla mode\n\t\t\t\t\t\t\t\telse if (config.mode === \"vanilla\") {\n\t\t\t\t\t\t\t\t\t\t// vanilla property not defined\n\t\t\t\t\t\t\t\t\t\tif (config.vanilla === undefined) observer.error(\"vanilla property not defined in \" + configFile);\n\t\t\t\t\t\t\t\t\t\t// vanilla-entry property not defined\n\t\t\t\t\t\t\t\t\t\telse if (config.vanilla.entry === undefined) observer.error(\"entry property not defined in \\\"vanilla\\\"\");\n\t\t\t\t\t\t\t\t\t\t\t// Deploy Desktop\n\t\t\t\t\t\t\t\t\t\t\telse if (config.deploy === \"desktop\") {\n\t\t\t\t\t\t\t\t\t\t\t\t\t// desktopConfig not defined\n\t\t\t\t\t\t\t\t\t\t\t\t\tif (config.desktopConfig === undefined) observer.error(\"desktopConfig property not defined in \" + configFile);\n\t\t\t\t\t\t\t\t\t\t\t\t\t// desktopConfig-destination property not defined\n\t\t\t\t\t\t\t\t\t\t\t\t\telse if (config.desktopConfig.destination === undefined) observer.error(\"destination not defined in \\\"desktopConfig\\\"\");\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t// pass\n\t\t\t\t\t\t\t\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tobserver.next(config);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tobserver.complete();\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t// pass\n\t\t\t\t\t\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tobserver.next(config);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tobserver.complete();\n\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t// pass\n\t\t\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\t\t\t\tobserver.next(config);\n\t\t\t\t\t\t\t\t\t\t\tobserver.complete();\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t}).catch(function (err) {\n\t\t\t\t\treturn observer.error(configFile + \" cannot be read\");\n\t\t\t\t});\n\t\t\t});\n\t\t}));\n\t};\n};\n\n//# sourceURL=webpack:///./src/components/qextConfig.js?");

/***/ }),

/***/ "./src/components/uploadExtension.js":
/*!*******************************************!*\
  !*** ./src/components/uploadExtension.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _http = __webpack_require__(/*! http */ \"http\");\n\nvar _http2 = _interopRequireDefault(_http);\n\nvar _https = __webpack_require__(/*! https */ \"https\");\n\nvar _https2 = _interopRequireDefault(_https);\n\nvar _fsExtra = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _fsExtra2 = _interopRequireDefault(_fsExtra);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (inputAccessorFunction) {\n  var accessorFunction = void 0;\n\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n\n  return function (obs$) {\n    return obs$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (_ref) {\n      var config = _ref.config,\n          cookie = _ref.cookie;\n      return _rxjs.Observable.create(function (observer) {\n        var http = config.serverConfig.isSecure ? _https2.default : _http2.default;\n        var prefix = config.serverConfig.prefix ? \"/\" + config.serverConfig.prefix : '';\n\n        var headers = config.authenticate === \"windows\" ? {\n          \"x-qlik-xrfkey\": \"123456789abcdefg\",\n          \"content-type\": \"application/zip\",\n          \"Cookie\": \"X-Qlik-Session=\" + cookie\n        } : config.authenticate === \"header\" ? {\n          \"x-qlik-xrfkey\": \"123456789abcdefg\",\n          \"content-type\": \"application/zip\",\n          \"hdr-usr\": config.serverConfig[\"hdr-usr\"]\n        } : {\n          \"x-qlik-xrfkey\": \"123456789abcdefg\",\n          \"content-type\": \"application/zip\"\n        };\n\n        var options = {\n          method: \"DELETE\",\n          host: config.serverConfig.host,\n          port: config.serverConfig.port ? config.serverConfig.port : null,\n          path: prefix + \"/qrs/extension/name/\" + config.extension + \"?xrfkey=123456789abcdefg\",\n          headers: headers\n        };\n\n        var request = http.request(options, function (res) {\n          var chunks = [];\n\n          res.on('data', function (chunk) {\n            return chunks.push(chunk);\n          }).on('end', function () {\n            if (res.statusCode === 403) {\n              observer.error({ authenticate: true });\n            } else if (res.statusCode === 400) {\n              observer.next({\n                message: 'not found',\n                config: config,\n                cookie: cookie\n              });\n              observer.complete();\n            } else if (res.statusCode >= 200 && res.statusCode < 300) {\n              observer.next({\n                message: 'deleted',\n                config: config,\n                cookie: cookie\n              });\n              observer.complete();\n            } else {\n              observer.error({\n                statusCode: res.statusCode,\n                statusMessage: res.statusMessage\n              });\n            }\n          }).on('error', function (err) {\n            observer.error(err);\n          });\n        });\n\n        request.end();\n      });\n    }), (0, _operators.switchMap)(function (_ref2) {\n      var config = _ref2.config,\n          cookie = _ref2.cookie;\n      return _rxjs.Observable.create(function (observer) {\n        var http = config.serverConfig.isSecure ? _https2.default : _http2.default;\n\n        var extensionPath = config.output + \"/\" + config.extension + \".zip\";\n\n        var options = {\n          method: \"POST\",\n          host: config.serverConfig.host,\n          port: config.serverConfig.port ? config.serverConfig.port : null,\n          path: prefix + \"/qrs/extension/upload?xrfkey=123456789abcdefg\",\n          headers: headers\n        };\n\n        var readZipFile = _fsExtra2.default.readFile(extensionPath);\n\n        readZipFile.then(function (data) {\n          var request = http.request(options, function (res) {\n\n            var chunks = [];\n            res.on('data', function (chunk) {\n              return chunks.push(chunk);\n            }).on('end', function () {\n              if (res.statusCode === 403 || res.statusCode === 302) {\n                observer.error({ authenticate: true });\n              } else if (res.statusCode >= 200 && res.statusCode < 300) {\n                observer.next('uploaded');\n                observer.complete();\n              } else {\n                observer.error({\n                  statusCode: res.statusCode,\n                  statusMessage: res.statusMessage\n                });\n              }\n            }).on('error', function (err) {\n              observer.error(err);\n            });\n          });\n\n          request.write(data);\n          request.end();\n        });\n      });\n    }), (0, _operators.tap)(function (uplodStatus) {\n      return console.log(\"uploaded\\n\");\n    }));\n  };\n};\n\n//# sourceURL=webpack:///./src/components/uploadExtension.js?");

/***/ }),

/***/ "./src/components/zip.js":
/*!*******************************!*\
  !*** ./src/components/zip.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _zipDir = __webpack_require__(/*! zip-dir */ \"zip-dir\");\n\nvar _zipDir2 = _interopRequireDefault(_zipDir);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (inputAccessorFunction) {\n  var accessorFunction = void 0;\n\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n\n  return function (obs$) {\n    return obs$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (config) {\n      return _rxjs.Observable.create(function (observer) {\n        // Define output of zip file\n        var outputDir = config.output;\n        // Define inupt directory to be zipped\n        var inputDir = outputDir + '/' + config.extension;\n\n        (0, _zipDir2.default)(inputDir, { saveTo: outputDir + '/' + config.extension + '.zip' }, function (err, buffer) {\n          observer.next('zipped');\n          if (err !== null) observer.error(err);\n          observer.complete();\n        });\n      });\n    }));\n  };\n};\n\n//# sourceURL=webpack:///./src/components/zip.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _componentExports = __webpack_require__(/*! ./components/component-exports */ \"./src/components/component-exports.js\");\n\nvar _deployToDesktop = __webpack_require__(/*! ./components/deployToDesktop */ \"./src/components/deployToDesktop.js\");\n\nvar _deployToDesktop2 = _interopRequireDefault(_deployToDesktop);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/* Get Config */\nvar configFile = \"./qext.config.json\";\n\nvar qextConfig$ = (0, _rxjs.of)(configFile).pipe((0, _componentExports.qextConfig)(), (0, _operators.share)(1));\n\n/* Cookie Jar */\nvar cookieJar$ = new _rxjs.Subject();\n\n/* Initialize authentication */\nvar authenticate$ = qextConfig$.pipe((0, _operators.mergeMap)(function (config) {\n\treturn (0, _rxjs.iif)(\n\t/* if deploying.. */\n\tfunction () {\n\t\treturn config.authenticate === \"windows\";\n\t},\n\n\t/* authenticate */\n\t(0, _componentExports.authenticate)(config, cookieJar$),\n\n\t/* else, skip authentication */\n\t(0, _rxjs.of)(\"skipping authentication\"));\n}), (0, _operators.share)(1));\n\n/* Remove Dist */\nvar removeDist$ = authenticate$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _componentExports.deleteDist)(function (_ref) {\n\tvar _ref2 = _slicedToArray(_ref, 2),\n\t    authStatus = _ref2[0],\n\t    config = _ref2[1];\n\n\treturn config.output;\n}), (0, _operators.share)(1));\n\n/* Copy Source */\nvar copySource$ = removeDist$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _operators.filter)(function (config) {\n\treturn config.mode === \"vanilla\";\n}), (0, _componentExports.copySrc)());\n\n/* Copy qext file */\nvar copyQext$ = removeDist$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1),\n/* Only copy qext if we are compiling */\n(0, _operators.filter)(function (config) {\n\treturn config.mode === \"compile\";\n}), (0, _componentExports.copyQext)());\n\n/* Copy Static Directory */\nvar copyStatic$ = removeDist$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1),\n/* Only copy static directory if compiling */\n(0, _operators.filter)(function (config) {\n\treturn config.mode === \"compile\";\n}), (0, _componentExports.copyStatic)());\n\n/* Define Webpack */\nvar webpack$ = (0, _rxjs.combineLatest)(copyQext$, copyStatic$).pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _operators.filter)(function (config) {\n\treturn config.mode === \"compile\";\n}), (0, _componentExports.defineWebpack)(), (0, _operators.share)(1));\n\n/* Build */\nvar build$ = webpack$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _componentExports.build)(function (_ref3) {\n\tvar _ref4 = _slicedToArray(_ref3, 2),\n\t    webpack = _ref4[0],\n\t    config = _ref4[1];\n\n\treturn { webpack: webpack, config: config };\n}));\n\n/* Distribute */\nvar dist$ = (0, _rxjs.merge)(build$, copySource$).pipe((0, _operators.share)(1));\n\n/* Zip */\nvar zip$ = dist$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _componentExports.zip)());\n\n/* Upload */\nvar upload$ = zip$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _operators.filter)(function (config) {\n\treturn config.deploy === \"server\";\n}), (0, _operators.tap)(console.log), (0, _operators.withLatestFrom)(cookieJar$), (0, _componentExports.uploadExtension)(function (_ref5) {\n\tvar _ref6 = _slicedToArray(_ref5, 2),\n\t    config = _ref6[0],\n\t    cookie = _ref6[1];\n\n\treturn {\n\t\tconfig: config,\n\t\tcookie: cookie\n\t};\n}));\n\n/* Deploy */\nvar deployToDesktop$ = dist$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _operators.filter)(function (config) {\n\treturn config.deploy === \"desktop\";\n}), (0, _deployToDesktop2.default)());\n\n(0, _rxjs.merge)(upload$, deployToDesktop$).subscribe(function () {}, function (err) {\n\treturn console.error(err);\n});\n\n// upload$.subscribe(() => {}, err => console.error(err))\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs-extra\");\n\n//# sourceURL=webpack:///external_%22fs-extra%22?");

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

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