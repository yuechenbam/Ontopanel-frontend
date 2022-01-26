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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./ontopanelSource/convertor/index.scss":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./ontopanelSource/convertor/index.scss ***!
  \***************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".error-list {\\n  margin-top: 5px;\\n  overflow: auto;\\n  padding: 5px;\\n}\\n.error-list .error-type {\\n  font-size: 15px;\\n  background-color: lightgrey;\\n  font-weight: bold;\\n}\\n.error-list ul {\\n  padding-left: 12px;\\n}\\n.error-list ul li {\\n  margin: 10px;\\n  cursor: pointer;\\n}\\n.error-list hr {\\n  border-top: 2px solid black;\\n  margin-bottom: 5px;\\n}\\n\\n.convertor-container {\\n  width: 100%;\\n}\\n.convertor-container .convertor-bar {\\n  height: 30px;\\n  min-width: 150px;\\n  margin-bottom: 20px;\\n  display: flex;\\n}\\n.convertor-container .convertor-bar select {\\n  border: none;\\n  border-radius: 2px;\\n}\\n.convertor-container .convertor-bar input {\\n  padding: 5px;\\n  border: none;\\n  border-radius: 2px;\\n  font-size: 16px;\\n  cursor: pointer;\\n  color: white;\\n  background-color: steelblue;\\n}\\n.convertor-container .convertor-bar input:hover {\\n  background-color: darkblue;\\n}\\n.convertor-container .convertor-bar .transformer {\\n  font-size: 12px;\\n  display: flex;\\n}\\n.convertor-container .convertor-bar .transformer input {\\n  padding: 5px;\\n  border: none;\\n  border-radius: 2px;\\n  font-size: 16px;\\n  cursor: pointer;\\n  color: white;\\n  background-color: steelblue;\\n}\\n.convertor-container .convertor-bar .transformer input:hover {\\n  background-color: darkblue;\\n}\\n.convertor-container .convertor-show {\\n  border: 1px solid black;\\n  height: 300px;\\n}\\n.convertor-container .convertor-show .convertor-btn-group {\\n  display: flex;\\n  width: 100%;\\n}\\n.convertor-container .convertor-show .convertor-btn-group input {\\n  width: 100%;\\n  padding: 5px;\\n  border: none;\\n  border-radius: 2px;\\n  font-size: 16px;\\n  cursor: pointer;\\n  color: white;\\n  background-color: steelblue;\\n}\\n.convertor-container .convertor-show .convertor-btn-group input:hover {\\n  background-color: darkblue;\\n}\\n.convertor-container .convertor-show .convertor-content {\\n  font-size: 14px;\\n  height: 280px;\\n  overflow: auto;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/index.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./ontopanelSource/convertor/index.html":
/*!**********************************************!*\
  !*** ./ontopanelSource/convertor/index.html ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div class=\\\"convertor-container\\\"> <div class=\\\"transformer\\\"> <div>If you used the chowlk libary, please transform first.</div> <input type=\\\"button\\\" name=\\\"transform\\\" value=\\\"transform\\\"/> </div> <div class=\\\"convertor-bar\\\"> <select name=\\\"rdf-format\\\"> <option value=\\\"application/rdf+xml\\\">rdf/xml</option> <option value=\\\"turtle\\\">turtle</option> </select> <input type=\\\"button\\\" name=\\\"convert\\\" value=\\\"Convert\\\"/> </div> <div class=\\\"convertor-show\\\"> <div class=\\\"convertor-btn-group\\\"> <input type=\\\"button\\\" name=\\\"result\\\" value=\\\"Result\\\"/> <input type=\\\"button\\\" name=\\\"show-error\\\" value=\\\"ShowError\\\"/> <input type=\\\"button\\\" value=\\\"&#x2193;\\\" style=\\\"width:30px;background-color:#dc143c\\\" name=\\\"download\\\"/> </div> <div class=\\\"convertor-content\\\"> <div></div> </div> </div> </div> \";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/index.html?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b2c98eccdedb08105eda")
/******/ })();
/******/ 
/******/ }
);