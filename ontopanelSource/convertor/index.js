import layout from "./index.html";
import "./index.scss";
import { extractData } from "./scripts/extract-data.js";
import { storeData } from "./scripts/store.js";
import { errorList } from "./scripts/errors-list";
import { transform } from "./scripts/transform";
import { makeMappingWindow } from "./scripts/mapping";
import { hostAddress } from "../vars";

export const makeConvertorWnd = (ui) => {
  var app = document.createElement("div");
  app.id = "convertor-app";
  app.style = "height: 400px; width: 380px; font-size: 15px; padding: 5px; ";

  app.innerHTML = layout;
  app.addEventListener("contextmenu", (evt) => evt.preventDefault());

  mxUtils.br(app);
  mxResources.parse("convertor=Ontopanel-convertor");

  var wnd = new mxWindow(
    mxResources.get("convertor"),
    app,
    document.body.offsetWidth - 420,
    140,
    390,
    420,
    true,
    true
  );
  wnd.destroyOnClose = false;
  wnd.setMaximizable(false);
  wnd.setResizable(false);
  wnd.setClosable(true);
  wnd.setVisible(false);

  let conBtn = app.querySelector('input[name="convert"]');
  let transBtn = app.querySelector('input[name="transform"]');
  let mappingBtn = app.querySelector('input[name="mapping"]');
  let resultBtn = app.querySelector('input[name="result"]');
  let errorBtn = app.querySelector('input[name="show-error"]');
  let showWindow = app.querySelector(".convertor-content");
  let downloadBtn = app.querySelector('input[name="download"]');
  let conInfo = app.querySelector(".convert-info");

  mappingBtn.onclick = (evt) => {
    let mappingContainer = makeMappingWindow();

    showWindow.firstElementChild.replaceWith(mappingContainer);
  };

  resultBtn.onclick = (evt) => {
    let pre = document.createElement("pre");
    pre.textContent = storeData.result;
    showWindow.firstElementChild.replaceWith(pre);
  };

  errorBtn.onclick = (evt) => {
    if (storeData.errors) {
      let errorContainer = errorList(storeData.errors, ui);

      showWindow.firstElementChild.replaceWith(errorContainer);
    }
  };
  downloadBtn.onclick = (evt) => {
    if (storeData.result) {
      let element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:application/xml;charset=utf-8," +
          encodeURIComponent(storeData.result)
      );
      element.setAttribute("download", "file.xml");

      app.appendChild(element);
      element.click();
      app.removeChild(element);
    }
  };

  transBtn.onclick = (evt) => {
    transform(ui, resultBtn);
  };

  conBtn.onclick = (evt) => {
    evt.preventDefault();
    storeData.resetData();
    let graphData = extractData(ui);
    let format = app.querySelector("select").value;

    let postData = {
      format: format,
      data: graphData,
    };
    let tempInfo = {
      result: "In process, please wait",
      errors: null,
    };
    storeData.modifyData(tempInfo);
    resultBtn.click();

    fetch(hostAddress + "api/v1/convertor/", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            storeData.modifyData(data);
            resultBtn.click();
          });
        } else {
          response.json().then((text) => {
            let errors = {
              result: text,
              errors: null,
            };
            storeData.modifyData(errors);
            resultBtn.click();
          });
        }
      })
      .catch((error) => {
        let errors = {
          result: error,
          errors: null,
        };
        storeData.modifyData(errors);
        resultBtn.click();
      });
  };

  return wnd;
};
