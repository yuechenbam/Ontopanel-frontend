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

/***/ "./ontopanelSource/entityFinder/scripts/uploader.js":
/*!**********************************************************!*\
  !*** ./ontopanelSource/entityFinder/scripts/uploader.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store.js */ \"./ontopanelSource/entityFinder/scripts/store.js\");\n/* harmony import */ var _html_uploader_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/uploader.html */ \"./ontopanelSource/entityFinder/html/uploader.html\");\n/* harmony import */ var _onto_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./onto-button */ \"./ontopanelSource/entityFinder/scripts/onto-button.js\");\n/* harmony import */ var _vars_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../vars.js */ \"./ontopanelSource/vars.js\");\n\r\n\r\n\r\n\r\n\r\nclass OntoUploader {\r\n  constructor(app) {\r\n    this.app = app;\r\n    this.init();\r\n  }\r\n\r\n  init() {\r\n    // load html\r\n    this.uploaderBox = document.createElement(\"div\");\r\n    this.uploaderBox.innerHTML = _html_uploader_html__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\r\n    this.uploaderBox.style.display = \"none\";\r\n\r\n    this.app.appendChild(this.uploaderBox);\r\n\r\n    let ontoCloseBtn = this.uploaderBox.querySelector(\".box-close-span\");\r\n\r\n    let ontoForm = this.uploaderBox.querySelector(\"form\");\r\n    this.ontoForm = ontoForm;\r\n\r\n    ontoCloseBtn.onclick = () => {\r\n      this.ontoForm.reset();\r\n      this.uploaderBox.style.display = \"none\";\r\n    };\r\n  }\r\n\r\n  addTrigger = () => {\r\n    this.uploaderBox.style.display = \"block\";\r\n    console.log(this.uploaderBox);\r\n\r\n    let formAddBtn = this.ontoForm.querySelector('button[name=\"upload\"]');\r\n    this.updateOrAddBtn(\"add\");\r\n    formAddBtn.onclick = (evt) => {\r\n      evt.preventDefault();\r\n      if (this.ontoForm.checkValidity()) {\r\n        this.ontoAddFormToggle(this.ontoForm);\r\n      } else {\r\n        this.ontoForm.reportValidity();\r\n      }\r\n    };\r\n  };\r\n\r\n  updateTigger = (updateId) => {\r\n    this.uploaderBox.style.display = \"block\";\r\n    let formUpdateBtn = this.ontoForm.querySelector('button[name=\"update\"]');\r\n    this.updateOrAddBtn(\"update\");\r\n    formUpdateBtn.onclick = (evt) => {\r\n      evt.preventDefault();\r\n      if (this.ontoForm.checkValidity()) {\r\n        this.ontoUpdateFormToggle(this.ontoForm, updateId);\r\n      } else {\r\n        this.ontoForm.reportValidity();\r\n      }\r\n    };\r\n  };\r\n\r\n  updateOrAddBtn = (keyword) => {\r\n    let formAddBtn = this.ontoForm.querySelector('button[name=\"upload\"]');\r\n    let formUpdateBtn = this.ontoForm.querySelector('button[name=\"update\"]');\r\n    formAddBtn.style.display = keyword === \"add\" ? \"block\" : \"none\";\r\n    formUpdateBtn.style.display = keyword === \"add\" ? \"none\" : \"block\";\r\n  };\r\n\r\n  ontoAddFormToggle = (target) => {\r\n    let formData = new FormData(target);\r\n    let tagName = formData.get(\"formName\").trim();\r\n    let formFile = formData.get(\"formFile\");\r\n    let formURL = formData.get(\"formURL\").trim();\r\n    let formInfo = this.ontoForm.querySelector('span[name=\"form-info\"]');\r\n\r\n    if (!(formFile.size || formURL)) {\r\n      this.handleInfoToggle(\"Please enter File or URL!\", \"red\");\r\n    } else if (\r\n      Object.keys(_store_js__WEBPACK_IMPORTED_MODULE_0__.storeData.ontoBank).includes(\r\n        \"ontopanel-onto-extra-btn-\" + tagName\r\n      )\r\n    ) {\r\n      this.handleInfoToggle(\"this name is taken, use another one!\", \"red\");\r\n    } else {\r\n      formInfo.innerText = \"In process, please wait.\";\r\n      formInfo.style.color = \"green\";\r\n      formInfo.style.display = \"block\";\r\n      let loginUser = localStorage.getItem(\"loginUser\");\r\n      if (!loginUser) {\r\n        this.ontoAddUpdateLocal(formData);\r\n      } else {\r\n        this.ontoAddDB(formData, loginUser);\r\n      }\r\n    }\r\n  };\r\n\r\n  ontoAddUpdateLocal = (data, updateId = null, keyword = \"add\") => {\r\n    fetch(_vars_js__WEBPACK_IMPORTED_MODULE_3__.hostAddress + \"api/v1/ontos/owltable/\", {\r\n      method: \"POST\",\r\n      body: data,\r\n    })\r\n      .then((response) => {\r\n        if (response.ok) {\r\n          response.json().then((text) => {\r\n            switch (keyword) {\r\n              case \"add\":\r\n                let addBtn = new _onto_button__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.app, text);\r\n                this.app\r\n                  .querySelector(\"#ontopanel-onto-extra-btn\")\r\n                  .prepend(addBtn.btn);\r\n\r\n                this.handleInfoToggle(\"Succssfully added locally!\", \"green\");\r\n\r\n                break;\r\n              case \"update\":\r\n                this.updateOntoBtn(text, updateId);\r\n                this.handleInfoToggle(\"Succssfully updated locally!\", \"green\");\r\n                break;\r\n            }\r\n            this.ontoForm.reset();\r\n          });\r\n        } else {\r\n          response.json().then((text) => {\r\n            let error = Object.keys(text)[0];\r\n            this.handleInfoToggle(text[error], \"red\");\r\n          });\r\n        }\r\n      })\r\n      .catch((error) => {\r\n        this.handleInfoToggle(error, \"red\");\r\n      });\r\n  };\r\n\r\n  ontoAddDB = (data, loginUser) => {\r\n    loginUser = JSON.parse(loginUser);\r\n    fetch(_vars_js__WEBPACK_IMPORTED_MODULE_3__.hostAddress + \"api/v1/ontos/lists/\", {\r\n      method: \"POST\",\r\n      body: data,\r\n      headers: new Headers({\r\n        Authorization: `Token ${loginUser.token}`,\r\n      }),\r\n    })\r\n      .then((response) => {\r\n        if (response.ok) {\r\n          response.json().then((text) => {\r\n            let addBtn = new _onto_button__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.app, text);\r\n            this.app\r\n              .querySelector(\"#ontopanel-onto-extra-btn\")\r\n              .prepend(addBtn.btn);\r\n\r\n            this.handleInfoToggle(\r\n              \"Succssfully added to your database!\",\r\n              \"green\"\r\n            );\r\n            this.ontoForm.reset();\r\n          });\r\n        } else {\r\n          response.json().then((text) => {\r\n            let err = Object.keys(text)[0];\r\n            this.handleInfoToggle(text[err], \"red\");\r\n          });\r\n        }\r\n      })\r\n      .catch((error) => {\r\n        this.handleInfoToggle(error, \"red\");\r\n      });\r\n  };\r\n\r\n  ontoUpdateFormToggle = (target, updateId) => {\r\n    let formInfo = this.ontoForm.querySelector('span[name=\"form-info\"]');\r\n    let formData = new FormData(target);\r\n    let tagName = formData.get(\"formName\").trim();\r\n    let formFile = formData.get(\"formFile\");\r\n    let formURL = formData.get(\"formURL\").trim();\r\n\r\n    if (!(formFile.size || formURL)) {\r\n      this.handleInfoToggle(\"Please enter File or URL!\", \"red\");\r\n    } else if (\r\n      Object.keys(_store_js__WEBPACK_IMPORTED_MODULE_0__.storeData.ontoBank)\r\n        .filter((elem) => elem !== updateId)\r\n        .includes(\"ontopanel-onto-extra-btn-\" + tagName)\r\n    ) {\r\n      this.handleInfoToggle(\"this name is taken, use another one!\", \"red\");\r\n    } else {\r\n      formInfo.innerText = \"In process, please wait.\";\r\n      formInfo.style = \"color: green; display:block;\";\r\n      let loginUser = localStorage.getItem(\"loginUser\");\r\n      if (!loginUser) {\r\n        this.ontoAddUpdateLocal(formData, updateId, \"update\");\r\n      } else {\r\n        this.ontoUpdateDB(formData, updateId, loginUser);\r\n      }\r\n    }\r\n  };\r\n\r\n  updateOntoBtn = (data, updateId) => {\r\n    let thisBtn = this.app.querySelector(\"#\" + updateId);\r\n    let ontoName = data[\"title\"];\r\n    let btnText = thisBtn.children[0];\r\n    btnText.innerText = ontoName;\r\n    const newId = \"ontopanel-onto-extra-btn-\" + ontoName;\r\n    thisBtn.id = newId;\r\n    _store_js__WEBPACK_IMPORTED_MODULE_0__.storeData.modifyOntoBank([updateId, null], \"delete\");\r\n    _store_js__WEBPACK_IMPORTED_MODULE_0__.storeData.modifyOntoBank([newId, data], \"add\");\r\n    _store_js__WEBPACK_IMPORTED_MODULE_0__.storeData.loadCurrentTable(data);\r\n  };\r\n\r\n  ontoUpdateDB = (data, updateId, loginUser) => {\r\n    loginUser = JSON.parse(loginUser);\r\n    let dbId = _store_js__WEBPACK_IMPORTED_MODULE_0__.storeData.ontoBank[updateId].id;\r\n\r\n    fetch(_vars_js__WEBPACK_IMPORTED_MODULE_3__.hostAddress + \"api/v1/ontos/change/\" + dbId, {\r\n      method: \"PUT\",\r\n      body: data,\r\n      headers: new Headers({\r\n        Authorization: `Token ${loginUser.token}`,\r\n      }),\r\n    })\r\n      .then((response) => {\r\n        if (response.ok) {\r\n          response.json().then((text) => {\r\n            this.updateOntoBtn(text, updateId);\r\n            this.handleInfoToggle(\r\n              \"Succssfully updated in your databank!\",\r\n              \"green\"\r\n            );\r\n            this.ontoForm.reset();\r\n          });\r\n        } else {\r\n          response.json().then((text) => {\r\n            let err = Object.keys(text)[0];\r\n            this.handleInfoToggle(text[err], \"red\");\r\n          });\r\n        }\r\n      })\r\n      .catch((error) => {\r\n        this.handleInfoToggle(error, \"red\");\r\n      });\r\n  };\r\n  handleInfoToggle = (err, color) => {\r\n    let formInfo = this.uploaderBox.querySelector('span[name=\"form-info\"]');\r\n    formInfo.innerText = err;\r\n    formInfo.style.color = color;\r\n    formInfo.style.display = \"block\";\r\n    setTimeout(() => {\r\n      formInfo.style.display = \"none\";\r\n    }, 8000);\r\n  };\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OntoUploader);\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/entityFinder/scripts/uploader.js?");

/***/ }),

/***/ "./ontopanelSource/entityFinder_version1/scripts/uploader.js":
/*!*******************************************************************!*\
  !*** ./ontopanelSource/entityFinder_version1/scripts/uploader.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store.js */ \"./ontopanelSource/entityFinder_version1/scripts/store.js\");\n/* harmony import */ var _html_uploader_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/uploader.html */ \"./ontopanelSource/entityFinder_version1/html/uploader.html\");\n/* harmony import */ var _onto_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./onto-button */ \"./ontopanelSource/entityFinder_version1/scripts/onto-button.js\");\n/* harmony import */ var _vars_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../vars.js */ \"./ontopanelSource/vars.js\");\n\r\n\r\n\r\n\r\n\r\nclass OntoUploader {\r\n  constructor(app) {\r\n    this.app = app;\r\n    this.init();\r\n  }\r\n\r\n  init() {\r\n    // load html\r\n    this.uploaderBox = document.createElement(\"div\");\r\n    this.uploaderBox.innerHTML = _html_uploader_html__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\r\n    this.uploaderBox.style.display = \"none\";\r\n\r\n    this.app.appendChild(this.uploaderBox);\r\n\r\n    let ontoCloseBtn = this.uploaderBox.querySelector(\".box-close-span\");\r\n\r\n    let ontoForm = this.uploaderBox.querySelector(\"form\");\r\n    this.ontoForm = ontoForm;\r\n\r\n    ontoCloseBtn.onclick = () => {\r\n      this.ontoForm.reset();\r\n      this.uploaderBox.style.display = \"none\";\r\n    };\r\n  }\r\n\r\n  addTrigger = () => {\r\n    this.uploaderBox.style.display = \"block\";\r\n    console.log(this.uploaderBox);\r\n\r\n    let formAddBtn = this.ontoForm.querySelector('button[name=\"upload\"]');\r\n    this.updateOrAddBtn(\"add\");\r\n    formAddBtn.onclick = (evt) => {\r\n      evt.preventDefault();\r\n      if (this.ontoForm.checkValidity()) {\r\n        this.ontoAddFormToggle(this.ontoForm);\r\n      } else {\r\n        this.ontoForm.reportValidity();\r\n      }\r\n    };\r\n  };\r\n\r\n  updateTigger = (updateId) => {\r\n    this.uploaderBox.style.display = \"block\";\r\n    let formUpdateBtn = this.ontoForm.querySelector('button[name=\"update\"]');\r\n    this.updateOrAddBtn(\"update\");\r\n    formUpdateBtn.onclick = (evt) => {\r\n      evt.preventDefault();\r\n      if (this.ontoForm.checkValidity()) {\r\n        this.ontoUpdateFormToggle(this.ontoForm, updateId);\r\n      } else {\r\n        this.ontoForm.reportValidity();\r\n      }\r\n    };\r\n  };\r\n\r\n  updateOrAddBtn = (keyword) => {\r\n    let formAddBtn = this.ontoForm.querySelector('button[name=\"upload\"]');\r\n    let formUpdateBtn = this.ontoForm.querySelector('button[name=\"update\"]');\r\n    formAddBtn.style.display = keyword === \"add\" ? \"block\" : \"none\";\r\n    formUpdateBtn.style.display = keyword === \"add\" ? \"none\" : \"block\";\r\n    // let inputBlock = this.ontoForm.querySelector('input[name=\"formName\"]');\r\n    // inputBlock.value = keyword === \"add\" ? \"\" : formName;\r\n  };\r\n\r\n  ontoAddFormToggle = (target) => {\r\n    let formData = new FormData(target);\r\n    let tagName = formData.get(\"formName\").trim();\r\n    let formFile = formData.get(\"formFile\");\r\n    let formURL = formData.get(\"formURL\").trim();\r\n    let formInfo = this.ontoForm.querySelector('span[name=\"form-info\"]');\r\n\r\n    if (!(formFile.size || formURL)) {\r\n      this.handleInfoToggle(\"Please enter File or URL!\", \"red\");\r\n    } else if (\r\n      Object.keys(_store_js__WEBPACK_IMPORTED_MODULE_0__.storeData.ontoBank).includes(\r\n        \"entityfinderold-onto-extra-btn-\" + tagName\r\n      )\r\n    ) {\r\n      this.handleInfoToggle(\"this name is taken, use another one!\", \"red\");\r\n    } else {\r\n      formInfo.innerText = \"In process, please wait.\";\r\n      formInfo.style.color = \"green\";\r\n      formInfo.style.display = \"block\";\r\n      let loginUser = localStorage.getItem(\"loginUser\");\r\n      if (!loginUser) {\r\n        this.ontoAddUpdateLocal(formData);\r\n      } else {\r\n        this.ontoAddDB(formData, loginUser);\r\n      }\r\n    }\r\n  };\r\n\r\n  ontoAddUpdateLocal = (data, updateId = null, keyword = \"add\") => {\r\n    fetch(_vars_js__WEBPACK_IMPORTED_MODULE_3__.hostAddress + \"api/v1/ontos/owltable/\", {\r\n      method: \"POST\",\r\n      body: data,\r\n    })\r\n      .then((response) => {\r\n        if (response.ok) {\r\n          response.json().then((text) => {\r\n            switch (keyword) {\r\n              case \"add\":\r\n                let addBtn = new _onto_button__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.app, text);\r\n                this.app\r\n                  .querySelector(\"#entityfinderold-onto-extra-btn\")\r\n                  .prepend(addBtn.btn);\r\n\r\n                this.handleInfoToggle(\"Succssfully added locally!\", \"green\");\r\n\r\n                break;\r\n              case \"update\":\r\n                this.updateOntoBtn(text, updateId);\r\n                this.handleInfoToggle(\"Succssfully updated locally!\", \"green\");\r\n                break;\r\n            }\r\n            this.ontoForm.reset();\r\n          });\r\n        } else {\r\n          response.json().then((text) => {\r\n            let error = Object.keys(text)[0];\r\n            this.handleInfoToggle(text[error], \"red\");\r\n          });\r\n        }\r\n      })\r\n      .catch((error) => {\r\n        this.handleInfoToggle(error, \"red\");\r\n      });\r\n  };\r\n\r\n  ontoAddDB = (data, loginUser) => {\r\n    loginUser = JSON.parse(loginUser);\r\n    fetch(_vars_js__WEBPACK_IMPORTED_MODULE_3__.hostAddress + \"api/v1/ontos/lists/\", {\r\n      method: \"POST\",\r\n      body: data,\r\n      headers: new Headers({\r\n        Authorization: `Token ${loginUser.token}`,\r\n      }),\r\n    })\r\n      .then((response) => {\r\n        if (response.ok) {\r\n          response.json().then((text) => {\r\n            let addBtn = new _onto_button__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.app, text);\r\n            this.app\r\n              .querySelector(\"#entityfinderold-onto-extra-btn\")\r\n              .prepend(addBtn.btn);\r\n\r\n            this.handleInfoToggle(\r\n              \"Succssfully added to your database!\",\r\n              \"green\"\r\n            );\r\n            this.ontoForm.reset();\r\n          });\r\n        } else {\r\n          response.json().then((text) => {\r\n            let err = Object.keys(text)[0];\r\n            this.handleInfoToggle(text[err], \"red\");\r\n          });\r\n        }\r\n      })\r\n      .catch((error) => {\r\n        this.handleInfoToggle(error, \"red\");\r\n      });\r\n  };\r\n\r\n  ontoUpdateFormToggle = (target, updateId) => {\r\n    let formInfo = this.ontoForm.querySelector('span[name=\"form-info\"]');\r\n    let formData = new FormData(target);\r\n    let tagName = formData.get(\"formName\").trim();\r\n    let formFile = formData.get(\"formFile\");\r\n    let formURL = formData.get(\"formURL\").trim();\r\n\r\n    if (!(formFile.size || formURL)) {\r\n      this.handleInfoToggle(\"Please enter File or URL!\", \"red\");\r\n    } else if (\r\n      Object.keys(_store_js__WEBPACK_IMPORTED_MODULE_0__.storeData.ontoBank)\r\n        .filter((elem) => elem !== updateId)\r\n        .includes(\"entityfinderold-onto-extra-btn-\" + tagName)\r\n    ) {\r\n      this.handleInfoToggle(\"this name is taken, use another one!\", \"red\");\r\n    } else {\r\n      formInfo.innerText = \"In process, please wait.\";\r\n      formInfo.style = \"color: green; display:block;\";\r\n      let loginUser = localStorage.getItem(\"loginUser\");\r\n      if (!loginUser) {\r\n        this.ontoAddUpdateLocal(formData, updateId, \"update\");\r\n      } else {\r\n        this.ontoUpdateDB(formData, updateId, loginUser);\r\n      }\r\n    }\r\n  };\r\n\r\n  updateOntoBtn = (data, updateId) => {\r\n    let thisBtn = this.app.querySelector(\"#\" + updateId);\r\n    let ontoName = data[\"title\"];\r\n    let btnText = thisBtn.children[0];\r\n    btnText.innerText = ontoName;\r\n    const newId = \"entityfinderold-onto-extra-btn-\" + ontoName;\r\n    thisBtn.id = newId;\r\n    _store_js__WEBPACK_IMPORTED_MODULE_0__.storeData.modifyOntoBank([updateId, null], \"delete\");\r\n    _store_js__WEBPACK_IMPORTED_MODULE_0__.storeData.modifyOntoBank([newId, data], \"add\");\r\n    _store_js__WEBPACK_IMPORTED_MODULE_0__.storeData.loadCurrentTable(data);\r\n  };\r\n\r\n  ontoUpdateDB = (data, updateId, loginUser) => {\r\n    loginUser = JSON.parse(loginUser);\r\n    let dbId = _store_js__WEBPACK_IMPORTED_MODULE_0__.storeData.ontoBank[updateId].id;\r\n\r\n    fetch(_vars_js__WEBPACK_IMPORTED_MODULE_3__.hostAddress + \"api/v1/ontos/change/\" + dbId, {\r\n      method: \"PUT\",\r\n      body: data,\r\n      headers: new Headers({\r\n        Authorization: `Token ${loginUser.token}`,\r\n      }),\r\n    })\r\n      .then((response) => {\r\n        if (response.ok) {\r\n          response.json().then((text) => {\r\n            this.updateOntoBtn(text, updateId);\r\n            this.handleInfoToggle(\r\n              \"Succssfully updated in your databank!\",\r\n              \"green\"\r\n            );\r\n            this.ontoForm.reset();\r\n          });\r\n        } else {\r\n          response.json().then((text) => {\r\n            let err = Object.keys(text)[0];\r\n            this.handleInfoToggle(text[err], \"red\");\r\n          });\r\n        }\r\n      })\r\n      .catch((error) => {\r\n        this.handleInfoToggle(error, \"red\");\r\n      });\r\n  };\r\n  handleInfoToggle = (err, color) => {\r\n    let formInfo = this.uploaderBox.querySelector('span[name=\"form-info\"]');\r\n    formInfo.innerText = err;\r\n    formInfo.style.color = color;\r\n    formInfo.style.display = \"block\";\r\n    setTimeout(() => {\r\n      formInfo.style.display = \"none\";\r\n    }, 8000);\r\n  };\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OntoUploader);\r\n\n\n//# sourceURL=webpack://drawio_test/./ontopanelSource/entityFinder_version1/scripts/uploader.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6abcd242edfa3cd42a64")
/******/ })();
/******/ 
/******/ }
);