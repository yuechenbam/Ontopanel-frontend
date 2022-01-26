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

    let ul = buildTree(this.ui, content, liElem, this.wnd);
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
      let currentTableId =
        "ontopanel-onto-extra-btn-" + storeData.currentCategoriesContent.title;
      let table = JSON.parse(
        storeData.ontoBank[currentTableId].onto_table.table
      );
      for (let i = 0; i < li.length; i++) {
        let liTermTextAll = li[i].querySelectorAll('div[name="li-term-text"]');
        let liTermText = liTermTextAll[0];
        let entityId = liTermText.textContent;
        let entityLabel = table[entityId].RDFLabel;

        let c = [...liTermTextAll];
        let entityIdString = c.map((x) => x.firstChild.textContent).join("\n");
        let entityLabelString = c
          .map((x) => table[x.firstChild.textContent].RDFLabel)
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

const buildTree = (ui, arr, liElem, wnd) => {
  let ul = document.createElement("ul");
  arr.forEach((elem) => {
    let li = liElem.cloneNode(true);

    let liCom = li.firstElementChild;

    let liIcon = liCom.children[0];
    let liText = liCom.children[1];
    let liOutBtn = liCom.children[2];
    let liReplaceBtn = liCom.children[3];

    let liEntityText = liText.children[0];

    liEntityText.innerHTML = elem[0];

    // add id to each term, the original can have html tag, so use innerText to get it.
    let id = "li-term-" + liEntityText.innerText;
    liEntityText.id = id;

    liEntityText.onclick = (evt) => {
      evt.preventDefault();
      let liEntityDetail = liText.children[1];
      let newDetail = makeDetailBox(id, liEntityDetail);
      liEntityDetail.replaceWith(newDetail);
      liEntityDetail.style.display = "block";
      liEntityDetail.scrollIntoView({ block: "nearest", inline: "center" });
    };

    liOutBtn.onclick = (evt) => {
      liOutBtnToggle(id, ui, wnd, evt);
    };
    liReplaceBtn.onclick = (evt) => {
      liReplaceBtnToggle(id, ui);
    };

    ul.appendChild(li);

    if (elem[1].length) {
      liIcon.innerText = "\u2296";
      liIcon.style = "cursor:pointer; margin-right:1px;";
      liIcon.setAttribute("name", "li-collapse-btn");

      let ulNext = buildTree(ui, elem[1], liElem, wnd);
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
  let entityId = id.replace("li-term-", "");

  let currentTableId =
    "ontopanel-onto-extra-btn-" + storeData.currentCategoriesContent.title;

  let table = JSON.parse(storeData.ontoBank[currentTableId].onto_table.table);
  let entityContent = table[entityId];

  let rdfLabel = detailBox.querySelector('div[name="entity-label"]');
  rdfLabel.innerText = entityContent.RDFLabel;

  let color = detailBox.querySelector('div[name="entity-color"]');
  color.innerText = entityContent.Color;

  let annos = detailBox.querySelector('div[name="entity-annos"]');
  annos.innerHTML = addSpecialInfo(entityContent.Annotations).innerHTML;

  let specialInfo = detailBox.querySelector('div[name="entity-special"]');
  specialInfo.innerHTML = addSpecialInfo(entityContent.SpecialInfo).innerHTML;

  detailBox.onclick = (evt) => {
    evt.stopPropagation();
  };

  detailBox.onmouseleave = (evt) => {
    evt.preventDefault();
    detailBox.style.display = "none";
  };

  return detailBox;
};

const liOutBtnToggle = (id, ui, wnd, evt) => {
  let entityId = id.replace("li-term-", "");
  let labelOffset = 0;
  let currentOnto =
    storeData.ontoBank[
      "ontopanel-onto-extra-btn-" + storeData.currentCategoriesContent.title
    ];
  let term = JSON.parse(currentOnto.onto_table.table)[entityId];
  let cate = term.BelongsTo;
  let color = term.Color;
  let label = entityId;

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
};

const liReplaceBtnToggle = (id, ui) => {
  let entityId = id.replace("li-term-", "");
  let currentOnto =
    storeData.ontoBank[
      "ontopanel-onto-extra-btn-" + storeData.currentCategoriesContent.title
    ];
  let term = JSON.parse(currentOnto.onto_table.table)[entityId];
  let cate = term.BelongsTo;
  let color = term.Color;
  let label = entityId;
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
          styleString = "rounded=0;whiteSpace=wrap;html=1;fillColor=#FF8C00;";
          ui.editor.graph.model.setStyle(cell, styleString);

        default:
          ui.editor.graph.model.setValue(cell, label);
      }
    });
  }
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

export default OntoTree;
