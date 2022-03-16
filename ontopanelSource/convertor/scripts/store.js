class Store {
  constructor() {
    this.errors = null;
    this.result = null;
    this.mappingfile = "None";
    this.mappingData = null;
    this.downloadFormat = "application/rdf+xml";
  }

  modifyData = (data) => {
    this.errors = data.errors;
    this.result = data.result;
  };
  resetData = () => {
    this.errors = null;
    this.result = null;
    this.mappingfile = "None";
    this.mappingData = null;
    this.downloadFormat = "application/rdf+xml";
  };
  modifyMappingData = (filename, data) => {
    this.mappingfile = filename;
    this.mappingData = data;
  };
  resetMappingData = () => {
    this.mappingfile = "None";
    this.mappingData = null;
  };
  modifyDownloadFormat = (value) => {
    this.downloadFormat = value;
  };
}

let storeData = new Store();

export { storeData };
