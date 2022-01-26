class Store {
  constructor() {
    this.errors = null;
    this.result = null;
  }

  modifyData = (data) => {
    this.errors = data.errors;
    this.result = data.result;
  };
  resetData = () => {
    this.errors = null;
    this.result = null;
  };
}

let storeData = new Store();

export { storeData };
