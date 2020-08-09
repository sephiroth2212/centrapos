class SchemaDefaultsProvider {

  constructor(schema) {
    this.schema = schema;
  }

  getValue(name) {
    const schemaProp = this.schema[name];
    return schemaProp && schemaProp.default;
  }

}

export default SchemaDefaultsProvider;
