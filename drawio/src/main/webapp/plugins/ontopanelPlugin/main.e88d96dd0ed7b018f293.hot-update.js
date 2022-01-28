"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatedrawio_test"]("main",{

/***/ "./ontopanelSource/loadLibary/loadLibary.js":
/*!**************************************************!*\
  !*** ./ontopanelSource/loadLibary/loadLibary.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadOntopanelLibrary\": () => (/* binding */ loadOntopanelLibrary)\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '.onto_libary.xml'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\r\n\r\nconst loadOntopanelLibrary = (ui) => {\r\n  ui.loadLibrary(new LocalLibrary(undefined, Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '.onto_libary.xml'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\r\n};\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/loadLibary/loadLibary.js?");

/***/ }),

/***/ "./ontopanelSource/ontopanel.js":
/*!**************************************!*\
  !*** ./ontopanelSource/ontopanel.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _entityFinder_version1_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entityFinder_version1/index.js */ \"./ontopanelSource/entityFinder_version1/index.js\");\n/* harmony import */ var _entityFinder_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entityFinder/index.js */ \"./ontopanelSource/entityFinder/index.js\");\n/* harmony import */ var _convertor_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./convertor/index.js */ \"./ontopanelSource/convertor/index.js\");\n/* harmony import */ var _loadLibary_loadLibary_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loadLibary/loadLibary.js */ \"./ontopanelSource/loadLibary/loadLibary.js\");\n\r\n\r\n\r\n\r\n\r\n// too plugins\r\n// entityTool to show entities\r\n// convertorTool to convertor plot\r\n\r\nDraw.loadPlugin(function (ui) {\r\n  (0,_loadLibary_loadLibary_js__WEBPACK_IMPORTED_MODULE_3__.loadOntopanelLibrary)(ui);\r\n\r\n  let entityFinderWnd = (0,_entityFinder_index_js__WEBPACK_IMPORTED_MODULE_1__.makeEntityWnd)(ui);\r\n  ui.actions.addAction(\"entityfinder\", function () {\r\n    entityFinderWnd.setVisible(!entityFinderWnd.isVisible());\r\n  });\r\n\r\n  let entityFinderWndOld = (0,_entityFinder_version1_index_js__WEBPACK_IMPORTED_MODULE_0__.makeEntityWnd)(ui);\r\n  ui.actions.addAction(\"entityfinderOld\", function () {\r\n    entityFinderWndOld.setVisible(!entityFinderWndOld.isVisible());\r\n  });\r\n\r\n  let convertorWnd = (0,_convertor_index_js__WEBPACK_IMPORTED_MODULE_2__.makeConvertorWnd)(ui);\r\n  ui.actions.addAction(\"convertor\", function () {\r\n    convertorWnd.setVisible(!convertorWnd.isVisible());\r\n  });\r\n\r\n  var menu = ui.menus.get(\"extras\");\r\n  var oldFunct = menu.funct;\r\n\r\n  menu.funct = function (menu, parent) {\r\n    oldFunct.apply(this, arguments);\r\n    ui.menus.addMenuItems(menu, [\"convertor\"], parent);\r\n    ui.menus.addMenuItems(menu, [\"entityfinder\"], parent);\r\n    ui.menus.addMenuItems(menu, [\"entityfinderOld\"], parent);\r\n  };\r\n\r\n  // active backend\r\n  fetch(\"https://ontopanel.herokuapp.com/api/v1/ontos/lists/\", {\r\n    method: \"GET\",\r\n  });\r\n\r\n  setInterval(function () {\r\n    fetch(\"https://ontopanel.herokuapp.com/api/v1/ontos/lists/\", {\r\n      method: \"GET\",\r\n    });\r\n  }, 20 * 1000 * 60);\r\n});\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/ontopanel.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e91a74d835e9b385dea4")
/******/ })();
/******/ 
/******/ }
);