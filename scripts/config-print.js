#!/usr/bin/env node

'use strict';

function errorExit(e) {
  console.error(e);
  process.exit(1);
}

async function main() {
  const config = require('../kete-server/src/config');
  return config.get(process.argv[2]);
}

main()
  .catch(errorExit)
  .then(x => JSON.stringify(x, null, 2))
  .then(console.log);
