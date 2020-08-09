<template>
  <svg class="icon fill-current">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script>
import * as Sentry from '@sentry/browser';
import { icons } from '@/components/SvgSprite';

export default {
  name: 'Icon',
  props: {
    name: { type: String, required: true },
  },
  created() {
    if (!icons.has(this.name)) {
      Sentry.captureException(new Error(`${this.name} icon does not exist`));
    }
  },
};
</script>
