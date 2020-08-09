context('not found page', () => {
  beforeEach(function() {
    cy.resetConfig({
      apiBaseUrl: Cypress.config().baseUrl,
    });
    cy.clearSession();
  });

  it('Unauthenticated user visits not found page', function() {
    cy.visit('/unknown-page');
    cy.contains('404');
    cy.contains('Oops! We can’t find that page.');
    cy.contains('Go Back Home').click();
    cy.location()
      .should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
  });
});
