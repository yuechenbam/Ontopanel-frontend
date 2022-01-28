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

/***/ "./ontopanelSource/convertor/scripts/errors-list.js":
/*!**********************************************************!*\
  !*** ./ontopanelSource/convertor/scripts/errors-list.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"errorList\": () => (/* binding */ errorList)\n/* harmony export */ });\n/* harmony import */ var _html_errors_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/errors.html */ \"./ontopanelSource/convertor/html/errors.html\");\n\r\nconst errorList = (errors, ui) => {\r\n  // three errors\r\n  // node error, edge error, and relation error\r\n  let otherErrors = errors.other_errors;\r\n  let edgeErrors = errors.edge_errors;\r\n  let nodeErrors = errors.node_errors;\r\n  let relationErrors = errors.relation_errors;\r\n\r\n  let errorContainer = document.createElement(\"div\");\r\n  errorContainer.innerHTML = _html_errors_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n\r\n  let noErrorDiv = errorContainer.querySelector('div[name=\"noerror\"]');\r\n\r\n  if (otherErrors.length) {\r\n    let otherDiv = errorContainer.querySelector('div[name=\"other\"]');\r\n    let otherUl = otherDiv.querySelector(\"ul\");\r\n    otherErrors.forEach((elem) => {\r\n      let id = elem.id;\r\n      let message = elem.message;\r\n\r\n      let li = makeLi(id, message, ui);\r\n\r\n      otherUl.appendChild(li);\r\n    });\r\n    otherDiv.style.display = \"block\";\r\n    noErrorDiv.style.display = \"none\";\r\n  }\r\n\r\n  if (edgeErrors.length) {\r\n    let edgeDiv = errorContainer.querySelector('div[name=\"edge\"]');\r\n    let edgeUl = edgeDiv.querySelector(\"ul\");\r\n    edgeErrors.forEach((elem) => {\r\n      let id = elem.id;\r\n      let message = elem.message;\r\n\r\n      let li = makeLi(id, message, ui);\r\n\r\n      edgeUl.appendChild(li);\r\n    });\r\n    edgeDiv.style.display = \"block\";\r\n    noErrorDiv.style.display = \"none\";\r\n  }\r\n  if (nodeErrors.length) {\r\n    let nodeDiv = errorContainer.querySelector('div[name=\"node\"]');\r\n    let nodeUl = nodeDiv.querySelector(\"ul\");\r\n    nodeErrors.forEach((elem) => {\r\n      let id = elem.id;\r\n      let message = elem.message;\r\n\r\n      let li = makeLi(id, message, ui);\r\n      nodeUl.appendChild(li);\r\n    });\r\n    nodeDiv.style.display = \"block\";\r\n    noErrorDiv.style.display = \"none\";\r\n  }\r\n\r\n  if (relationErrors.length) {\r\n    let relationDiv = errorContainer.querySelector('div[name=\"relation\"]');\r\n    let relationUl = relationDiv.querySelector(\"ul\");\r\n    relationErrors.forEach((elem) => {\r\n      let id_list = elem.id_list;\r\n      let message = elem.message;\r\n\r\n      let li = makeLiRelation(id_list, message, ui);\r\n      relationUl.appendChild(li);\r\n    });\r\n    relationDiv.style.display = \"block\";\r\n    noErrorDiv.style.display = \"none\";\r\n  }\r\n\r\n  return errorContainer;\r\n};\r\n\r\nconst makeLi = (id, message, ui) => {\r\n  let li = document.createElement(\"li\");\r\n  li.id = id;\r\n  li.innerHTML = `\r\n    <div><b>ID: </b>${id}</div> \r\n    <div><b>Error: </b>${message}</div>\r\n    `;\r\n\r\n  li.onclick = (evt) => {\r\n    evt.preventDefault();\r\n    let graph = ui.editor.graph;\r\n    let model = graph.getModel();\r\n    let cell = model.getCell(id);\r\n    graph.clearSelection();\r\n    graph.setSelectionCell(cell);\r\n    graph.scrollCellToVisible(cell, true);\r\n  };\r\n\r\n  return li;\r\n};\r\n\r\nconst makeLiRelation = (id_list, message, ui) => {\r\n  let li = document.createElement(\"li\");\r\n  let list = \"[\" + id_list.join(\",\") + \"]\";\r\n  li.innerHTML = `\r\n    <div><b>ID List: </b>${list}</div> \r\n    <div><b>Error: </b>${message}</div>\r\n    `;\r\n\r\n  li.onclick = (evt) => {\r\n    evt.preventDefault();\r\n    let graph = ui.editor.graph;\r\n    let model = graph.getModel();\r\n    let cellGroup = id_list.map((id) => model.getCell(id));\r\n    graph.clearSelection();\r\n    graph.setSelectionCells(cellGroup);\r\n    graph.scrollCellToVisible(cellGroup[1], true);\r\n  };\r\n\r\n  return li;\r\n};\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/scripts/errors-list.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("97fe9a29728f0a682f61")
/******/ })();
/******/ 
/******/ }
);