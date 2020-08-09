'use strict';

import ConfigBuilder from './ConfigBuilder';
import ObjectProvider from './providers/ObjectProvider';
import JsonStorageProvider from './providers/JsonStorageProvider';

const schema = {
  apiBaseUrl: { type: 'string' },
  debugEnabled: { type: 'boolean', default: false },
  env: { type: 'string' },
  oauthAuthority: { type: 'string' },
  oauthClientId: { type: 'string' },
  oidcLogLevel: { type: 'string', default: 'INFO' },
  sentryEnabled: { type: 'boolean', default: false },
  sentryTracesSampleRate: { type: 'number', default: 0, min: 0, max: 1, step: 0.01 },
  testApiKey: { type: 'string' },
  testClientId: { type: 'string' },
  webBaseUrl: { type: 'string' },
};

const builder = new ConfigBuilder(schema)
  .addLayer({ name: 'window', provider: new ObjectProvider(window.config) })
  .addLayer({ name: 'storage', provider: new JsonStorageProvider({ key: 'config.kete', storage: window.localStorage }) });

export default {
  values: builder.build(),
  builder,
};
