import Vue from 'vue';
import Vuex from 'vuex';

import app from '@/app/store';

Vue.use(Vuex);

function createStore({ config, callApi }) {
  return new Vuex.Store({
    modules: {
      app: app({ config, callApi }),
    },
  });
}

export default createStore;
