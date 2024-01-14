/**
 * @file
 * domainRedirect.spec.js
 *
 * Test basic hosting redirect requirements.
 * - naked to www
 * - http to https
 */

// @ts-check
const id = "domainRedirect";
const { test, expect } = require('@playwright/test');
const isEnabled = test.SHAREDCONFIG && test.SHAREDCONFIG[id] && test.SHAREDCONFIG[id].enabled !== false ? true : false;

if (!isEnabled) {
  console.info(`[${id}] tests disabled. No configuration given.`);
} else {
  const config = test.SHAREDCONFIG[id];
  const domain = config.domainNaked || "missing-domain";

  test.beforeEach(async ({ page }, testInfo) => {
    const timeout = 3000; // Timeout for all tests here, in milliseconds.
    testInfo.setTimeout(timeout);
  });

  test.describe(`[${id}:http->https] http to https redirect`, () => {

    test(`1: [http://${domain}] should redirect to [https://www.${domain}]`, async ({ page }) => {
      await page.goto(`http://${domain}`);
      await page.waitForURL(`https://www.${domain}`);
    });

    test(`2: [http://www.${domain}] should redirect to [https://www.${domain}]`, async ({ page }) => {
      await page.goto(`http://www.${domain}`);
      await page.waitForURL(`https://www.${domain}`);
    });

  });

  test.describe(`[${id}:naked->www] naked https to www https redirect`, () => {

    test(`1: [https://${domain}] should redirect to [https://www.${domain}]`, async ({ page }) => {
      await page.goto(`https://${domain}`);
      await page.waitForURL(`https://www.${domain}`);
    });

  });

}
