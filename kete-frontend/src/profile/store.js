import UserProfile from '@/profile/UserProfile';

function createStore() {
  return {
    namespaced: true,

    state: () => ({
      profile: null,
    }),

    mutations: {
      setProfile(state, profile) {
        state.profile = profile;
      },

      updateProfileAttributes(state, profileAttributes) {
        state.profile.updateAttributes(profileAttributes);
      },
    },

    actions: {
      init({ dispatch }){
        dispatch('loadUserProfile');
      },

      loadUserProfile({ commit, rootState }) {
        if(rootState.auth.user?.idToken) {
          commit('setProfile', UserProfile.fromIdToken(rootState.auth.user.idToken));
        }
        const key = `profile.${rootState.auth.user?.jti}`;
        const sessionProfile = JSON.parse(sessionStorage.getItem(key));
        if(sessionProfile) {
          commit('updateProfileAttributes', sessionProfile);
        }
      },
    },
  };
}

export default createStore;
