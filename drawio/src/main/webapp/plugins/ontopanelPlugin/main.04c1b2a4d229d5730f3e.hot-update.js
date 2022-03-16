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

/***/ "./ontopanelSource/convertor/scripts/result.js":
/*!*****************************************************!*\
  !*** ./ontopanelSource/convertor/scripts/result.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"resultContainer\": () => (/* binding */ resultContainer)\n/* harmony export */ });\n/* harmony import */ var _html_result_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/result.html */ \"./ontopanelSource/convertor/html/result.html\");\n/* harmony import */ var _vars_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../vars.js */ \"./ontopanelSource/vars.js\");\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store.js */ \"./ontopanelSource/convertor/scripts/store.js\");\n\r\n\r\n\r\n\r\nclass ResultFrom {\r\n  constructor() {\r\n    this.init();\r\n  }\r\n\r\n  init() {\r\n    let resultWindow = document.createElement(\"div\");\r\n    resultWindow.innerHTML = _html_result_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n    this.resultWindow = resultWindow;\r\n    let searchBar = this.resultWindow.querySelector(\r\n      'input[name=\"result-search\"]'\r\n    );\r\n    searchBar.onkeyup = (evt) => {\r\n      evt.preventDefault();\r\n      let termValue = searchBar.value.trim();\r\n      this.searchText(termValue);\r\n    };\r\n  }\r\n  showdata() {\r\n    let resultShow = this.resultWindow.querySelector(\r\n      'pre[class=\"result-show\"]'\r\n    );\r\n    resultShow.textContent = _store_js__WEBPACK_IMPORTED_MODULE_2__.storeData.result;\r\n  }\r\n  searchText(text) {\r\n    let resultShow = this.resultWindow.querySelector(\r\n      'pre[class=\"result-show\"]'\r\n    );\r\n    let innerText = _store_js__WEBPACK_IMPORTED_MODULE_2__.storeData.result;\r\n    let index = innerText.indexOf(text);\r\n    console.log();\r\n    console.log(index);\r\n    if (index >= 0) {\r\n      innerText =\r\n        innerText.substring(0, index) +\r\n        \"<span class='highlight'>\" +\r\n        innerText.substring(index, index + text.length) +\r\n        \"</span>\" +\r\n        innerText.substring(index + text.length);\r\n      resultShow.innerText = innerText;\r\n    }\r\n  }\r\n}\r\n\r\nlet resultContainer = new ResultFrom();\r\n\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/scripts/result.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8ffc0eb56097600a412e")
/******/ })();
/******/ 
/******/ }
);