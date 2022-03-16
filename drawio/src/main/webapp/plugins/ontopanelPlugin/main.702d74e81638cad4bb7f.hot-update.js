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

/***/ "./ontopanelSource/convertor/scripts/store.js":
/*!****************************************************!*\
  !*** ./ontopanelSource/convertor/scripts/store.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"storeData\": () => (/* binding */ storeData)\n/* harmony export */ });\nclass Store {\r\n  constructor() {\r\n    this.errors = null;\r\n    this.result = null;\r\n    this.mappingfile = \"None\";\r\n    this.mappingData = null;\r\n    this.downloadFormat = \"application/rdf+xml\";\r\n  }\r\n\r\n  modifyData = (data) => {\r\n    this.errors = data.errors;\r\n    this.result = data.result;\r\n  };\r\n  resetData = () => {\r\n    this.errors = null;\r\n    this.result = null;\r\n    this.mappingfile = \"None\";\r\n    this.mappingData = null;\r\n    this.downloadFormat = \"application/rdf+xml\";\r\n  };\r\n  modifyMappingData = (filename, data) => {\r\n    this.mappingfile = filename;\r\n    this.mappingData = data;\r\n  };\r\n  resetMappingData = () => {\r\n    this.mappingfile = \"None\";\r\n    this.mappingData = null;\r\n  };\r\n  modifyDownloadFormat = (value) => {\r\n    this.downloadFormat = value;\r\n  };\r\n}\r\n\r\nlet storeData = new Store();\r\n\r\n\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/scripts/store.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b3f05885b209eed37b20")
/******/ })();
/******/ 
/******/ }
);