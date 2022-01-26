## About

This is a fork of [diagrams.net](https://app.diagrams.net), [previously draw.io](https://www.diagrams.net/blog/move-diagrams-net).

There is one plugin ontopanel, which can be found via Extra-Plugins. Click [drawio interface](https://yuechenbam.github.io/src/main/webapp/index.html) to get full editor functionality of the plugin version.

If you see any updates to this project, be sure to clear your cache (history) before opening it, otherwise the new features will not show up. If you see the error in other browsers, please use Chrome to open it.

This is a beta version, please let me know if you have any comments(yue.chen@bam.de).

## Ontopanel

This plugin is designed for MESO ontology and is compatible with Chowlk Convertor.
Please click to see how to use the plugin of ontopanel:

https://user-images.githubusercontent.com/90606851/135603089-4b929c01-1bd4-4ded-a9d2-b483189961e5.mp4

### Version

**22.11.2021(latest):**

- new version Ontopanel is released. ImportOnto might be removed later.
  - You can register and login. Data is saved in databank. Please do **NOT** keep confidential data in the database.
  - Changed table structure to tree structure, and added more details of each entity.(Similar to Protege)
  - Probelm: due to server problem, you can not import large ontology files, this will be solved with new server.
  - If you have any suggestions, please write me an email or open an issue here.

**12.10.2021:**

- Activate "+" button. You can import ontology via file or URL now.

**06.10.2021:**

- Added colors to the MESO ontology, datavalue button, and a prefix button to output the namespaces used in this ontology.

- Color descriptions (including inferred subclasses):
  - Subclasses of process (equivalent to continuant in BWMD) in green: "#1C9E71",
  - Subclasses of InformationContentEntities (equivalent to ocurrent in BWMD) in yellow: "#F0F000",
  - Subclasses of InformationBearingArtifact (equivalent to quality in BWMD) in gray: "#DADADA",
  - DataValues in orange: "#FF8C00", taken from Protege.
  - Rest in black.
