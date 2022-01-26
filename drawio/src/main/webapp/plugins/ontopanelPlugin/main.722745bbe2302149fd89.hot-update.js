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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"transform\": () => (/* binding */ transform)\n/* harmony export */ });\nconst transform = (ui) => {\r\n  let graph = ui.editor.graph;\r\n  let parent = graph.getDefaultParent();\r\n  // var vertices = graph.getChildVertices(parent);\r\n\r\n  // var edges = graph.getChildEdges(parent);\r\n\r\n  let bounds = graph.getGraphBounds();\r\n\r\n  let children = graph.getCells(\r\n    bounds.x,\r\n    bounds.y,\r\n    bounds.width,\r\n    bounds.height,\r\n    parent,\r\n    null,\r\n    null,\r\n    null,\r\n    true\r\n  );\r\n\r\n  children.forEach((elem) => {\r\n    let elemStyle = elem.style;\r\n    if (typeof elem.value === \"object\") {\r\n    } else {\r\n      if (elem.isVertex()) {\r\n        let attrs = {};\r\n        let nodeValue = elem.value;\r\n        let nodeType = judgeNodeType(nodeValue, elemStyle);\r\n        console.log(nodeType && nodeType != \"pass\");\r\n        if (nodeType && nodeType !== \"pass\") {\r\n          attrs = {\r\n            label: nodeValue,\r\n            Type: nodeType,\r\n          };\r\n          let newObj = makeNewObject(attrs);\r\n          graph.model.setValue(elem, newObj);\r\n        }\r\n      }\r\n    }\r\n  });\r\n};\r\n\r\nconst makeNewObject = (attrs) => {\r\n  let doc = mxUtils.createXmlDocument();\r\n  let obj = doc.createElement(\"object\");\r\n  for (let [key, value] of Object.entries(attrs)) {\r\n    obj.setAttribute(key, value);\r\n  }\r\n  return obj;\r\n};\r\n\r\nconst judgeNodeType = (value, style) => {\r\n  let NodeType = null;\r\n  let div = document.createElement(\"div\");\r\n  div.innerHTML = value;\r\n  let textValue = div.innerText;\r\n  console.log(textValue);\r\n\r\n  if (style.includes(\"shape=note\")) {\r\n    NodeType = \"Namespace\";\r\n  } else if (style.includes(\"shape=document\")) {\r\n    NodeType = \"Metadata\";\r\n  } else if (style.includes(\"shape=parallelogram\")) {\r\n    NodeType = \"CustomDatatype\";\r\n  } else if (style.includes(\"shape=hexagon\")) {\r\n    if (textValue.includes(\"AllDifferent\")) {\r\n      NodeType = \"AllDifferent\";\r\n    }\r\n  } else if (style.includes(\"ellipse\")) {\r\n    if (textValue.includes(\"⨅\") || textValue.includes(\"intersectionOf\")) {\r\n      NodeType = \"IntersectionOf\";\r\n    } else if (textValue.includes(\"⨆\") || textValue.includes(\"unionOf\")) {\r\n      NodeType = \"UnionOf\";\r\n    } else if (textValue.includes(\"≡\")) {\r\n      NodeType = \"EquivalentClass\";\r\n    } else if (textValue.includes(\"⊥\")) {\r\n      NodeType = \"DisjointClass\";\r\n    }\r\n  } else if (style.includes(\"rhombus\")) {\r\n    if (textValue.includes(\"owl:ObjectProperty\")) {\r\n      NodeType = \"ObjectProperty\";\r\n    } else if (textValue.includes(\"owl:DatatypeProperty\")) {\r\n      NodeType = \"DatatypeProperty\";\r\n    }\r\n  } else if (style.includes(\"edgeLabel\") || style.includes(\"text\")) {\r\n    NodeType = \"pass\";\r\n  } else if (style.includes(\"rounded=0\")) {\r\n    // individual\r\n    if (value.includes(\"<u>\") || style.includes(\"fontStyle=4\")) {\r\n      NodeType = \"Individual\";\r\n    } else if (textValue.includes(\"^^\") || textValue.includes(\"@\")) {\r\n      NodeType = \"DataValue\";\r\n    } else if (!style.includes(\"dashed=1\")) {\r\n      NodeType = \"Class\";\r\n    }\r\n  }\r\n\r\n  return NodeType;\r\n};\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/scripts/transform.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0ca8ddf79e23020339ac")
/******/ })();
/******/ 
/******/ }
);