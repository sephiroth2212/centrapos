const convict = require('convict');
const json5 = require('json5');
const path = require('path');

convict.addParser({ extension: 'json5', parse: json5.parse });

function load(cypressConfig) {
  const env = cypressConfig.env.env || 'local';
  const schema = {
    env: {
      format: String,
      default: env,
      env: 'ENV',
    },
    authBaseUrl: {
      format: String,
      default: 'https://auth.cp42.click',
      env: 'BASE_URL',
    },
    appBaseUrl: {
      format: String,
      default: 'http://localhost:7780',
      env: 'ENV',
    },
    apiBaseUrl: {
      format: String,
      default: 'http://kete.cp42.click',
      env: 'ENV',
    },
    oauthClientId: {
      format: String,
      default: '60th2oe9brf0hgmtqdumr1qb6f',
      env: 'ENV',
    },
    testApiKey: {
      format: String,
      default: 'axtXGv96qFhx2r2gMzJm9vwa3fegbyXcU4xtD7bx7',
      env: 'ENV',
    },
    testClientId: {
      format: String,
      default: '60e39c36dd69b20006b60310',
      env: 'ENV',
    },
    mailosaurServerId: {
      format: String,
      default: 'oldptxj6',
      env: 'MAILOSAUR_SERVER_ID',
    },
    mailosaurApiKey: {
      format: String,
      default: null,
      env: 'MAILOSAUR_API_KEY',
    },
    emailPrefix: {
      format: String,
      default: 'local',
      env: 'EMAIL_PREFIX',
    },
  };
  return convict(schema)
    .loadFile(path.resolve(__dirname, '..', `cypress-config-${env}.json5`))
    .validate({ allowed: 'strict' });
}

module.exports = {
  load
};
