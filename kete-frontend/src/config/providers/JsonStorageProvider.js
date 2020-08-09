function tryParseJson(s) {
  try {
    return JSON.parse(s);
  } catch(e) {
    return null;
  }
}

class JsonStorageProvider {

  constructor({ key, storage }) {
    this.storage = storage;
    this.configs = tryParseJson(storage.getItem(key)) || {};
    this.key = key;
  }

  getValue(name) {
    return this.configs[name];
  }

  saveValue(name, value){
    if (typeof value == 'undefined' || value === '') {
      delete this.configs[name];
    } else {
      this.configs[name] = value;
    }
    this.storage.setItem(this.key, JSON.stringify(this.configs));
  }

}

export default JsonStorageProvider;
