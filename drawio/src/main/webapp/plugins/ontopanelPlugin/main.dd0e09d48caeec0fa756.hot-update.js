/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatedrawio_test"]("main",{

/***/ "./ontopanelSource/convertor/html/errors.html":
/*!****************************************************!*\
  !*** ./ontopanelSource/convertor/html/errors.html ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div class=\\\"error-list\\\"> <div name=\\\"other\\\" style=\\\"display:none\\\"> <div class=\\\"error-type\\\">General Errors</div> <ul></ul> <hr/> </div> <div name=\\\"edge\\\" style=\\\"display:none\\\"> <div class=\\\"error-type\\\">Edge Errors</div> <ul></ul> <hr/> </div> <div name=\\\"node\\\" style=\\\"display:none\\\"> <div class=\\\"error-type\\\">Node Errors</div> <ul></ul> <hr/> </div> <div name=\\\"relation\\\" style=\\\"display:none\\\"> <div class=\\\"error-type\\\">Relation Errors</div> <ul></ul> <hr/> </div> </div> \";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/html/errors.html?");

/***/ }),

/***/ "./ontopanelSource/convertor/scripts/errors-list.js":
/*!**********************************************************!*\
  !*** ./ontopanelSource/convertor/scripts/errors-list.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"errorList\": () => (/* binding */ errorList)\n/* harmony export */ });\n/* harmony import */ var _html_errors_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html/errors.html */ \"./ontopanelSource/convertor/html/errors.html\");\n\r\nconst errorList = (errors, ui) => {\r\n  // three errors\r\n  // node error, edge error, and relation error\r\n  let otherErrors = errors.other_errors;\r\n  let edgeErrors = errors.edge_errors;\r\n  let nodeErrors = errors.node_errors;\r\n  let relationErrors = errors.relation_errors;\r\n\r\n  let errorContainer = document.createElement(\"div\");\r\n  errorContainer.innerHTML = _html_errors_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n\r\n  if (otherErrors.length) {\r\n    let otherDiv = errorContainer.querySelector('div[name=\"other\"]');\r\n    let otherUl = otherDiv.querySelector(\"ul\");\r\n    otherErrors.forEach((elem) => {\r\n      let id = elem.id;\r\n      let message = elem.message;\r\n\r\n      let li = makeLi(id, message, ui);\r\n\r\n      otherUl.appendChild(li);\r\n    });\r\n    otherDiv.style.display = \"block\";\r\n  }\r\n\r\n  if (edgeErrors.length) {\r\n    let edgeDiv = errorContainer.querySelector('div[name=\"edge\"]');\r\n    let edgeUl = edgeDiv.querySelector(\"ul\");\r\n    edgeErrors.forEach((elem) => {\r\n      let id = elem.id;\r\n      let message = elem.message;\r\n\r\n      let li = makeLi(id, message, ui);\r\n\r\n      edgeUl.appendChild(li);\r\n    });\r\n    edgeDiv.style.display = \"block\";\r\n  }\r\n  if (nodeErrors.length) {\r\n    let nodeDiv = errorContainer.querySelector('div[name=\"node\"]');\r\n    let nodeUl = nodeDiv.querySelector(\"ul\");\r\n    nodeErrors.forEach((elem) => {\r\n      let id = elem.id;\r\n      let message = elem.message;\r\n\r\n      let li = makeLi(id, message, ui);\r\n      nodeUl.appendChild(li);\r\n    });\r\n    nodeDiv.style.display = \"block\";\r\n  }\r\n\r\n  if (relationErrors.length) {\r\n    let relationDiv = errorContainer.querySelector('div[name=\"relation\"]');\r\n    let relationUl = relationDiv.querySelector(\"ul\");\r\n    relationErrors.forEach((elem) => {\r\n      let id_list = elem.id_list;\r\n      let message = elem.message;\r\n\r\n      let li = makeLiRelation(id_list, message, ui);\r\n      relationUl.appendChild(li);\r\n    });\r\n    relationDiv.style.display = \"block\";\r\n  }\r\n\r\n  return errorContainer;\r\n};\r\n\r\nconst makeLi = (id, message, ui) => {\r\n  let li = document.createElement(\"li\");\r\n  li.id = id;\r\n  li.innerHTML = `\r\n    <div><b>ID: </b>${id}</div> \r\n    <div><b>Error: </b>${message}</div>\r\n    `;\r\n\r\n  li.onclick = (evt) => {\r\n    evt.preventDefault();\r\n    let graph = ui.editor.graph;\r\n    let model = graph.getModel();\r\n    let cell = model.getCell(id);\r\n    graph.clearSelection();\r\n    graph.setSelectionCell(cell);\r\n    graph.scrollCellToVisible(cell, true);\r\n  };\r\n\r\n  return li;\r\n};\r\n\r\nconst makeLiRelation = (id_list, message, ui) => {\r\n  let li = document.createElement(\"li\");\r\n  let list = \"[\" + id_list.join(\",\") + \"]\";\r\n  li.innerHTML = `\r\n    <div><b>ID List: </b>${list}</div> \r\n    <div><b>Error: </b>${message}</div>\r\n    `;\r\n\r\n  li.onclick = (evt) => {\r\n    evt.preventDefault();\r\n    let graph = ui.editor.graph;\r\n    let model = graph.getModel();\r\n    let cellGroup = id_list.map((id) => model.getCell(id));\r\n    graph.clearSelection();\r\n    graph.setSelectionCells(cellGroup);\r\n    graph.scrollCellToVisible(cellGroup[1], true);\r\n  };\r\n\r\n  return li;\r\n};\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/scripts/errors-list.js?");

/***/ }),

/***/ "./ontopanelSource/convertor/scripts/extract-data.js":
/*!***********************************************************!*\
  !*** ./ontopanelSource/convertor/scripts/extract-data.js ***!
  \***********************************************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected token (96:64)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n|     }\\n|   });\\n>   let allInfoJson = JSON.stringify({ nodes: nodes, edges: edges,, errors: errors });\\n|   console.log(allInfoJson);\\n|   let allInfo = { nodes: nodes, edges: edges, errors: errors };\");\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/scripts/extract-data.js?");

/***/ }),

/***/ "./ontopanelSource/convertor/scripts/transform.js":
/*!********************************************************!*\
  !*** ./ontopanelSource/convertor/scripts/transform.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"transform\": () => (/* binding */ transform)\n/* harmony export */ });\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./ontopanelSource/convertor/scripts/store.js\");\n\r\nconst transform = (ui, resultBtn) => {\r\n  let graph = ui.editor.graph;\r\n  let parent = graph.getDefaultParent();\r\n  // var vertices = graph.getChildVertices(parent);\r\n\r\n  // var edges = graph.getChildEdges(parent);\r\n\r\n  let bounds = graph.getGraphBounds();\r\n\r\n  let children = graph.getCells(\r\n    bounds.x,\r\n    bounds.y,\r\n    bounds.width,\r\n    bounds.height,\r\n    parent,\r\n    null,\r\n    null,\r\n    null,\r\n    true\r\n  );\r\n\r\n  let foundedNodeGroup = {};\r\n  let nodes = children.filter((elem) => elem.isVertex());\r\n  let errors = {\r\n    node_errors: [],\r\n    edge_errors: [],\r\n    other_errors: [],\r\n    relation_errors: [],\r\n  };\r\n\r\n  nodes.forEach((elem) => {\r\n    if (typeof elem.value === \"object\") {\r\n    } else {\r\n      let attrs = {};\r\n      let [nodeType, nodeValue] = judgeNodeType(elem);\r\n\r\n      if (nodeType && nodeType !== \"pass\") {\r\n        attrs = {\r\n          label: nodeValue,\r\n          Type: nodeType,\r\n        };\r\n        let newObj = makeNewObject(attrs);\r\n        graph.model.setValue(elem, newObj);\r\n        foundedNodeGroup[elem.id] = nodeType;\r\n      } else {\r\n        if (nodeType !== \"pass\") {\r\n          errors[\"node_errors\"].push({\r\n            id: elem.id,\r\n            message:\r\n              \"not recongized, please use the ontopanel libary to repalce it.\",\r\n          });\r\n        }\r\n      }\r\n    }\r\n    let showData = {\r\n      result:\r\n        \"Transformer can wrongly convert the following:\\nnodes: nodes in rectangle shapes, \\nedges: edges without labels.\\n\\nYou cant click ShowError to check the errors, but maybe not all the errors are catched.\\nPlease use the ontopanel-libary shapes to replace the errors.\\nHowever, it usually will not be a problem if you could not correct all the errors, because convertor will check the errors again.\",\r\n      errors: errors,\r\n    };\r\n    _store__WEBPACK_IMPORTED_MODULE_0__.storeData.modifyData(showData);\r\n    resultBtn.click();\r\n  });\r\n\r\n  let edges = children.filter((elem) => elem.isEdge());\r\n  edges.forEach((elem) => {\r\n    if (typeof elem.value === \"object\") {\r\n    } else {\r\n      let attrs = {};\r\n      let [edgeType, edgeValue] = judgeEdgeType(elem, foundedNodeGroup);\r\n      if (edgeType && edgeType !== \"pass\") {\r\n        attrs = {\r\n          label: edgeValue,\r\n          Type: edgeType,\r\n        };\r\n        let newObj = makeNewObject(attrs);\r\n        graph.model.setValue(elem, newObj);\r\n      }\r\n    }\r\n  });\r\n};\r\n\r\nconst makeNewObject = (attrs) => {\r\n  let doc = mxUtils.createXmlDocument();\r\n  let obj = doc.createElement(\"object\");\r\n  for (let [key, value] of Object.entries(attrs)) {\r\n    obj.setAttribute(key, value);\r\n  }\r\n  return obj;\r\n};\r\n\r\nconst judgeNodeType = (elem) => {\r\n  let style = elem.style;\r\n  let value = getLabel(elem);\r\n  let NodeType = null;\r\n  let div = document.createElement(\"div\");\r\n  div.innerHTML = value;\r\n  let textValue = div.innerText;\r\n\r\n  let elipseGroup = {\r\n    \"⨅\": \"IntersectionOf\",\r\n    intersectionOf: \"IntersectionOf\",\r\n    \"⨆\": \"UnionOf\",\r\n    unionOf: \"UnionOf\",\r\n    \"≡\": \"EquivalentClass\",\r\n    \"⊥\": \"DisjointClass\",\r\n  };\r\n\r\n  if (style.includes(\"shape=note\")) {\r\n    NodeType = \"Namespace\";\r\n  } else if (style.includes(\"shape=document\")) {\r\n    NodeType = \"Metadata\";\r\n  } else if (style.includes(\"shape=parallelogram\")) {\r\n    NodeType = \"CustomDatatype\";\r\n  } else if (style.includes(\"shape=hexagon\")) {\r\n    if (textValue.includes(\"AllDifferent\")) {\r\n      NodeType = \"AllDifferent\";\r\n    }\r\n  } else if (style.includes(\"ellipse\")) {\r\n    Object.keys(elipseGroup).forEach((elipse) => {\r\n      if (textValue.includes(elipse)) {\r\n        NodeType = elipseGroup[elipse];\r\n      }\r\n    });\r\n  } else if (style.includes(\"rhombus\")) {\r\n    if (textValue.includes(\"owl:ObjectProperty\")) {\r\n      NodeType = \"ObjectProperty\";\r\n    } else if (textValue.includes(\"owl:DatatypeProperty\")) {\r\n      NodeType = \"DatatypeProperty\";\r\n    }\r\n  } else if (style.includes(\"edgeLabel\") || style.includes(\"text\")) {\r\n    NodeType = \"pass\";\r\n  } else if (style.includes(\"rounded=0\")) {\r\n    // individual\r\n    if (value.includes(\"<u>\") || style.includes(\"fontStyle=4\")) {\r\n      NodeType = \"Individual\";\r\n    } else if (textValue.includes(\"^^\") || textValue.includes(\"@\")) {\r\n      NodeType = \"DataValue\";\r\n    } else if (!style.includes(\"dashed=1\")) {\r\n      NodeType = \"Class\";\r\n    }\r\n  }\r\n\r\n  return [NodeType, value];\r\n};\r\n\r\nconst judgeEdgeType = (elem, foundedNodeGroup) => {\r\n  let style = elem.style;\r\n  let target = elem.target;\r\n  let source = elem.source;\r\n  let value = getLabel(elem);\r\n  let EdgeType = null;\r\n  let div = document.createElement(\"div\");\r\n  div.innerHTML = value;\r\n  let textValue = div.innerText;\r\n  let openArrowGroup = {\r\n    \"rdfs:subClassOf\": \"SubClassOf\",\r\n    \"rdf:type\": \"RDFType\",\r\n    \"owl:equivalentClass\": \"EquivalentClass\",\r\n    \"owl:disjointWith\": \"DisjointClass\",\r\n    \"owl:complementOf\": \"ComplementOf\",\r\n    \"rdfs:subPropertyOf\": \"SubPropertyOf\",\r\n    \"owl:equivalentProperty\": \"EquivalentProperty\",\r\n    \"owl:inverseOf\": \"InverseOf\",\r\n    \"rdfs:domain\": \"Domain\",\r\n    \"rdfs:range\": \"Range\",\r\n    \"owl:sameAs\": \"SameAs\",\r\n    \"owl:differentFrom\": \"DifferentFrom\",\r\n  };\r\n\r\n  if (!value || value.length === 0) {\r\n    value = \"\";\r\n    if (\r\n      style.includes(\"endArrow=block\") ||\r\n      style.includes(\"startArrow=block\")\r\n    ) {\r\n      EdgeType = \"SubClassOf\";\r\n    } else if (\r\n      style.includes(\"endArrow=open\") ||\r\n      style.includes(\"startArrow=open\")\r\n    ) {\r\n      EdgeType = \"Connector\";\r\n      if (source && source.id in foundedNodeGroup) {\r\n        let NodeType = foundedNodeGroup[source.id];\r\n        if (NodeType === \"Individual\") {\r\n          EdgeType = \"RDFType\";\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  Object.keys(openArrowGroup).forEach((a) => {\r\n    if (textValue.includes(a)) {\r\n      EdgeType = openArrowGroup[a];\r\n    }\r\n  });\r\n  if (!EdgeType) {\r\n    // object property or datatype property\r\n    EdgeType = \"ObjectProperty\";\r\n    if (target && target.id in foundedNodeGroup) {\r\n      let NodeType = foundedNodeGroup[target.id];\r\n      if (NodeType === \"DataValue\") {\r\n        EdgeType = \"DatatypeProperty\";\r\n      }\r\n    }\r\n  }\r\n\r\n  return [EdgeType, value];\r\n};\r\n\r\nconst getLabel = (elem) => {\r\n  let elemLabel = elem.value;\r\n  if (!elemLabel) {\r\n    // edge label is in text box\r\n    let elemChildren = elem.children;\r\n    if (elemChildren) {\r\n      for (let i = 0; i < elemChildren.length; i++) {\r\n        let child = elemChildren[i];\r\n        if (\r\n          (child.style.includes(\"text\") || child.style.includes(\"edgeLabel\")) &&\r\n          child.value\r\n        ) {\r\n          elemLabel = typeof child.value === \"string\" ? child.value : \"\";\r\n          break;\r\n        }\r\n      }\r\n    }\r\n  }\r\n  return elemLabel;\r\n};\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/scripts/transform.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("22f3d4d5706b5a1cc5c7")
/******/ })();
/******/ 
/******/ }
);