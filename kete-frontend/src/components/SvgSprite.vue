<template>
  <!-- eslint-disable vue/no-v-html -->
  <svg
    width="0"
    height="0"
    style="display: none;"
    v-html="$options.svgSprite"
  />
  <!-- eslint-enable -->
</template>

<script>
/*
 * https://css-tricks.com/a-font-like-svg-icon-system-for-vue/
 */

const svgContext = require.context(
  '!svg-inline-loader?!@/icons',
  true,
  /\w+\.svg$/
);

const svgRegex = /^\.\/(.*)\.\w+$/;

const symbols = svgContext.keys().map(path => {
  const content = svgContext(path);
  const id = path.replace(svgRegex, '$1');
  return content.replace('<svg', `<symbol id="icon-${id}"`).replace('svg>', 'symbol>');
});

export const icons = new Set(svgContext.keys().map(path => path.replace(svgRegex, '$1')));

export default {
  name: 'SvgSprite',
  svgSprite: symbols.join('\n'),
};
</script>
