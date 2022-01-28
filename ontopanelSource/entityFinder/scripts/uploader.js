import { storeData } from "./store.js";
import uploader from "../html/uploader.html";
import OntoButton from "./onto-button";
import { hostAddress } from "../../vars.js";

class OntoUploader {
  constructor(app) {
    this.app = app;
    this.init();
  }

  init() {
    // load html
    this.uploaderBox = document.createElement("div");
    this.uploaderBox.innerHTML = uploader;
    this.uploaderBox.style.display = "none";

    this.app.appendChild(this.uploaderBox);

    let ontoCloseBtn = this.uploaderBox.querySelector(".box-close-span");

    let ontoForm = this.uploaderBox.querySelector("form");
    this.ontoForm = ontoForm;

    ontoCloseBtn.onclick = () => {
      this.ontoForm.reset();
      this.uploaderBox.style.display = "none";
    };
  }

  addTrigger = () => {
    this.uploaderBox.style.display = "block";
    console.log(this.uploaderBox);

    let formAddBtn = this.ontoForm.querySelector('button[name="upload"]');
    this.updateOrAddBtn("add");
    formAddBtn.onclick = (evt) => {
      evt.preventDefault();
      if (this.ontoForm.checkValidity()) {
        this.ontoAddFormToggle(this.ontoForm);
      } else {
        this.ontoForm.reportValidity();
      }
    };
  };

  updateTigger = (updateId) => {
    this.uploaderBox.style.display = "block";
    let formUpdateBtn = this.ontoForm.querySelector('button[name="update"]');
    this.updateOrAddBtn("update");
    formUpdateBtn.onclick = (evt) => {
      evt.preventDefault();
      if (this.ontoForm.checkValidity()) {
        this.ontoUpdateFormToggle(this.ontoForm, updateId);
      } else {
        this.ontoForm.reportValidity();
      }
    };
  };

  updateOrAddBtn = (keyword) => {
    let formAddBtn = this.ontoForm.querySelector('button[name="upload"]');
    let formUpdateBtn = this.ontoForm.querySelector('button[name="update"]');
    formAddBtn.style.display = keyword === "add" ? "block" : "none";
    formUpdateBtn.style.display = keyword === "add" ? "none" : "block";
  };

  ontoAddFormToggle = (target) => {
    let formData = new FormData(target);
    let tagName = formData.get("formName").trim();
    let formFile = formData.get("formFile");
    let formURL = formData.get("formURL").trim();
    let formInfo = this.ontoForm.querySelector('span[name="form-info"]');

    if (!(formFile.size || formURL)) {
      this.handleInfoToggle("Please enter File or URL!", "red");
    } else if (
      Object.keys(storeData.ontoBank).includes(
        "ontopanel-onto-extra-btn-" + tagName
      )
    ) {
      this.handleInfoToggle("this name is taken, use another one!", "red");
    } else {
      formInfo.innerText = "In process, please wait.";
      formInfo.style.color = "green";
      formInfo.style.display = "block";
      let loginUser = localStorage.getItem("loginUser");
      if (!loginUser) {
        this.ontoAddUpdateLocal(formData);
      } else {
        this.ontoAddDB(formData, loginUser);
      }
    }
  };

  ontoAddUpdateLocal = (data, updateId = null, keyword = "add") => {
    fetch(hostAddress + "api/v1/ontos/owltable/", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((text) => {
            switch (keyword) {
              case "add":
                let addBtn = new OntoButton(this.app, text);
                this.app
                  .querySelector("#ontopanel-onto-extra-btn")
                  .prepend(addBtn.btn);

                this.handleInfoToggle("Succssfully added locally!", "green");

                break;
              case "update":
                this.updateOntoBtn(text, updateId);
                this.handleInfoToggle("Succssfully updated locally!", "green");
                break;
            }
            this.ontoForm.reset();
          });
        } else {
          response.json().then((text) => {
            let error = Object.keys(text)[0];
            this.handleInfoToggle(text[error], "red");
          });
        }
      })
      .catch((error) => {
        this.handleInfoToggle(error, "red");
      });
  };

  ontoAddDB = (data, loginUser) => {
    loginUser = JSON.parse(loginUser);
    fetch(hostAddress + "api/v1/ontos/lists/", {
      method: "POST",
      body: data,
      headers: new Headers({
        Authorization: `Token ${loginUser.token}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((text) => {
            let addBtn = new OntoButton(this.app, text);
            this.app
              .querySelector("#ontopanel-onto-extra-btn")
              .prepend(addBtn.btn);

            this.handleInfoToggle(
              "Succssfully added to your database!",
              "green"
            );
            this.ontoForm.reset();
          });
        } else {
          response.json().then((text) => {
            let err = Object.keys(text)[0];
            this.handleInfoToggle(text[err], "red");
          });
        }
      })
      .catch((error) => {
        this.handleInfoToggle(error, "red");
      });
  };

  ontoUpdateFormToggle = (target, updateId) => {
    let formInfo = this.ontoForm.querySelector('span[name="form-info"]');
    let formData = new FormData(target);
    let tagName = formData.get("formName").trim();
    let formFile = formData.get("formFile");
    let formURL = formData.get("formURL").trim();

    if (!(formFile.size || formURL)) {
      this.handleInfoToggle("Please enter File or URL!", "red");
    } else if (
      Object.keys(storeData.ontoBank)
        .filter((elem) => elem !== updateId)
        .includes("ontopanel-onto-extra-btn-" + tagName)
    ) {
      this.handleInfoToggle("this name is taken, use another one!", "red");
    } else {
      formInfo.innerText = "In process, please wait.";
      formInfo.style = "color: green; display:block;";
      let loginUser = localStorage.getItem("loginUser");
      if (!loginUser) {
        this.ontoAddUpdateLocal(formData, updateId, "update");
      } else {
        this.ontoUpdateDB(formData, updateId, loginUser);
      }
    }
  };

  updateOntoBtn = (data, updateId) => {
    let thisBtn = this.app.querySelector("#" + updateId);
    let ontoName = data["title"];
    thisBtn.innerText = ontoName;
    const newId = "ontopanel-onto-extra-btn-" + ontoName;
    thisBtn.id = newId;
    storeData.modifyOntoBank([updateId, null], "delete");
    storeData.modifyOntoBank([newId, data], "add");
    storeData.loadCurrentTable(data);
  };

  ontoUpdateDB = (data, updateId, loginUser) => {
    loginUser = JSON.parse(loginUser);
    let dbId = storeData.ontoBank[updateId].id;

    fetch(hostAddress + "api/v1/ontos/change/" + dbId, {
      method: "PUT",
      body: data,
      headers: new Headers({
        Authorization: `Token ${loginUser.token}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((text) => {
            this.updateOntoBtn(text, updateId);
            this.handleInfoToggle(
              "Succssfully updated in your databank!",
              "green"
            );
            this.ontoForm.reset();
          });
        } else {
          response.json().then((text) => {
            let err = Object.keys(text)[0];
            this.handleInfoToggle(text[err], "red");
          });
        }
      })
      .catch((error) => {
        this.handleInfoToggle(error, "red");
      });
  };
  handleInfoToggle = (err, color) => {
    let formInfo = this.uploaderBox.querySelector('span[name="form-info"]');
    formInfo.innerText = err;
    formInfo.style.color = color;
    formInfo.style.display = "block";
    setTimeout(() => {
      formInfo.style.display = "none";
    }, 8000);
  };
}

export default OntoUploader;
