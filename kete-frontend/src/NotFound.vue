<template>
  <div class="desktop-gutters pt-20">
    <div class="text-center py-4 px-4">
      <div class="type-headline-2 text-content-primary">
        <b>404</b>
      </div>
      <div class="type-subtitle-1 text-content-tertiary">
        Oops! We can’t find that page.
      </div>
      <button
        class="flex justify-center btn-primary mx-auto my-8"
        @click="goBackHome()"
      >
        Go Back Home
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  methods: {
    goBackHome() {
      window.location.replace('/');
    }
  }
});
</script>

