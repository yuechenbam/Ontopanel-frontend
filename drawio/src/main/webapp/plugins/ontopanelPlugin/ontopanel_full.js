Draw.loadPlugin(function (ui) {
  var app = document.createElement("div");
  app.id = "ontopanel-app";
  app.style = "height: 450px; width: 380px; font-size: 15px; padding: 5px; ";
  app.addEventListener("contextmenu", (evt) => evt.preventDefault());

  app.innerHTML = `
<div id="ontopanel-container" style="display:flex; height: 25px; justify-content: space-between; margin-bottom:10px;">
    
    <div style="display:flex;">
        <button id="ontopanel-signup-btn" style="cursor: pointer;">SignUp</button>
        <button id="ontopanel-login-btn" style=" cursor: pointer;">Login</button>
        <button id="ontopanel-logout-btn" style=" display:none;cursor: pointer;">Logout</button>
    </div>
    <div id="ontopanel-sign-info"">Please log in.</div>
    
</div>


<div id="ontopanel-sign-box"
  style="display: none; position: absolute; z-index: 5; left: 0; top: 0; width: 100%;  height: 100%; background-color: rgba(0,0,0,0.4); ">
  <div style="background-color: #fefefe; margin: 10% auto; padding: 15px; border: 1px solid #888; width: 60%;">
    <span id = "ontopanel-sign-box-close" style="color: #aaa;float: right;font-size: 28px; font-weight: bold; cursor: pointer">&times;</span>
    <p style="font-weight: bold;" id="ontopanel-sign-login-error"></p>
    <form id="ontopanel-signup-form">
      <h3>Sign Up</h3>
      <div style="margin-bottom: 1rem;">
        <input
          style="padding: 0.5rem; width: 90%;background: #eeeeee; border: 1px solid #dddddd; outline: none; border-radius:0.2em;"
          type="text" name="signEmail"  placeholder="Email Address" required>
      </div>

      <div style="margin-bottom: 1rem;">
        <input
          style="padding: 0.5rem; width: 90%;background: #eeeeee; border: 1px solid #dddddd; outline: none;border-radius:0.2em;"
          type="password" name="signPsw"  placeholder="Password" pattern="[A-Za-z0-9]+" required
          title="Only number or letter are accepted">
      </div>

      <div style="margin-bottom: 1rem;">
        <input
          style="padding: 0.5rem; width: 90%;background: #eeeeee; border: 1px solid #dddddd; outline: none;border-radius:0.2em;"
          type="password" name="signPsw-repeat"  placeholder="Confirm password" pattern="[A-Za-z0-9]+"
          required title="Only number or letter are accepted">
      </div>

      <button style=" width: 100%;
          padding: 0.5rem;
          font-weight: bold;
          color: #ffffff;
          border: none;
          outline: none;
          cursor: pointer;
          border-radius:0.2em;
          background: green;" type="submit">Sign Up</button>
      <p style="text-align: center">
        <a style=" color:steelblue;
            text-decoration: none;
            cursor: pointer;" id="ontopanel-link-login">Already have an account? Sign in</a>
      </p>

    </form>
    <form id="ontopanel-login-form">
      <h3>Login</h3>
      <div style="margin-bottom: 1rem;">
        <input
          style="padding: 0.5rem; width: 90%;background: #eeeeee; border: 1px solid #dddddd; outline: none; border-radius:0.2em;"
          type="text" placeholder="Email Address"  name="loginEmail" required>
      </div>

      <div style="margin-bottom: 1rem;">
        <input
          style="padding: 0.5rem; width: 90%;background: #eeeeee; border: 1px solid #dddddd; outline: none; border-radius:0.2em;"
          type="password" placeholder="Password"  name="loginPsw" required>
      </div>


      <button style=" width: 100%;
          padding: 0.5rem;
          font-weight: bold;
          color: #ffffff;
          border: none;
          outline: none;
          cursor: pointer;
          border-radius:0.2em;
          background: green;" type="submit">Login</button>
      <p style="text-align: center">
        <a style=" color:steelblue;
          text-decoration: none;
          cursor: pointer; " id="ontopanel-reset-password">Forgot your password?</a>
      </p>

      <p style="text-align: center">
        <a style=" color:steelblue;
          text-decoration: none;
          cursor: pointer;" id="ontopanel-link-signup">Don't have an account? Create account</a>
      </p>
    </form>
  </div>
</div>
<div id="ontopanel-reset-password-box"
  style="display: none; position: absolute; z-index: 5; left: 0; top: 0; width: 100%;  height: 100%; background-color: rgba(0,0,0,0.4); ">
  <div style="background-color: #fefefe; margin: 5% auto; padding: 20px; border: 1px solid #888; width: 60%; height:75%;">
    <span id="ontopanel-reset-password-closebox"
      style="color: #aaa;float: right; font-size: 28px; font-weight: bold; cursor: pointer">&times;</span>
    <div>
      <form id="ontopanel-reset-password-form">
        <h3 style="margin:0px;">Send email</h3>
        <h5 style="margin-top:2px;">Send email first to get secret key.</h5>
        <p id="ontopanel-reset-password-info"></p>
        <div style="margin-bottom: 1rem;">
          <input
            style="padding: 0.5rem; width: 90%;background: #eeeeee; border: 1px solid #dddddd; outline: none; border-radius:0.2em;"
            type="text" placeholder="Email Address"  name="resetEmail" required>
        </div>

        <button style=" width: 100%;
          padding: 0.5rem;
          font-weight: bold;
          color: #ffffff;
          border: none;
          outline: none;
          cursor: pointer;
          border-radius:0.2em;
          background: green;" type="submit">Send email</button>
      </form>
      <br/>

      <form id="ontopanel-reset-password-confirm-form">
        <h3 style="margin-bottom:0px;">Reset password confirm</h3>
        <h5 style="margin-top:2px;">Enter secret key below to reset your password.</h5>

        <p id="ontopanel-reset-password-confirm-info"></p>
        <div style="margin-bottom: 1rem;">
          <input
            style="padding: 0.5rem; width: 90%;background: #eeeeee; border: 1px solid #dddddd; outline: none; border-radius:0.2em;"
            type="text" placeholder="Secrect key"  name="secretKey" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <input
            style="padding: 0.5rem; width: 90%;background: #eeeeee; border: 1px solid #dddddd; outline: none; border-radius:0.2em;"
            type="password" placeholder="New password"  name="resetPsw" required>
        </div>
        <div style="margin-bottom: 1rem;">
          <input
            style="padding: 0.5rem; width: 90%;background: #eeeeee; border: 1px solid #dddddd; outline: none; border-radius:0.2em;"
            type="password" placeholder="Confirm new password"  name="resetPsw-con" required>
        </div>

        <button style=" width: 100%;
          padding: 0.5rem;
          font-weight: bold;
          color: #ffffff;
          border: none;
          outline: none;
          cursor: pointer;
          border-radius:0.2em;
          background: green;" type="submit">Confirm</button>
      </form>

    </div>

  </div>
</div>


<div id="ontopanel-onto-btngroup" style="display:flex; height: 40px;">
  <div style="
        display: flex;
        height: 30px;" id="ontopanel-onto-extra-btn">
  </div>
  <div style="
        display: flex;
        height: 30px;">
    <button id="ontopanel-onto-extra-btn-MSEO" style="cursor: pointer;">MSEO</button>
    <button id="ontopanel-onto-add-btn" style="cursor: pointer;">+</button>
    <p id="ontopanel-tree-title" style="margin: 5px 0px 0px 30px; font-size: 16px;"> selected: none </p>
    <button id="ontopanel-namespace-btn" style="border:1px soild black; margin: 5px 0px 0px 5px;; cursor: pointer; height:20px ">⇱ prefix</button>
  </div>


  <div id="ontopanel-onto-menu"
    style="display: none; position: relative; z-index: 3;background-color: #fefefe; width:80px; top:5px">
    <div id="ontopanel-onto-info" style="cursor: pointer;padding: 8px 10px;"
      onmouseover="this.style.backgroundColor='lightgrey'" onmouseout="this.style.backgroundColor=''">Info</div>
    <div id="ontopanel-onto-update" style="cursor: pointer;padding: 8px 10px;"
      onmouseover="this.style.backgroundColor='lightgrey'" onmouseout="this.style.backgroundColor=''">Update</div>
    <div id="ontopanel-onto-delete" style="cursor: pointer;padding: 8px 10px;"
      onmouseover="this.style.backgroundColor='lightgrey'" onmouseout="this.style.backgroundColor=''">Delete</div>
  </div>
</div>
<div id="ontopanel-onto-menu-info" style="display: none;"></div>

<div id="ontopanel-onto-info-box"
  style="display: none; position: absolute; z-index: 6; left: 0; top: 0; width: 100%; height: 100%;background-color: rgba(0,0,0,0.4); ">
  <div style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%;">
    <span style="color: #aaa;float: right;font-size: 28px; font-weight: bold; cursor: pointer">&times;</span>
    <div id="ontopanel-onto-info-details" style="overflow:auto; font-size: 16px;"></div>
  </div>
</div>


<div id="ontopanel-onto-add-box"
  style="display: none; position: absolute; z-index: 7; left: 0; top: 0; width: 100%; height: 100%;background-color: rgba(0,0,0,0.4); ">
  <div style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%;">
    <span id="ontopanel-onto-add-closebox" style="color: #aaa;float: right;font-size: 28px; font-weight: bold; cursor: pointer">&times;</span>
    <form id="ontopanel-onto-add-form" enctype="multipart/form-data">
      <div style="margin-bottom:5px">
        Please upload a file
      </div>
      <div>
        <input type="file" name="formFile" />
      </div>

      <div style="margin-bottom:5px">
        Or </br>
        Enter URL of raw data
      </div>

      <div style="margin-bottom:5px">
        <input type="url" name="formURL" placeholder="https://example.com" />
      </div>
      <div style="margin-bottom:5px">
        And enter the ontology name
      </div>
      <div>
        <input id="ontopanel-onto-tag" type="text" name="formName" placeholder="mseo" style="width:80px" maxlength="5"
          required='true'>
        <button type="submit" id="ontopanel-form-add-btn">Submit</button>
        <button type="submit" id="ontopanel-form-update-btn" style="display: none;">Update</button>
        <span id="ontopanel-onto-add-error" style="display: none"></span>
      </div>
    </form>
  </div>

</div>


<div id="ontopanel-tree-container" style="height: 300px; border-radius: 5px;">
  <div style="display: flex;height: 30px;">
    <button id="ontopanel-tree-class-btn" style="cursor: pointer;">Class</button>
    <button id="ontopanel-tree-op-btn" style="cursor: pointer;">OP</button>
    <button id="ontopanel-tree-dp-btn" style="cursor: pointer;">DP</button>
    <button id="ontopanel-tree-ind-btn" style="cursor: pointer;">Ind</button>
    <button id="ontopanel-tree-ap-btn" style="cursor: pointer;">AP</button>
    <button id="ontopanel-tree-dt-btn" style="cursor: pointer;">DT</button>
    <input id="ontopanel-search-term" style="margin-left: 50px;" placeholder="search entity" />

  </div>
  <div id="ontopanel-tree">
    <div id="ontopanel-tree-content">
    New feature: <br\>
    1. you can signup and login, data will be saved in databank. <br\>
    2. tree structure of ontology. Demo please check the github repo. <br\>
    <br\>
    Issues:<br\>
    Due to the server it might show problem if you upload large ontology file. It could be solved when the new server is ready.<br\> 
    </div>
    <div id="ontopanel-tree-entity-detail-box"
      style="display:none; white-space:normal;word-break: break-all; position: relative; z-index: 10; border: 2px solid #888; width: 330px;  max-height: 220px; overflow: auto;padding: 0.5rem;">
      <div style="background-color: lightgrey;">RDF label:</div>
      <div id='ontopanel-tree-entity-label' style="font-size: 14px;  margin-top: 3px;">
      </div>
      <hr style="margin-top: 4px; border: 1px solid #333">
      <div style="background-color: lightgrey;">Annotations:</div>
      <div id='ontopanel-tree-entity-annos' style="font-size: 14px;  margin-top: 3px;">
      </div>
      <hr style="margin-top: 4px; border: 1px solid #333">
      <div style="background-color: lightgrey;">SpecialInfo:</div>

      <div id='ontopanel-tree-entity-special' style="font-size: 14px;  margin-top: 3px;">
      </div>
      <hr style="margin-top: 4px; border: 1px solid #333">
      <div style="background-color: lightgrey;">Color:
      </div>
      <div id='ontopanel-tree-entity-color' style=" font-size: 14px; margin-top: 3px;">
      </div>

    </div>

  </div>`;

  mxUtils.br(app);
  mxResources.parse("ontopanel=Ontopanel");

  var wnd = new mxWindow(
    mxResources.get("ontopanel"),
    app,
    document.body.offsetWidth - 480,
    140,
    390,
    480,
    true,
    true
  );
  wnd.destroyOnClose = false;
  wnd.setMaximizable(false);
  wnd.setResizable(false);
  wnd.setClosable(true);
  wnd.setVisible(true);

  ui.actions.addAction("ontopanel", function () {
    wnd.setVisible(!wnd.isVisible());
  });

  var menu = ui.menus.get("extras");
  var oldFunct = menu.funct;

  menu.funct = function (menu, parent) {
    oldFunct.apply(this, arguments);

    ui.menus.addMenuItems(menu, ["ontopanel"], parent);
  };

  //   Uploader();
  //   SignForm();
  //   initOntoTable();

  // active backend
  fetch("https://ontopanel.herokuapp.com/api/v1/ontos/lists/", {
    method: "GET",
  });

  setInterval(function () {
    fetch("https://ontopanel.herokuapp.com/api/v1/ontos/lists/", {
      method: "GET",
    });
  }, 20 * 1000 * 60);

  // store.js

  const mesoNamespace = [
    "base:https://purl.matolab.org/mseo/methods/example/",
    "mid:https://purl.matolab.org/mseo/mid/",
    "cco:http://www.ontologyrepository.com/CommonCoreOntologies/",
    "obo:http://purl.obolibrary.org/obo/",
    "pt:http://www.daml.org/2003/01/periodictable/PeriodicTable#",
    "geo:http://www.opengis.net/ont/geosparql#",
  ];

  // mseodata.onto_table.namespace = mesoNamespace;

  var ontoBank = { "ontopanel-onto-extra-btn-MSEO": {} };

  var currentCategoriesContent = {
    title: "table",
    categories: {
      Class: { name: "Class", content: null },
      OP: { name: "ObjectProperty", content: null },
      DP: { name: "DatatypeProperty", content: null },
      Individual: { name: "Individual", content: null },
      AP: { name: "AnnotationProperty", content: null },
      Datatype: { name: "Datatype", content: null },
    },
  };

  function modifyOntoBank(input, keyword) {
    // input: [key, value]
    switch (keyword) {
      case "reset":
        ontoBank = { "ontopanel-onto-extra-btn-MSEO": {} };
        break;
      case "add":
        ontoBank[input[0]] = input[1];
        break;
      case "delete":
        delete ontoBank[input[0]];
    }
  }

  function modifyCurrentCategoriesContent(title, data, keyword) {
    switch (keyword) {
      case "reset":
        currentCategoriesContent = {
          title: "none",
          categories: {
            Class: { name: "Class", content: null },
            OP: { name: "ObjectProperty", content: null },
            DP: { name: "DatatypeProperty", content: null },
            Individual: { name: "Individual", content: null },
            AP: { name: "AnnotationProperty", content: null },
            Datatype: { name: "Datatype", content: null },
          },
        };
        break;
      case "selected":
        currentCategoriesContent.title = title;
        Object.keys(currentCategoriesContent.categories).forEach((entity) => {
          currentCategoriesContent.categories[entity]["content"] = data[entity];
        });
        break;
    }
  }

  // Uploader()
  var ontoAddBtn = app.querySelector("#ontopanel-onto-add-btn");
  var ontoAddBox = app.querySelector("#ontopanel-onto-add-box");
  var ontoCloseBtn = app.querySelector("#ontopanel-onto-add-closebox");
  var ontoAddForm = app.querySelector("#ontopanel-onto-add-form");

  var formAddBtn = app.querySelector("#ontopanel-form-add-btn");
  var formUpdateBtn = app.querySelector("#ontopanel-form-update-btn");
  var ontoAddError = app.querySelector("#ontopanel-onto-add-error");
  var ontoMenuInfo = app.querySelector("#ontopanel-onto-menu-info");
  var ontoTag = app.querySelector("#ontopanel-onto-tag");

  function Uploader() {
    ontoAddBtn.addEventListener("click", () => {
      updateOrAddBtn("add");
      ontoAddForm.reset();
      ontoAddBox.style.display = "block";
    });

    ontoCloseBtn.addEventListener("click", () => {
      ontoAddError.innerText = "";
      ontoAddForm.reset();
      ontoAddBox.style.display = "none";
    });

    formAddBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      if (ontoAddForm.checkValidity()) {
        ontoAddFormToggle(ontoAddForm);
      } else {
        ontoAddForm.reportValidity();
      }
    });
  }
  Uploader();
  // the button to show on the form
  const updateOrAddBtn = (keyword) => {
    formAddBtn.style.display = keyword === "add" ? "block" : "none";
    formUpdateBtn.style.display = keyword === "add" ? "none" : "block";
  };

  // add ontology form
  // two cases: add locally, and add  to databank

  const ontoAddFormToggle = (target) => {
    let formData = new FormData(target);
    let tagName = formData.get("formName").trim();
    let formFile = formData.get("formFile");
    let formURL = formData.get("formURL").trim();

    if (!(formFile.size || formURL)) {
      handleInfoToggle(ontoAddError, "Please enter File or URL!", "red");
    } else if (
      Object.keys(ontoBank).includes("ontopanel-onto-extra-btn-" + tagName)
    ) {
      handleInfoToggle(
        ontoAddError,
        "this name is taken, use another one!",
        "red"
      );
    } else {
      ontoAddError.innerText = "In process, please wait.";
      ontoAddError.style.color = "green";
      ontoAddError.style.display = "block";
      let loginUser = localStorage.getItem("loginUser");
      if (!loginUser) {
        ontoAddUpdateLocal(formData);
      } else {
        ontoAddDB(formData, loginUser);
      }
    }
    // update
  };

  const ontoAddUpdateLocal = (data, updateId = null, keyword = "add") => {
    fetch("https://ontopanel.herokuapp.com/api/v1/ontos/owltable/", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((text) => {
            switch (keyword) {
              case "add":
                addOntoBtn(text);
                handleInfoToggle(
                  ontoAddError,
                  "Succssfully added locally!",
                  "green"
                );

                break;
              case "update":
                updateOntoBtn(text, updateId);
                handleInfoToggle(
                  ontoAddError,
                  "Succssfully updated locally!",
                  "green"
                );
                break;
            }
            ontoAddForm.reset();
          });
        } else {
          response.json().then((text) => {
            let error = Object.keys(text)[0];
            handleInfoToggle(ontoAddError, text[error], "red");
          });
        }
      })
      .catch((error) => {
        handleInfoToggle(ontoAddError, error, "red");
      });
  };

  // add remotely to databank

  const ontoAddDB = (data, loginUser) => {
    loginUser = JSON.parse(loginUser);
    fetch("https://ontopanel.herokuapp.com/api/v1/ontos/lists/", {
      method: "POST",
      body: data,
      headers: new Headers({
        Authorization: `Token ${loginUser.token}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((text) => {
            addOntoBtn(text);
            handleInfoToggle(
              ontoAddError,
              "Succssfully added to your database!",
              "green"
            );
            ontoAddForm.reset();
          });
        } else {
          response.json().then((text) => {
            let err = Object.keys(text)[0];
            handleInfoToggle(ontoAddError, text[err], "red");
          });
        }
      })
      .catch((error) => {
        handleInfoToggle(ontoAddError, error, "red");
      });
  };

  function addOntoBtn(data) {
    let menu = app.querySelector("#ontopanel-onto-menu").cloneNode(true);
    let newBtn = document.createElement("button");
    let ontoUpdate = menu.querySelector(
      "#ontopanel-onto-menu >#ontopanel-onto-update"
    );
    let ontoInfo = menu.querySelector(
      "#ontopanel-onto-menu >#ontopanel-onto-info"
    );
    let ontoDelete = menu.querySelector(
      "#ontopanel-onto-menu >#ontopanel-onto-delete"
    );
    let ontoName = data["title"];
    newBtn.innerText = ontoName;
    newBtn.style.cursor = "pointer";
    const btnId = "ontopanel-onto-extra-btn-" + ontoName;
    newBtn.id = btnId;
    modifyOntoBank([btnId, data], "add");

    newBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      let id = evt.target.id;
      let data = ontoBank[id];
      loadCurrentTable(data);
    });

    newBtn.addEventListener("contextmenu", (evt) => {
      evt.preventDefault();
      newBtn.appendChild(menu);
      menu.style.display = "block";
      let selectedId = evt.target.id;
      ontoUpdate.onclick = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        menu.style.display = "none";
        showUpdateOntoForm(selectedId);
      };

      ontoInfo.onclick = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        menu.style.display = "none";
        showOntoInfo(selectedId);
      };

      ontoDelete.onclick = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        menu.style.display = "none";
        deleteOnto(selectedId);
      };
    });
    newBtn.addEventListener("mouseleave", (evt) => {
      evt.preventDefault();
      menu.style.display = "none";
    });
    app.querySelector("#ontopanel-onto-extra-btn").prepend(newBtn);
  }
  const showUpdateOntoForm = (updateId) => {
    updateOrAddBtn("update");
    ontoAddBox.style.display = "block";
    ontoTag.value = ontoBank[updateId].title;

    formUpdateBtn.onclick = (evt) => {
      evt.preventDefault();
      if (ontoAddForm.checkValidity()) {
        ontoUpdateFormToggle(ontoAddForm, updateId);
      } else {
        ontoAddForm.reportValidity();
      }
    };
  };

  const ontoUpdateFormToggle = (target, updateId) => {
    let formData = new FormData(target);

    let tagName = formData.get("formName").trim();
    let formFile = formData.get("formFile");
    let formURL = formData.get("formURL").trim();

    if (!(formFile.size || formURL)) {
      handleInfoToggle(ontoAddError, "Please enter File or URL!", "red");
    } else if (
      Object.keys(ontoBank)
        .filter((elem) => elem !== updateId)
        .includes("ontopanel-onto-extra-btn-" + tagName)
    ) {
      handleInfoToggle(
        ontoAddError,
        "this name is taken, use another one!",
        "red"
      );
    } else {
      ontoAddError.innerText = "In process, please wait.";
      ontoAddError.style = "color: green; display:block;";
      let loginUser = localStorage.getItem("loginUser");
      if (!loginUser) {
        ontoAddUpdateLocal(formData, updateId, "update");
      } else {
        ontoUpdateDB(formData, updateId, loginUser);
      }
    }
  };

  // append ontology to panel with button and save data in ontobank
  // each btn has context menu: info, update and delete
  // add locally

  // update onto locally

  const updateOntoBtn = (data, updateId) => {
    let thisBtn = app.querySelector("#" + updateId);
    let ontoName = data["title"];
    thisBtn.innerText = ontoName;
    const newId = "ontopanel-onto-extra-btn-" + ontoName;
    thisBtn.id = newId;
    modifyOntoBank([updateId, null], "delete");
    modifyOntoBank([newId, data], "add");
    loadCurrentTable(data);
  };
  // update remotely to databank
  //
  const ontoUpdateDB = (data, updateId, loginUser) => {
    loginUser = JSON.parse(loginUser);
    let dbId = ontoBank[updateId].id;

    fetch("https://ontopanel.herokuapp.com/api/v1/ontos/change/" + dbId, {
      method: "PUT",
      body: data,
      headers: new Headers({
        Authorization: `Token ${loginUser.token}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((text) => {
            updateOntoBtn(text, updateId);
            handleInfoToggle(
              ontoAddError,
              "Succssfully updated in your databank!",
              "green"
            );
            ontoAddForm.reset();
          });
        } else {
          response.json().then((text) => {
            let err = Object.keys(text)[0];
            handleInfoToggle(ontoAddError, text[err], "red");
          });
        }
      })
      .catch((error) => {
        handleInfoToggle(ontoAddError, error, "red");
      });
  };

  const showOntoInfo = (selectedId) => {
    let title = ontoBank[selectedId].title;
    let source = ontoBank[selectedId].onto_source;
    let date = ontoBank[selectedId].date_created;

    let ontoInfoBox = app.querySelector("#ontopanel-onto-info-box");
    let ontoInfoDetails = app.querySelector("#ontopanel-onto-info-details");
    let ontoInfoClosebox = ontoInfoBox.getElementsByTagName("span")[0];
    ontoInfoClosebox.onclick = () => {
      ontoInfoBox.style.display = "none";
    };

    ontoInfoDetails.innerHTML = `
    <h4>Info about this ontology:</h4>
    <ul style="padding-left:20px">
      <li><b>title</b>: ${title}</li>
      <li><b>source</b>: ${source}</li>
      <li><b>updated date</b>: ${date}</li>
    </ul>
    `;
    ontoInfoBox.style.display = "block";
  };

  const deleteOnto = (deleteId) => {
    let loginUser = localStorage.getItem("loginUser");
    let dbId = ontoBank[deleteId].id;
    if (!loginUser) {
      if (ontoBank[deleteId].title == currentCategoriesContent.title) {
        loadCurrentTable(null, "reset");
      }
      modifyOntoBank([deleteId, null], "delete");

      app.querySelector("#" + deleteId).remove();
      handleInfoToggle(ontoMenuInfo, "Deleted locally", "green");
    } else {
      loginUser = JSON.parse(loginUser);
      fetch("https://ontopanel.herokuapp.com/api/v1/ontos/change/" + dbId, {
        method: "DELETE",
        headers: new Headers({
          Authorization: `Token ${loginUser.token}`,
        }),
      })
        .then((response) => {
          if (response.ok) {
            if (ontoBank[deleteId].title == currentCategoriesContent.title) {
              loadCurrentTable(null, "reset");
            }
            modifyOntoBank([deleteId, null], "delete");
            app.querySelector("#" + deleteId).remove();
            handleInfoToggle(
              ontoMenuInfo,
              "Deleted in your databank!",
              "green"
            );
          } else {
            response.json().then((text) => {
              let err = Object.keys(text)[0];
              handleInfoToggle(ontoMenuInfo, text[err], "red");
            });
          }
        })
        .catch((error) => {
          handleInfoToggle(ontoMenuInfo, error, "red");
        });
    }
  };

  // buttons in context menu of each onto tag

  const handleInfoToggle = (elem, err, color) => {
    elem.innerText = err;
    elem.style.color = color;
    elem.style.display = "block";
    setTimeout(() => {
      elem.style.display = "none";
    }, 8000);
  };

  // store.js

  // sign.js

  var signLoginBox = app.querySelector("#ontopanel-sign-box");
  var signUpBtn = app.querySelector("#ontopanel-signup-btn");
  var loginBtn = app.querySelector("#ontopanel-login-btn");
  var logoutBtn = app.querySelector("#ontopanel-logout-btn");
  var signUpForm = app.querySelector("#ontopanel-signup-form");
  var loginForm = app.querySelector("#ontopanel-login-form");
  var linkLogin = app.querySelector("#ontopanel-link-login");
  var linkSignUp = app.querySelector("#ontopanel-link-signup");
  var closeBox = app.querySelector("#ontopanel-sign-box-close");
  var resetPassword = app.querySelector("#ontopanel-reset-password");
  var resetPasswordBox = app.querySelector("#ontopanel-reset-password-box");
  var resetPasswordCloseBox = app.querySelector(
    "#ontopanel-reset-password-closebox"
  );
  var resetPasswordForm = app.querySelector("#ontopanel-reset-password-form");
  var resetPasswordConfirmForm = app.querySelector(
    "#ontopanel-reset-password-confirm-form"
  );
  var resetPasswordInfo = app.querySelector("#ontopanel-reset-password-info");
  var resetPasswordConfirmInfo = app.querySelector(
    "#ontopanel-reset-password-confirm-info"
  );
  var panelInfo = app.querySelector("#ontopanel-sign-info");
  var signLoginError = app.querySelector("#ontopanel-sign-login-error");

  const validateSignUp = (formData) => {
    let email = formData.get("signEmail").trim();
    let password = formData.get("signPsw").trim();
    let passwordRepeat = formData.get("signPsw-repeat").trim();

    if (passwordRepeat !== password) {
      handleFormInfo(signLoginError, "Passwords are not equal.");
    } else {
      let postData = { email: email, password: password };
      fetch("https://ontopanel.herokuapp.com/api/v1/user/register/", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => {
          if (response.ok) {
            handleSignUp();
            signUpForm.reset();
          } else {
            response.json().then((text) => {
              let error = Object.keys(text)[0];
              handleFormInfo(signLoginError, text[error]);
            });
          }
        })
        .catch((error) => {
          handleFormInfo(signLoginError, error);
        });
    }
  };

  const validateLogin = (formData) => {
    let email = formData.get("loginEmail").trim();
    let password = formData.get("loginPsw").trim();

    let postData = { username: email, password: password };
    fetch("https://ontopanel.herokuapp.com/api/v1/user/login/", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((userInfo) => {
            localStorage.setItem("loginUser", JSON.stringify(userInfo));
            resetAll();
            isLoggedIn(true);
            downloadOnto(userInfo.token, userInfo.email);
            handleFormInfo(signLoginError, "Login successfully.", "green");
            loginForm.reset();
            signLoginBox.style.display = "none";
          });
        } else {
          response.json().then((text) => {
            let error = Object.keys(text)[0];
            handleFormInfo(signLoginError, text[error]);
          });
        }
      })
      .catch((error) => {
        handleFormInfo(signLoginError, error);
      });
  };

  const handleFormInfo = (elem, input, color = "red") => {
    elem.style.color = color;
    elem.textContent = input;
    setTimeout(() => {
      elem.textContent = "";
    }, 8000);
  };

  const handleSignUp = () => {
    signLoginError.style.color = "green";
    signLoginError.textContent = "Sign Up successfully. Please login in.";
    signUpForm.style.display = "none";
    loginForm.style.display = "block";
    setTimeout(() => {
      signLoginError.textContent = "";
    }, 2000);
  };

  const downloadOnto = (token, email) => {
    fetch("https://ontopanel.herokuapp.com/api/v1/ontos/lists/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((text) => {
            text.forEach((elem) => {
              addOntoBtn(elem);
            });
            panelInfo.innerText = `Current user: ${email}`;
            isLoggedIn(true);
          });
        } else {
          response.json().then((text) => {
            panelInfo.innerText = "Please login again";
            isLoggedIn(false);
          });
        }
      })
      .catch((error) => {
        panelInfo.innerText = "Please login again";
        isLoggedIn(false);
      });
  };

  const isLoggedIn = (value) => {
    logoutBtn.style.display = value ? "block" : "none";
    loginBtn.style.display = value ? "none" : "block";
  };

  const isSignUpForm = (value) => {
    signLoginBox.style.display = "block";
    signUpForm.style.display = value ? "block" : "none";
    loginForm.style.display = value ? "none" : "block";
  };

  const resetPasswordToggle = (data) => {
    let email = data.get("resetEmail").trim();

    fetch("https://ontopanel.herokuapp.com/api/v1/user/reset_password/", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((text) => {
            let info = Object.keys(text)[0];
            handleFormInfo(resetPasswordInfo, text[info], "green");
          });
        } else {
          response.json().then((text) => {
            console.log(text);
            let error = Object.keys(text)[0];
            handleFormInfo(resetPasswordInfo, text[error]);
          });
        }
      })
      .catch((error) => {
        handleFormInfo(resetPasswordInfo, error);
      });
  };

  const resetPasswordConfirmToggle = (data) => {
    let secretKey = data.get("secretKey").trim();
    let newPassword = data.get("resetPsw").trim();
    let conNewPassword = data.get("resetPsw-con").trim();
    if (newPassword !== conNewPassword) {
      handleFormInfo(resetPasswordConfirmInfo, "Passwords are not equal!");
    } else {
      fetch(
        "https://ontopanel.herokuapp.com/api/v1/user/reset_password_confirm/",
        {
          method: "PATCH",
          body: JSON.stringify({
            secret_key: secretKey,
            password: newPassword,
          }),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((text) => {
              let info = Object.keys(text)[0];
              resetPasswordConfirmInfo.style.color = "green";
              resetPasswordConfirmInfo.textContent = text[info];
              setTimeout(() => {
                resetPasswordConfirmInfo.textContent = "";
                resetPasswordBox.style.display = "none";
                isSignUpForm(false);
              }, 3000);
            });
          } else {
            response.json().then((text) => {
              let info = Object.keys(text)[0];
              handleFormInfo(resetPasswordConfirmInfo, text[info]);
            });
          }
        })
        .catch((error) => {
          handleFormInfo(resetPasswordConfirmInfo, error);
        });
    }
  };

  const resetAll = () => {
    app.querySelector("#ontopanel-onto-extra-btn").innerText = "";
    panelInfo.innerText = "";
    modifyOntoBank([], "reset");
    loadCurrentTable(null, "reset");
  };

  function SignForm() {
    closeBox.addEventListener("click", () => {
      signLoginError.textContent = "";
      signLoginBox.style.display = "none";
      loginForm.reset();
      signUpForm.reset();
    });
    resetPasswordCloseBox.addEventListener("click", () => {
      resetPasswordBox.style.display = "none";
    });

    let loginUser = localStorage.getItem("loginUser");
    if (loginUser) {
      loginUser = JSON.parse(loginUser);
      downloadOnto(loginUser.token, loginUser.email);
    }

    signUpBtn.addEventListener("click", (e) => {
      e.preventDefault();
      isSignUpForm(true);
    });

    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      isSignUpForm(false);
    });

    logoutBtn.addEventListener("click", (e) => {
      if (localStorage.getItem("loginUser")) {
        let token = JSON.parse(localStorage.getItem("loginUser")).token;
        e.preventDefault();
        fetch("https://ontopanel.herokuapp.com/api/v1/user/logout/", {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          }),
        })
          .then((response) => {
            localStorage.removeItem("loginUser");
            handleLogout();
          })
          .catch(() => {
            handleLogout();
          });
      } else {
        handleLogout();
      }
    });

    const handleLogout = () => {
      isLoggedIn(false);
      resetAll();
    };

    linkLogin.addEventListener("click", (evt) => {
      evt.preventDefault();
      signUpForm.style.display = "none";
      loginForm.style.display = "block";
    });
    linkSignUp.addEventListener("click", (evt) => {
      evt.preventDefault();
      signUpForm.style.display = "block";
      loginForm.style.display = "none";
    });
    resetPassword.addEventListener("click", (evt) => {
      evt.preventDefault();
      resetPasswordBox.style.display = "block";
    });

    signUpForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      let formData = new FormData(evt.target);
      validateSignUp(formData);
    });

    loginForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      let formData = new FormData(evt.target);
      validateLogin(formData);
    });

    resetPasswordForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      let formData = new FormData(evt.target);
      resetPasswordToggle(formData);
    });
    resetPasswordConfirmForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      let formData = new FormData(evt.target);
      resetPasswordConfirmToggle(formData);
    });
  }

  SignForm();

  // ontotabel.js

  var mseoBtn = app.querySelector("#ontopanel-onto-extra-btn-MSEO");
  var searchTerm = app.querySelector("#ontopanel-search-term");
  var ontoTableTitle = app.querySelector("#ontopanel-tree-title");
  var ontoTableContent = app.querySelector("#ontopanel-tree-content");
  // tree structure

  function initOntoTable() {
    const categoriesBtn = {
      "ontopanel-tree-class-btn": "Class",
      "ontopanel-tree-op-btn": "OP",
      "ontopanel-tree-dp-btn": "DP",
      "ontopanel-tree-ind-btn": "Individual",
      "ontopanel-tree-ap-btn": "AP",
      "ontopanel-tree-dt-btn": "Datatype",
    };
    Object.keys(categoriesBtn).forEach((btnName) => {
      let btn = document.getElementById(btnName);
      btn.addEventListener("click", (evt) => {
        let inputArray =
          currentCategoriesContent.categories[categoriesBtn[evt.target.id]];
        if (inputArray.content) {
          ontoTableContent.innerHTML = buildTree(
            inputArray.content,
            inputArray.name
          ).innerHTML;
          addBtnListner();
        } else {
          ontoTableContent.innerHTML = "";
        }
      });
    });

    mseoBtn.addEventListener("click", (evt) => {
      evt.preventDefault();

      fetch("plugins/ontoData/mseo_ontopanel.json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.onto_table.namespace = mesoNamespace;
          ontoBank["ontopanel-onto-extra-btn-MSEO"] = data;
          loadCurrentTable(data);
        });
    });

    let typingTimer;
    searchTerm.addEventListener("keyup", (evt) => {
      evt.preventDefault();
      clearTimeout(typingTimer);
      typingTimer = setTimeout(searchTermToggle, 500);
    });
  }
  initOntoTable();

  function loadCurrentTable(data, keyword = "selected") {
    switch (keyword) {
      case "selected":
        let tree = data.onto_table["tree"];
        modifyCurrentCategoriesContent(data.title, tree, keyword);
        break;
      case "reset":
        modifyCurrentCategoriesContent(null, null, keyword);
    }

    ontoTableTitle.innerHTML = `selected: ${currentCategoriesContent.title}`;
    document.getElementById("ontopanel-tree-class-btn").click();
  }

  // build tree structure

  const buildTree = (arr, name) => {
    let divTree = document.createElement("div");
    let divTitle = document.createElement("div");
    divTitle.style = "display:flex; margin:8px 0px 0px 10px;font-size:17px;";
    let treeTitle = document.createElement("div");
    treeTitle.innerText = name;

    // add two buttons to tree Title, user can expand all or fold all
    let btnStyle =
      "color:lightgrey; border: none; padding:0; cursor: pointer;  margin-left:5px;";
    let expandAllBtn = document.createElement("div");
    expandAllBtn.innerText = "\u2295";
    expandAllBtn.style = btnStyle;
    expandAllBtn.style.marginLeft = "10px";
    expandAllBtn.setAttribute("id", "tree-expandall-btn");
    let foldAllBtn = document.createElement("div");
    foldAllBtn.innerText = "\u2296";
    foldAllBtn.style = btnStyle;

    foldAllBtn.setAttribute("id", "tree-foldall-btn");

    divTitle.append(treeTitle, expandAllBtn, foldAllBtn);

    let hr = document.createElement("hr");
    hr.style = "width:95%; border-top:2px solid black;";

    let treeContent = document.createElement("div");
    treeContent.setAttribute("id", "tree-content-div");
    let ul = expandTree(arr);
    ul.style = "list-style:none; padding-left:5px; margin-top:0px;";
    treeContent.appendChild(ul);

    treeContent.style = "height:300px; overflow:auto;";

    divTree.append(divTitle, hr, treeContent);

    return divTree;
  };

  const expandTree = (arr) => {
    let ul = document.createElement("ul");
    ul.style = "list-style:none; padding-left:18px;";
    arr.forEach((elem) => {
      let li = document.createElement("li");
      li.style = "margin:3px;";
      let liCom = document.createElement("div");
      li.appendChild(liCom);
      liCom.style = "display:flex; white-space: nowrap; font-size:14px;";
      let liText = document.createElement("div");

      liText.innerHTML = elem[0];

      liText.setAttribute("name", "li-term-details");

      let btnStyle =
        "color:lightgrey; border: none; padding:0; cursor: pointer; ";
      let liOutBtn = document.createElement("div");
      liOutBtn.innerText = "▲";
      liOutBtn.style = btnStyle;
      liOutBtn.style.marginLeft = "5px";
      liOutBtn.setAttribute("name", "li-output-btn");
      let liReplaceBtn = document.createElement("div");
      liReplaceBtn.innerText = "R";
      liReplaceBtn.style = btnStyle;

      liReplaceBtn.setAttribute("name", "li-replace-btn");
      liCom.append(liText, liOutBtn, liReplaceBtn);

      ul.appendChild(li);
      if (elem[1].length) {
        let liIcon = document.createElement("div");
        liIcon.innerText = "\u2296";
        liIcon.style = "cursor:pointer; margin-right:1px;";
        liIcon.setAttribute("name", "li-collapse-btn");
        liCom.prepend(liIcon);

        let ulNext = expandTree(elem[1]);
        li.appendChild(ulNext);
      } else {
        let liIcon = document.createElement("div");
        liIcon.innerHTML = "--";
        liIcon.style = "color:grey;margin-right:1px;";
        liCom.prepend(liIcon);
      }
    });
    return ul;
  };

  const addBtnListner = () => {
    // add listener to collpase btn of li
    let liIcon = document.getElementsByName("li-collapse-btn");
    for (let i = 0; i < liIcon.length; i++) {
      liIcon[i].addEventListener("click", (evt) => {
        let selectedLi = evt.target;
        let childUl = evt.target.parentElement.nextSibling;
        if (evt.target.innerText === "\u2296") {
          childUl.style.display = "none";
          selectedLi.innerText = "\u2295";
        } else {
          childUl.style.display = "block";
          selectedLi.innerText = "\u2296";
        }
      });
    }
    // add listner to li text to show detail box
    let detailbox = document
      .getElementById("ontopanel-tree-entity-detail-box")
      .cloneNode(true);
    let liDetails = document.getElementsByName("li-term-details");
    for (let i = 0; i < liDetails.length; i++) {
      liDetails[i].addEventListener("click", (evt) => {
        evt.preventDefault();
        let selectedLi = liDetails[i];
        let entityId = selectedLi.firstChild.textContent;

        let currentTableId =
          "ontopanel-onto-extra-btn-" + currentCategoriesContent.title;
        let table = JSON.parse(ontoBank[currentTableId].onto_table.table);
        let entityContent = table[entityId];

        selectedLi.appendChild(detailbox);
        detailbox.onclick = (evt) => {
          evt.stopPropagation();
        };

        detailbox.style.display = "block";
        document.getElementById("ontopanel-tree-entity-color").innerText =
          entityContent.Color;
        document.getElementById("ontopanel-tree-entity-label").innerText =
          entityContent.RDFLabel;
        document.getElementById("ontopanel-tree-entity-annos").innerHTML =
          addSpecialInfo(entityContent.Annotations).innerHTML;
        document.getElementById("ontopanel-tree-entity-special").innerHTML =
          addSpecialInfo(entityContent.SpecialInfo).innerHTML;
        liDetails[i].scrollIntoView({ block: "nearest", inline: "nearest" });
      });
      liDetails[i].addEventListener("mouseleave", (evt) => {
        evt.preventDefault();
        detailbox.style.display = "none";
        if (liDetails[i].contains(detailbox)) {
          detailbox.remove();
        }
      });
    }
    // add listner to button of expand all and fold all
    let treeExpandAllBtn = document.getElementById("tree-expandall-btn");
    let treeFoldAllBtn = document.getElementById("tree-foldall-btn");

    treeExpandAllBtn.addEventListener("mouseover", (evt) => {
      evt.preventDefault();
      treeExpandAllBtn.style.color = "steelblue";
    });
    treeExpandAllBtn.addEventListener("mouseleave", (evt) => {
      evt.preventDefault();
      treeExpandAllBtn.style.color = "lightgrey";
    });
    treeExpandAllBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      let treeContent = document.getElementById("tree-content-div");
      let allCollapseIcon = [
        ...treeContent.querySelectorAll('[name="li-collapse-btn"]'),
      ];
      let allUl = [...treeContent.getElementsByTagName("ul")];
      allCollapseIcon.forEach((icon) => {
        icon.innerText = "\u2296";
      });
      allUl.forEach((ul) => (ul.style.display = ""));
    });

    treeFoldAllBtn.addEventListener("mouseover", (evt) => {
      evt.preventDefault();
      treeFoldAllBtn.style.color = "steelblue";
    });
    treeFoldAllBtn.addEventListener("mouseleave", (evt) => {
      evt.preventDefault();
      treeFoldAllBtn.style.color = "lightgrey";
    });

    treeFoldAllBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      let firstLevel = document.querySelectorAll("#tree-content-div >ul >li");
      let allCollapseIcon = [
        ...document.querySelectorAll('[name="li-collapse-btn"]'),
      ];
      allCollapseIcon.forEach((icon) => {
        icon.innerText = "\u2295";
      });
      firstLevel.forEach((firstLi) => {
        // next level
        let nextUl = [...firstLi.getElementsByTagName("ul")];
        nextUl.forEach((ul) => {
          ul.style.display = "none";
        });
      });
    });

    // add listner to button group of each li
    let liOutBtns = document.getElementsByName("li-output-btn");
    let liReplaceBtns = document.getElementsByName("li-replace-btn");
    let ontoNamespaceBtn = document.getElementById("ontopanel-namespace-btn");

    for (let i = 0; i < liOutBtns.length; i++) {
      liOutBtns[i].addEventListener("mouseover", (evt) => {
        evt.preventDefault();
        liOutBtns[i].style.color = "steelblue";
      });
      liOutBtns[i].addEventListener("mouseleave", (evt) => {
        evt.preventDefault();
        liOutBtns[i].style.color = "lightgrey";
      });
      liOutBtns[i].addEventListener("click", (evt) => {
        evt.preventDefault();
        let labelOffset = 0;
        let cate, color, label;

        label = evt.target.previousElementSibling.innerText;
        let currentOnto =
          ontoBank[
            "ontopanel-onto-extra-btn-" + currentCategoriesContent.title
          ];
        let term = JSON.parse(currentOnto.onto_table.table)[label];
        cate = term.BelongsTo;
        color = term.Color;

        switch (cate) {
          case "Class":
            let styleString;
            if (color === "none") {
              styleString = "rounded=0;whiteSpace=wrap;html=1;";
            } else {
              styleString = `rounded=0;whiteSpace=wrap;html=1;fillColor=${color};`;
            }
            var colCell = new mxCell(
              label,
              new mxGeometry(0, 0, 90, 26),
              styleString
            );
            var maxNameLength = label.length;

            var size = ui.editor.graph.getPreferredSizeForCell(colCell);
            colCell.geometry.width = size.width + maxNameLength;
            colCell.vertex = true;
            labelOffset = size.width + maxNameLength + 30;

            break;
          case "OP":
            var colCell = new mxCell(
              label,
              new mxGeometry(0, 0, 90, 26),
              "endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;endSize=8;arcSize=0;"
            );
            var maxNameLength = label.length;
            colCell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
            colCell.geometry.setTerminalPoint(
              new mxPoint(maxNameLength * 8 + 20, 0),
              false
            );

            colCell.edge = true;
            labelOffset = maxNameLength * 8 + 20 + 30;

            break;
          case "DP":
            var colCell = new mxCell(
              label,
              new mxGeometry(0, 0, 0, 0),
              "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;fontSize=12;"
            );
            var maxNameLength = label.length;

            colCell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
            colCell.geometry.setTerminalPoint(
              new mxPoint(maxNameLength * 8 + 20, 0),
              false
            );
            colCell.edge = true;
            labelOffset = maxNameLength * 8 + 20 + 30;

            break;
          case "Individual":
            var colCell = new mxCell(
              "<u>" + label + "</u>",
              new mxGeometry(0, 0, 90, 26),
              "rounded=0;whiteSpace=wrap;html=1;"
            );
            var maxNameLength = label.length;

            var size = ui.editor.graph.getPreferredSizeForCell(colCell);
            colCell.geometry.width = size.width + maxNameLength;
            colCell.vertex = true;
            labelOffset = size.width + maxNameLength + 30;
            break;

          case "Datatype":
            var colCell = new mxCell(
              label,
              new mxGeometry(0, 0, 90, 26),
              "rounded=0;whiteSpace=wrap;html=1;fillColor=#FF8C00;"
            );
            var maxNameLength = label.length;

            var size = ui.editor.graph.getPreferredSizeForCell(colCell);
            colCell.geometry.width = size.width + maxNameLength;
            colCell.vertex = true;
            labelOffset = size.width + maxNameLength + 30;
            break;
        }

        let graph = ui.editor.graph;

        let windowPosition = mxUtils.convertPoint(
          graph.container,
          wnd.getX(),
          wnd.getY()
        );

        let mousePosition = mxUtils.convertPoint(
          graph.container,
          mxEvent.getClientX(evt),
          mxEvent.getClientY(evt)
        );
        let tr = graph.view.translate;
        let scale = graph.view.scale;
        let x = windowPosition.x / scale - tr.x - labelOffset;
        let y = mousePosition.y / scale - tr.y;

        const cellGround = [colCell];
        graph.importCells(cellGround, x, y);
      });
    }

    for (let i = 0; i < liReplaceBtns.length; i++) {
      liReplaceBtns[i].addEventListener("mouseover", (evt) => {
        evt.preventDefault();
        liReplaceBtns[i].style.color = "steelblue";
      });
      liReplaceBtns[i].addEventListener("mouseleave", (evt) => {
        evt.preventDefault();
        liReplaceBtns[i].style.color = "lightgrey";
      });
      liReplaceBtns[i].addEventListener("click", (evt) => {
        evt.preventDefault();
        let cate, color, label;
        label =
          evt.target.previousElementSibling.previousElementSibling.innerText;
        let currentOnto =
          ontoBank[
            "ontopanel-onto-extra-btn-" + currentCategoriesContent.title
          ];
        let term = JSON.parse(currentOnto.onto_table.table)[label];
        cate = term.BelongsTo;
        color = term.Color;
        var cells = ui.editor.graph.getSelectionCells();
        if (cells) {
          cells.forEach((cell) => {
            let styleString;
            switch (cate) {
              case "Individual":
                ui.editor.graph.model.setValue(cell, "<u>" + label + "</u>");
                break;
              case "Class":
                ui.editor.graph.model.setValue(cell, label);

                if (color !== "none") {
                  styleString = `rounded=0;whiteSpace=wrap;html=1;fillColor=${color};`;
                  ui.editor.graph.model.setStyle(cell, styleString);
                } else {
                  styleString = `rounded=0;whiteSpace=wrap;html=1;`;
                  ui.editor.graph.model.setStyle(cell, styleString);
                }
                break;
              case "Datatype":
                styleString =
                  "rounded=0;whiteSpace=wrap;html=1;fillColor=#FF8C00;";
                ui.editor.graph.model.setStyle(cell, styleString);

              default:
                ui.editor.graph.model.setValue(cell, label);
            }
          });
        }
      });
    }

    ontoNamespaceBtn.onclick = (evt) => {
      evt.preventDefault();

      if (currentCategoriesContent.title !== "none") {
        let currentOnto =
          ontoBank[
            "ontopanel-onto-extra-btn-" + currentCategoriesContent.title
          ];

        let currentNamespace = currentOnto.onto_table.namespaces.join("<br/>");

        let outputNamespace = currentNamespace + "<br/>";

        var nameSpaceCell = new mxCell(
          outputNamespace,
          new mxGeometry(0, 0, 90, 26),
          "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;"
        );

        var size = ui.editor.graph.getPreferredSizeForCell(nameSpaceCell);
        nameSpaceCell.geometry.width = size.width + 30;
        nameSpaceCell.vertex = true;
        let labelOffset = size.width + 30;
        let graph = ui.editor.graph;

        let windowPosition = mxUtils.convertPoint(
          graph.container,
          wnd.getX(),
          wnd.getY()
        );

        let mousePosition = mxUtils.convertPoint(
          graph.container,
          mxEvent.getClientX(evt),
          mxEvent.getClientY(evt)
        );

        let tr = ui.editor.graph.view.translate;
        let scale = ui.editor.graph.view.scale;
        let x = windowPosition.x / scale - tr.x - labelOffset;
        let y = mousePosition.y / scale - tr.y;

        const cellGround = [nameSpaceCell];
        ui.editor.graph.importCells(cellGround, x, y);
      }
    };
  };

  const addSpecialInfo = (info) => {
    let infodiv = document.createElement("div");
    if (info) {
      Object.keys(info).forEach((elem) => {
        if (info[elem].length) {
          let div = document.createElement("div");
          let divTitle = document.createElement("div");
          let hr = document.createElement("hr");
          divTitle.innerText = elem;
          divTitle.style.color = "steelblue";
          divTitle.style.marginBottom = "3px";
          let divText = document.createElement("div");
          divText.innerText = info[elem].join("\n");
          hr.style.borderTop = "1px dotted #333";
          hr.style.margin = "5px 0px 5px 0px";
          div.append(divTitle, divText, hr);
          infodiv.appendChild(div);
        }
      });
    }

    return infodiv;
  };

  const searchTermToggle = () => {
    let filter = searchTerm.value.trim().toUpperCase();
    let liTextdiv = document.getElementsByName("li-term-details");

    if (liTextdiv.length) {
      document.getElementById("tree-expandall-btn").click();
      var currentTableId =
        "ontopanel-onto-extra-btn-" + currentCategoriesContent.title;
      var table = JSON.parse(ontoBank[currentTableId].onto_table.table);
      for (let i = 0; i < liTextdiv.length; i++) {
        let li = liTextdiv[i].parentNode.parentNode;
        let entityId = liTextdiv[i].firstChild.textContent;
        let entityLabel = table[entityId].RDFLabel;

        let c = [...li.querySelectorAll('[name="li-term-details"]')];
        let entityIdString = c.map((x) => x.firstChild.textContent).join("\n");
        let entityLabelString = c
          .map((x) => table[x.firstChild.textContent].RDFLabel)
          .join("\n");

        if (entityIdString || entityLabelString) {
          if (
            entityLabelString.toUpperCase().indexOf(filter) > -1 ||
            entityIdString.toUpperCase().indexOf(filter) > -1
          ) {
            li.style.display = "";

            if (
              entityLabel.toUpperCase().indexOf(filter) > -1 ||
              entityId.toUpperCase().indexOf(filter) > -1
            ) {
              liTextdiv[i].style.backgroundColor = filter
                ? "#fddde6"
                : "transparent";
            } else {
              liTextdiv[i].style.background = "transparent";
            }
          } else {
            li.style.display = "none";
            liTextdiv[i].style.background = "transparent";
          }
        }
      }
    }
  };
});
