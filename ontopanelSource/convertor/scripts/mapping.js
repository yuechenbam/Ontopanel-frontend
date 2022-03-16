import mappingHtml from "../html/mapping.html";
import { hostAddress } from "../../vars.js";
import { storeData } from "./store.js";

class MappingFrom {
  constructor(app, ui) {
    this.app = app;
    this.init();
    this.ui = ui;
  }

  init() {
    let mappingWindow = document.createElement("div");
    mappingWindow.innerHTML = mappingHtml;
    this.mappingWindow = mappingWindow;

    let form = mappingWindow.querySelector("form");
    form.onsubmit = (evt) => {
      evt.preventDefault();

      let formData = new FormData(evt.target);
      this.processTable(formData);
      let inputFile = mappingWindow.querySelector('input[name="myfile"]');
      inputFile.value = "";
      // form.reset();
    };

    let mappingResetBtn = mappingWindow.querySelector(
      'input[name="mapping-reset"]'
    );

    mappingResetBtn.onclick = () => {
      this.resetTable();
    };

    let fileFormat = mappingWindow.querySelector('select[name="filetype"]');
    fileFormat.onchange = (evt) => {
      let value = evt.target.value;
      this.showDifferentFormat(value);
    };

    let mappingPrefix = mappingWindow.querySelector(
      'input[name="mapping-prefix"]'
    );
    mappingPrefix.onkeyup = (evt) => {
      let currentMappingFormat = mappingWindow.querySelector(
        'select[name="mapping-location"]'
      );
      let value = evt.target.value;
      this.showMappingFormatExample(currentMappingFormat.value, value);
    };

    let mappingFormat = mappingWindow.querySelector(
      'select[name="mapping-location"]'
    );

    mappingFormat.onchange = (evt) => {
      let value = evt.target.value;
      let currentMappingPrefix = mappingWindow.querySelector(
        'input[name="mapping-prefix"]'
      );

      this.showMappingFormatExample(value, currentMappingPrefix.value);
    };
  }

  showMappingFormatExample = (value, prefix) => {
    let example = this.mappingWindow.querySelector(
      'div[class="mapping-format-example"]'
    );
    switch (value) {
      case "none":
        example.innerText = "ns:text";
        break;
      case "start":
        example.innerText = `ns:${prefix}text`;
        break;
      case "end":
        example.innerText = `ns:text${prefix}`;
        break;
    }
  };

  showDifferentFormat = (value) => {
    let seperator = this.mappingWindow.querySelector(
      'div[class="selector-seperator"]'
    );
    if (value === "csv") {
      seperator.style.display = "block";
    } else {
      seperator.style.display = "none";
    }
  };

  processTable = (formData) => {
    fetch(hostAddress + "api/v1/convertor/formtable/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            let mappingData = JSON.parse(data);
            let filename = formData.get("myfile").name;
            storeData.modifyMappingData(filename, mappingData);
            this.makeTable();
          });
        } else {
          response.json().then((text) => {
            let err = Object.keys(text)[0];
            this.showError(text[err]);
          });
        }
      })
      .catch((error) => {
        this.showError(error);
      });
  };
  showError = (text) => {
    let errDiv = document.createElement("div");
    errDiv.innerText = text;
    errDiv.style.color = "red";
    this.mappingWindow
      .querySelector(".mapping-table")
      .firstElementChild.replaceWith(errDiv);

    this.resetTableFun();
  };

  makeTable = () => {
    let data = storeData.mappingData;
    let mappingfile = storeData.mappingfile;
    let mappingError = this.mappingWindow.querySelector(".mapping-error");
    if (data) {
      let table = document.createElement("table");
      let headerTr = document.createElement("tr");
      table.appendChild(headerTr);
      let headers = Object.keys(data);
      let rows = Object.keys(data[headers[0]]);
      headers.forEach((header) => {
        let th = document.createElement("th");
        let colGroup = makeLinkCol(header, this.ui, mappingError);

        th.appendChild(colGroup);
        headerTr.appendChild(th);
      });

      let hundredRows = rows.length > 100 ? rows.slice(0, 100) : rows;

      for (let row of hundredRows) {
        let rowTr = document.createElement("tr");
        for (let header of headers) {
          let columnTd = document.createElement("td");
          let tdValue = data[header][row];
          columnTd.innerText = tdValue;
          rowTr.appendChild(columnTd);
        }
        table.appendChild(rowTr);
      }
      let numRow = rows.length;
      let numCol = headers.length;

      this.mappingWindow
        .querySelector(".mapping-table")
        .firstElementChild.replaceWith(table);
      this.mappingWindow.querySelector(
        ".mapping-count"
      ).innerText = `Rows:${numRow}; Columns:${numCol}; Only shows the first 100.`;
      this.app.querySelector(
        ".mapping-info"
      ).innerText = `With MappingFile: ${mappingfile}`;
    }
  };

  resetTable = () => {
    let resetDiv = document.createElement("div");
    resetDiv.innerText = "Table reset. No file for mapping.";
    this.mappingWindow
      .querySelector(".mapping-table")
      .firstElementChild.replaceWith(resetDiv);
    this.resetTableFun();
  };

  resetTableFun = () => {
    this.mappingWindow.querySelector(
      ".mapping-count"
    ).innerText = `Rows:0; Columns:0; Only shows the first 100.`;
    this.app.querySelector(
      ".mapping-info"
    ).innerText = `With MappingFile: None`;
    storeData.resetMappingData();
  };
}

const makeLinkCol = (text, ui, mappingError) => {
  let colGroup = document.createElement("div");
  colGroup.style.display = "flex";
  colGroup.style.flexDirection = "row";

  var colBtn = document.createElement("input");
  colBtn.type = "button";

  colBtn.value = "🔗";

  colBtn.onclick = (evt) => {
    evt.preventDefault();
    let cells = ui.editor.graph.getSelectionCells();
    if (cells) {
      cells.forEach((cell) => {
        let cellValue = cell.value;
        if (typeof cellValue === "object") {
          let cellType = cell.getAttribute("Type", "none");
          let pattern = /(\(.*\))/g;
          let cellType_main = cellType
            .replace(pattern, "")
            .trim()
            .toLowerCase();

          if (["individual", "datavalue"].includes(cellType_main)) {
            cellValue.setAttribute("MappingCol", text);
            let markStyle = markMappingCell(cell);
            ui.editor.graph.model.setValue(cell, cellValue);
            ui.editor.graph.model.setStyle(cell, markStyle);
          } else {
            mappingError.innerText =
              "Mapping is only possible for individual or datavalue.";
            mappingError.style.display = "block";
            setTimeout(() => {
              mappingError.style.display = "none";
            }, 5000);
          }
        } else {
          mappingError.innerText = "This shape is not from ontopanel-library.";
          mappingError.style.display = "block";
          setTimeout(() => {
            mappingError.style.display = "none";
          }, 5000);
        }
      });
    }
  };

  colGroup.appendChild(colBtn);
  colGroup.appendChild(document.createTextNode(text));

  return colGroup;
};

const markMappingCell = (cell) => {
  let styleArray = cell.style.split(";");
  let arrayWithout = styleArray.filter(
    (elem) => !elem.includes("strokeWidth") && !elem.includes("strokeColor")
  );
  let newStyle = arrayWithout.join(";") + `strokeWidth=3;strokeColor=#CC0000;`;
  return newStyle;
};

export default MappingFrom;
