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

/***/ "./ontopanelSource/convertor/scripts/extract-data.js":
/*!***********************************************************!*\
  !*** ./ontopanelSource/convertor/scripts/extract-data.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"extractData\": () => (/* binding */ extractData)\n/* harmony export */ });\nconst extractData = (ui) => {\r\n  let graph = ui.editor.graph;\r\n  let parent = graph.getDefaultParent();\r\n  // var vertices = graph.getChildVertices(parent);\r\n\r\n  // var edges = graph.getChildEdges(parent);\r\n\r\n  let bounds = graph.getGraphBounds();\r\n\r\n  let children = graph.getCells(\r\n    bounds.x,\r\n    bounds.y,\r\n    bounds.width,\r\n    bounds.height,\r\n    parent,\r\n    null,\r\n    null,\r\n    null,\r\n    true\r\n  );\r\n  let nodes = {};\r\n  let edges = {};\r\n  let errors = {\r\n    node_errors: [],\r\n    edge_errors: [],\r\n    relation_errors: [],\r\n    other_errors: [],\r\n  };\r\n  children.forEach((elem) => {\r\n    if (typeof elem.value === \"object\") {\r\n      let type = elem.getAttribute(\"Type\", null);\r\n      if (type) {\r\n        let id = elem.id;\r\n        let elemStyle = elem.style;\r\n\r\n        let elemSource = elem.source ? elem.source.id : \"none\";\r\n        let elemTarget = elem.target ? elem.target.id : \"none\";\r\n        let elemGeometry = elem.geometry ? { ...elem.geometry } : \"none\";\r\n\r\n        let attrs = elem.value.attributes;\r\n        let elemLabel = attrs[\"label\"].value.trim();\r\n        let value = {};\r\n        for (let i = 0; i < attrs.length; i++) {\r\n          let attr = attrs[i];\r\n          let attrName = attr.name.trim();\r\n          if (attrName !== \"label\" && attrName !== \"Type\") {\r\n            value[attrName] = attr.value.trim();\r\n          }\r\n        }\r\n\r\n        let objectData = Object.keys(value).length ? value : \"none\";\r\n        // edges need source and target, nodes need geometry\r\n\r\n        if (elem.isEdge()) {\r\n          // if Label is empty\r\n          if (!elemLabel) {\r\n            // edge label is in text box\r\n            let elemChildren = elem.children;\r\n            if (elemChildren) {\r\n              for (let i = 0; i < elemChildren.length; i++) {\r\n                let child = elemChildren[i];\r\n                if (\r\n                  (child.style.includes(\"text\") ||\r\n                    child.style.includes(\"edgeLabel\")) &&\r\n                  child.value\r\n                ) {\r\n                  elemLabel =\r\n                    typeof child.value === \"string\" ? child.value : \"\";\r\n                  break;\r\n                }\r\n              }\r\n            }\r\n          }\r\n\r\n          edges[id] = {\r\n            type: type,\r\n            style: elemStyle,\r\n            label: elemLabel,\r\n            source: elemSource,\r\n            target: elemTarget,\r\n            objectData: objectData,\r\n          };\r\n        } else {\r\n          nodes[id] = {\r\n            type: type,\r\n            style: elemStyle,\r\n            label: elemLabel,\r\n            geometry: elemGeometry,\r\n            objectData: objectData,\r\n          };\r\n        }\r\n      } else {\r\n        let errorInfo = {\r\n          id: elem.id,\r\n          message:\r\n            \"this shape is not from libary, please use libary or transform.\",\r\n        };\r\n        errors[\"other_errors\"].push(errorInfo);\r\n      }\r\n    } else {\r\n      let errorInfo = {\r\n        id: elem.id,\r\n        message:\r\n          \"this shape is not from libary, please use libary or transform.\",\r\n      };\r\n      errors[\"other_errors\"].push(errorInfo);\r\n    }\r\n  });\r\n  let allInfoJson = JSON.stringify({\r\n    nodes: nodes,\r\n    edges: edges,\r\n    errors: errors,\r\n  });\r\n  console.log(allInfoJson);\r\n  let allInfo = { nodes: nodes, edges: edges, errors: errors };\r\n\r\n  return allInfo;\r\n};\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/convertor/scripts/extract-data.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b3287e3e601174b2b231")
/******/ })();
/******/ 
/******/ }
);