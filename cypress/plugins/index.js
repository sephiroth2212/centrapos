// this is to prevent chrome running out of memory in bitbucket pipelines
// https://docs.cypress.io/guides/guides/continuous-integration.html#In-Docker
module.exports = (on, cypressConfig) => {
  require('cypress-terminal-report/src/installLogsPrinter')(on, {
    printLogsToConsole: 'always',
  });

  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--disable-dev-shm-usage');
    }
    return launchOptions;
  });

  const config = require('./config').load(cypressConfig);
  return {
    authBaseUrl: config.get('authBaseUrl'),
    env: {
      ...config.getProperties(),
      /* Mailosaur Cypress package requires `Cypress.env('MAILOSAUR_API_KEY')` to be defined. */
      MAILOSAUR_API_KEY: config.get('mailosaurApiKey'),
    }
  };
};
