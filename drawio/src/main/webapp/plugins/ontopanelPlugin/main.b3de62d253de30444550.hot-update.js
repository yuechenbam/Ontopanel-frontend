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

/***/ "./ontopanelSource/entityFinder/scripts/onto-tree.js":
/*!***********************************************************!*\
  !*** ./ontopanelSource/entityFinder/scripts/onto-tree.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./ontopanelSource/entityFinder/scripts/store.js\");\n/* harmony import */ var _html_onto_tree_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/onto-tree.html */ \"./ontopanelSource/entityFinder/html/onto-tree.html\");\n\r\n\r\n\r\n// tree structure\r\n\r\nclass OntoTree {\r\n  constructor(app, ui, wnd, data) {\r\n    this.app = app;\r\n    this.ui = ui;\r\n    this.wnd = wnd;\r\n    this.data = data;\r\n    this.init();\r\n  }\r\n  init() {\r\n    let tree = document.createElement(\"div\");\r\n    tree.innerHTML = _html_onto_tree_html__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\r\n    this.treeContent = tree.querySelector(\".tree-content\");\r\n\r\n    let cateDiv = this.treeContent.querySelector('div[name=\"cate-name\"]');\r\n    cateDiv.textContent = this.data.name;\r\n\r\n    let expandAllBtn = this.treeContent.querySelectorAll(\".collapse-btn\")[0];\r\n    let foldAllBtn = this.treeContent.querySelectorAll(\".collapse-btn\")[1];\r\n    let searchBar = this.app.querySelector(\"#ontopanel-search-term\");\r\n    expandAllBtn.onclick = (evt) => {\r\n      evt.preventDefault();\r\n      this.collpaseAll();\r\n    };\r\n\r\n    foldAllBtn.onclick = (evt) => {\r\n      evt.preventDefault();\r\n      this.foldAll();\r\n    };\r\n\r\n    searchBar.onkeyup = (evt) => {\r\n      evt.preventDefault();\r\n      let termValue = searchBar.value.trim().toUpperCase();\r\n      this.search(termValue);\r\n    };\r\n\r\n    let liElem = tree.querySelector(\"li\");\r\n\r\n    let treeEntities = this.treeContent.querySelector(\"#ontopanel-tree-entity\");\r\n\r\n    let content = this.data.content;\r\n\r\n    let ul = buildTree(this.ui, content, liElem, this.wnd, this.treeContent);\r\n    treeEntities.replaceWith(ul);\r\n  }\r\n\r\n  foldAll = () => {\r\n    let firstLevel = this.treeContent.querySelectorAll(\"ul >li\");\r\n    let allCollapseIcon = [\r\n      ...this.treeContent.querySelectorAll('[name=\"li-collapse-btn\"]'),\r\n    ];\r\n    allCollapseIcon.forEach((icon) => {\r\n      icon.innerText = \"\\u2295\";\r\n    });\r\n    firstLevel.forEach((firstLi) => {\r\n      // next level\r\n      let nextUl = [...firstLi.getElementsByTagName(\"ul\")];\r\n      nextUl.forEach((ul) => {\r\n        ul.style.display = \"none\";\r\n      });\r\n    });\r\n  };\r\n\r\n  collpaseAll = () => {\r\n    let allCollapseIcon = [\r\n      ...this.treeContent.querySelectorAll('[name=\"li-collapse-btn\"]'),\r\n    ];\r\n    let allUl = [...this.treeContent.getElementsByTagName(\"ul\")];\r\n    allCollapseIcon.forEach((icon) => {\r\n      icon.innerText = \"\\u2296\";\r\n    });\r\n    allUl.forEach((ul) => (ul.style.display = \"\"));\r\n  };\r\n\r\n  search = (filter) => {\r\n    let li = this.treeContent.querySelectorAll(\"li\");\r\n\r\n    if (li.length) {\r\n      this.collpaseAll();\r\n\r\n      let table = _store__WEBPACK_IMPORTED_MODULE_0__.storeData.currentCategoriesContent.table;\r\n      for (let i = 0; i < li.length; i++) {\r\n        let liTermTextAll = li[i].querySelectorAll('div[name=\"li-term-text\"]');\r\n        let liTermText = liTermTextAll[0];\r\n        let entityId = liTermText.textContent;\r\n        let entityLabel = table[entityId].RDFLabel;\r\n\r\n        let c = [...liTermTextAll];\r\n        let entityIdString = c.map((x) => x.firstChild.textContent).join(\"\\n\");\r\n        let entityLabelString = c\r\n          .map((x) => table[x.firstChild.textContent].RDFLabel)\r\n          .join(\"\\n\");\r\n\r\n        if (entityIdString || entityLabelString) {\r\n          if (\r\n            entityLabelString.toUpperCase().indexOf(filter) > -1 ||\r\n            entityIdString.toUpperCase().indexOf(filter) > -1\r\n          ) {\r\n            li[i].style.display = \"\";\r\n\r\n            if (\r\n              entityLabel.toUpperCase().indexOf(filter) > -1 ||\r\n              entityId.toUpperCase().indexOf(filter) > -1\r\n            ) {\r\n              liTermText.style.backgroundColor = filter\r\n                ? \"#fddde6\"\r\n                : \"transparent\";\r\n            } else {\r\n              liTermText.style.background = \"transparent\";\r\n            }\r\n          } else {\r\n            li[i].style.display = \"none\";\r\n            liTermText.style.background = \"transparent\";\r\n          }\r\n        }\r\n      }\r\n    }\r\n  };\r\n}\r\n\r\n// build tree structure\r\n\r\nconst buildTree = (ui, arr, liElem, wnd, treeContent) => {\r\n  let ul = document.createElement(\"ul\");\r\n\r\n  arr.forEach((elem) => {\r\n    let li = liElem.cloneNode(true);\r\n\r\n    let liCom = li.firstElementChild;\r\n\r\n    let liIcon = liCom.children[0];\r\n    let liText = liCom.children[1];\r\n    let liOutBtn = liCom.children[2];\r\n    let liReplaceBtn = liCom.children[3];\r\n\r\n    let liEntityText = liText.children[0];\r\n\r\n    // add id to each term, the original can have html tag, so use innerText to get it.\r\n\r\n    liEntityText.innerHTML = elem[0];\r\n    let termText = liEntityText.innerText;\r\n\r\n    if (_store__WEBPACK_IMPORTED_MODULE_0__.storeData.setting === \"RDFLabel\") {\r\n      // check if rdflabel exists\r\n\r\n      let rdfLabel =\r\n        _store__WEBPACK_IMPORTED_MODULE_0__.storeData.currentCategoriesContent.table[termText].RDFLabel;\r\n      if (rdfLabel.length) {\r\n        let newHTML = elem[0].replace(termText, rdfLabel);\r\n        liEntityText.innerHTML = newHTML;\r\n      }\r\n    }\r\n\r\n    //\r\n\r\n    //let termId = liEntityText.innerText;\r\n\r\n    let id = \"li-term-\" + termText;\r\n    liEntityText.id = id;\r\n\r\n    // show rdflabel or IRI\r\n\r\n    liEntityText.onclick = (evt) => {\r\n      evt.preventDefault();\r\n      let liEntityDetail = liText.children[1];\r\n      let newDetail = makeDetailBox(id, liEntityDetail);\r\n      console.log(newDetail);\r\n      liEntityDetail.replaceWith(newDetail);\r\n      newDetail.style.display = \"block\";\r\n      newDetail.scrollIntoView({ block: \"nearest\", inline: \"center\" });\r\n      li.onmouseleave = (evt) => {\r\n        newDetail.style.display = \"none\";\r\n      };\r\n    };\r\n\r\n    liOutBtn.onclick = (evt) => {\r\n      let text = liEntityText.innerText;\r\n      liOutBtnToggle(text, id, ui, wnd, evt);\r\n    };\r\n    liReplaceBtn.onclick = (evt) => {\r\n      try {\r\n        let text = liEntityText.innerText;\r\n        liReplaceBtnToggle(text, id, ui);\r\n      } catch (e) {\r\n        let errorDiv = treeContent.querySelector(\".match-error\");\r\n        errorDiv.innerText = e;\r\n        errorDiv.style.display = \"block\";\r\n        setTimeout(() => {\r\n          errorDiv.style.display = \"none\";\r\n        }, 8000);\r\n      }\r\n    };\r\n\r\n    ul.appendChild(li);\r\n\r\n    if (elem[1].length) {\r\n      liIcon.innerText = \"\\u2296\";\r\n      liIcon.style = \"cursor:pointer; margin-right:1px;\";\r\n      liIcon.setAttribute(\"name\", \"li-collapse-btn\");\r\n\r\n      let ulNext = buildTree(ui, elem[1], liElem, wnd, treeContent);\r\n      li.appendChild(ulNext);\r\n\r\n      liIcon.onclick = (evt) => {\r\n        let selectedLi = evt.target;\r\n        let childUl = evt.target.parentElement.nextElementSibling;\r\n\r\n        if (evt.target.innerText === \"\\u2296\") {\r\n          childUl.style.display = \"none\";\r\n          selectedLi.innerText = \"\\u2295\";\r\n        } else {\r\n          childUl.style.display = \"block\";\r\n          selectedLi.innerText = \"\\u2296\";\r\n        }\r\n      };\r\n    } else {\r\n      liIcon.innerHTML = \"--\";\r\n      liIcon.style = \"color:grey;margin-right:1px;\";\r\n\r\n      liCom.prepend(liIcon);\r\n    }\r\n  });\r\n  return ul;\r\n};\r\n\r\nconst makeDetailBox = (id, detailBox) => {\r\n  let newBox = detailBox.cloneNode(true);\r\n  let entityId = id.replace(\"li-term-\", \"\");\r\n\r\n  let table = _store__WEBPACK_IMPORTED_MODULE_0__.storeData.currentCategoriesContent.table;\r\n  let entityContent = table[entityId];\r\n\r\n  let entityIRI = newBox.querySelector('div[name=\"entity-IRI\"]');\r\n  entityIRI.innerText = entityId + \" (\" + entityContent.EntityIRI + \")\";\r\n\r\n  let rdfLabel = newBox.querySelector('div[name=\"entity-label\"]');\r\n  rdfLabel.innerText = entityContent.RDFLabel ? entityContent.RDFLabel : \"none\";\r\n\r\n  let color = newBox.querySelector('div[name=\"entity-color\"]');\r\n  color.innerText = entityContent.Color;\r\n\r\n  let annos = newBox.querySelector('div[name=\"entity-annos\"]');\r\n  annos.innerHTML = addSpecialInfo(entityContent.Annotations).innerHTML;\r\n\r\n  let specialInfo = newBox.querySelector('div[name=\"entity-special\"]');\r\n  specialInfo.innerHTML = addSpecialInfo(entityContent.SpecialInfo).innerHTML;\r\n\r\n  newBox.onclick = (evt) => {\r\n    evt.stopPropagation();\r\n  };\r\n\r\n  return newBox;\r\n};\r\n\r\nconst liOutBtnToggle = (text, id, ui, wnd, evt) => {\r\n  let entityId = id.replace(\"li-term-\", \"\");\r\n  let labelOffset = 0;\r\n  let table = _store__WEBPACK_IMPORTED_MODULE_0__.storeData.currentCategoriesContent.table;\r\n\r\n  let term = table[entityId];\r\n  let cate = term.BelongsTo;\r\n  let color = term.Color;\r\n  let label = text;\r\n\r\n  switch (cate) {\r\n    case \"Class\":\r\n      let styleString;\r\n      if (color === \"none\") {\r\n        styleString = \"rounded=0;whiteSpace=wrap;html=1;\";\r\n      } else {\r\n        styleString = `rounded=0;whiteSpace=wrap;html=1;fillColor=${color};`;\r\n      }\r\n      var colCell = new mxCell(\r\n        label,\r\n        new mxGeometry(0, 0, 90, 26),\r\n        styleString\r\n      );\r\n      var maxNameLength = label.length;\r\n\r\n      var size = ui.editor.graph.getPreferredSizeForCell(colCell);\r\n      colCell.geometry.width = size.width + maxNameLength;\r\n      colCell.vertex = true;\r\n      labelOffset = size.width + maxNameLength + 30;\r\n\r\n      break;\r\n    case \"ObjectProperty\":\r\n      var colCell = new mxCell(\r\n        label,\r\n        new mxGeometry(0, 0, 90, 26),\r\n        \"endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endSize=8;arcSize=0;\"\r\n      );\r\n      var maxNameLength = label.length;\r\n      colCell.geometry.setTerminalPoint(new mxPoint(0, 0), true);\r\n      colCell.geometry.setTerminalPoint(\r\n        new mxPoint(maxNameLength * 8 + 20, 0),\r\n        false\r\n      );\r\n\r\n      colCell.edge = true;\r\n      labelOffset = maxNameLength * 8 + 20 + 30;\r\n\r\n      break;\r\n    case \"DatatypeProperty\":\r\n      var colCell = new mxCell(\r\n        label,\r\n        new mxGeometry(0, 0, 0, 0),\r\n        \"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;fontSize=12;\"\r\n      );\r\n      var maxNameLength = label.length;\r\n\r\n      colCell.geometry.setTerminalPoint(new mxPoint(0, 0), true);\r\n      colCell.geometry.setTerminalPoint(\r\n        new mxPoint(maxNameLength * 8 + 20, 0),\r\n        false\r\n      );\r\n      colCell.edge = true;\r\n      labelOffset = maxNameLength * 8 + 20 + 30;\r\n\r\n      break;\r\n    case \"Individual\":\r\n      var colCell = new mxCell(\r\n        \"<u>\" + label + \"</u>\",\r\n        new mxGeometry(0, 0, 90, 26),\r\n        \"rounded=0;whiteSpace=wrap;html=1;\"\r\n      );\r\n      var maxNameLength = label.length;\r\n\r\n      var size = ui.editor.graph.getPreferredSizeForCell(colCell);\r\n      colCell.geometry.width = size.width + maxNameLength;\r\n      colCell.vertex = true;\r\n      labelOffset = size.width + maxNameLength + 30;\r\n      break;\r\n\r\n    case \"Datatype\":\r\n      var colCell = new mxCell(\r\n        label,\r\n        new mxGeometry(0, 0, 90, 26),\r\n        \"rounded=0;whiteSpace=wrap;html=1;fillColor=#FF8C00;\"\r\n      );\r\n      var maxNameLength = label.length;\r\n\r\n      var size = ui.editor.graph.getPreferredSizeForCell(colCell);\r\n      colCell.geometry.width = size.width + maxNameLength;\r\n      colCell.vertex = true;\r\n      labelOffset = size.width + maxNameLength + 30;\r\n      break;\r\n    case \"AnnotationProperty\":\r\n      var colCell = new mxCell(\r\n        label,\r\n        new mxGeometry(0, 0, 0, 0),\r\n        \"rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;fontSize=12;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endArrow=halfCircle;endFill=0;strokeWidth=1;\"\r\n      );\r\n      var maxNameLength = label.length;\r\n\r\n      colCell.geometry.setTerminalPoint(new mxPoint(0, 0), true);\r\n      colCell.geometry.setTerminalPoint(\r\n        new mxPoint(maxNameLength * 8 + 20, 0),\r\n        false\r\n      );\r\n      colCell.edge = true;\r\n      labelOffset = maxNameLength * 8 + 20 + 30;\r\n\r\n      break;\r\n  }\r\n\r\n  let attrs = { label: text, Type: cate, IRI: term.EntityIRI };\r\n\r\n  let obj = makeNewObject(attrs);\r\n\r\n  let graph = ui.editor.graph;\r\n\r\n  graph.getModel().setValue(colCell, obj);\r\n\r\n  let windowPosition = mxUtils.convertPoint(\r\n    graph.container,\r\n    wnd.getX(),\r\n    wnd.getY()\r\n  );\r\n\r\n  let mousePosition = mxUtils.convertPoint(\r\n    graph.container,\r\n    mxEvent.getClientX(evt),\r\n    mxEvent.getClientY(evt)\r\n  );\r\n  let tr = graph.view.translate;\r\n  let scale = graph.view.scale;\r\n  let x = windowPosition.x / scale - tr.x - labelOffset;\r\n  let y = mousePosition.y / scale - tr.y;\r\n\r\n  const cellGround = [colCell];\r\n  graph.importCells(cellGround, x, y);\r\n};\r\n\r\nconst liReplaceBtnToggle = (text, id, ui) => {\r\n  let entityId = id.replace(\"li-term-\", \"\");\r\n  let table = _store__WEBPACK_IMPORTED_MODULE_0__.storeData.currentCategoriesContent.table;\r\n  let term = table[entityId];\r\n  let cate = term.BelongsTo;\r\n  let color = term.Color;\r\n\r\n  let cells = ui.editor.graph.getSelectionCells();\r\n\r\n  if (cells) {\r\n    cells.forEach((cell) => {\r\n      if (typeof cell.value === \"object\") {\r\n        let label = cell.getAttribute(\"label\", null);\r\n        let cellType = cell.getAttribute(\"Type\", null);\r\n        if (cellType) {\r\n          let pattern = /(\\(.*\\))/g;\r\n          let style = cell.style;\r\n          let newStyle = makeNewStyle(cell, color);\r\n          // get text outside\r\n          let cellType_main = cellType\r\n            .replace(pattern, \"\")\r\n            .trim()\r\n            .toLowerCase();\r\n\r\n          switch (cate.toLowerCase()) {\r\n            // datatype: can show in datavalue, datatype, datatypeproperty(rectangle)\r\n            case \"datatype\":\r\n              if (cellType_main === \"datavalue\") {\r\n                let newLabel = `\"value\"^^${text}`;\r\n\r\n                let attrs = {\r\n                  label: newLabel,\r\n                  Type: cellType,\r\n                  IRI_DT: term.EntityIRI,\r\n                };\r\n\r\n                let obj = makeNewObject(attrs);\r\n                ui.editor.graph.model.setStyle(cell, newStyle);\r\n                ui.editor.graph.model.setValue(cell, obj);\r\n              } else if (cellType_main === \"datatype\") {\r\n                let newLabel = text;\r\n\r\n                let attrs = {\r\n                  label: newLabel,\r\n                  Type: cellType,\r\n                  IRI: term.EntityIRI,\r\n                };\r\n\r\n                let obj = makeNewObject(attrs);\r\n\r\n                ui.editor.graph.model.setStyle(cell, newStyle);\r\n                ui.editor.graph.model.setValue(cell, obj);\r\n              } else if (\r\n                cellType_main == \"datatypeproperty\" &&\r\n                !(style.includes(\"rhombus\") | cell.isEdge())\r\n              ) {\r\n                let IRI_DP = cell.getAttribute(\"IRI_DP\", null);\r\n                let group = label.split(\"~\");\r\n                // keep dp and add dt behind it\r\n                let dpLabel = group[0];\r\n                let groupNewLabel = dpLabel + \"~\" + text;\r\n                cellType = cellType.replace(\"NoRange\", \"YesRange\");\r\n\r\n                let attrs = {\r\n                  label: groupNewLabel,\r\n                  Type: cellType,\r\n                  IRI_DP: IRI_DP,\r\n                  IRI_DT: term.EntityIRI,\r\n                };\r\n\r\n                let obj = makeNewObject(attrs);\r\n\r\n                ui.editor.graph.model.setValue(cell, obj);\r\n              } else {\r\n                throw `The selected shape is not a datavalue or datatype or datatypeproperty(asseration)!`;\r\n              }\r\n              break;\r\n\r\n            case \"datatypeproperty\":\r\n              // datatypeproperty can in edges, rhomus shape and rectangle shape\r\n\r\n              if (cellType_main === \"datatypeproperty\") {\r\n                if (style.includes(\"rhombus\") | cell.isEdge()) {\r\n                  let newLabel = makeNewLabel(label, text);\r\n\r\n                  let attrs = {\r\n                    label: newLabel,\r\n                    Type: cellType,\r\n                    IRI: term.EntityIRI,\r\n                  };\r\n\r\n                  let obj = makeNewObject(attrs);\r\n\r\n                  ui.editor.graph.model.setStyle(cell, newStyle);\r\n                  ui.editor.graph.model.setValue(cell, obj);\r\n                } else {\r\n                  // in rectangle shape: split dp and dt: (all)ns:datatypeproperty~ns:datatype\r\n                  // only change dp\r\n\r\n                  let group = label.split(\"~\");\r\n                  let dpLabel = group[0];\r\n                  let dpNewLabel = makeNewLabel(dpLabel, text);\r\n                  let groupNewLabel = label.replace(dpLabel, dpNewLabel);\r\n                  let IRI_DT = cell.getAttribute(\"IRI_DT\", null);\r\n\r\n                  let attrs = {\r\n                    label: groupNewLabel,\r\n                    Type: cellType,\r\n                    IRI_DP: term.EntityIRI,\r\n                    IRI_DT: IRI_DT,\r\n                  };\r\n                  let obj = makeNewObject(attrs);\r\n                  ui.editor.graph.model.setStyle(cell, newStyle);\r\n                  ui.editor.graph.model.setValue(cell, obj);\r\n                }\r\n              } else {\r\n                throw `The selected shape is not a datatypeproperty!`;\r\n              }\r\n              break;\r\n\r\n            default:\r\n              // check whether the shape and entitycate matches\r\n              if (cate.toLowerCase() === cellType_main) {\r\n                let newLabel = makeNewLabel(label, text);\r\n                // make new object\r\n\r\n                if (cellType_main === \"individual\") {\r\n                  newLabel = \"<u>\" + newLabel + \"</u>\";\r\n                }\r\n                let attrs = {\r\n                  label: newLabel,\r\n                  Type: cellType,\r\n                  IRI: term.EntityIRI,\r\n                };\r\n\r\n                let obj = makeNewObject(attrs);\r\n\r\n                ui.editor.graph.model.setStyle(cell, newStyle);\r\n                ui.editor.graph.model.setValue(cell, obj);\r\n              } else {\r\n                throw `The selected shape is not a ${cate}!`;\r\n              }\r\n          }\r\n        }\r\n      }\r\n    });\r\n  }\r\n};\r\n\r\nconst addSpecialInfo = (info) => {\r\n  let infodiv = document.createElement(\"div\");\r\n  if (Object.keys(info).length) {\r\n    Object.keys(info).forEach((elem) => {\r\n      if (info[elem].length) {\r\n        let div = document.createElement(\"div\");\r\n        let divTitle = document.createElement(\"div\");\r\n        let hr = document.createElement(\"hr\");\r\n        divTitle.innerText = elem;\r\n        divTitle.style.color = \"steelblue\";\r\n        divTitle.style.marginBottom = \"3px\";\r\n        let divText = document.createElement(\"div\");\r\n        divText.innerText = info[elem].join(\"\\n\");\r\n        hr.style.borderTop = \"0.5px dotted #333\";\r\n        hr.style.margin = \"5px 0px 5px 0px\";\r\n        div.append(divTitle, divText, hr);\r\n        infodiv.appendChild(div);\r\n      }\r\n    });\r\n  } else {\r\n    infodiv.innerText = \"none\";\r\n  }\r\n\r\n  return infodiv;\r\n};\r\n\r\nconst makeNewLabel = (label, text) => {\r\n  // replace the text outside <<>> or () of label with new text\r\n  // <<owl:objectproperty>>ns:a => <<owl:objectproperty>>cco:test\r\n\r\n  // cleam html tage first\r\n  let pattern = /([<<|\\(].*[>>|\\)])/g;\r\n\r\n  let div = document.createElement(\"div\");\r\n  div.innerHTML = label;\r\n  console.log(label);\r\n\r\n  let cleanedLabel = div.textContent || div.innerText || \"\";\r\n  console.log(cleanedLabel);\r\n\r\n  // get text outside\r\n  let outside = cleanedLabel.replace(pattern, \"\").trim();\r\n  // let adiv = document.createElement(\"div\");\r\n  // adiv.innerHTML = outside;\r\n  // let htmlOutside = adiv.innerHTML;\r\n\r\n  let newLabel = cleanedLabel.replace(outside, text);\r\n  let adiv = document.createElement(\"div\");\r\n  adiv.innerText = newLabel;\r\n  console.log(outside);\r\n  console.log(newLabel);\r\n  console.log(adiv.innerHTML);\r\n\r\n  return adiv.innerHTML;\r\n};\r\n\r\nconst makeNewStyle = (cell, color) => {\r\n  let styleArray = cell.style.split(\";\");\r\n  let arrayWithout = styleArray.filter((elem) => !elem.includes(\"fillColor\"));\r\n  let styleColor = color === \"none\" ? \"#FFFFFF\" : color;\r\n  let newStyle = arrayWithout.join(\";\") + `fillColor=${styleColor};`;\r\n  return newStyle;\r\n};\r\n\r\nconst makeNewObject = (attrs) => {\r\n  let doc = mxUtils.createXmlDocument();\r\n  let obj = doc.createElement(\"object\");\r\n  for (let [key, value] of Object.entries(attrs)) {\r\n    obj.setAttribute(key, value);\r\n  }\r\n  return obj;\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OntoTree);\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/entityFinder/scripts/onto-tree.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5755f003c6e7067e7877")
/******/ })();
/******/ 
/******/ }
);