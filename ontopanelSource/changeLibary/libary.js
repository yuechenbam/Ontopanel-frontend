const changeLibary = (ui) => {
  let cells = ui.editor.graph.getSelectionCells();
  cells.forEach((cell) => {
    let obj = cell.getValue();
    let cellType = cell.getAttribute("Type", null);
    console.log(cellType);
    // to add IRI to [class, objectproperty, individual, datetype, annotationsproperty, datavalue]
    let arr = [
      "class",
      "objectproperty",
      "individual",
      "datatype",
      "annotationproperty",
      "datavalue",
      "datatypeproperty",
    ];
    let pattern = /(\(.*\))/g;
    // get text outside
    let cellType_main = cellType.replace(pattern, "").trim().toLowerCase();
    if (arr.includes(cellType_main)) {
      obj.setAttribute("IRI", "Null");
      ui.editor.graph.model.setValue(cell, obj);
    }
  });
};
