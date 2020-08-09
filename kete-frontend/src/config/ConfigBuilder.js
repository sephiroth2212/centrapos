'use strict';

import SchemaDefaultsProvider from './providers/SchemaDefaultsProvider';

function makeProp(name, layers) {
  const value = layers
    .map(l => l.provider.getValue(name))
    .find(v => v !== null && typeof v !== 'undefined');
  return {
    name,
    value,
  };
}

class ConfigBuilder {

  constructor(schema) {
    this.schema = schema;
    const defaultLayer = { name: 'default', provider: new SchemaDefaultsProvider(schema) };
    this.layers = [defaultLayer];
  }

  addLayer(layer) {
    this.layers.unshift(layer);
    return this;
  }

  build() {
    const config = {};
    const props = Object.keys(this.schema).map(name => makeProp(name, this.layers));
    props.forEach(p => config[p.name] = p.value);
    return config;
  }

}

export default ConfigBuilder;
