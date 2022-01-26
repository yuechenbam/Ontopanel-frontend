import { makeEntityWnd } from "./entityFinder/index.js";
import { makeConvertorWnd } from "./convertor/index.js";

// too plugins
// entityTool to show entities
// convertorTool to convertor plot

Draw.loadPlugin(function (ui) {
  let entityFinderWnd = makeEntityWnd(ui);
  ui.actions.addAction("ontopanel", function () {
    entityFinderWnd.setVisible(!entityFinderWnd.isVisible());
  });

  let convertorWnd =makeConvertorWnd (ui);
  ui.actions.addAction("convertor", function () {
    convertorWnd.setVisible(!convertorWnd.isVisible());
  });

  var menu = ui.menus.get("extras");
  var oldFunct = menu.funct;

  menu.funct = function (menu, parent) {
    oldFunct.apply(this, arguments);
    ui.menus.addMenuItems(menu, ["convertor"], parent);
    ui.menus.addMenuItems(menu, ["ontopanel"], parent);
  };
});
