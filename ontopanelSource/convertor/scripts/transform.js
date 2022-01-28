import { storeData } from "./store";
export const transform = (ui, resultBtn) => {
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

  let foundedNodeGroup = {};
  let nodes = children.filter((elem) => elem.isVertex());
  let errors = {
    node_errors: [],
    edge_errors: [],
    other_errors: [],
    relation_errors: [],
  };

  nodes.forEach((elem) => {
    if (typeof elem.value === "object") {
    } else {
      let attrs = {};
      let [nodeType, nodeValue] = judgeNodeType(elem);

      if (nodeType && nodeType !== "pass") {
        attrs = {
          label: nodeValue,
          Type: nodeType,
        };
        let newObj = makeNewObject(attrs);
        graph.model.setValue(elem, newObj);
        foundedNodeGroup[elem.id] = nodeType;
      } else {
        if (nodeType !== "pass") {
          errors["node_errors"].push({
            id: elem.id,
            message:
              "not recongized, please use the ontopanel libary to repalce it.",
          });
        }
      }
    }
    let showData = {
      result:
        "Transformer can wrongly convert the following:\nnodes: nodes in rectangle shapes, \nedges: edges without labels.\n\nYou cant click ShowError to check the errors, but maybe not all the errors are catched.\nPlease use the ontopanel-libary shapes to replace the errors.\nHowever, it usually will not be a problem if you could not correct all the errors, because convertor will check the errors again.",
      errors: errors,
    };
    storeData.modifyData(showData);
    resultBtn.click();
  });

  let edges = children.filter((elem) => elem.isEdge());
  edges.forEach((elem) => {
    if (typeof elem.value === "object") {
    } else {
      let attrs = {};
      let [edgeType, edgeValue] = judgeEdgeType(elem, foundedNodeGroup);
      if (edgeType && edgeType !== "pass") {
        attrs = {
          label: edgeValue,
          Type: edgeType,
        };
        let newObj = makeNewObject(attrs);
        graph.model.setValue(elem, newObj);
      }
    }
  });
};

const makeNewObject = (attrs) => {
  let doc = mxUtils.createXmlDocument();
  let obj = doc.createElement("object");
  for (let [key, value] of Object.entries(attrs)) {
    obj.setAttribute(key, value);
  }
  return obj;
};

const judgeNodeType = (elem) => {
  let style = elem.style;
  let value = getLabel(elem);
  let NodeType = null;
  let div = document.createElement("div");
  div.innerHTML = value;
  let textValue = div.innerText;

  let elipseGroup = {
    "⨅": "IntersectionOf",
    intersectionOf: "IntersectionOf",
    "⨆": "UnionOf",
    unionOf: "UnionOf",
    "≡": "EquivalentClass",
    "⊥": "DisjointClass",
  };

  if (style.includes("shape=note")) {
    NodeType = "Namespace";
  } else if (style.includes("shape=document")) {
    NodeType = "Metadata";
  } else if (style.includes("shape=parallelogram")) {
    NodeType = "CustomDatatype";
  } else if (style.includes("shape=hexagon")) {
    if (textValue.includes("AllDifferent")) {
      NodeType = "AllDifferent";
    }
  } else if (style.includes("ellipse")) {
    Object.keys(elipseGroup).forEach((elipse) => {
      if (textValue.includes(elipse)) {
        NodeType = elipseGroup[elipse];
      }
    });
  } else if (style.includes("rhombus")) {
    if (textValue.includes("owl:ObjectProperty")) {
      NodeType = "ObjectProperty";
    } else if (textValue.includes("owl:DatatypeProperty")) {
      NodeType = "DatatypeProperty";
    }
  } else if (style.includes("edgeLabel") || style.includes("text")) {
    NodeType = "pass";
  } else if (style.includes("rounded=0")) {
    // individual
    if (value.includes("</u>") || style.includes("fontStyle=4")) {
      NodeType = "Individual";
    } else if (textValue.includes("^^") || textValue.includes("@")) {
      NodeType = "DataValue";
    } else if (!style.includes("dashed=1")) {
      NodeType = "Class";
    }
  }

  return [NodeType, value];
};

const judgeEdgeType = (elem, foundedNodeGroup) => {
  let style = elem.style;
  let target = elem.target;
  let source = elem.source;
  let value = getLabel(elem);
  let EdgeType = null;
  let div = document.createElement("div");
  div.innerHTML = value;
  let textValue = div.innerText;
  let openArrowGroup = {
    "rdfs:subClassOf": "SubClassOf",
    "rdf:type": "RDFType",
    "owl:equivalentClass": "EquivalentClass",
    "owl:disjointWith": "DisjointClass",
    "owl:complementOf": "ComplementOf",
    "rdfs:subPropertyOf": "SubPropertyOf",
    "owl:equivalentProperty": "EquivalentProperty",
    "owl:inverseOf": "InverseOf",
    "rdfs:domain": "Domain",
    "rdfs:range": "Range",
    "owl:sameAs": "SameAs",
    "owl:differentFrom": "DifferentFrom",
  };

  if (!value || value.length === 0) {
    value = "";
    if (
      style.includes("endArrow=block") ||
      style.includes("startArrow=block")
    ) {
      EdgeType = "SubClassOf";
    } else if (
      style.includes("endArrow=open") ||
      style.includes("startArrow=open")
    ) {
      EdgeType = "Connector";
      if (source && source.id in foundedNodeGroup) {
        let NodeType = foundedNodeGroup[source.id];
        if (NodeType === "Individual") {
          EdgeType = "RDFType";
        }
      }
    }
  }

  Object.keys(openArrowGroup).forEach((a) => {
    if (textValue.includes(a)) {
      EdgeType = openArrowGroup[a];
    }
  });
  if (!EdgeType) {
    // object property or datatype property
    EdgeType = "ObjectProperty";
    if (target && target.id in foundedNodeGroup) {
      let NodeType = foundedNodeGroup[target.id];
      if (NodeType === "DataValue") {
        EdgeType = "DatatypeProperty";
      }
    }
  }

  return [EdgeType, value];
};

const getLabel = (elem) => {
  let elemLabel = elem.value;
  if (!elemLabel) {
    // edge label is in text box
    let elemChildren = elem.children;
    if (elemChildren) {
      for (let i = 0; i < elemChildren.length; i++) {
        let child = elemChildren[i];
        if (
          (child.style.includes("text") || child.style.includes("edgeLabel")) &&
          child.value
        ) {
          elemLabel = typeof child.value === "string" ? child.value : "";
          break;
        }
      }
    }
  }
  return elemLabel;
};
