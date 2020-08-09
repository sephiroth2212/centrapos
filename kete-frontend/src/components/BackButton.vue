<template>
  <span
    data-cy="back-button"
    class="icon-button"
    @click="clickHandler()"
  >
    <icon
      class="icon icon-lg text-content-primary"
      name="arrow-back-outline"
    />
    <span v-if="debug">
      {{ backPath }}
    </span>
  </span>
</template>

<script>
import config from '@/config';
export default {

  props: {
    target: { type: String, default: null, required: false }
  },

  computed: {
    debug() {
      return config.values.debugEnabled;
    },
    backPath() {
      return this.$route.meta?.back || '/';
    },
  },

  methods: {
    clickHandler() {
      this.target ? window.location.href = this.target : this.$router.push(this.backPath);
    }
  }

};
</script>
