import layout from "./index.html";
import "./index.scss";
import { extractData } from "./scripts/extract-data.js";
import { storeData } from "./scripts/store.js";
import { errorList } from "./scripts/errors-list.js";
import { transform } from "./scripts/transform.js";
import MappingFrom from "./scripts/mapping.js";
import { hostAddress } from "../vars.js";
import { resultContainer } from "./scripts/result";

export const makeConvertorWnd = (ui) => {
  var app = document.createElement("div");
  app.id = "convertor-app";
  app.style = "height: 460px; width: 380px; font-size: 15px; padding: 5px; ";

  app.innerHTML = layout;
  app.addEventListener("contextmenu", (evt) => evt.preventDefault());

  mxUtils.br(app);
  mxResources.parse("convertor=Ontopanel-Convertor");

  var wnd = new mxWindow(
    mxResources.get("convertor"),
    app,
    document.body.offsetWidth - 450,
    20,
    390,
    490,
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
  showWindow.addEventListener("contextmenu", (evt) => evt.stopPropagation());
  let downloadBtn = app.querySelector('input[name="download"]');
  let conInfo = app.querySelector(".mapping-info");

  let mappingContainer = new MappingFrom(app, ui);

  mappingBtn.onclick = (evt) => {
    showWindow.firstElementChild.replaceWith(mappingContainer.mappingWindow);
  };

  resultBtn.onclick = (evt) => {
    resultContainer.showdata();
    showWindow.firstElementChild.replaceWith(resultContainer.resultWindow);
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

      let extension = storeData.downloadFormat === "turtle" ? "ttl" : "owl";

      let filename = `file.${extension}`;
      element.setAttribute("download", filename);

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
    // storeData.resetData();
    let graphData = extractData(ui);
    let format = app.querySelector("select").value;

    let postData = {
      format: format,
      fileData: graphData,
      mappingData: storeData.mappingData,
    };
    // console.log(JSON.stringify(postData));

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
            storeData.modifyDownloadFormat(format);
            resultBtn.click();
          });
        } else {
          response.json().then((text) => {
            let err = Object.keys(text)[0];
            let errors = {
              result: text[err],
              errors: null,
            };
            storeData.modifyData(errors);
            storeData.modifyDownloadFormat(format);
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
        storeData.modifyDownloadFormat(format);
        resultBtn.click();
      });
  };

  // mappingBtn.click();
  // resultBtn.click();

  return wnd;
};
