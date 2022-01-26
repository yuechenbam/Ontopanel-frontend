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

/***/ "./ontopanelSource/convertor/scripts/transform.js":
/*!********************************************************!*\
  !*** ./ontopanelSource/convertor/scripts/transform.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"transform\": () => (/* binding */ transform)\n/* harmony export */ });\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./ontopanelSource/convertor/scripts/store.js\");\n\r\nconst transform = (ui) => {\r\n  let graph = ui.editor.graph;\r\n  let parent = graph.getDefaultParent();\r\n  // var vertices = graph.getChildVertices(parent);\r\n\r\n  // var edges = graph.getChildEdges(parent);\r\n\r\n  let bounds = graph.getGraphBounds();\r\n\r\n  let children = graph.getCells(\r\n    bounds.x,\r\n    bounds.y,\r\n    bounds.width,\r\n    bounds.height,\r\n    parent,\r\n    null,\r\n    null,\r\n    null,\r\n    true\r\n  );\r\n\r\n  let foundedNodeGroup = {};\r\n  let nodes = children.filter((elem) => elem.isVertex());\r\n  let errors = {\r\n    node_errors: [],\r\n    edge_errors: [],\r\n    other_errors: [],\r\n    relation_errors: [],\r\n  };\r\n\r\n  nodes.forEach((elem) => {\r\n    if (typeof elem.value === \"object\") {\r\n    } else {\r\n      let attrs = {};\r\n      let [nodeType, nodeValue] = judgeNodeType(elem);\r\n\r\n      if (nodeType && nodeType !== \"pass\") {\r\n        attrs = {\r\n          label: nodeValue,\r\n          Type: nodeType,\r\n        };\r\n        let newObj = makeNewObject(attrs);\r\n        graph.model.setValue(elem, newObj);\r\n        foundedNodeGroup[elem.id] = nodeType;\r\n      } else {\r\n        if (nodeType !== \"pass\") {\r\n          errors[\"node_errors\"].push({\r\n            id: elem.id,\r\n            message:\r\n              \"not recongized, please use the ontopanel libary to repalce it.\",\r\n          });\r\n        }\r\n      }\r\n    }\r\n    let showData = { result: \"transform succeed\", errors: errors };\r\n    _store__WEBPACK_IMPORTED_MODULE_0__.storeData.modifyData(showData);\r\n  });\r\n\r\n  let edges = children.filter((elem) => elem.isEdge());\r\n  edges.forEach((elem) => {\r\n    if (typeof elem.value === \"object\") {\r\n    } else {\r\n      let attrs = {};\r\n      let [edgeType, edgeValue] = judgeEdgeType(elem, foundedNodeGroup);\r\n      if (edgeType && edgeType !== \"pass\") {\r\n        attrs = {\r\n          label: edgeValue,\r\n          Type: edgeType,\r\n        };\r\n        let newObj = makeNewObject(attrs);\r\n        graph.model.setValue(elem, newObj);\r\n      }\r\n    }\r\n  });\r\n};\r\n\r\nconst makeNewObject = (attrs) => {\r\n  let doc = mxUtils.createXmlDocument();\r\n  let obj = doc.createElement(\"object\");\r\n  for (let [key, value] of Object.entries(attrs)) {\r\n    obj.setAttribute(key, value);\r\n  }\r\n  return obj;\r\n};\r\n\r\nconst judgeNodeType = (elem) => {\r\n  let style = elem.style;\r\n  let value = getLabel(elem);\r\n  let NodeType = null;\r\n  let div = document.createElement(\"div\");\r\n  div.innerHTML = value;\r\n  let textValue = div.innerText;\r\n\r\n  let elipseGroup = {\r\n    \"⨅\": \"IntersectionOf\",\r\n    intersectionOf: \"IntersectionOf\",\r\n    \"⨆\": \"UnionOf\",\r\n    unionOf: \"UnionOf\",\r\n    \"≡\": \"EquivalentClass\",\r\n    \"⊥\": \"DisjointClass\",\r\n  };\r\n\r\n  if (style.includes(\"shape=note\")) {\r\n    NodeType = \"Namespace\";\r\n  } else if (style.includes(\"shape=document\")) {\r\n    NodeType = \"Metadata\";\r\n  } else if (style.includes(\"shape=parallelogram\")) {\r\n    NodeType = \"CustomDatatype\";\r\n  } else if (style.includes(\"shape=hexagon\")) {\r\n    if (textValue.includes(\"AllDifferent\")) {\r\n      NodeType = \"AllDifferent\";\r\n    }\r\n  } else if (style.includes(\"ellipse\")) {\r\n    Object.keys(elipseGroup).forEach((elipse) => {\r\n      if (textValue.includes(elipse)) {\r\n        NodeType = elipseGroup[elipse];\r\n      }\r\n    });\r\n  } else if (style.includes(\"rhombus\")) {\r\n    if (textValue.includes(\"owl:ObjectProperty\")) {\r\n      NodeType = \"ObjectProperty\";\r\n    } else if (textValue.includes(\"owl:DatatypeProperty\")) {\r\n      NodeType = \"DatatypeProperty\";\r\n    }\r\n  } else if (style.includes(\"edgeLabel\") || style.includes(\"text\")) {\r\n    NodeType = \"pass\";\r\n  } else if (style.includes(\"rounded=0\")) {\r\n    // individual\r\n    if (value.includes(\"<u>\") || style.includes(\"fontStyle=4\")) {\r\n      NodeType = \"Individual\";\r\n    } else if (textValue.includes(\"^^\") || textValue.includes(\"@\")) {\r\n      NodeType = \"DataValue\";\r\n    } else if (!style.includes(\"dashed=1\")) {\r\n      NodeType = \"Class\";\r\n    }\r\n  }\r\n\r\n  return [NodeType, value];\r\n};\r\n\r\nconst judgeEdgeType = (elem, foundedNodeGroup) => {\r\n  let style = elem.style;\r\n  let target = elem.target;\r\n  let source = elem.source;\r\n  let value = getLabel(elem);\r\n  let EdgeType = null;\r\n  let div = document.createElement(\"div\");\r\n  div.innerHTML = value;\r\n  let textValue = div.innerText;\r\n  let openArrowGroup = {\r\n    \"rdfs:subClassOf\": \"SubClassOf\",\r\n    \"rdf:type\": \"RDFType\",\r\n    \"owl:equivalentClass\": \"EquivalentClass\",\r\n    \"owl:disjointWith\": \"DisjointClass\",\r\n    \"owl:complementOf\": \"ComplementOf\",\r\n    \"rdfs:subPropertyOf\": \"SubPropertyOf\",\r\n    \"owl:equivalentProperty\": \"EquivalentProperty\",\r\n    \"owl:inverseOf\": \"InverseOf\",\r\n    \"rdfs:domain\": \"Domain\",\r\n    \"rdfs:range\": \"Range\",\r\n    \"owl:sameAs\": \"SameAs\",\r\n    \"owl:differentFrom\": \"DifferentFrom\",\r\n  };\r\n\r\n  if (!value || value.length === 0) {\r\n    value = \"\";\r\n    if (\r\n      style.includes(\"endArrow=block\") ||\r\n      style.includes(\"startArrow=block\")\r\n    ) {\r\n      EdgeType = \"SubClassOf\";\r\n    } else if (\r\n      style.includes(\"endArrow=open\") ||\r\n      style.includes(\"startArrow=open\")\r\n    ) {\r\n      EdgeType = \"Connector\";\r\n      if (source && source.id in foundedNodeGroup) {\r\n        let NodeType = foundedNodeGroup[source.id];\r\n        if (NodeType === \"Individual\") {\r\n          EdgeType = \"RDFType\";\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  Object.keys(openArrowGroup).forEach((a) => {\r\n    if (textValue.includes(a)) {\r\n      EdgeType = openArrowGroup[a];\r\n    }\r\n  });\r\n  if (!EdgeType) {\r\n    // object property or datatype property\r\n    EdgeType = \"ObjectProperty\";\r\n    if (target && target.id in foundedNodeGroup) {\r\n      let NodeType = foundedNodeGroup[target.id];\r\n      if (NodeType === \"DataValue\") {\r\n        EdgeType = \"DatatypeProperty\";\r\n      }\r\n    }\r\n  }\r\n\r\n  return [EdgeType, value];\r\n};\r\n\r\nconst getLabel = (elem) => {\r\n  let elemLabel = elem.value;\r\n  if (!elemLabel) {\r\n    // edge label is in text box\r\n    let elemChildren = elem.children;\r\n    if (elemChildren) {\r\n      for (let i = 0; i < elemChildren.length; i++) {\r\n        let child = elemChildren[i];\r\n        if (\r\n          (child.style.includes(\"text\") || child.style.includes(\"edgeLabel\")) &&\r\n          child.value\r\n        ) {\r\n          elemLabel = typeof child.value === \"string\" ? child.value : \"\";\r\n          break;\r\n        }\r\n      }\r\n    }\r\n  }\r\n  return elemLabel;\r\n};\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/scripts/transform.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("bbb4986575429fb0324e")
/******/ })();
/******/ 
/******/ }
);