'use strict';

const fs = require('fs').promises;
const template = require('./script.html.template.js');

async function getIndex(req, h) {
  const rawFile = await fs.readFile(`${__dirname}/../static/index.html`, 'utf-8');
  const split = rawFile.split('<head>');
  const indexHtml = `${split[0]}<head>${template()}${split[1]}`;

  return h.response(indexHtml).type('text/html').code(200);
}

function register(hapiServer) {
  hapiServer.route({
    method: 'GET',
    path: '/{path*}',
    options: {
      auth: false
    },
    handler: getIndex,
  });
}

module.exports = {
  name: 'kete-index',
  register,
};
