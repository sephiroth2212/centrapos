import Vue from 'vue';

import App from './App';
import router from './plugins/router';
import store from './plugins/store';
import sentryInit from './plugins/sentryInit';

import '@/styles/index.css';

sentryInit(router);

Vue.config.productionTip = false;

async function main() {
  await store.dispatch('app/init', { router });
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
  });
}

main();
