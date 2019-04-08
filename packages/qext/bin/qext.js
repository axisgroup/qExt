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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs_extra__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (extensionName => {\n\t/** directory path */\n\tconst rootPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(extensionName);\n\tconst templateFiles = path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(__dirname, \"../template\");\n\n\t/** Create new directory */\n\tconst createRootDirectory = fs_extra__WEBPACK_IMPORTED_MODULE_0___default.a.ensureDir(rootPath);\n\n\t/**\n  * PACKAGE JSON\n  */\n\tconst templatePackageJsonPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(templateFiles, \"package.json\");\n\tconst createPackageJson = fs_extra__WEBPACK_IMPORTED_MODULE_0___default.a.readJson(templatePackageJsonPath).then(packageObj => _extends({}, packageObj, {\n\t\tname: extensionName\n\t})).catch(console.error);\n\n\t/** Create package.json */\n\tPromise.all([createRootDirectory, createPackageJson]).then(([rootDirectory, packageJson]) => fs_extra__WEBPACK_IMPORTED_MODULE_0___default.a.writeJson(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(rootPath, \"package.json\"), packageJson, {\n\t\tspaces: 2\n\t})).catch(console.error);\n\n\t/**\n  * QEXT CONFIG\n  */\n\tconst templateQextConfigPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(templateFiles, \"qext.config.json\");\n\tconst createQextConfigFile = fs_extra__WEBPACK_IMPORTED_MODULE_0___default.a.readJson(templateQextConfigPath).then(qextConfig => _extends({}, qextConfig, {\n\t\textension: extensionName\n\t})).catch(console.error);\n\n\t/** Create qext.config.json */\n\tPromise.all([createRootDirectory, createQextConfigFile]).then(([rootDirectory, qextConfig]) => fs_extra__WEBPACK_IMPORTED_MODULE_0___default.a.writeJson(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(rootPath, \"qext.config.json\"), qextConfig, {\n\t\tspaces: 2\n\t})).catch(console.error);\n\n\t/**\n  * STATIC\n  */\n\tcreateRootDirectory.then(() => fs_extra__WEBPACK_IMPORTED_MODULE_0___default.a.ensureDir(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(rootPath, \"static\"))).catch(console.error);\n\n\t/**\n  * SOURCE\n  */\n\tconst templateSrcPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(templateFiles, \"src\");\n\tcreateRootDirectory.then(() => fs_extra__WEBPACK_IMPORTED_MODULE_0___default.a.copy(templateSrcPath, path__WEBPACK_IMPORTED_MODULE_1___default.a.join(rootPath, \"src\"))).catch(console.error);\n});\n\n//# sourceURL=webpack:///./src/components/create-extension.js?");

/***/ }),

/***/ "./src/components/install-dependencies.js":
/*!************************************************!*\
  !*** ./src/components/install-dependencies.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! child_process */ \"child_process\");\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (extensionName => {\n\tchild_process__WEBPACK_IMPORTED_MODULE_0___default.a.spawn(\"npm\", [\"install\"], {\n\t\tenv: process.env,\n\t\tcwd: process.cwd() + `/${extensionName}`,\n\t\tshell: true,\n\t\tstdio: \"inherit\"\n\t});\n});\n\n//# sourceURL=webpack:///./src/components/install-dependencies.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var commander__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! commander */ \"commander\");\n/* harmony import */ var commander__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(commander__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_extra__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_create_extension__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/create-extension */ \"./src/components/create-extension.js\");\n/* harmony import */ var _components_install_dependencies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/install-dependencies */ \"./src/components/install-dependencies.js\");\n\n\n\n\n\n\nconst packagePath = path__WEBPACK_IMPORTED_MODULE_2___default.a.resolve(__dirname, \"../package.json\");\n\nconst version = fs_extra__WEBPACK_IMPORTED_MODULE_1___default.a.readJson(packagePath).then(packageObj => packageObj.version).catch(console.error);\n\nversion.then(version => {\n\tcommander__WEBPACK_IMPORTED_MODULE_0___default.a.version(version).option(\"-c, --create-extension <name>\", \"Create New Extension\").option(\"-i, --install\", \"Install Dependencies\").parse(process.argv);\n\n\tif (!commander__WEBPACK_IMPORTED_MODULE_0___default.a.createExtension) return console.error('set \"-c, --create-extension <name>\" flag to create extension');else {\n\t\tObject(_components_create_extension__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(commander__WEBPACK_IMPORTED_MODULE_0___default.a.createExtension);\n\n\t\tif (commander__WEBPACK_IMPORTED_MODULE_0___default.a.install) Object(_components_install_dependencies__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(commander__WEBPACK_IMPORTED_MODULE_0___default.a.createExtension);\n\t}\n});\n\n//# sourceURL=webpack:///./src/index.js?");

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