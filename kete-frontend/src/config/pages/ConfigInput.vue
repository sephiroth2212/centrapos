<template>
  <div :id="name">
    <div
      v-if="config.type === 'boolean'"
      class="toggle toggle-simple"
    >
      <input
        :id="`${name}-toggle`"
        v-model="value"
        type="checkbox"
      >
      <label :for="`${name}-toggle`">
        <span class="type-subtitle-1 text-content-secondary">{{ camelToTitleCase(name) }}</span>
        <span class="slider" />
      </label>
    </div>

    <div
      v-if="config.type === 'string'"
      class="pt-6"
    >
      <label>
        <span class="type-subtitle-1 text-content-secondary">{{ camelToTitleCase(name) }}</span>
        <input
          v-model="value"
          class="input-full-width"
          type="text"
          :class="{'text-content-accent': showReset}"
        >
      </label>
    </div>

    <div
      v-if="config.type === 'number'"
      class="pt-4"
    >
      <label class="space-y-2">
        <span class="type-subtitle-1 text-content-secondary">{{ camelToTitleCase(name) }}</span>
        <input
          v-model="value"
          class="input-full-width pr-12"
          :class="{'text-content-accent': showReset}"
          type="number"
          :min="config.min"
          :max="config.max"
        >
        <div
          :class="{'hide': !showReset}"
          class="absolute inset-y-0 right-0 pr-3 flex items-center z-1 cursor-pointer pt-3"
        >
          <icon
            name="refresh"
            class="icon icon-lg text-content-accent"
            @click="restoreDefault"
          />
        </div>
      </label>
      <span
        class="type-caption-2 text-content-tertiary"
      >
        {{ `min: ${config.min}, max: ${config.max}` }}
      </span>
    </div>

    <span
      class="text-content-accent type-caption-2 cursor-pointer underline"
      :class="{'hide': !showReset}"
      @click="restoreDefault"
    >
      Use Default
    </span>
  </div>
</template>

<script>

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    layer: {
      type: Object,
      required: true,
    },
    values: {
      type: Object,
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      value: this.values[this.name],
      showReset: (this.layer.provider.getValue(this.name) != undefined),
    };
  },

  watch: {
    value: function() {
      this.layer.provider.saveValue(
        this.name,
        this.value,
      );
      this.$emit('update-config');
      this.showReset = true;
    },
  },

  methods: {
    async restoreDefault() {
      this.layer.provider.saveValue(this.name, undefined);
      this.$emit('update-config');
      await this.$nextTick();
      const defaultValue = this.values[this.name];
      this.value = defaultValue;
      await this.$nextTick();
      this.layer.provider.saveValue(this.name, undefined);
      this.showReset = false;
    },

    camelToTitleCase(string) {
      const sentenceCase = string.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1');
      return sentenceCase.charAt(0).toUpperCase() + sentenceCase.slice(1);
    }
  }

};
</script>
<style scoped>
  .hide {
      visibility: hidden !important;
  }
</style>
