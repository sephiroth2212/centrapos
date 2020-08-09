import createOidcUserManager from './createOidcUserManager';
import User from './User';
import * as Sentry from '@sentry/browser';

function createStore({ config }) {
  return {
    namespaced: true,

    state: () => ({
      user: null,
      userManager: null,
    }),

    getters: {
      jwt(state) {
        return state.user.jwt;
      },

      userValid(state) {
        return state.user && !state.user.expired;
      },
    },

    mutations: {

      setUser (state, user) {
        state.user = user;
        Sentry.setUser({ id: user?.id, username: user?.username});
      },

      setUserManager(state, userManager) {
        state.userManager = userManager;
      },
    },

    actions: {

      async init({ dispatch, commit, state }) {
        commit('setUserManager', createOidcUserManager({
          oauthAuthority: config.values.oauthAuthority,
          oauthClientId: config.values.oauthClientId,
          oidcLogLevel: config.values.oidcLogLevel,
        }));
        /* Event emitted when auto renew succeeded */
        state.userManager.events.addUserLoaded((user) => {
          if (user) {
            commit('setUser', User.fromOidcUser(user));
          }
        });
        if (/\/logout\/oidc-callback$/.test(window.location.pathname)) {
          await dispatch('handleLogoutOidcCallback');
        } else if (/\/oidc-callback$/.test(window.location.pathname)) {
          await dispatch('handleOidcCallback');
        } else {
          await dispatch('loadUser');
        }
      },

      async handleOidcCallback({ state }) {
        const result = await state.userManager.signinRedirectCallback().catch((err) => {
          Sentry.captureException(err);
          return {};
        });
        window.location.replace(result.state || '/');
      },

      async loadUser({ commit, state }) {
        const user = await state.userManager.getUser();
        if (!user) {
          return;
        }
        commit('setUser', User.fromOidcUser(user));
      },

      async ensureAuthenticated({ state, dispatch }) {
        if (!state.user) {
          /* New session */
          await dispatch('login');
        } else if (state.user.expired) {
          /* Stale session */
          await dispatch('refresh');
        } else {
          /* Active session */
        }
        return state.user && !state.user.expired;
      },

      async refresh({ dispatch, state }) {
        try {
          await state.userManager.signinSilent();
          await state.userManager.signinSilentCallback();
          await dispatch('loadUser');
        } catch(e) {
          await dispatch('login');
        }
      },

      async login({ state }) {
        state.userManager.stopSilentRenew();
        state.userManager.clearStaleState();
        await state.userManager.signinRedirect({ state: window.location.href });
      },

      async handleLogoutOidcCallback({ state }) {
        const result = await state.userManager.signoutRedirectCallback().catch((err) => {
          Sentry.captureException(err);
          return {};
        });
        window.location.replace(result.state || '/');
      },

      async logout({ commit, state }, redirectUri) {
        commit('setUser', null);
        await state.userManager.signoutRedirect({ state: redirectUri });
      },

      clearStaleState({ state }) {
        state.userManager.clearStaleState();
      },

    },
  };
}

export default createStore;
