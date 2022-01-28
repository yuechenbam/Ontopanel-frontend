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

/***/ "./ontopanelSource/entityFinder_version1/scripts/store.js":
/*!****************************************************************!*\
  !*** ./ontopanelSource/entityFinder_version1/scripts/store.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"storeData\": () => (/* binding */ storeData)\n/* harmony export */ });\nclass Store {\r\n  constructor() {\r\n    this.mesoNamespace = [\r\n      \"base:https://purl.matolab.org/mseo/methods/example/\",\r\n      \"mid:https://purl.matolab.org/mseo/mid/\",\r\n      \"cco:http://www.ontologyrepository.com/CommonCoreOntologies/\",\r\n      \"obo:http://purl.obolibrary.org/obo/\",\r\n      \"pt:http://www.daml.org/2003/01/periodictable/PeriodicTable#\",\r\n      \"geo:http://www.opengis.net/ont/geosparql#\",\r\n    ];\r\n    this.ontoBank = { \"ontopanel-onto-extra-btn-MSEO\": {} };\r\n\r\n    this.currentCategoriesContent = {\r\n      title: null,\r\n      categories: {\r\n        Class: { name: \"Class\", content: null },\r\n        ObjectProperty: { name: \"ObjectProperty\", content: null },\r\n        DatatypeProperty: { name: \"DatatypeProperty\", content: null },\r\n        Individual: { name: \"Individual\", content: null },\r\n        AnnotationProperty: { name: \"AnnotationProperty\", content: null },\r\n        Datatype: { name: \"Datatype\", content: null },\r\n      },\r\n    };\r\n  }\r\n  modifyOntoBank = (input, keyword) => {\r\n    // input: [key, value]\r\n    switch (keyword) {\r\n      case \"reset\":\r\n        this.ontoBank = { \"ontopanel-onto-extra-btn-MSEO\": {} };\r\n        break;\r\n      case \"add\":\r\n        this.ontoBank[input[0]] = input[1];\r\n        break;\r\n      case \"delete\":\r\n        delete this.ontoBank[input[0]];\r\n    }\r\n  };\r\n  modifyCurrentCategoriesContent = (title, data, keyword) => {\r\n    switch (keyword) {\r\n      case \"reset\":\r\n        this.currentCategoriesContent = {\r\n          title: \"none\",\r\n          categories: {\r\n            Class: { name: \"Class\", content: null },\r\n            ObjectProperty: { name: \"ObjectProperty\", content: null },\r\n            DatatypeProperty: { name: \"DatatypeProperty\", content: null },\r\n            Individual: { name: \"Individual\", content: null },\r\n            AnnotationProperty: { name: \"AnnotationProperty\", content: null },\r\n            Datatype: { name: \"Datatype\", content: null },\r\n          },\r\n        };\r\n        break;\r\n      case \"selected\":\r\n        this.currentCategoriesContent.title = title;\r\n        Object.keys(this.currentCategoriesContent.categories).forEach(\r\n          (entity) => {\r\n            this.currentCategoriesContent.categories[entity][\"content\"] =\r\n              data[entity];\r\n          }\r\n        );\r\n        break;\r\n    }\r\n  };\r\n\r\n  loadCurrentTable = (data, keyword = \"selected\") => {\r\n    switch (keyword) {\r\n      case \"selected\":\r\n        let tree = data.onto_table[\"tree\"];\r\n        this.modifyCurrentCategoriesContent(data.title, tree, keyword);\r\n        break;\r\n      case \"reset\":\r\n        this.modifyCurrentCategoriesContent(null, null, keyword);\r\n    }\r\n\r\n    document.getElementById(\r\n      \"ontopanel-tree-title\"\r\n    ).innerHTML = `selected: ${this.currentCategoriesContent.title}`;\r\n    document.getElementById(\"ontopanel-tree-class-btn\").click();\r\n  };\r\n}\r\n\r\nlet storeData = new Store();\r\n\r\n\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/entityFinder_version1/scripts/store.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f3c13268e2de373d2f78")
/******/ })();
/******/ 
/******/ }
);