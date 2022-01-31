import { makeEntityWnd as makeEntityWndOld } from "./entityFinder_version1/index.js";
import { makeEntityWnd } from "./entityFinder/index.js";
import { makeConvertorWnd } from "./convertor/index.js";
import { loadOntopanelLibrary } from "./loadLibrary/loadLibrary.js";

// too plugins
// entityTool to show entities
// convertorTool to convertor plot

Draw.loadPlugin(function (ui) {
  loadOntopanelLibrary(ui);

  let entityFinderWnd = makeEntityWnd(ui);
  ui.actions.addAction("entityfinder", function () {
    entityFinderWnd.setVisible(!entityFinderWnd.isVisible());
  });

  let entityFinderWndOld = makeEntityWndOld(ui);
  ui.actions.addAction("entityfinderOld", function () {
    entityFinderWndOld.setVisible(!entityFinderWndOld.isVisible());
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
    ui.menus.addMenuItems(menu, ["entityfinder"], parent);
    ui.menus.addMenuItems(menu, ["entityfinderOld"], parent);
  };

  // active backend
  fetch("https://ontopanel.herokuapp.com/api/v1/ontos/lists/", {
    method: "GET",
  });

  setInterval(function () {
    fetch("https://ontopanel.herokuapp.com/api/v1/ontos/lists/", {
      method: "GET",
    });
  }, 20 * 1000 * 60);
});
