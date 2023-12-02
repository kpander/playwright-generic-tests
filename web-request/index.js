const { http200 } = require('./tests/http200.spec.js');
const { domainRedirect } = require('./tests/domainRedirect.spec.js');
const { canonical } = require('./tests/canonical.spec.js');
const { redirect301 } = require('./tests/redirect301.spec.js');

module.exports = {
  http200,
  domainRedirect,
  canonical,
  redirect301
};

