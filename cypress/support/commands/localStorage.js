Cypress.Commands.add('setLocalStorage', (key, value) => {
  Cypress.log({
    name: 'setLocalStorage',
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
      w.localStorage.setItem(key, value);
    });
});

// Reset feature flags to empty or initial values
Cypress.Commands.add('resetConfig', (initValues = {}) => {
  cy.window.configValues = initValues;
  cy.setLocalStorage('config.kete', JSON.stringify(initValues));
});

// Modify feature flags with new values
Cypress.Commands.add('updateConfig', (newValues) => {
  const currentValues = cy.window.configValues;
  if(!currentValues) {
    throw 'Please call resetConfig before updateConfig';
  }
  const updatedValues = { ...currentValues, ...newValues };
  cy.window.configValues = updatedValues;
  cy.setLocalStorage('config.kete', JSON.stringify(updatedValues));
});
