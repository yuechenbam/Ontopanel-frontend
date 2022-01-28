import { storeData } from "./store.js";

import ontoButton from "../html/onto-button.html";
import OntoUploader from "./uploader.js";
import { hostAddress } from "../../vars.js";

class OntoButton {
  constructor(app, data) {
    this.app = app;
    this.data = data;
    this.init();
  }

  init() {
    // load html

    this.btn = document.createElement("button");
    this.btn.innerHTML = ontoButton;
    let name = this.data["title"];
    this.btn.querySelector('div[name="button-name"]').textContent = name;
    const btnId = "ontopanel-onto-extra-btn-" + name;
    this.btn.id = btnId;

    storeData.modifyOntoBank([btnId, this.data], "add");

    this.btn.onclick = (evt) => {
      evt.preventDefault();
      let id = this.btn.id;
      let data = storeData.ontoBank[id];
      storeData.loadCurrentTable(data);
    };

    this.btn.addEventListener("contextmenu", (evt) => {
      evt.preventDefault();
      this.triggerMenu();
    });
    this.btn.onmouseleave = (evt) => {
      evt.preventDefault();
      let menuList = this.btn.querySelector(".ontopanel-menu");
      menuList.style.display = "none";
    };
  }
  triggerMenu = () => {
    let menuList = this.btn.querySelector(".ontopanel-menu");

    // menuList

    let ontoInfo = menuList.children[0];
    let ontoUpdate = menuList.children[1];
    let ontoDelete = menuList.children[2];

    menuList.style.display = "block";
    ontoUpdate.onclick = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      menuList.style.display = "none";

      let updateUploader = new OntoUploader(this.app);
      updateUploader.updateTigger();
    };

    ontoInfo.onclick = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      menuList.style.display = "none";
      this.showOntoInfo();
    };

    ontoDelete.onclick = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      menuList.style.display = "none";
      this.deleteOnto();
    };
  };
  showOntoInfo = () => {
    let selectedId = this.btn.id;
    let title = storeData.ontoBank[selectedId].title;
    let source = storeData.ontoBank[selectedId].onto_source;
    let date = storeData.ontoBank[selectedId].date_created;

    let ontoInfoBox = this.btn.querySelector(".ontopanel-box");
    ontoInfoBox.onclick = (evt) => {
      evt.stopPropagation();
    };
    let ontoInfoDetails = this.btn.querySelector('div[name="info-detail"]');
    let ontoInfoClosebox = this.btn.querySelector(".box-close-span");
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
  deleteOnto = () => {
    let deleteId = this.btn.id;
    let loginUser = localStorage.getItem("loginUser");
    let dbId = storeData.ontoBank[deleteId].id;
    if (!loginUser) {
      if (
        storeData.ontoBank[deleteId].title ==
        storeData.currentCategoriesContent.title
      ) {
        storeData.loadCurrentTable(null, "reset");
      }
      storeData.modifyOntoBank([deleteId, null], "delete");

      this.btn.remove();
      this.handleInfoToggle("Deleted locally", "green");
    } else {
      loginUser = JSON.parse(loginUser);
      fetch(hostAddress + "api/v1/ontos/change/" + dbId, {
        method: "DELETE",
        headers: new Headers({
          Authorization: `Token ${loginUser.token}`,
        }),
      })
        .then((response) => {
          if (response.ok) {
            if (
              storeData.ontoBank[deleteId].title ==
              storeData.currentCategoriesContent.title
            ) {
              storeData.loadCurrentTable(null, "reset");
            }
            storeData.modifyOntoBank([deleteId, null], "delete");
            this.btn.remove();
            this.handleInfoToggle("Deleted in your databank!", "green");
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
    }
  };
  handleInfoToggle = (err, color) => {
    let menuInfo = this.app.querySelector("#ontopanel-onto-menu-info");
    menuInfo.innerText = err;
    menuInfo.style.color = color;
    menuInfo.style.display = "block";
    setTimeout(() => {
      menuInfo.style.display = "none";
    }, 8000);
  };
}

export default OntoButton;
