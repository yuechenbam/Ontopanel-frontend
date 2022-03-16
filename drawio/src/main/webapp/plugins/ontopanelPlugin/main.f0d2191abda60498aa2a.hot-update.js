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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"resultContainer\": () => (/* binding */ resultContainer)\n/* harmony export */ });\n/* harmony import */ var _html_result_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/result.html */ \"./ontopanelSource/convertor/html/result.html\");\n/* harmony import */ var _vars_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../vars.js */ \"./ontopanelSource/vars.js\");\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store.js */ \"./ontopanelSource/convertor/scripts/store.js\");\n\r\n\r\n\r\n\r\nclass ResultFrom {\r\n  constructor() {\r\n    this.init();\r\n  }\r\n\r\n  init() {\r\n    let resultWindow = document.createElement(\"div\");\r\n    resultWindow.innerHTML = _html_result_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n    this.resultWindow = resultWindow;\r\n\r\n    let searchBtn = resultWindow.querySelector(\r\n      'input[name=\"result-search-btn\"]'\r\n    );\r\n    let nextBtn = resultWindow.querySelector('input[name=\"next-btn\"]');\r\n\r\n    let resultShow = resultWindow.querySelector('pre[class=\"result-show\"]');\r\n    this.resultShow = resultShow;\r\n\r\n    this.markIndex = 0;\r\n\r\n    nextBtn.onclick = (evt) => {\r\n      evt.preventDefault();\r\n      let allMark = this.resultShow.getElementsByTagName(\"mark\");\r\n      if (allMark && allMark.length > 0) {\r\n        if (this.markIndex >= allMark.length) {\r\n          this.markIndex = 0;\r\n        }\r\n        allMark[this.markIndex].scrollIntoView();\r\n        allMark[this.markIndex].classList.add(\"locate\");\r\n\r\n        let lastIndex =\r\n          this.markIndex - 1 >= 0 ? this.markIndex - 1 : allMark.length;\r\n        if (allMark[lastIndex].classList.contains(\"locate\")) {\r\n          allMark[lastIndex].classList.remove(\"locate\");\r\n        }\r\n\r\n        this.markIndex += 1;\r\n      }\r\n    };\r\n\r\n    searchBtn.onclick = (evt) => {\r\n      let searchBar = resultWindow.querySelector('input[name=\"result-search\"]');\r\n      this.markIndex = 0;\r\n      evt.preventDefault();\r\n      let termValue = searchBar.value.trim();\r\n      this.searchText(termValue);\r\n    };\r\n  }\r\n  showdata() {\r\n    this.resultShow.textContent = _store_js__WEBPACK_IMPORTED_MODULE_2__.storeData.result;\r\n  }\r\n  searchText(text) {\r\n    let searchContent = _store_js__WEBPACK_IMPORTED_MODULE_2__.storeData.result;\r\n    if (text) {\r\n      let regex = new RegExp(text, \"gi\");\r\n\r\n      let newText = searchContent.replace(\r\n        regex,\r\n        \"<ontopanelmark>$&<ontopanel/mark>\"\r\n      );\r\n      let div = document.createElement(\"div\");\r\n      div.innerText = newText;\r\n      let htmlText = div.innerHTML;\r\n\r\n      let newhtmlText = htmlText\r\n        .replace(\r\n          new RegExp(\"&lt;ontopanelmark&gt;\", \"g\"),\r\n          '<mark class=\"highlight\">'\r\n        )\r\n        .replace(new RegExp(\"&lt;ontopanel/mark&gt;\", \"g\"), \"</mark>\");\r\n\r\n      this.resultShow.innerHTML = newhtmlText;\r\n\r\n      let allMark = this.resultShow.getElementsByTagName(\"mark\");\r\n      if (allMark && allMark.length > 0) {\r\n        this.resultWindow.querySelector(\r\n          'div[class=\"match-info\"]'\r\n        ).innerText = `${allMark.length} Matches`;\r\n        this.resultWindow.querySelector('input[name=\"next-btn\"]').click();\r\n      } else {\r\n        this.resultWindow.querySelector(\r\n          'div[class=\"match-info\"]'\r\n        ).innerText = `No Match`;\r\n      }\r\n    } else {\r\n      this.resultShow.innerText = searchContent;\r\n      this.resultWindow.querySelector('div[class=\"match-info\"]').innerText =\r\n        \"No Input\";\r\n    }\r\n  }\r\n\r\n  localText(text) {}\r\n}\r\n\r\nlet resultContainer = new ResultFrom();\r\n\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/scripts/result.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5ffa23844bf2a4117423")
/******/ })();
/******/ 
/******/ }
);