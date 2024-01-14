const { test } = require("@playwright/test");

if (typeof test.SHAREDCONFIG === "undefined") test.SHAREDCONFIG = {};

test.SHAREDCONFIG.http200 = {
  urls: [ 
    "https://invisiblethreads.com/about", // exists, with redirect
    "https://invisiblethreads.com/about/", // exists
  ]
};

test.SHAREDCONFIG.domainRedirect = {
  // We know this domain has naked->www and http->https implemented correctly
  domainNaked: "invisiblethreads.com"
};

test.SHAREDCONFIG.canonical = {
  urls: [
    "https://invisiblethreads.com", // note missing www and trailing slash
  ],
  urlsCanonical: [
    "https://www.invisiblethreads.com/",
  ],
  urlsError: [
    "https://invisiblethreads.com/baderrorpage",
  ],
};

test.SHAREDCONFIG.redirect301 = {
  protocol: "https",
  domain: "www.invisiblethreads.com",
  paths: {
    "lingo": "legacy/lingo/", // 'lingo' should redirect to 'legacy/lingo/'
    "blog": "" // 'blog' should redirect to the home page
  },
};

require("@kpander/pw-web-request");

