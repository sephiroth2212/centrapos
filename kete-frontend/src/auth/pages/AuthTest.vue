<template>
  <div>
    <h1 class="type-headline-1 pb-4 mb-4 border-b">
      Kete Auth Test
    </h1>

    <div
      v-if="user"
      class="my-8"
    >
      {{ user.email }}
      User Id: {{ user.id }}<br>
      Expires: {{ expiresAtFormatted }}
    </div>

    <div
      v-else
    >
      Not logged in.
    </div>

    <div class="flex flex-grow w-full space-x-1">
      <button
        class="btn-primary mr-4 mb-4"
        @click="login"
      >
        Login
      </button>

      <button
        class="btn-primary mr-4 mb-4"
        @click="logout"
      >
        Logout
      </button>

      <button
        class="btn-primary mr-4 mb-4"
        @click="expire"
      >
        Expire
      </button>

      <button
        class="btn-primary mr-4 mb-4"
        @click="expireSoon"
      >
        Expire Soon
      </button>

      <button
        class="btn-primary mr-4 mb-4"
        @click="refresh"
      >
        Refresh
      </button>

      <button
        class="btn-primary mr-4 mb-4"
        @click="invalidateRefreshToken"
      >
        Invalidate Refresh Token
      </button>

      <button
        class="btn-primary mr-4 mb-4"
        @click="clearStaleState"
      >
        Clear Stale State
      </button>

      <button
        v-if="user"
        class="btn-primary mr-4 mb-4"
        @click="getAccountMemberships"
      >
        Get Account Memberships
      </button>
    </div>

    <div
      v-for="m in accountMemberships"
      :key="m.accountId"
      class="my-8"
    >
      {{ m.role }}<br>
      {{ m.accountId }} ({{ m.accountType }})
    </div>

    <div v-if="user">
      <h2 class="type-headline-2 pb-4 mb-4 border-b">
        OIDC User Atributes
      </h2>

      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="expiresAt"
      >
        expires at
      </label>
      <input
        id="expiresAt"
        v-model="oidcUser.expires_at"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
      >

      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="userAcessToken"
      >
        user access token
      </label>
      <input
        id="userAcessToken"
        v-model="oidcUser.access_token"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
      >

      <button
        class="btn-primary mr-4 mb-4"
        @click="saveAccessToken"
      >
        Save OIDC User
      </button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { mapState } from 'vuex';
import config from '@/config';

const oidcUserKey = `oidc.user:${config.values.oauthAuthority}:${config.values.oauthClientId}`;

function loadOidcUser() {
  return JSON.parse(window.localStorage.getItem(oidcUserKey));
}

function saveOidcUser(oidcUser) {
  window.localStorage.setItem(oidcUserKey, JSON.stringify(oidcUser));
}

export default {

  components: {},

  data() {
    return {
      oidcUser: null,
      accountMemberships: [],
      accountMembershipsLoading: false,
    };
  },

  computed: {
    ... mapState('auth', [ 'user' ]),

    expiresAtFormatted() {
      return new Date(this.user.expiresAt * 1000).toString();
    }
  },

  watch: {
    'user.jwt': function() {
      this.oidcUser = loadOidcUser();
    },
  },

  created() {
    this.oidcUser = loadOidcUser();
  },

  methods: {

    login() {
      this.$store.dispatch('auth/login');
    },

    saveAccessToken() {
      saveOidcUser(this.oidcUser);
    },

    logout() {
      const { route } = this.$router.resolve(window.location.pathname);
      const matchedRoute = route.matched[route.matched.length - 1];
      let redirectUri;
      if (matchedRoute.meta.public) {
        redirectUri = window.location.href;
      }
      this.$store.dispatch('auth/logout', redirectUri);
    },

    refresh() {
      this.$store.dispatch('auth/refresh');
    },

    invalidateRefreshToken() {
      this.modifyStoredUser(user => {
        user.refresh_token = 'invalid';
      });
    },

    expireSoon() {
      const nowInSeconds = Date.now() / 1000;
      this.setExpiresAt(nowInSeconds + 61);
      this.$store.dispatch('auth/loadUser');
    },

    expire() {
      this.setExpiresAt(1);
      this.$store.dispatch('auth/loadUser');
    },

    clearStaleState() {
      this.$store.dispatch('auth/clearStaleState');
    },

    async getAccountMemberships() {
      this.accountMemberships = [];
      this.accountMembershipsLoading = true;
      try {
        const response = await axios({
          method: 'GET',
          url: `${config.values.apiBaseUrl}/api/account-memberships`,
          headers: {
            Authorization: this.user.jwt,
          }
        });
        this.accountMemberships = response.data;
      } finally {
        this.accountMembershipsLoading = false;
      }
    },

    setExpiresAt(expiresAt) {
      this.modifyStoredUser(user => {
        user.expires_at = expiresAt;
      });
    },

    modifyStoredUser(mutator) {
      mutator(this.oidcUser);
      saveOidcUser(this.oidcUser);
    },

  }
};
</script>
