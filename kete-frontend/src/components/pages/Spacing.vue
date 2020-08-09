<template>
  <div>
    <h1 class="type-headline-1 pb-4 mb-4 border-b">
      Spacing
    </h1>

    <p class="type-body-2 mb-6">
      Centrapay Lunar spacing is based on the Tailwind default spacing
      configuration which provides a proportional 4-pixel scale from 0.5
      through to 96. The spacing values can be applied with any of the standard
      tailwinds sizing utilities such as "w-", "h-", "p-", "m-", "space-y-"
      etc.
    </p>

    <p class="type-body-2 mb-6">
      Lunar also adds utilities for squish and stretch padding for a subset of
      the spacing sizes.
    </p>

    <p class="type-body-2 mb-6">
      See also <a href="https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale">Tailwind default spacing scale</a>.
    </p>

    <h2 class="type-headline-2 pb-4 mb-4 border-b">
      Space between y (stack)
    </h2>

    <component-example
      v-for="example in stackExamples"
      :key="example.description"
      :code="example.code"
      :description="example.description"
    />

    <h2 class="type-headline-2 pb-4 mb-4 border-b">
      Space between x (inline)
    </h2>

    <component-example
      v-for="example in inlineExamples"
      :key="example.description"
      :code="example.code"
      :description="example.description"
    />

    <h2 class="type-headline-2 pb-4 mb-4 border-b">
      Inset
    </h2>

    <component-example
      v-for="example in insetExamples"
      :key="example.description"
      :code="example.code"
      :description="example.description"
    />

    <h2 class="type-headline-2 pb-4 mb-4 border-b">
      Inset squish
    </h2>

    <component-example
      v-for="example in insetSquishExamples"
      :key="example.description"
      :code="example.code"
      :description="example.description"
    />

    <h2 class="type-headline-2 pb-4 mb-4 border-b">
      Inset stretch
    </h2>

    <component-example
      v-for="example in insetStretchExamples"
      :key="example.description"
      :code="example.code"
      :description="example.description"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import ComponentExample from './ComponentExample';

function spacingExampleCode(classname) {
  return `
    <div class="${classname} bg-blue-100">
      <div class="bg-gray-50">Hello</div>
    </div>
  `;
}

function kebabToSentence(s) {
  return s.split('-').join(' ').replace(/^./, a => a.toUpperCase());
}

function makeStackExample(classname) {
  return {
    description: kebabToSentence(classname),
    code: `
      <div class="${classname} bg-blue-100">
        <div class="bg-gray-50">1</div>
        <div class="bg-gray-50">2</div>
        <div class="bg-gray-50">3</div>
      </div>
    `,
  };
}

function makeInlineExample(classname) {
  return {
    description: kebabToSentence(classname),
    code: `
      <div class="${classname} bg-blue-100">
        <b class="bg-gray-50">1</b>
        <b class="bg-gray-50">2</b>
        <b class="bg-gray-50">3</b>
      </div>
    `,
  };
}

function makeInsetExample(classname) {
  return {
    description: `Padding inset ${kebabToSentence(classname.replace(/p-/, '')).toLowerCase()}`,
    code: spacingExampleCode(classname),
  };
}

const stackExamples = [
  'space-y-1',
  'space-y-2',
  'space-y-4',
  'space-y-8',
  'space-y-16',
];

const inlineExamples = [
  'space-x-1',
  'space-x-2',
  'space-x-4',
  'space-x-8',
  'space-x-16',
];

const insetExamples = [
  'p-1',
  'p-2',
  'p-4',
  'p-8',
  'p-16',
  'p-32',
];

const squishClasses = [
  'p-squish-1',
  'p-squish-2',
  'p-squish-4',
  'p-squish-8',
  'p-squish-16',
];

const stretchClasses = [
  'p-stretch-2',
  'p-stretch-4',
  'p-stretch-8',
  'p-stretch-16',
  'p-stretch-32',
];

export default Vue.extend({

  components: {
    ComponentExample,
  },

  data() {
    return {
      stackExamples: stackExamples.map(makeStackExample),
      inlineExamples: inlineExamples.map(makeInlineExample),
      insetExamples: insetExamples.map(makeInsetExample),
      insetSquishExamples: squishClasses.map(makeInsetExample),
      insetStretchExamples: stretchClasses.map(makeInsetExample),
    };
  },

});
</script>
