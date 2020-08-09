<template>
  <div>
    <h1 class="type-headline-1 pb-4 mb-4 border-b">
      Colors
    </h1>

    <div
      v-for="color in lightColors"
      :key="color.token"
      class="list-item md:w-96"
    >
      <span :class="`bg-${color.token} w-6 h-6 inline-block shadow-md rounded-sm`" />
      <span class="list-item-content">{{ color.token }}</span>
      <span>{{ color.value }}</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import colors from '../../styles/colors';

export default Vue.extend({

  data() {
    return {
      colors,
    };
  },

  computed: {

    lightColors() {
      return Object.entries(this.colors.light).map(([k, v]) => {
        return {
          token: k,
          value: v,
        };
      });
    }
  },

});
</script>
