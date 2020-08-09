'use strict';

const Hapi = require('@hapi/hapi');
const path = require('path');
const config = require('./config');

// eslint-disable-next-line no-console
console.log(JSON.stringify({ msg: 'Server starting', config: JSON.parse(config.toString()) }));

const start = async () => {

  const server = Hapi.server({
    port: config.get('port')
  });

  await server.register(require('@hapi/inert'));
  await server.register(require('@hapi/vision'));
  await server.register(require('./index.plugin'));
  await server.register(require('./version.plugin'));
  await server.register(require('./security.plugin'));

  server.route({
    method: 'GET',
    path: '/kete/manifest/{any*}',
    handler: function(req, h) {
      return h.response({
        name: config.get('manifest.name'),
        short_name: config.get('manifest.shortName'),
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/kete/home-screen-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/kete/home-screen-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }).code(200);
    },
    options: {
      cache: {
        statuses: [ '200' ],
        expiresIn: 365 * 24 * 60 * 60 * 1000, // 1 year
        privacy: 'public'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/kete/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '..', 'static'),
        redirectToSlash: true,
        index: ['index.html']
      }
    },
    options: {
      cache: {
        statuses: [ '200' ],
        expiresIn: 365 * 24 * 60 * 60 * 1000, // 1 year
        privacy: 'public'
      }
    }
  });

  await server.start();

  if (config.get('logDeveloperInfo')) {
    // eslint-disable-next-line no-console
    console.log(`\nApp available at: http://localhost:${config.get('port')}/login`);
  }
};

start();
