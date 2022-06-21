import lib from "./onto_library.xml";

// load library

export const loadOntopanelLibrary = (ui) => {
  ui.loadLibrary(new LocalLibrary(ui, lib, "Ontopanel-Library"));
};
