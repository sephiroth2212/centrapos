<template>
  <child-page-layout>
    <template #header>
      <div class="type-headline-2 text-content-primary">
        <b>Config</b>
      </div>
    </template>
    <template #content>
      <div>
        <div class="flex items-center justify-center flex-col p-4 pt-6 space-y-4">
          <button
            class="btn-secondary btn-full-width"
            @click="restoreDefaults"
          >
            Restore Defaults
          </button>
        </div>
        <div class="p-4">
          <accordion-item
            v-for="item in accordionItems"
            :key="item.title"
            class="border-t"
            :active="isAccordionActive(item.title)"
            @change="setAccordionActive(item.title)"
          >
            <template #header>
              <h2 class="type-headline-3 text-content-primary m-0 p-0 border-none">
                {{ item.title }}
              </h2>
            </template>
            <template #content>
              <div class="pb-4">
                <div
                  v-for="configName in item.content"
                  :key="configName"
                >
                  <config-input
                    :config="schema[configName]"
                    :name="configName"
                    :layer="storageLayer"
                    :values="values"
                    @update-config="refreshConfigValues"
                  />
                </div>
              </div>
            </template>
          </accordion-item>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="pb-4 px-4">
        <button
          class="btn-primary btn-full-width"
          @click="applyConfigs"
        >
          Apply Changes
        </button>
      </div>
    </template>
  </child-page-layout>
</template>


<script>
import config from '../index';
import ConfigInput from './ConfigInput.vue';
import ChildPageLayout from '@/components/ChildPageLayout';
import AccordionItem from '../../components/AccordionItem.vue';

export default {
  components: {
    ConfigInput,
    ChildPageLayout,
    AccordionItem
  },

  data() {
    return {
      schema: config.builder.schema,
      storageLayer: config.builder.layers[0],
      values: config.builder.build(),
      activeAccordionTitle: undefined,
    };
  },

  computed: {
    featureConfigNames() {
      return Object.keys(this.schema).filter(k => this.schema[k].group == 'features');
    },
    advancedConfigNames() {
      return Object.keys(this.schema).filter(k => this.schema[k].group != 'features');
    },
    accordionItems() {
      return [
        {
          title: 'Features',
          content: this.sortByType(this.featureConfigNames),
        },
        {
          title: 'Advanced',
          content: this.sortByType(this.advancedConfigNames),
        }
      ].filter(item => item.content.length);
    },
  },

  created() {
    this.setAccordionActive(this.accordionItems[0].title);
  },

  destroyed() {
    this.$router.go();
  },

  methods: {
    restoreDefaults() {
      window.localStorage.removeItem('config.kete');
      this.$router.go();
    },

    refreshConfigValues() {
      this.values = config.builder.build();
    },

    applyConfigs() {
      this.$router.push('/');
    },

    sortByType(configNames) {
      return [
        ...configNames.filter(n => this.schema[n].type == 'boolean').sort(),
        ...configNames.filter(n => this.schema[n].type == 'number').sort(),
        ...configNames.filter(n => this.schema[n].type == 'string').sort(),
      ];
    },

    isAccordionActive(title) {
      return title == this.activeAccordionTitle;
    },

    setAccordionActive(title) {
      if (this.activeAccordionTitle != title) {
        this.activeAccordionTitle = title;
      } else {
        this.activeAccordionTitle = undefined;
      }
    },
  },
};
</script>
