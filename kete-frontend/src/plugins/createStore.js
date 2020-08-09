import Vue from 'vue';
import Vuex from 'vuex';

import app from '@/app/store';
import auth from '@/auth/store';
import profile from '@/profile/store';

Vue.use(Vuex);

function createStore({ config, callApi }) {
  return new Vuex.Store({
    modules: {
      app: app({ config, callApi }),
      auth: auth({ config, callApi }),
      profile: profile(),
    },
  });
}

export default createStore;
