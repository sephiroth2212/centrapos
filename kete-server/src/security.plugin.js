'use strict';

const cspPolicy = require('./csp.policy');

const securityHeaders = {
  'Content-Security-Policy-Report-Only': cspPolicy,
  'X-Frame-Options': 'DENY', // https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options
  'X-Content-Type-Options': 'nosniff', //https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options
  'Referrer-Policy': 'strict-origin-when-cross-origin', // https://scotthelme.co.uk/a-new-security-header-referrer-policy/
  'Report-To': JSON.stringify({
    group: 'default',
    max_age: 31536000,
    endpoints:
      [{
        url: 'https://centrapay.report-uri.com/a/d/g'
      }],
    include_subdomains: true
  }),
};

function generateSecurityHeaders (request, h) {
  if (request.response?.headers?.['content-type'] !== 'text/html') {
    return h.continue;
  }

  if (!request.response.isBoom) {
    request.response.header = Object.assign(request.response.headers, securityHeaders);
  }

  else {
    request.response.output.headers = Object.assign(request.response.output.headers, securityHeaders);
  }

  return h.continue;
}

function register(server) {
  server.ext('onPreResponse', generateSecurityHeaders);
}

module.exports = {
  name: 'security-headers',
  register
};
