Draw.loadPlugin(function (ui) {
  var app = document.createElement("div");
  app.id = "ontopanel-app";
  app.style = "height: 450px; width: 380px; font-size: 15px; padding: 5px; ";
  app.addEventListener("contextmenu", (evt) => evt.preventDefault());

  app.innerHTML = `<button id="test-btn" style="cursor: pointer;">test</button>`;

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

  let btn = app.querySelector("#test-btn");

  btn.addEventListener("click", (evt) => {
    let graph = ui.editor.graph;
    let parent = graph.getDefaultParent();
    // var vertices = graph.getChildVertices(parent);

    // var edges = graph.getChildEdges(parent);

    let bounds = graph.getGraphBounds();

    let children = graph.getCells(
      bounds.x,
      bounds.y,
      bounds.width,
      bounds.height,
      parent,
      null,
      null,
      null,
      true
    );
    let nodes = {};
    let edges = {};
    children.forEach((elem) => {
      if (typeof elem.value === "object") {
        let type = elem.getAttribute("Type", null);
        if (type) {
          let id = elem.id;
          let elemStyle = elem.style;

          let elemSource = elem.source ? elem.source.id : "none";
          let elemTarget = elem.target ? elem.target.id : "none";
          let elemGeometry = elem.geometry ? { ...elem.geometry } : "none";

          let attrs = elem.value.attributes;
          console.log(attrs["label"].value);
          console.log(typeof attrs["label"].value);
          let elemLabel = attrs["label"].value.trim();
          let value = {};
          for (let i = 0; i < attrs.length; i++) {
            let attr = attrs[i];
            let attrName = attr.name.trim();
            if (attrName !== "label" && attrName !== "Type") {
              value[attrName] = attr.value.trim();
            }
          }

          let objectData = Object.keys(value).length ? value : "none";
          // edges need source and target, nodes need geometry

          if (elem.isEdge()) {
            // edge label is in text box
            console.log(elem);
            console.log(elem.children);
            let elemChildren = elem.children;
            if (elemChildren) {
              for (let i = 0; i < elemChildren.length; i++) {
                let child = elemChildren[i];
                if (
                  (child.style.includes("text") ||
                    child.style.includes("edgeLabel")) &&
                  child.value
                ) {
                  elemLabel =
                    typeof child.value === "string" ? child.value : "";
                  break;
                }
              }
            }

            edges[id] = {
              type: type,
              style: elemStyle,
              label: elemLabel,
              source: elemSource,
              target: elemTarget,
              objectData: objectData,
            };
          } else {
            nodes[id] = {
              type: type,
              style: elemStyle,
              label: elemLabel,
              geometry: elemGeometry,
              objectData: objectData,
            };
          }
        }
      }
    });
    let allInfo = JSON.stringify({ nodes: nodes, edges: edges });
    console.log(allInfo);

    //fs.writeFile("ontoData/allInfo.json", allInfo, "utf8", callback);'
  });
});
