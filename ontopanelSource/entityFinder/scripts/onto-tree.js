import { storeData } from "./store";
import ontoTree from "../html/onto-tree.html";

// tree structure

class OntoTree {
  constructor(app, ui, wnd, data) {
    this.app = app;
    this.ui = ui;
    this.wnd = wnd;
    this.data = data;
    this.init();
  }
  init() {
    let tree = document.createElement("div");
    tree.innerHTML = ontoTree;
    this.treeContent = tree.querySelector(".tree-content");

    let cateDiv = this.treeContent.querySelector('div[name="cate-name"]');
    cateDiv.textContent = this.data.name;

    let expandAllBtn = this.treeContent.querySelectorAll(".collapse-btn")[0];
    let foldAllBtn = this.treeContent.querySelectorAll(".collapse-btn")[1];
    let searchBar = this.app.querySelector("#ontopanel-search-term");
    expandAllBtn.onclick = (evt) => {
      evt.preventDefault();
      this.collpaseAll();
    };

    foldAllBtn.onclick = (evt) => {
      evt.preventDefault();
      this.foldAll();
    };

    searchBar.onkeyup = (evt) => {
      evt.preventDefault();
      let termValue = searchBar.value.trim().toUpperCase();
      this.search(termValue);
    };

    let liElem = tree.querySelector("li");

    let treeEntities = this.treeContent.querySelector("#ontopanel-tree-entity");

    let content = this.data.content;

    let ul = buildTree(this.ui, content, liElem, this.wnd, this.treeContent);
    treeEntities.replaceWith(ul);
  }

  foldAll = () => {
    let firstLevel = this.treeContent.querySelectorAll("ul >li");
    let allCollapseIcon = [
      ...this.treeContent.querySelectorAll('[name="li-collapse-btn"]'),
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
  };

  collpaseAll = () => {
    let allCollapseIcon = [
      ...this.treeContent.querySelectorAll('[name="li-collapse-btn"]'),
    ];
    let allUl = [...this.treeContent.getElementsByTagName("ul")];
    allCollapseIcon.forEach((icon) => {
      icon.innerText = "\u2296";
    });
    allUl.forEach((ul) => (ul.style.display = ""));
  };

  search = (filter) => {
    let li = this.treeContent.querySelectorAll("li");

    if (li.length) {
      this.collpaseAll();

      let table = storeData.currentCategoriesContent.table;
      for (let i = 0; i < li.length; i++) {
        let liTermTextAll = li[i].querySelectorAll('div[name="li-term-text"]');
        let liTermText = liTermTextAll[0];
        let entityId = liTermText.id.replace("li-term-", "");
        let entityLabel = table[entityId].RDFLabel;

        let c = [...liTermTextAll];
        let entityIdString = c
          .map((x) => x.id.replace("li-term-", ""))
          .join("\n");
        let entityLabelString = c
          .map((x) => table[x.id.replace("li-term-", "")].RDFLabel)
          .join("\n");

        if (entityIdString || entityLabelString) {
          if (
            entityLabelString.toUpperCase().indexOf(filter) > -1 ||
            entityIdString.toUpperCase().indexOf(filter) > -1
          ) {
            li[i].style.display = "";

            if (
              entityLabel.toUpperCase().indexOf(filter) > -1 ||
              entityId.toUpperCase().indexOf(filter) > -1
            ) {
              liTermText.style.backgroundColor = filter
                ? "#fddde6"
                : "transparent";
            } else {
              liTermText.style.background = "transparent";
            }
          } else {
            li[i].style.display = "none";
            liTermText.style.background = "transparent";
          }
        }
      }
    }
  };
}

// build tree structure

const buildTree = (ui, arr, liElem, wnd, treeContent) => {
  let ul = document.createElement("ul");

  arr.forEach((elem) => {
    let li = liElem.cloneNode(true);

    let liCom = li.firstElementChild;

    let liIcon = liCom.children[0];
    let liText = liCom.children[1];
    let liOutBtn = liCom.children[2];
    let liReplaceBtn = liCom.children[3];

    let liEntityText = liText.children[0];

    // add id to each term, the original can have html tag, so use innerText to get it.

    liEntityText.innerHTML = elem[0];
    let termText = liEntityText.innerText;

    if (storeData.setting === "RDFLabel") {
      // check if rdflabel exists

      let rdfLabel =
        storeData.currentCategoriesContent.table[termText].RDFLabel;
      if (rdfLabel.length) {
        let newHTML = elem[0].replace(termText, rdfLabel);
        liEntityText.innerHTML = newHTML;
      }
    }

    //

    //let termId = liEntityText.innerText;

    let id = "li-term-" + termText;
    liEntityText.id = id;

    // show rdflabel or IRI

    liEntityText.onclick = (evt) => {
      evt.preventDefault();
      let liEntityDetail = liText.children[1];
      let newDetail = makeDetailBox(id, liEntityDetail);
      liEntityDetail.replaceWith(newDetail);
      newDetail.style.display = "block";
      newDetail.scrollIntoView({ block: "nearest", inline: "center" });
      li.onmouseleave = (evt) => {
        newDetail.style.display = "none";
      };
    };

    liOutBtn.onclick = (evt) => {
      let text = liEntityText.innerText;
      liOutBtnToggle(text, id, ui, wnd, evt);
    };
    liReplaceBtn.onclick = (evt) => {
      try {
        let text = liEntityText.innerText;
        liReplaceBtnToggle(text, id, ui);
      } catch (e) {
        let errorDiv = treeContent.querySelector(".match-error");
        errorDiv.innerText = e;
        errorDiv.style.display = "block";
        setTimeout(() => {
          errorDiv.style.display = "none";
        }, 8000);
      }
    };

    ul.appendChild(li);

    if (elem[1].length) {
      liIcon.innerText = "\u2296";
      liIcon.style = "cursor:pointer; margin-right:1px;";
      liIcon.setAttribute("name", "li-collapse-btn");

      let ulNext = buildTree(ui, elem[1], liElem, wnd, treeContent);
      li.appendChild(ulNext);

      liIcon.onclick = (evt) => {
        let selectedLi = evt.target;
        let childUl = evt.target.parentElement.nextElementSibling;

        if (evt.target.innerText === "\u2296") {
          childUl.style.display = "none";
          selectedLi.innerText = "\u2295";
        } else {
          childUl.style.display = "block";
          selectedLi.innerText = "\u2296";
        }
      };
    } else {
      liIcon.innerHTML = "--";
      liIcon.style = "color:grey;margin-right:1px;";

      liCom.prepend(liIcon);
    }
  });
  return ul;
};

const makeDetailBox = (id, detailBox) => {
  let newBox = detailBox.cloneNode(true);
  let entityId = id.replace("li-term-", "");

  let table = storeData.currentCategoriesContent.table;
  let entityContent = table[entityId];

  let entityIRI = newBox.querySelector('div[name="entity-IRI"]');
  entityIRI.innerText = entityId + " (" + entityContent.EntityIRI + ")";

  let rdfLabel = newBox.querySelector('div[name="entity-label"]');
  rdfLabel.innerText = entityContent.RDFLabel ? entityContent.RDFLabel : "none";

  let color = newBox.querySelector('div[name="entity-color"]');
  color.innerText = entityContent.Color;

  let annos = newBox.querySelector('div[name="entity-annos"]');
  annos.innerHTML = addSpecialInfo(entityContent.Annotations).innerHTML;

  let specialInfo = newBox.querySelector('div[name="entity-special"]');
  specialInfo.innerHTML = addSpecialInfo(entityContent.SpecialInfo).innerHTML;

  newBox.onclick = (evt) => {
    evt.stopPropagation();
  };

  return newBox;
};

const liOutBtnToggle = (text, id, ui, wnd, evt) => {
  let entityId = id.replace("li-term-", "");
  let labelOffset = 0;
  let table = storeData.currentCategoriesContent.table;

  let term = table[entityId];
  let cate = term.BelongsTo;
  let color = term.Color;
  let label = text;
  let attrs;

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
      attrs = { label: label, Type: cate, IRI: term.EntityIRI };

      break;
    case "ObjectProperty":
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
      attrs = { label: label, Type: cate, IRI: term.EntityIRI };

      break;
    case "DatatypeProperty":
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
      attrs = { label: label, Type: cate, IRI: term.EntityIRI };

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
      attrs = {
        label: "<u>" + label + "</u>",
        Type: cate,
        IRI: term.EntityIRI,
      };
      break;

    case "Datatype":
      label = `"value"^^${text}`;
      cate = "DataValue";
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
      attrs = { label: label, Type: cate, IRI_DT: term.EntityIRI };
      break;
    case "AnnotationProperty":
      var colCell = new mxCell(
        label,
        new mxGeometry(0, 0, 0, 0),
        "rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;endArrow=diamond;endFill=1;strokeWidth=1;"
      );
      var maxNameLength = label.length;

      colCell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
      colCell.geometry.setTerminalPoint(
        new mxPoint(maxNameLength * 8 + 20, 0),
        false
      );
      colCell.edge = true;
      labelOffset = maxNameLength * 8 + 20 + 30;
      attrs = { label: label, Type: cate, IRI: term.EntityIRI };

      break;
  }

  let obj = makeNewObject(attrs);

  let graph = ui.editor.graph;

  graph.getModel().setValue(colCell, obj);

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
};

const liReplaceBtnToggle = (text, id, ui) => {
  let entityId = id.replace("li-term-", "");
  let table = storeData.currentCategoriesContent.table;
  let term = table[entityId];
  let cate = term.BelongsTo;
  let color = term.Color;

  let cells = ui.editor.graph.getSelectionCells();

  if (cells) {
    cells.forEach((cell) => {
      if (typeof cell.value === "object") {
        let label = cell.getAttribute("label", null);
        let cellType = cell.getAttribute("Type", null);
        if (cellType) {
          let pattern = /(\(.*\))/g;
          let style = cell.style;
          let newStyle = makeNewStyle(cell, color);
          // get text outside
          let cellType_main = cellType
            .replace(pattern, "")
            .trim()
            .toLowerCase();

          switch (cate.toLowerCase()) {
            // datatype: can show in datavalue, datatype, datatypeproperty(rectangle)
            case "datatype":
              if (cellType_main === "datavalue") {
                let newLabel = `"value"^^${text}`;

                let attrs = {
                  label: newLabel,
                  Type: cellType,
                  IRI_DT: term.EntityIRI,
                };

                let obj = makeNewObject(attrs);
                ui.editor.graph.model.setStyle(cell, newStyle);
                ui.editor.graph.model.setValue(cell, obj);
              } else if (cellType_main === "datatype") {
                let newLabel = text;

                let attrs = {
                  label: newLabel,
                  Type: cellType,
                  IRI: term.EntityIRI,
                };

                let obj = makeNewObject(attrs);

                ui.editor.graph.model.setStyle(cell, newStyle);
                ui.editor.graph.model.setValue(cell, obj);
              } else if (
                cellType_main == "datatypeproperty" &&
                !(style.includes("rhombus") | cell.isEdge())
              ) {
                let IRI_DP = cell.getAttribute("IRI_DP", null);
                let group = label.split("~");
                // keep dp and add dt behind it
                let dpLabel = group[0];
                let groupNewLabel = dpLabel + "~" + text;
                cellType = cellType.replace("NoRange", "YesRange");

                let attrs = {
                  label: groupNewLabel,
                  Type: cellType,
                  IRI_DP: IRI_DP,
                  IRI_DT: term.EntityIRI,
                };

                let obj = makeNewObject(attrs);

                ui.editor.graph.model.setValue(cell, obj);
              } else {
                throw `The selected shape is not a datavalue or datatype or datatypeproperty(asseration)!`;
              }
              break;

            case "datatypeproperty":
              // datatypeproperty can in edges, rhomus shape and rectangle shape

              if (cellType_main === "datatypeproperty") {
                if (style.includes("rhombus") | cell.isEdge()) {
                  let newLabel = makeNewLabel(label, text);

                  let attrs = {
                    label: newLabel,
                    Type: cellType,
                    IRI: term.EntityIRI,
                  };

                  let obj = makeNewObject(attrs);

                  ui.editor.graph.model.setStyle(cell, newStyle);
                  ui.editor.graph.model.setValue(cell, obj);
                } else {
                  // in rectangle shape: split dp and dt: (all)ns:datatypeproperty~ns:datatype
                  // only change dp

                  let group = label.split("~");
                  let dpLabel = group[0];
                  let dpNewLabel = makeNewLabel(dpLabel, text);
                  let groupNewLabel = label.replace(dpLabel, dpNewLabel);
                  let IRI_DT = cell.getAttribute("IRI_DT", null);

                  let attrs = {
                    label: groupNewLabel,
                    Type: cellType,
                    IRI_DP: term.EntityIRI,
                    IRI_DT: IRI_DT,
                  };
                  let obj = makeNewObject(attrs);
                  ui.editor.graph.model.setStyle(cell, newStyle);
                  ui.editor.graph.model.setValue(cell, obj);
                }
              } else {
                throw `The selected shape is not a datatypeproperty!`;
              }
              break;

            default:
              // check whether the shape and entitycate matches
              if (cate.toLowerCase() === cellType_main) {
                let newLabel = makeNewLabel(label, text);
                // make new object

                if (cellType_main === "individual") {
                  newLabel = "<u>" + newLabel + "</u>";
                }
                let attrs = {
                  label: newLabel,
                  Type: cellType,
                  IRI: term.EntityIRI,
                };

                let obj = makeNewObject(attrs);

                ui.editor.graph.model.setStyle(cell, newStyle);
                ui.editor.graph.model.setValue(cell, obj);
              } else {
                throw `The selected shape is not a ${cate}!`;
              }
          }
        }
      }
    });
  }
};

const addSpecialInfo = (info) => {
  let infodiv = document.createElement("div");
  if (Object.keys(info).length) {
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
        hr.style.borderTop = "0.5px dotted #333";
        hr.style.margin = "5px 0px 5px 0px";
        div.append(divTitle, divText, hr);
        infodiv.appendChild(div);
      }
    });
  } else {
    infodiv.innerText = "none";
  }

  return infodiv;
};

const makeNewLabel = (label, text) => {
  // replace the text outside <<>> or () of label with new text
  // <<owl:objectproperty>>ns:a => <<owl:objectproperty>>cco:test

  // cleam html tage first
  let pattern = /([<<|\(].*[>>|\)])/g;

  let div = document.createElement("div");
  div.innerHTML = label;
  console.log(label);

  let cleanedLabel = div.textContent || div.innerText || "";
  console.log(cleanedLabel);

  // get text outside
  let outside = cleanedLabel.replace(pattern, "").trim();
  // let adiv = document.createElement("div");
  // adiv.innerHTML = outside;
  // let htmlOutside = adiv.innerHTML;

  let newLabel = cleanedLabel.replace(outside, text);
  let adiv = document.createElement("div");
  adiv.innerText = newLabel;

  return adiv.innerHTML;
};

const makeNewStyle = (cell, color) => {
  let styleArray = cell.style.split(";");
  let arrayWithout = styleArray.filter((elem) => !elem.includes("fillColor"));
  let styleColor = color === "none" ? "#FFFFFF" : color;
  let newStyle = arrayWithout.join(";") + `fillColor=${styleColor};`;
  return newStyle;
};

const makeNewObject = (attrs) => {
  let doc = mxUtils.createXmlDocument();
  let obj = doc.createElement("object");
  for (let [key, value] of Object.entries(attrs)) {
    obj.setAttribute(key, value);
  }
  return obj;
};

export default OntoTree;
