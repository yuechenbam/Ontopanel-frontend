export const extractData = (ui) => {
  let graph = ui.editor.graph;
  let parent = graph.getDefaultParent();

  let children = graph.model.getDescendants(parent);

  children = children.filter((elem) => elem !== parent);

  let nodes = {};
  let edges = {};
  let errors = {
    node_errors: [],
    edge_errors: [],
    relation_errors: [],
    other_errors: [],
  };
  children.forEach((elem) => {
    let elemStyle = elem.style ? elem.style : "";
    if (typeof elem.value === "object") {
      let type = elem.getAttribute("Type", null);
      if (type) {
        let id = elem.id;

        let elemSource = elem.source ? elem.source.id : "none";
        let elemTarget = elem.target ? elem.target.id : "none";
        let elemGeometry = elem.geometry ? { ...elem.geometry } : "none";

        let attrs = elem.value.attributes;
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
          // if Label is empty
          if (!elemLabel) {
            // edge label is in text box
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
      } else {
        let errorInfo = {
          id: elem.id,
          message:
            "this shape is not from ontopanel-libary, please use libary or transform.",
        };
        errors["other_errors"].push(errorInfo);
      }
    } else if (elemStyle.includes("text") || elemStyle.includes("edgeLabel")) {
    } else {
      let errorInfo = {
        id: elem.id,
        message:
          "this shape is not from ontopanel-libary, please use libary or transform.",
      };
      errors["other_errors"].push(errorInfo);
    }
  });
  let allInfoJson = JSON.stringify({
    nodes: nodes,
    edges: edges,
    errors: errors,
  });
  //console.log(allInfoJson);'
  let allInfo = { nodes: nodes, edges: edges, errors: errors };

  return allInfo;
};
