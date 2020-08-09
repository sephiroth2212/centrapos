describe('Dashboard', function() {
  beforeEach(function () {
    cy.resetConfig({
      apiBaseUrl: Cypress.config().baseUrl,
    });
    cy.clearSession();
    stub.force404();
  });

  it('can visit config screen without logging in', () => {
    cy.visit('/config');
    cy.url().should('eq', `${Cypress.config().baseUrl}/config`);
    cy.contains('Config');
  });

  it('Can restore configs to default', function() {
    cy.updateConfig({ sentryEnabled: true });

    cy.visit('/config');
    cy.get('#sentryEnabled').contains('Use Default').should('be.visible');

    cy.contains('Restore Defaults').click();
    cy.get('#sentryEnabled').contains('Use Default').should('not.be.visible');
  });
});
