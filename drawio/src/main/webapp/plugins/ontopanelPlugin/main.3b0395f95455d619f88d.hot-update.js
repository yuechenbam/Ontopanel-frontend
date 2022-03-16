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

/***/ "./ontopanelSource/convertor/index.html":
/*!**********************************************!*\
  !*** ./ontopanelSource/convertor/index.html ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div class=\\\"convertor-container\\\"> <div class=\\\"transformer\\\"> <div>If you used the chowlk libary, please transform first.</div> <input type=\\\"button\\\" name=\\\"transform\\\" value=\\\"transform\\\"/> </div> <div class=\\\"convertor-bar\\\"> <select name=\\\"rdf-format\\\"> <option value=\\\"application/rdf+xml\\\">rdf/xml</option> <option value=\\\"turtle\\\">turtle</option> </select> <input class=\\\"mapping-convert-btn\\\" type=\\\"button\\\" name=\\\"convert\\\" value=\\\"Convert\\\"/> <div class=\\\"mapping-info\\\">With MappingFile: None</div> </div> <div class=\\\"convertor-show\\\"> <div class=\\\"convertor-btn-group\\\"> <input type=\\\"button\\\" name=\\\"mapping\\\" value=\\\"Mapping\\\"/> <input type=\\\"button\\\" name=\\\"result\\\" value=\\\"Result\\\"/> <input type=\\\"button\\\" name=\\\"show-error\\\" value=\\\"ShowError\\\"/> <input type=\\\"button\\\" value=\\\"&#x2193;\\\" style=\\\"width:30px;background-color:#dc143c\\\" name=\\\"download\\\"/> </div> <div class=\\\"convertor-content\\\"> <div> <b>Introduction</b><br> 1. This tool can convert plot to ontology, check errors, map dataset(under development), and download file.<br> 2. It is designed with other ontopanel tools(Library, EntityManager).<br> 3. If your files contains chowlk library shapes, please transform it first.<br> 4. You can get some hints and tutorials in ReadMe of Ontopanel-Library(sidebar) and github.<br> <b>New Feature(10.03.2022)</b><br> 1. add a search bar to OWL result, so that you can search and locate text.<br> 2. download files with right extension.<br> </div> </div> </div> </div> \";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/index.html?");

/***/ }),

/***/ "./ontopanelSource/entityFinder/index.html":
/*!*************************************************!*\
  !*** ./ontopanelSource/entityFinder/index.html ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div id=\\\"ontopanel-container\\\" class=\\\"ontopanel-sign\\\"> <div id=\\\"ontopanel-sign-info\\\">Current user:</div> <div style=\\\"display:flex\\\"> <button id=\\\"ontopanel-signup-btn\\\">SignUp</button> <button id=\\\"ontopanel-login-btn\\\">Login</button> <button id=\\\"ontopanel-logout-btn\\\" style=\\\"display:none\\\">Logout</button> </div> </div> <div id=\\\"ontopanel-onto-btngroup\\\" style=\\\"display:flex;height:40px\\\"> <div style=\\\"display:flex;height:30px\\\" id=\\\"ontopanel-onto-extra-btn\\\"></div> <div style=\\\"display:flex;height:30px\\\"> <button id=\\\"ontopanel-onto-extra-btn-MSEO\\\" style=\\\"cursor:pointer\\\"> MSEO </button> <button id=\\\"ontopanel-onto-add-btn\\\" style=\\\"cursor:pointer\\\">+</button> <p id=\\\"ontopanel-tree-title\\\" style=\\\"margin:5px 0 0 30px;font-size:18px;font-weight:700\\\"> selected: none </p> <button id=\\\"ontopanel-namespace-btn\\\" style=\\\"border:1px soild #000;margin:5px 0 0 5px;cursor:pointer;height:20px\\\"> ⇱ prefix </button> </div> </div> <div id=\\\"ontopanel-onto-menu-info\\\" style=\\\"display:none\\\"></div> <div id=\\\"ontopanel-tree-container\\\" class=\\\"ontopanel-tree\\\"> <div style=\\\"display:flex;height:30px\\\"> <select class=\\\"ontopanel-setting\\\"> <option value=\\\"URI\\\">URI</option> <option value=\\\"RDFLabel\\\">RDFLabel</option> </select> <button id=\\\"ontopanel-tree-class-btn\\\">Class</button> <button id=\\\"ontopanel-tree-op-btn\\\">OP</button> <button id=\\\"ontopanel-tree-dp-btn\\\">DP</button> <button id=\\\"ontopanel-tree-ind-btn\\\">Ind</button> <button id=\\\"ontopanel-tree-ap-btn\\\">AP</button> <button id=\\\"ontopanel-tree-dt-btn\\\">DT</button> <input id=\\\"ontopanel-search-term\\\" style=\\\"margin-left:20px\\\" placeholder=\\\"search entity\\\"/> </div> <div id=\\\"onto-tree-content\\\"> <div style=\\\"font-size:13px\\\"> <b>New Features(10.03.2022):</b> <br \\\\> 1. It is renamed to EntityManager, if you also have a suggestion, let me know.<br \\\\> 2. Update tips for namespaces in ReadMe in Ontopanel-Library. 3. Add allowed combinations in Ontopanel-Library. <br \\\\> <b>Warning:</b> <br \\\\> 1. EntityManager is designed for Ontopanel-Library, which is loaded automatically in the sidebar.<br \\\\> 2. Dont use this one if you use Chowlk library, use entityfinder(old).<br \\\\> 3. Dont use this one and old one at the same time.<br \\\\> <b>Switch to this one:</b> <br \\\\> 1. if your file contains Chowlk library, open convertor, and transform it first. Maybe also convert once to see whether it contains wrong shapes. <br \\\\> <b>Issues:</b><br \\\\> Due to the server it might show problem if you upload large ontology file. It could be solved when the new server is ready. Try to merge and download locally.<br \\\\> </div> </div> </div> \";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/entityFinder/index.html?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("416ce0f99bdf7001390e")
/******/ })();
/******/ 
/******/ }
);