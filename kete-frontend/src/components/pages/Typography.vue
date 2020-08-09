<template>
  <div>
    <h1 class="type-headline-1 pb-4 mb-4 border-b">
      Typography
    </h1>

    <div class="list">
      <component-example
        v-for="example in examples"
        :key="example.description"
        :code="example.code"
        :description="example.description"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ComponentExample from './ComponentExample';

function kebabToSentence(s) {
  return s.split('-').join(' ').replace(/^./, a => a.toUpperCase());
}

function makeTypographyExamples(classname) {
  return [
    makeTypographyExample(classname),
    makeBoldTypographyExample(classname),
  ];
}

function makeTypographyExample(classname) {
  return {
    description: kebabToSentence(classname),
    code: `<span class="${classname}">${kebabToSentence(classname)}</span>`,
  };
}

function makeBoldTypographyExample(classname) {
  return {
    description: `${kebabToSentence(classname)} Bold`,
    code: `<span class="${classname}"><b>${kebabToSentence(classname)} Bold</b></span>`,
  };
}

const typographyClasses = [
  'type-display',
  'type-headline-1',
  'type-headline-2',
  'type-headline-3',
  'type-headline-4',
  'type-body-1',
  'type-body-2',
  'type-body-3',
  'type-subtitle-1',
  'type-subtitle-2',
  'type-caption-1',
  'type-caption-2',
  'type-overline',
];

export default Vue.extend({

  components: {
    ComponentExample,
  },

  data() {
    return {
      examples: [].concat(...typographyClasses.map(makeTypographyExamples)),
    };
  },

});
</script>
