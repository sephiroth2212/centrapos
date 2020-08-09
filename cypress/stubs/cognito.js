const appBaseUrl = Cypress.config().baseUrl;

function oauthAuthority() {
  return Cypress.config().oauthAuthority || 'https://auth.cp42.click/';
}

module.exports = {

  wellKnown() {
    return cy.intercept('GET', `${oauthAuthority()}.well-known/openid-configuration`, {
      statusCode: 200,
      body: {
        authorization_endpoint: `${oauthAuthority()}oauth2/authorize`,
        id_token_signing_alg_values_supported: [ 'RS256' ],
        issuer: 'https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_j84Vno2cO',
        jwks_uri: 'https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_j84Vno2cO/.well-known/jwks.json',
        response_types_supported: [
          'code',
          'token',
        ],
        scopes_supported: [
          'openid',
          'email',
          'phone',
          'profile',
        ],
        subject_types_supported: [ 'public', ],
        token_endpoint: `${oauthAuthority()}oauth2/token`,
        token_endpoint_auth_methods_supported: [
          'client_secret_basic',
          'client_secret_post'
        ],
        userinfo_endpoint: `${oauthAuthority()}oauth2/userInfo`,
      },
    });
  },

  token(oidcUser){
    return cy.intercept('POST', `${oauthAuthority()}oauth2/token`, {
      statusCode: 200,
      body: {
        access_token: oidcUser.access_token,
        expires_in: 3600,
        id_token: oidcUser.id_token,
        token_type: 'Bearer'
      },
    });
  },

  authorizeNoRedirect() {
    return cy.intercept('GET', `${oauthAuthority()}oauth2/authorize?*`, {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: 'OK'
    });
  },

  authorize() {
    return cy.intercept('GET', `${oauthAuthority()}oauth2/authorize?*`, req => {
      req.redirect(`${appBaseUrl}/io/login`);
    });
  },
};
