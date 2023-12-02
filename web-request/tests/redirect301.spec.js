/**
 * @file
 * redirect301.spec.js
 *
 * Test 301 redirects.
 */

// @ts-check
const { test, expect } = require('@playwright/test');

const protocol = test.SHAREDCONFIG.redirect301.protocol || "missing-protocol";
const domain = test.SHAREDCONFIG.redirect301.domain || "missing-domain";
const paths = test.SHAREDCONFIG.redirect301.paths || {};


test.beforeEach(async ({ page }, testInfo) => {
  const timeout = 3000; // Timeout for all tests here, in milliseconds.
  testInfo.setTimeout(timeout);
});


test.describe("gen[redirect301] validate 301 redirects", () => {

  Object.keys(paths).forEach((path) => {
    const url = `${protocol}://${domain}/${path}`;
    const target = `${protocol}://${domain}/${paths[path]}`;

    test(`[${url}] does 301 redirect to [${target}]`, async ({ page }) => {

      const originalUrl = url;

      // Intercept network requests to capture the redirect response.
      const [response] = await Promise.all([
        page.waitForResponse(response => response.url() === url),
        page.route(url, route => route.continue()),
        page.goto(url),
      ]);

      // Confirm it was a 301 redirect.
      expect(response.status()).toBe(301);

      // Confirm the expected redirect URL.
      const redirectedUrl = response.headers()['location'];
      expect(redirectedUrl).toBe(target);
    });
  });

});

