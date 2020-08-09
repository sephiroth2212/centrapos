'use strict';

const config = require('./config');
const version = require('./version');

function template () {
  return `
<script>
  window.version = ${JSON.stringify(version)};
  window.config = ${JSON.stringify(config.get('public'))};
</script>`;
}

module.exports = template;
