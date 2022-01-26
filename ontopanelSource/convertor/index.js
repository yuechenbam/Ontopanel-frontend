import layout from "./index.html";
import "./index.scss";
import { extractData } from "./scripts/extract-data.js";
import { storeData } from "./scripts/store.js";
import { errorList } from "./scripts/errors-list";
import { transform } from "./scripts/transform";

export const makeConvertorWnd = (ui) => {
  var app = document.createElement("div");
  app.id = "convertor-app";
  app.style = "height: 400px; width: 380px; font-size: 15px; padding: 5px; ";

  app.innerHTML = layout;
  app.addEventListener("contextmenu", (evt) => evt.preventDefault());

  mxUtils.br(app);
  mxResources.parse("convertor=convertor");

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
  wnd.setVisible(true);

  let conBtn = app.querySelector('input[name="convert"]');
  let transBtn = app.querySelector('input[name="transform"]');
  let resultBtn = app.querySelector('input[name="result"]');
  let errorBtn = app.querySelector('input[name="show-error"]');
  let showWindow = app.querySelector(".convertor-content");
  let downloadBtn = app.querySelector('input[name="download"]');

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

    fetch("http://127.0.0.1:8000/api/v1/convertor/", {
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
          result: text,
          errors: null,
        };
        storeData.modifyData(errors);
        resultBtn.click();
      });
  };

  return wnd;
};
