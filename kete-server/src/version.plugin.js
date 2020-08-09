'use strict';

const version = require('./version');

async function getVersion(req, h) {
  return h.response(version).type('application/json').code(200);
}

function register(server) {
  server.route({
    method: 'GET',
    path: '/version',
    options: {
      auth: false
    },
    handler: getVersion
  });
  server.route({
    method: 'GET',
    path: '/kete/version',
    options: {
      auth: false
    },
    handler: getVersion
  });
}

module.exports = {
  name: 'kete-version',
  register,
};
