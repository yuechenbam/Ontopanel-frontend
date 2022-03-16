import errorhtml from "../html/errors.html";
export const errorList = (errors, ui) => {
  // three errors
  // node error, edge error, and relation error
  let otherErrors = errors.other_errors;
  let edgeErrors = errors.edge_errors;
  let nodeErrors = errors.node_errors;
  let relationErrors = errors.relation_errors;

  let errorContainer = document.createElement("div");
  errorContainer.innerHTML = errorhtml;

  let noErrorDiv = errorContainer.querySelector('div[name="noerror"]');

  if (otherErrors.length) {
    let otherDiv = errorContainer.querySelector('div[name="other"]');
    let otherUl = otherDiv.querySelector("ul");
    otherErrors.forEach((elem) => {
      let id = elem.id;
      let message = elem.message;

      let li = makeLi(id, message, ui);

      otherUl.appendChild(li);
    });
    otherDiv.style.display = "block";
    noErrorDiv.style.display = "none";
  }

  if (edgeErrors.length) {
    let edgeDiv = errorContainer.querySelector('div[name="edge"]');
    let edgeUl = edgeDiv.querySelector("ul");
    edgeErrors.forEach((elem) => {
      let id = elem.id;
      let message = elem.message;

      let li = makeLi(id, message, ui);

      edgeUl.appendChild(li);
    });
    edgeDiv.style.display = "block";
    noErrorDiv.style.display = "none";
  }
  if (nodeErrors.length) {
    let nodeDiv = errorContainer.querySelector('div[name="node"]');
    let nodeUl = nodeDiv.querySelector("ul");
    nodeErrors.forEach((elem) => {
      let id = elem.id;
      let message = elem.message;

      let li = makeLi(id, message, ui);
      nodeUl.appendChild(li);
    });
    nodeDiv.style.display = "block";
    noErrorDiv.style.display = "none";
  }

  if (relationErrors.length) {
    let relationDiv = errorContainer.querySelector('div[name="relation"]');
    let relationUl = relationDiv.querySelector("ul");
    relationErrors.forEach((elem) => {
      let id_list = elem.id_list;
      let message = elem.message;

      let li = makeLiRelation(id_list, message, ui);
      relationUl.appendChild(li);
    });
    relationDiv.style.display = "block";
    noErrorDiv.style.display = "none";
  }

  return errorContainer;
};

const makeLi = (id, message, ui) => {
  let li = document.createElement("li");
  li.id = id;
  li.innerHTML = `
    <div><b>ID: </b>${id}</div> 
    <div><b>Error: </b>${message}</div>
    `;

  li.onclick = (evt) => {
    evt.preventDefault();
    let graph = ui.editor.graph;
    let model = graph.getModel();
    let cell = model.getCell(id);
    let cellGroup = [cell];
    graph.clearSelection();
    let parent = graph.getDefaultParent();
    let collapsedCells = model
      .getDescendants(parent)
      .filter((elem) => elem.collapsed);
    collapsedCells.forEach((elem) => {
      let de = model.getDescendants(elem);
      if (de.includes(cell)) {
        cellGroup.push(elem);
      }
    });

    graph.setSelectionCells(cellGroup);
    graph.scrollCellToVisible(cellGroup[0], true);
  };

  return li;
};

const makeLiRelation = (id_list, message, ui) => {
  let li = document.createElement("li");
  let list = "[" + id_list.join(",") + "]";
  li.innerHTML = `
    <div><b>ID List: </b>${list}</div> 
    <div><b>Error: </b>${message}</div>
    `;

  li.onclick = (evt) => {
    evt.preventDefault();
    let graph = ui.editor.graph;
    let model = graph.getModel();
    let cellGroup = id_list.map((id) => model.getCell(id));
    graph.clearSelection();
    let parent = graph.getDefaultParent();
    let collapsedCells = model
      .getDescendants(parent)
      .filter((elem) => elem.collapsed);
    collapsedCells.forEach((elem) => {
      let de = model.getDescendants(elem);
      if (de.some((a) => cellGroup.includes(a))) {
        cellGroup.push(elem);
      }
    });

    graph.setSelectionCells(cellGroup);
    graph.scrollCellToVisible(cellGroup[1], true);
  };

  return li;
};
