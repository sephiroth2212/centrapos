<template>
  <div>
    <h1 class="type-headline-1 pb-4 mb-4 border-b">
      Centrapay UI components
    </h1>

    <p class="type-body-2 mb-6">
      <ul>
        <li
          v-for="component in components"
          :key="component.name"
        >
          <router-link :to="`/components/${component.name}`">
            {{ component.title }}
          </router-link>
        </li>
      </ul>
    </p>

    <h1 class="type-headline-1 pb-4 mb-4 border-b">
      Other Pages
    </h1>

    <p class="type-body-2 mb-6">
      <ul>
        <li>
          <router-link to="/404">
            404 Page
          </router-link>
        </li>
      </ul>
    </p>
  </div>
</template>

<script>
import Vue from 'vue';
import components from '../componentExamplePages';

export default Vue.extend({

  data() {
    return { components };
  },

});
</script>
