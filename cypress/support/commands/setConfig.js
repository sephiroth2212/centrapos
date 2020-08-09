Cypress.Commands.add('setConfig', config => {
  Cypress.log({
    name: 'setConfig',
    message: `Config: ${Object.keys(config)[0]}...`,
    consoleProps() {
      return {
        config,
      };
    },
  });
  cy.window({ log: false })
    .then(w => {
      w.localStorage.setItem('config', JSON.stringify(config));
    });
});
