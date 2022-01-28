class Store {
  constructor() {
    this.errors = null;
    this.result = null;
    this.mappingData = null;
  }

  modifyData = (data) => {
    this.errors = data.errors;
    this.result = data.result;
  };
  resetData = () => {
    this.errors = null;
    this.result = null;
    this.mappingData = null;
  };
  uploadMappingData = (data) => {
    this.mappingData = data;
  };
}

let storeData = new Store();

export { storeData };
