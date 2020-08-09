<template>
  <div class="py-4">
    <h4 class="type-headline-4 mb-4">
      {{ description }}
    </h4>
    <p class="type-body-2 mb-6">
      <pre class="overflow-x-scroll">{{ formattedCode }}</pre>
    </p>
    <div class="px-4">
      <slot v-if="$slots.default" />
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-else
        v-html="code"
      />
      <!-- eslint-enable -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { dedent } from '../componentExampleUtils';

export default Vue.extend({

  props: {
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },

  computed: {

    formattedCode() {
      return dedent(this.code);
    }

  },

});
</script>
