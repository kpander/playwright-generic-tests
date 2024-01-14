# Generic Web Accessibility Tests

## Deque axe

Test that each URL passes the Deque Axe plugin accessibility tests.

### Configuration

```js
test.SHAREDCONFIG.a11yAxe = {
  urls: [ "https://domain.com/url1", ... ],
  tagsRequire: [ "wcag2a", "wcag2aa" ],
  tagsExclude: [ "best-practice" ],
};
```

### Tags

The list of tags can be found in the [Deque Axe Documentation](https://www.deque.com/axe/core-documentation/api-documentation/#axecore-tags).

Common tags include:

| Tag name        | Accessibility standard / purpose |
| :-              | :- |
| wcag2a 	        | WCAG 2.0 Level A |
| wcag2aa 	      | WCAG 2.0 Level AA |
| wcag2aaa 	      | WCAG 2.0 Level AAA |
| wcag21a 	      | WCAG 2.1 Level A |
| wcag21aa 	      | WCAG 2.1 Level AA |
| wcag22aa 	      | WCAG 2.2 Level AA |
| best-practice   | Common accessibility best practices |
| wcag2a-obsolete |	WCAG 2.0 Level A, no longer required for conformance |
| experimental    | Cutting-edge rules, disabled by default |


# Usage

Let's assume we're setting up the global configuration for the `a11yAxe` tests.

**NOTE:** if you don't provide a configuration object to a test, it won't run. For tests that don't require configuration, simply provide an empty object.

The custom test spec file in your custom project would look something like this:

**generic-tests.spec.js**

```js
const { test } = require("@playwright/test");

// Define the shared configuration for the generic tests.
if (typeof test.SHAREDCONFIG === "undefined") test.SHAREDCONFIG = {};

test.SHAREDCONFIG.a11yAxe = {
  urls: [ 
    "https://domain.com/url1",
    "https://domain.com/path/to/url2",
    "https://domain.com",
  ],
  tagsInclude: [ "wcag2a", "wcag21a", "wcag2aa", "wcag21aa" ],
  tagsExclude: [ "best-practice", "experimental" ],
};

// Load the generic test packages.
require("@kpander/pw-web-a11y");
```

