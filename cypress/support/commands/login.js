const authBaseUrl = Cypress.env('authBaseUrl');
const oauthClientId = Cypress.env('oauthClientId');

Cypress.Commands.add('login', oidcUser => {
  const storageKey = `oidc.user:${authBaseUrl}/:${oauthClientId}`;

  Cypress.log({
    name: 'login',
    message: `User: ${oidcUser.profile.email || oidcUser.profile.username}`,
    consoleProps() {
      return {
        storageKey,
        oidcUser,
      };
    },
  });
  cy.window({ log: false })
    .then(w => {
      w.localStorage.setItem(storageKey, JSON.stringify(oidcUser));
    });
});
