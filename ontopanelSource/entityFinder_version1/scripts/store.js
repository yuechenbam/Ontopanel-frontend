class Store {
  constructor() {
    this.mesoNamespace = [
      "base:https://purl.matolab.org/mseo/methods/example/",
      "mid:https://purl.matolab.org/mseo/mid/",
      "cco:http://www.ontologyrepository.com/CommonCoreOntologies/",
      "obo:http://purl.obolibrary.org/obo/",
      "pt:http://www.daml.org/2003/01/periodictable/PeriodicTable#",
      "geo:http://www.opengis.net/ont/geosparql#",
    ];
    this.ontoBank = { "ontopanel-onto-extra-btn-MSEO": {} };

    this.currentCategoriesContent = {
      title: null,
      categories: {
        Class: { name: "Class", content: null },
        OP: { name: "ObjectProperty", content: null },
        DP: { name: "DatatypeProperty", content: null },
        Individual: { name: "Individual", content: null },
        AP: { name: "AnnotationProperty", content: null },
        Datatype: { name: "Datatype", content: null },
      },
    };
  }
  modifyOntoBank = (input, keyword) => {
    // input: [key, value]
    switch (keyword) {
      case "reset":
        this.ontoBank = { "ontopanel-onto-extra-btn-MSEO": {} };
        break;
      case "add":
        this.ontoBank[input[0]] = input[1];
        break;
      case "delete":
        delete this.ontoBank[input[0]];
    }
  };
  modifyCurrentCategoriesContent = (title, data, keyword) => {
    switch (keyword) {
      case "reset":
        this.currentCategoriesContent = {
          title: "none",
          categories: {
            Class: { name: "Class", content: null },
            OP: { name: "ObjectProperty", content: null },
            DP: { name: "DatatypeProperty", content: null },
            Individual: { name: "Individual", content: null },
            AP: { name: "AnnotationProperty", content: null },
            Datatype: { name: "Datatype", content: null },
          },
        };
        break;
      case "selected":
        this.currentCategoriesContent.title = title;
        Object.keys(this.currentCategoriesContent.categories).forEach(
          (entity) => {
            this.currentCategoriesContent.categories[entity]["content"] =
              data[entity];
          }
        );
        break;
    }
  };

  loadCurrentTable = (data, keyword = "selected") => {
    switch (keyword) {
      case "selected":
        let tree = data.onto_table["tree"];
        this.modifyCurrentCategoriesContent(data.title, tree, keyword);
        break;
      case "reset":
        this.modifyCurrentCategoriesContent(null, null, keyword);
    }

    document.getElementById(
      "ontopanel-tree-title"
    ).innerHTML = `selected: ${this.currentCategoriesContent.title}`;
    console.log("load data");
    document.getElementById("ontopanel-tree-class-btn").click();
  };
}

let storeData = new Store();

export { storeData };
