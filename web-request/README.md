# Generic Web Request Tests

## http200

Test that each URL loads and returns an HTTP 200 status code.

### Dependencies

- `test.SHAREDCONFIG.http200.urls` = array of URLs to test


## domainRedirect

Test that naked domain redirects to www subdomain.
Test that http redirects to https.
Check all combinations of the above.

### Dependencies

- `test.SHAREDCONFIG.domainRedirect.domainNaked` = string domain to test e.g., "domain.com" and NOT "www.domain.com"


## canonical

Test that each site URL has a canonical link that is the same as the URL.
Test that each error page does NOT have a canonical link reference.

### Dependencies

- `test.SHAREDCONFIG.canonical.urls` = array of URLs to load for inspection (could be a live URL, or a local server)
- `test.SHAREDCONFIG.canonical.urlsCanonical` = array defining the expected canonical URL per item above (should be the prod URL)
- `test.SHAREDCONFIG.canonical.urlsError` = array of 404 URLs which should NOT have a canonical link reference


## redirect301

Test that the given list of from/to paths redirect with a 301 status code.
Test that the redirect happens within 3 seconds.

### Dependencies

- `test.SHAREDCONFIG.redirect301.protocol` = string protocol to use e.g., "https"
- `test.SHAREDCONFIG.redirect301.domain` = string domain to use e.g., "www.domain.com"
- `test.SHAREDCONFIG.redirect301.paths` = object with key/value pairs, where:
  - key = path that should perform a 301 redirect
  - value = target path we should be redirected to

For example, if we want to test the following redirects:

  - `https://www.domain.com/path1` -> `https://www.domain.com/new-path1`
  - `https://www.domain.com/path2` -> `https://www.domain.com/new-path2`

Then the configuration would look like this:

```js
test.SHAREDCONFIG.redirect301 = {
  protocol: "https",
  domain: "www.domain.com",
  paths: {
    "path1": "new-path1",
    "path2": "new-path2"
  }
};
```





# Usage

Let's assume we're setting up the global configuration for just the `http200` and `domainRedirect` tests.

**NOTE:** if you don't provide a configuration object to a test, it won't run. For tests that don't require configuration, simply provide an empty object.

The custom test spec file in your custom project would look something like this:

**generic-tests.spec.js**

```js
const { test } = require("@playwright/test");

// Define the shared configuration for the generic tests.
if (typeof test.SHAREDCONFIG === "undefined") test.SHAREDCONFIG = {};

test.SHAREDCONFIG.http200 = {
  urls: [ "https://domain.com/url1", "https://domain.com/path/to/url2", "https://domain.com" ],
};
test.SHAREDCONFIG.domainRedirect = {
  domainNaked: "domain.com"
};

// Load the generic test packages.
require("@kpander/pw-web-request");
```


