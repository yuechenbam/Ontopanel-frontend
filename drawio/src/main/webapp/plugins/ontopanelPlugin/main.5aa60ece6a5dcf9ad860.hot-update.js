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

/***/ "./ontopanelSource/entityFinder/index.html":
/*!*************************************************!*\
  !*** ./ontopanelSource/entityFinder/index.html ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div id=\\\"ontopanel-container\\\" class=\\\"ontopanel-sign\\\"> <div id=\\\"ontopanel-sign-info\\\">Current user:</div> <div style=\\\"display:flex\\\"> <button id=\\\"ontopanel-signup-btn\\\">SignUp</button> <button id=\\\"ontopanel-login-btn\\\">Login</button> <button id=\\\"ontopanel-logout-btn\\\" style=\\\"display:none\\\">Logout</button> </div> </div> <div id=\\\"ontopanel-onto-btngroup\\\" style=\\\"display:flex;height:40px\\\"> <div style=\\\"display:flex;height:30px\\\" id=\\\"ontopanel-onto-extra-btn\\\"></div> <div style=\\\"display:flex;height:30px\\\"> <button id=\\\"ontopanel-onto-extra-btn-MSEO\\\" style=\\\"cursor:pointer\\\"> MSEO </button> <button id=\\\"ontopanel-onto-add-btn\\\" style=\\\"cursor:pointer\\\">+</button> <p id=\\\"ontopanel-tree-title\\\" style=\\\"margin:5px 0 0 30px;font-size:18px;font-weight:700\\\"> selected: none </p> <button id=\\\"ontopanel-namespace-btn\\\" style=\\\"border:1px soild #000;margin:5px 0 0 5px;cursor:pointer;height:20px\\\"> ⇱ prefix </button> </div> </div> <div id=\\\"ontopanel-onto-menu-info\\\" style=\\\"display:none\\\"></div> <div id=\\\"ontopanel-tree-container\\\" class=\\\"ontopanel-tree\\\"> <div style=\\\"display:flex;height:30px\\\"> <select class=\\\"ontopanel-setting\\\"> <option value=\\\"URI\\\">URI</option> <option value=\\\"RDFLabel\\\">RDFLabel</option> </select> <button id=\\\"ontopanel-tree-class-btn\\\">Class</button> <button id=\\\"ontopanel-tree-op-btn\\\">OP</button> <button id=\\\"ontopanel-tree-dp-btn\\\">DP</button> <button id=\\\"ontopanel-tree-ind-btn\\\">Ind</button> <button id=\\\"ontopanel-tree-ap-btn\\\">AP</button> <button id=\\\"ontopanel-tree-dt-btn\\\">DT</button> <input id=\\\"ontopanel-search-term\\\" style=\\\"margin-left:20px\\\" placeholder=\\\"search entity\\\"/> </div> <div id=\\\"onto-tree-content\\\"> <div style=\\\"font-size:13px\\\"> <b>Warning:</b> <br \\\\> 1. this entityFinder is designed for ontopanel-library, which is loaded automatically in the sidebar.<br \\\\> 2. Dont use this one if you use Chowlk library, use entityfinder(old).<br \\\\> 3. Dont use this one and old one at the same time.<br \\\\> <b>Switch to this one:</b> <br \\\\> 1. if your file contains Chowlk library, open convertor, and transform it first. Maybe also convert once to see whether it contains wrong shapes. <br \\\\> <b>New Features:</b> <br \\\\> 1. Each entity shape has hover effect and shape data.<br \\\\> 2. You can show entities in URI or RDFLabel.<br \\\\> 2. You can output the entity with RDFLabel as shape text, the IRI of entity is saved in shape data.<br \\\\> 4. You can do data-mapping.(Under development)<br \\\\> <b>Issues:</b><br \\\\> Due to the server it might show problem if you upload large ontology file. It could be solved when the new server is ready.<br \\\\> </div> </div> </div> \";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/entityFinder/index.html?");

/***/ }),

/***/ "./ontopanelSource/entityFinder_version1/index.html":
/*!**********************************************************!*\
  !*** ./ontopanelSource/entityFinder_version1/index.html ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \" <div class=\\\"ontopanel-sign\\\"> <div id=\\\"entityfinderold-sign-info\\\">Current user:</div> <div style=\\\"display:flex\\\"> <button id=\\\"entityfinderold-signup-btn\\\">SignUp</button> <button id=\\\"entityfinderold-login-btn\\\">Login</button> <button id=\\\"entityfinderold-logout-btn\\\" style=\\\"display:none\\\">Logout</button> </div> </div> <div class=\\\"ontopanel-onto-btn-group\\\" style=\\\"display:flex;height:40px\\\"> <div style=\\\"display:flex;height:30px\\\" id=\\\"entityfinderold-onto-extra-btn\\\"></div> <div style=\\\"display:flex;height:30px\\\"> <button id=\\\"entityfinderold-onto-extra-btn-MSEO\\\" style=\\\"cursor:pointer\\\"> MSEO </button> <button name=\\\"onto-add-btn\\\" style=\\\"cursor:pointer\\\">+</button> <p id=\\\"entityfinderold-tree-title\\\" style=\\\"margin:5px 0 0 30px;font-size:18px;font-weight:700\\\"> selected: none </p> <button name=\\\"namespace-btn\\\" style=\\\"border:1px soild #000;margin:5px 0 0 5px;cursor:pointer;height:20px\\\"> ⇱ prefix </button> </div> </div> <div id=\\\"entityfinderold-onto-menu-info\\\" style=\\\"display:none\\\"></div> <div id=\\\"entityfinderold-tree-container\\\" class=\\\"ontopanel-tree\\\"> <div style=\\\"display:flex;height:30px\\\"> <button id=\\\"entityfinderold-tree-class-btn\\\">Class</button> <button id=\\\"entityfinderold-tree-op-btn\\\">OP</button> <button id=\\\"entityfinderold-tree-dp-btn\\\">DP</button> <button id=\\\"entityfinderold-tree-ind-btn\\\">Ind</button> <button id=\\\"entityfinderold-tree-ap-btn\\\">AP</button> <button id=\\\"entityfinderold-tree-dt-btn\\\">DT</button> <input id=\\\"entityfinderold-search-term\\\" style=\\\"margin-left:50px\\\" placeholder=\\\"search entity\\\"/> </div> <div name=\\\"onto-tree-content\\\"> <div> <b>Warning:</b> <br \\\\> 1. this version is old, and will be removed(maybe). New verison is called ontopanel-entityFinder.<br \\\\> 2. this version is only suitable for chowlk convertor, and will cause some errors if you use ontopanel-convertor. 3. the new version has more functionalities. <b>Switch to new version:</b> <br \\\\> 1. if your file contains Chowlk library, open convertor, and transform it first. Maybe also convert once to see whether it contains wrong shapes. <br \\\\> <br \\\\> <b>Issues:</b><br \\\\> Due to the server it might show problem if you upload large ontology file. If so, try to merge all the imported files and download it. It could be solved when the new server is ready.<br \\\\> </div> </div> </div> \";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/entityFinder_version1/index.html?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6b7b55138b9d4fb949e3")
/******/ })();
/******/ 
/******/ }
);