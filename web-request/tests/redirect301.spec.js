/**
 * @file
 * redirect301.spec.js
 *
 * Test 301 redirects.
 */

// @ts-check
const id = "redirect301";
const { test, expect } = require('@playwright/test');
const isEnabled = test.SHAREDCONFIG && test.SHAREDCONFIG[id] && test.SHAREDCONFIG[id].enabled !== false ? true : false;

if (!isEnabled) {
  console.info(`[${id}] tests disabled. No configuration given.`);
} else {
  const config = test.SHAREDCONFIG[id];
  const protocol = config.protocol || "missing-protocol";
  const domain = config.domain || "missing-domain";
  const paths = config.paths || {};

  test.beforeEach(async ({ page }, testInfo) => {
    const timeout = 3000; // Timeout for all tests here, in milliseconds.
    testInfo.setTimeout(timeout);
  });

  test.describe(`[${id}] validate 301 redirects`, () => {

    Object.keys(paths).forEach((path) => {
      const url = `${protocol}://${domain}/${path}`;
      const target = `${protocol}://${domain}/${paths[path]}`;

      test(`[${url}] does 301 redirect to [${target}]`, async ({ page }) => {
        await page.goto(url);
        await page.waitForURL(target);
      });
    });

  });

}
