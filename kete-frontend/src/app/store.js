import * as Sentry from '@sentry/browser';

function createStore({ callApi }) {
  return {
    namespaced: true,

    state: () => ({
      appInitError: null,
      appReady: false,
      accountMemberships: null,
      individualAccountId: null,
    }),


    getters: {
      activeAccountId(state){
        const accountId = state.individualAccountId;
        Sentry.setExtra('accountId', accountId);
        return accountId;
      },

      activeAccountType(state, getters){
        return state.accountMemberships?.find(m => getters.activeAccountId === m.accountId)?.accountType;
      }
    },

    mutations: {

      setAppInitError(state, error) {
        state.appInitError = error;
      },

      setAppReady(state, ready) {
        state.appReady = ready;
      },

      setAccountMemberships(state, accountMemberships) {
        state.accountMemberships = accountMemberships;
      },

      setIndividualAccountId(state, accountId) {
        state.individualAccountId = accountId;
      },

    },

    actions: {

      async init({ dispatch, commit }, { router }) {
        const { route } = router.resolve(window.location.pathname);
        const matchedRoute = route.matched[route.matched.length - 1];
        await dispatch('auth/init', null, { root: true });
        await dispatch('profile/init', null, { root: true });

        if (!matchedRoute.meta.public) {
          const authenticated = await dispatch('auth/ensureAuthenticated', null, { root: true });
          if (!authenticated) {
            return;
          }
          await dispatch('getAccountMemberships');
        }
        commit('setAppReady', true);
      },

      async getAccountMemberships({ commit, state, rootState }) {
        if (state.accountMemberships === null) {
          return await callApi({
            operation: 'getAccountMemberships',
            args: {
              jwt: rootState.auth.user.jwt
            },
            onSuccess: async (response) =>  {
              const individualAccount = response.data.find(a => a.accountType == 'individual');
              commit('setAccountMemberships', response.data);
              commit('setIndividualAccountId',  individualAccount.accountId);
              commit('setAppInitError', null);
            },
            onError: () => commit('setAppInitError', 'getAccountMembershipsFailure')
          });
        }
      },
    },
  };
}

export default createStore;
