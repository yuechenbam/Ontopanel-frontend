import lib from "./onto_library.xml";

export const loadOntopanelLibrary = (ui) => {
  ui.loadLibrary(new LocalLibrary(ui, lib, "ontopanel-library"));
};
