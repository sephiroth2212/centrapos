<template>
  <div class="border-t-1 relative">
    <input
      :id="`accordion-${_uid}`"
      type="checkbox"
      class="absolute opacity-0 h-0 w-0"
      @change.prevent="$emit('change', !active)"
    >
    <label
      class="m-0 flex p-4 cursor-pointer hover:bg-interactive-tertiary-hover justify-between items-center"
      :class="{
        'rounded-3xl': rounded && !active,
        'rounded-t-3xl': rounded && active
      }"
      :for="`accordion-${_uid}`"
    >
      <slot name="header" />
      <icon
        :name="active ? 'chevron-up' : 'chevron-down'"
        class="icon-lg"
      />
    </label>
    <div
      ref="content"
      :aria-hidden="!active"
      class="px-4 overflow-hidden max-h-0"
      :class="{
        'max-h-full': active,
      }"
    >
      <slot name="content" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    active: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
  },
};
</script>
