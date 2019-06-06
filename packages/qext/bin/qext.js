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

/***/ "./src/components/create-extension.js":
/*!********************************************!*\
  !*** ./src/components/create-extension.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _fsExtra = _interopRequireDefault(__webpack_require__(/*! fs-extra */ \"fs-extra\"));\n\nvar _path = _interopRequireDefault(__webpack_require__(/*! path */ \"path\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar _default = function _default(_ref) {\n  var extensionName = _ref.extensionName,\n      templateType = _ref.templateType;\n\n  /** directory path */\n  var rootPath = _path[\"default\"].resolve(extensionName);\n\n  var templateFiles = _path[\"default\"].resolve(__dirname, \"../templates/\".concat(templateType));\n  /** Create new directory */\n\n\n  var createRootDirectory = _fsExtra[\"default\"].ensureDir(rootPath);\n\n  var qextPackageJsonPath = _path[\"default\"].resolve(__dirname, \"../package.json\");\n\n  var qextScriptsVersion_Pr = _fsExtra[\"default\"].readJson(qextPackageJsonPath).then(function (qextPackageJson) {\n    return qextPackageJson.qextScriptsVersion;\n  });\n  /**\n   * PACKAGE JSON\n   */\n\n\n  var templatePackageJsonPath = _path[\"default\"].join(templateFiles, \"package.json\");\n\n  var createPackageJson = Promise.all([_fsExtra[\"default\"].readJson(templatePackageJsonPath), qextScriptsVersion_Pr]).then(function (_ref2) {\n    var _ref3 = _slicedToArray(_ref2, 2),\n        packageObj = _ref3[0],\n        qextScriptsVersion = _ref3[1];\n\n    return _objectSpread({}, packageObj, {\n      name: extensionName,\n      devDependencies: _objectSpread({}, packageObj.devDependencies, {\n        \"qext-scripts\": qextScriptsVersion\n      })\n    });\n  })[\"catch\"](console.error);\n  /** Create package.json */\n\n  Promise.all([createRootDirectory, createPackageJson]).then(function (_ref4) {\n    var _ref5 = _slicedToArray(_ref4, 2),\n        rootDirectory = _ref5[0],\n        packageJson = _ref5[1];\n\n    return _fsExtra[\"default\"].writeJson(_path[\"default\"].join(rootPath, \"package.json\"), packageJson, {\n      spaces: 2\n    });\n  })[\"catch\"](console.error);\n  /**\n   * QEXT CONFIG\n   */\n\n  var templateQextConfigPath = _path[\"default\"].join(templateFiles, \"qext.config.json\");\n\n  var createQextConfigFile = _fsExtra[\"default\"].readJson(templateQextConfigPath).then(function (qextConfig) {\n    return _objectSpread({}, qextConfig, {\n      extension: extensionName\n    });\n  })[\"catch\"](console.error);\n  /** Create qext.config.json */\n\n\n  Promise.all([createRootDirectory, createQextConfigFile]).then(function (_ref6) {\n    var _ref7 = _slicedToArray(_ref6, 2),\n        rootDirectory = _ref7[0],\n        qextConfig = _ref7[1];\n\n    return _fsExtra[\"default\"].writeJson(_path[\"default\"].join(rootPath, \"qext.config.json\"), qextConfig, {\n      spaces: 2\n    });\n  })[\"catch\"](console.error);\n  /**\n   * STATIC\n   */\n\n  createRootDirectory.then(function () {\n    return _fsExtra[\"default\"].ensureDir(_path[\"default\"].join(rootPath, \"static\"));\n  })[\"catch\"](console.error);\n  /**\n   * SOURCE\n   */\n\n  var templateSrcPath = _path[\"default\"].join(templateFiles, \"src\");\n\n  createRootDirectory.then(function () {\n    return _fsExtra[\"default\"].copy(templateSrcPath, _path[\"default\"].join(rootPath, \"src\"));\n  })[\"catch\"](console.error);\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/create-extension.js?");

/***/ }),

/***/ "./src/components/install-dependencies.js":
/*!************************************************!*\
  !*** ./src/components/install-dependencies.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _child_process = _interopRequireDefault(__webpack_require__(/*! child_process */ \"child_process\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar _default = function _default(extensionName) {\n  _child_process[\"default\"].spawn(\"npm\", [\"install\"], {\n    env: process.env,\n    cwd: process.cwd() + \"/\".concat(extensionName),\n    shell: true,\n    stdio: \"inherit\"\n  });\n};\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack:///./src/components/install-dependencies.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _commander = _interopRequireDefault(__webpack_require__(/*! commander */ \"commander\"));\n\nvar _fsExtra = _interopRequireDefault(__webpack_require__(/*! fs-extra */ \"fs-extra\"));\n\nvar _path = _interopRequireDefault(__webpack_require__(/*! path */ \"path\"));\n\nvar _createExtension = _interopRequireDefault(__webpack_require__(/*! ./components/create-extension */ \"./src/components/create-extension.js\"));\n\nvar _installDependencies = _interopRequireDefault(__webpack_require__(/*! ./components/install-dependencies */ \"./src/components/install-dependencies.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar packagePath = _path[\"default\"].resolve(__dirname, \"../package.json\");\n\nvar version = _fsExtra[\"default\"].readJson(packagePath).then(function (packageObj) {\n  return packageObj.version;\n})[\"catch\"](console.error);\n\nversion.then(function (version) {\n  _commander[\"default\"].version(version).option(\"-c, --create-extension <name>\", \"Create New Extension\").option(\"-i, --install\", \"Install Dependencies\").option(\"-t, --template [type]\", \"Template\", /^(starter|base|vanilla-base)$/i, \"starter\").parse(process.argv);\n\n  if (!_commander[\"default\"].createExtension) return console.error('set \"-c, --create-extension <name>\" flag to create extension');else {\n    (0, _createExtension[\"default\"])({\n      extensionName: _commander[\"default\"].createExtension,\n      templateType: _commander[\"default\"].template\n    });\n    if (_commander[\"default\"].install) (0, _installDependencies[\"default\"])(_commander[\"default\"].createExtension);\n  }\n});\n\n//# sourceURL=webpack:///./src/index.js?");

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });