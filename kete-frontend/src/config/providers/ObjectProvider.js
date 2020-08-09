class ObjectProvider {

  constructor(object) {
    this.values = object;
  }

  getValue(name) {
    return this.values[name];
  }

}

export default ObjectProvider;
