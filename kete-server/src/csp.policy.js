'use strict';

const config = require('./config');

const defaultPolicy = `
  default-src 'self';
  form-action 'none';
  frame-ancestors 'none';
  manifest-src 'self';
  report-uri https://centrapay.report-uri.com/r/d/csp/reportOnly;
`;

const connectPolicy = `connect-src
  'self'
  ${config.get('public.apiBaseUrl')}
  ${config.get('public.oauthAuthority')}
  https://o318766.ingest.sentry.io
;`;

const scriptPolicy = `script-src
  'self'
  'unsafe-inline'
  https://cdn.jsdelivr.net/npm/jsqr@1.3.1/dist/jsQR.min.js
  blob:
;`; // blob: is used by QR code scanner and couldn't figure out stricter declaration.

const fontPolicy = `font-src
  https://fonts.gstatic.com
  https://cdn.jsdelivr.net
;`;

const stylePolicy = `style-src
  'self'
  'unsafe-inline'
  https://fonts.googleapis.com
  https://cdn.jsdelivr.net
;`; // remove unsafe-inline after completely removing legacy-kete code, add unsafe-inline only when developing

const imgPolicy = `img-src
  'self'
  data:
;`;

const policy = `${connectPolicy} ${stylePolicy} ${imgPolicy} ${scriptPolicy} ${fontPolicy} ${defaultPolicy}`.trim().replace(/\n/g, '');

module.exports = policy;
