const notFoundJson = {
  statusCode: 404,
  body: {
    status: '404',
    message: 'Cypress forced 404',
  },
  headers: {
    'Content-Type': 'application/json',
  },
};

// Use this function at the end of your stub declarations to close off any unwanted HTTP traffic
// If you don't do this, then our test suite gets slower by reaching out to the interwebs
module.exports = function force404() {
  cy.intercept(`${Cypress.config().baseUrl}/api/**`, notFoundJson);
  cy.intercept(`${Cypress.config().baseUrl}/payments/api/**`, notFoundJson);
  cy.intercept('https://kete.cp42.click/**', notFoundJson);
  cy.intercept('https://auth.cp42.click/**', notFoundJson);
};
