import layout from "./index.html";
import OntoUploader from "./scripts/uploader.js";
import { storeData } from "./scripts/store";
import SignForm from "./scripts/login-system";
import OntoTree from "./scripts/onto-tree";
import "./index.scss";

export const makeEntityWnd = (ui) => {
  var app = document.createElement("div");
  app.id = "ontopanel-app";
  app.style = "height: 450px; width: 380px; font-size: 15px; padding: 5px; ";

  app.innerHTML = layout;
  app.addEventListener("contextmenu", (evt) => evt.preventDefault());
  // app.addEventListener("keydown", (evt) => {
  //   evt = evt || window.event;
  //   var key = evt.code;

  //   // Detecting Ctrl
  //   var ctrl = ev.ctrlKey ? ev.ctrlKey : key === 17 ? true : false;

  //   // If key pressed is V and if ctrl is true.
  //   if (key == 67 && ctrl) {
  //     let text = app.getSelection();
  //     console.log(text);
  //   }
  // });

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

  let addBtn = app.querySelector("#ontopanel-onto-add-btn");
  let uploader = new OntoUploader(app);
  addBtn.onclick = (evt) => {
    evt.preventDefault();
    uploader.addTrigger();
  };

  let signLogin = new SignForm(app);

  let signBtn = app.querySelector("#ontopanel-signup-btn");
  signBtn.onclick = (evt) => {
    evt.preventDefault();
    signLogin.signUp();
  };

  let loginBtn = app.querySelector("#ontopanel-login-btn");
  loginBtn.onclick = (evt) => {
    evt.preventDefault();
    signLogin.login();
  };

  let logoutBtn = app.querySelector("#ontopanel-logout-btn");
  logoutBtn.onclick = (evt) => {
    evt.preventDefault();
    signLogin.logout();
  };

  let ontoTreeContent = app.querySelector("#onto-tree-content");

  const categoriesBtn = {
    "ontopanel-tree-class-btn": "Class",
    "ontopanel-tree-op-btn": "ObjectProperty",
    "ontopanel-tree-dp-btn": "DatatypeProperty",
    "ontopanel-tree-ind-btn": "Individual",
    "ontopanel-tree-ap-btn": "AnnotationProperty",
    "ontopanel-tree-dt-btn": "Datatype",
  };
  Object.keys(categoriesBtn).forEach((btnName) => {
    let btn = app.querySelector("#" + btnName);
    btn.onclick = (evt) => {
      let inputData =
        storeData.currentCategoriesContent.categories[
          categoriesBtn[evt.target.id]
        ];
      let innerTree = ontoTreeContent.firstElementChild;
      if (inputData.content) {
        let newTree = new OntoTree(app, ui, wnd, inputData);
        innerTree.replaceWith(newTree.treeContent);
      } else {
        innerTree.innerHTML = "";
      }
    };
  });

  app.querySelector("#ontopanel-onto-extra-btn-MSEO").onclick = (evt) => {
    evt.preventDefault();
    fetch("plugins/ontopanelPlugin/ontoData/mseo_ontopanel.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.onto_table.namespaces = storeData.mesoNamespace;
        storeData.modifyOntoBank(
          ["ontopanel-onto-extra-btn-MSEO", data],
          "add"
        );
        storeData.loadCurrentTable(data);
        console.log(storeData.currentCategoriesContent);
      });
  };

  app.querySelector("#ontopanel-namespace-btn").onclick = (evt) => {
    evt.preventDefault();

    if (storeData.currentCategoriesContent.title) {
      let currentOnto =
        storeData.ontoBank[
          "ontopanel-onto-extra-btn-" + storeData.currentCategoriesContent.title
        ];

      let currentNamespace = currentOnto.onto_table.namespaces.join("<br/>");

      let outputNamespace = currentNamespace + "<br/>";

      let nameSpaceCell = new mxCell(
        outputNamespace,
        new mxGeometry(0, 0, 90, 26),
        "shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;"
      );

      let size = ui.editor.graph.getPreferredSizeForCell(nameSpaceCell);
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

  let setting = app.querySelector(".ontopanel-setting");

  setting.onchange = (evt) => {
    evt.preventDefault();
    storeData.setting = setting.value;
    document.getElementById("ontopanel-tree-class-btn").click();
  };

  return wnd;
};
