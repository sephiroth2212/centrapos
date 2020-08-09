'use strict';

const convict = require('convict');
const json5 = require('json5');
const env = process.env['ENV'] || 'local';
const fs = require('fs');

convict.addParser({ extension: 'json5', parse: json5.parse });

const schema = {
  port: {
    format: 'port',
    default: 8080,
    env: 'PORT',
  },
  logDeveloperInfo: {
    format: Boolean,
    default: false,
    env: 'LOG_DEVELOPER_INFO'
  },
  public: {
    env: {
      format: String,
      default: env,
      env: 'ENV',
    },
    apiBaseUrl: {
      format: String,
      default: null,
      env: 'API_BASE_URL',
    },
    webBaseUrl: {
      format: String,
      default: null,
      env: 'WEB_BASE_URL',
    },
    oauthAuthority: {
      format: String,
      default: null,
      env: 'OAUTH_AUTHORITY',
    },
    oauthClientId: {
      format: String,
      default: null,
      env: 'OAUTH_CLIENT_ID',
    },
    oidcLogLevel: {
      format: String,
      default: 'INFO',
      env: 'OIDC_LOG_LEVEL',
    },
    sentryEnabled: {
      format: Boolean,
      default: false,
      env: 'SENTRY_ENABLED',
    },
    sentryTracesSampleRate: {
      type: Number,
      default: 0,
      env: 'SENTRY_TRACES_SAMPLE_RATE',
    },
    testMerchantId: {
      format: String,
      default: false,
      env: 'TEST_MERCHANT_ID'
    },
    testClientId: {
      format: String,
      default: false,
      env: 'TEST_CLIENT_ID'
    },
    testApiKey: {
      format: String,
      default: false,
      env: 'TEST_API_KEY'
    },
  },
  manifest: {
    name: {
      format: String,
      default: null,
      env: 'MANIFEST_NAME'
    },
    shortName: {
      format: String,
      default: null,
      env: 'MANIFEST_SHORT_NAME'
    }
  }
};

const config = convict(schema);

const configFiles = [
  './config.json5',
  `./config-${env}.json5`
];

configFiles
  .filter(fs.existsSync)
  .forEach(f => config.loadFile(f));

config.validate({ allowed: 'strict' });

module.exports = config;
