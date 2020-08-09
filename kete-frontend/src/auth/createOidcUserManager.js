import Oidc from 'oidc-client';

const userStore =  new Oidc.WebStorageStateStore({ store: window.localStorage });

const getExtraQueryParams = () => {
  const extraParams = {};
  const signup = window.location.pathname === '/signup';
  const u = (new URLSearchParams(window.location.search)).get('u');
  signup && (extraParams.signup = '1');
  signup && u && (extraParams.u = u);
  return extraParams;
};

function createOidcUserManager({ oauthAuthority, oauthClientId, oidcLogLevel }) {
  Oidc.Log.logger = console;
  Oidc.Log.level = Oidc.Log[oidcLogLevel];
  return new Oidc.UserManager({
    authority: oauthAuthority,
    client_id: oauthClientId,
    redirect_uri: window.location.origin + '/oidc-callback',
    response_type: 'code',
    userStore,
    scope: 'openid',
    automaticSilentRenew: true,
    loadUserInfo: false,
    monitorSession: false, //double triggering of session events if this is true (default)
    post_logout_redirect_uri: window.location.origin + '/logout/oidc-callback',
    extraQueryParams: getExtraQueryParams(),
    metadata: {
      end_session_endpoint: `${oauthAuthority}logout`
    }
  });
}

export default createOidcUserManager;
