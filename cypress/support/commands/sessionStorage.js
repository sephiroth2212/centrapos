Cypress.Commands.add('setSessionStorage', (key, value) => {
  Cypress.log({
    name: 'setSessionStorage',
    message: `${key}: ${value}`,
    consoleProps() {
      return {
        key,
        value
      };
    },
  });
  cy.window({ log: false })
    .then(w => {
      w.sessionStorage.setItem(key, value);
    });
});

Cypress.Commands.add('clearSession', () => {
  cy.window({ log: false })
    .then(w => {
      w.sessionStorage.clear();
    });
});
