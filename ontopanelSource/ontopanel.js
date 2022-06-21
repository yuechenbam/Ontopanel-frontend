import { makeEntityWnd } from "./entityManager/index.js";
import { makeConvertorWnd } from "./convertor/index.js";
import { loadOntopanelLibrary } from "./loadLibrary/loadLibrary.js";

// three tools
// library loads in sidebar for graph construction
// entitymanager Tool to show entities
// convertor Tool to convertor plot

Draw.loadPlugin(function (ui) {
  loadOntopanelLibrary(ui);

  let entityFinderWnd = makeEntityWnd(ui);
  ui.actions.addAction("entitymanager", function () {
    entityFinderWnd.setVisible(!entityFinderWnd.isVisible());
  });

  let convertorWnd = makeConvertorWnd(ui);
  ui.actions.addAction("convertor", function () {
    convertorWnd.setVisible(!convertorWnd.isVisible());
  });

  var menu = ui.menus.get("extras");
  var oldFunct = menu.funct;

  menu.funct = function (menu, parent) {
    oldFunct.apply(this, arguments);
    ui.menus.addMenuItems(menu, ["convertor"], parent);
    ui.menus.addMenuItems(menu, ["entitymanager"], parent);
  };
});
