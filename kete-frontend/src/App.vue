<template>
  <div
    id="app"
    class="h-full"
  >
    <main>
      <router-view />
    </main>
    <svg-sprite />
  </div>
</template>

<script>

import Vue from 'vue';
import { mapState } from 'vuex';
import SvgSprite from '@/components/SvgSprite';
import Icon from '@/components/Icon';
import BackButton from '@/components/BackButton';

Vue.component('Icon', Icon);
Vue.component('BackButton', BackButton);

export default Vue.extend({
  components: {
    SvgSprite,
  },

  computed: {
    ... mapState('app', ['appInitError', 'appReady']),
    ... mapState('auth', [ 'user' ]),
  },

  watch: {
    user: function() {
      this.$store.dispatch('profile/loadUserProfile');
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
  }
});
</script>

<style>
  body, html, main {
    height: 100%;
  }
</style>
