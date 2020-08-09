const colors = require('./src/styles/colors');

const tailwindConfig = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
  ],
  theme: {
    fontFamily: {
      'sans': [ 'Inter', 'Sans-Serif' ],
    },
    extend: {
      colors: colors.light,
    },
  },
  plugins: [
    require('./src/styles/plugins/typography'),
    require('./src/styles/plugins/spacing'),
    require('@tailwindcss/forms')
  ],
};

module.exports = tailwindConfig;
