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

/***/ "./src/components/copyQext.js":
/*!************************************!*\
  !*** ./src/components/copyQext.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _fsExtra = _interopRequireDefault(__webpack_require__(/*! fs-extra */ \"fs-extra\"));\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar _default = function _default(inputAccessorFunction) {\n  var accessorFunction;\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n  return function (obs$) {\n    return obs$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (config) {\n      return _rxjs.Observable.create(function (observer) {\n        var copyQext = _fsExtra[\"default\"].copy(config.compile.qext, \"./dist/\".concat(config.extension, \"/\").concat(config.extension, \".qext\"));\n\n        copyQext.then(function () {\n          observer.next('qext copied');\n          observer.complete();\n        })[\"catch\"](function (err) {\n          return observer.error(\"\".concat(config.compile.qext, \" not found\\n\"));\n        });\n      });\n    }), (0, _operators.tap)(function (qextStatus) {\n      return console.log(\"\".concat(qextStatus, \"\\n\"));\n    }));\n  };\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/copyQext.js?");

/***/ }),

/***/ "./src/components/copySrc.js":
/*!***********************************!*\
  !*** ./src/components/copySrc.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _fsExtra = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _default = function _default(inputAccessorFunction) {\n  var accessorFunction;\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n  return function (extension$) {\n    return extension$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (_ref) {\n      var config = _ref.config;\n      return _rxjs.Observable.create(function (observer) {\n        var qextFileExists = (0, _fsExtra.readdir)(\"\".concat(process.cwd(), \"/src\")).then(function (files) {\n          var qextFiles = files.filter(function (file) {\n            return file.indexOf(\".qext\") > -1;\n          });\n          if (qextFiles.length === 1) return true;else observer.error(\"qext file not found in \".concat(config.vanilla.entry, \"\\n\"));\n        });\n        var copySrc = qextFileExists.then(function () {\n          return (0, _fsExtra.copy)(\"\".concat(config.vanilla.entry), \"\".concat(config.output, \"/\").concat(config.extension));\n        });\n        copySrc.then(function () {\n          observer.next(\"source copied\");\n          observer.complete();\n        })[\"catch\"](function (err) {\n          return observer.error(\"\".concat(config.vanilla.entry, \" not found\\n\"));\n        });\n      });\n    }), (0, _operators.tap)(function (sourceStatus) {\n      return console.log(\"\".concat(sourceStatus, \"\\n\"));\n    }));\n  };\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/copySrc.js?");

/***/ }),

/***/ "./src/components/copyStatic.js":
/*!**************************************!*\
  !*** ./src/components/copyStatic.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar fs = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _default = function _default(config) {\n  return _rxjs.Observable.create(function (observer) {\n    var copyStatic = fs.copy(config.compile[\"static\"], \"./dist/\".concat(config.extension, \"/static\"));\n    copyStatic.then(function () {\n      observer.next(\"static copied\");\n      observer.complete();\n    })[\"catch\"](function (err) {\n      return observer.error(\"\".concat(config.compile[\"static\"], \" not found\\n\"));\n    });\n  });\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/copyStatic.js?");

/***/ }),

/***/ "./src/components/defineWebpack.js":
/*!*****************************************!*\
  !*** ./src/components/defineWebpack.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _fsExtra = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nvar _path = _interopRequireDefault(__webpack_require__(/*! path */ \"path\"));\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _webpack = _interopRequireDefault(__webpack_require__(/*! webpack */ \"webpack\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar _default = function _default(inputAccessorFunction) {\n  var accessorFunction;\n  if (inputAccessorFunction) accessorFunction = inputAccessorFunction;else accessorFunction = function accessorFunction(a) {\n    return a;\n  };\n  return function (obs$) {\n    return obs$.pipe((0, _operators.map)(accessorFunction), (0, _operators.switchMap)(function (config) {\n      return _rxjs.Observable.create(function (observer) {\n        var entryExists = (0, _fsExtra.stat)(config.compile.entry);\n        entryExists.then(function () {\n          observer.next((0, _webpack[\"default\"])({\n            entry: [\"\".concat(config.compile.entry)],\n            output: {\n              path: \"\".concat(_path[\"default\"].resolve(process.cwd(), config.output + \"/\" + config.extension)),\n              filename: \"\".concat(config.extension, \".js\")\n            },\n            mode: \"development\",\n            module: {\n              rules: [{\n                test: /\\.js$/,\n                exclude: /node_modules/,\n                loader: \"babel-loader\",\n                options: {\n                  presets: [\"@babel/preset-env\"],\n                  plugins: [\"@babel/plugin-proposal-object-rest-spread\", \"@babel/plugin-transform-modules-commonjs\"]\n                }\n              }, {\n                test: /\\.html$/,\n                loader: \"html-loader\"\n              }, {\n                test: /\\.css$/,\n                use: [{\n                  loader: \"style-loader\"\n                }, {\n                  loader: \"css-loader\"\n                }]\n              }]\n            }\n          }));\n          observer.complete();\n        })[\"catch\"](function () {\n          return observer.error(\"\".concat(config.compile.entry, \" not found\\n\"));\n        });\n      });\n    }));\n  };\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/defineWebpack.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nObject.defineProperty(exports, \"qextConfig\", {\n  enumerable: true,\n  get: function get() {\n    return _qextConfig[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"deleteDist\", {\n  enumerable: true,\n  get: function get() {\n    return _deleteDist[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"copyQext\", {\n  enumerable: true,\n  get: function get() {\n    return _copyQext[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"copyStatic\", {\n  enumerable: true,\n  get: function get() {\n    return _copyStatic[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"copySrc\", {\n  enumerable: true,\n  get: function get() {\n    return _copySrc[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"defineWebpack\", {\n  enumerable: true,\n  get: function get() {\n    return _defineWebpack[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"build\", {\n  enumerable: true,\n  get: function get() {\n    return _build[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"zip\", {\n  enumerable: true,\n  get: function get() {\n    return _zip[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"uploadExtension\", {\n  enumerable: true,\n  get: function get() {\n    return _uploadExtension[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"authenticate\", {\n  enumerable: true,\n  get: function get() {\n    return _authenticate[\"default\"];\n  }\n});\nObject.defineProperty(exports, \"deployToDesktop\", {\n  enumerable: true,\n  get: function get() {\n    return _deployToDesktop[\"default\"];\n  }\n});\n\nvar _qextConfig = _interopRequireDefault(__webpack_require__(/*! ./qextConfig */ \"./src/components/qextConfig.js\"));\n\nvar _deleteDist = _interopRequireDefault(__webpack_require__(/*! ./deleteDist */ \"./src/components/deleteDist.js\"));\n\nvar _copyQext = _interopRequireDefault(__webpack_require__(/*! ./copyQext */ \"./src/components/copyQext.js\"));\n\nvar _copyStatic = _interopRequireDefault(__webpack_require__(/*! ./copyStatic */ \"./src/components/copyStatic.js\"));\n\nvar _copySrc = _interopRequireDefault(__webpack_require__(/*! ./copySrc */ \"./src/components/copySrc.js\"));\n\nvar _defineWebpack = _interopRequireDefault(__webpack_require__(/*! ./defineWebpack */ \"./src/components/defineWebpack.js\"));\n\nvar _build = _interopRequireDefault(__webpack_require__(/*! ./build */ \"./src/components/build.js\"));\n\nvar _zip = _interopRequireDefault(__webpack_require__(/*! ./zip */ \"./src/components/zip.js\"));\n\nvar _uploadExtension = _interopRequireDefault(__webpack_require__(/*! ./uploadExtension */ \"./src/components/uploadExtension.js\"));\n\nvar _authenticate = _interopRequireDefault(__webpack_require__(/*! ./authenticate */ \"./src/components/authenticate.js\"));\n\nvar _deployToDesktop = _interopRequireDefault(__webpack_require__(/*! ./deployToDesktop */ \"./src/components/deployToDesktop.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n//# sourceURL=webpack:///./src/components/index.js?");

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
eval("\n\nvar _rxjs = __webpack_require__(/*! rxjs */ \"rxjs\");\n\nvar _operators = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\n\nvar _components = __webpack_require__(/*! ./components */ \"./src/components/index.js\");\n\nvar _commander = _interopRequireDefault(__webpack_require__(/*! commander */ \"commander\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n_commander[\"default\"].option(\"-w, --watch\", \"Watch\").parse(process.argv);\n/* Get Config */\n\n\nvar configFile = \"./qext.config.json\";\nvar qextConfig$ = (0, _rxjs.of)(configFile).pipe((0, _components.qextConfig)(), (0, _operators.share)(1));\n/* Cookie Jar */\n\nvar cookieJar$ = new _rxjs.BehaviorSubject(null);\n/* Initialize authentication */\n\nvar authenticate$ = qextConfig$.pipe((0, _operators.mergeMap)(function (config) {\n  return (0, _rxjs.iif)(\n  /* if deploying.. */\n  function () {\n    return config.authenticate === \"windows\";\n  },\n  /* authenticate */\n  (0, _components.authenticate)(config, cookieJar$),\n  /* else, skip authentication */\n  (0, _rxjs.of)(\"skipping authentication\"));\n}), (0, _operators.share)(1));\n/* Remove Dist */\n\nvar removeDist$ = authenticate$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _components.deleteDist)(function (_ref) {\n  var _ref2 = _slicedToArray(_ref, 2),\n      authStatus = _ref2[0],\n      config = _ref2[1];\n\n  return config.output;\n}), (0, _operators.share)(1));\n/* Copy Source */\n\nvar copySource$ = removeDist$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _operators.filter)(function (config) {\n  return config.mode === \"vanilla\";\n}), (0, _components.copySrc)(function (config) {\n  return {\n    config: config,\n    watch: _commander[\"default\"].watch\n  };\n}));\n/* Copy qext file */\n\nvar copyQext$ = removeDist$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1),\n/* Only copy qext if we are compiling */\n(0, _operators.filter)(function (config) {\n  return config.mode === \"compile\";\n}), (0, _components.copyQext)());\n/* Copy Static Directory */\n\nvar copyStatic$ = removeDist$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _operators.filter)(function (config) {\n  return config.mode === \"compile\";\n}),\n/* Only copy static directory if compiling */\n(0, _operators.mergeMap)(function (config) {\n  return (0, _rxjs.iif)(\n  /* if static property defined.. */\n  function () {\n    return config.compile[\"static\"] !== undefined;\n  },\n  /* copy static */\n  (0, _components.copyStatic)(config),\n  /* else, don't copy */\n  (0, _rxjs.of)(\"no static directory\"));\n}));\n/* Define Webpack */\n\nvar webpack$ = (0, _rxjs.combineLatest)(copyQext$, copyStatic$).pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _operators.filter)(function (config) {\n  return config.mode === \"compile\";\n}), (0, _components.defineWebpack)(), (0, _operators.share)(1));\n/* Build */\n\nvar build$ = webpack$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _components.build)(function (_ref3) {\n  var _ref4 = _slicedToArray(_ref3, 2),\n      webpack = _ref4[0],\n      config = _ref4[1];\n\n  return {\n    compiler: webpack,\n    config: config,\n    watch: _commander[\"default\"].watch\n  };\n}));\n/* Distribute */\n\nvar dist$ = (0, _rxjs.merge)(build$, copySource$).pipe((0, _operators.share)(1));\n/* Zip */\n\nvar zip$ = dist$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _components.zip)());\n/* Upload */\n\nvar upload$ = zip$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _operators.filter)(function (config) {\n  return config.deploy === \"server\";\n}), (0, _operators.withLatestFrom)(cookieJar$), (0, _components.uploadExtension)(function (_ref5) {\n  var _ref6 = _slicedToArray(_ref5, 2),\n      config = _ref6[0],\n      cookie = _ref6[1];\n\n  return {\n    config: config,\n    cookie: cookie\n  };\n}));\n/* Deploy */\n\nvar deployToDesktop$ = dist$.pipe((0, _operators.withLatestFrom)(qextConfig$), (0, _operators.pluck)(1), (0, _operators.filter)(function (config) {\n  return config.deploy === \"desktop\";\n}), (0, _components.deployToDesktop)());\n(0, _rxjs.merge)(upload$, deployToDesktop$).subscribe(function () {}, function (err) {\n  return console.error(err);\n});\nprocess.on(\"SIGINT\", function () {\n  console.info(\"\\nqExt Ended.\");\n  process.exit();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

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

/***/ "commander":
/*!****************************!*\
  !*** external "commander" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"commander\");\n\n//# sourceURL=webpack:///external_%22commander%22?");

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