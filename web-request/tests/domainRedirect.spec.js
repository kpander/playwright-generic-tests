/**
 * @file
 * domainRedirect.spec.js
 *
 * Test basic hosting redirect requirements.
 * - naked to www
 * - http to https
 */

// @ts-check
const { test, expect } = require('@playwright/test');
const domain = test.SHAREDCONFIG.domainRedirect.domainNaked || "missing-domain";

test.beforeEach(async ({ page }, testInfo) => {
  const timeout = 3000; // Timeout for all tests here, in milliseconds.
  testInfo.setTimeout(timeout);
});

test.describe("gen[domainRedirect:http->https] http to https redirect", () => {

  test(`1: [http://${domain}] should redirect to [https://www.${domain}]`, async ({ page }) => {
    await page.goto(`http://${domain}`);
    await page.waitForURL(`https://www.${domain}`);
  });

  test(`2: [http://www.${domain}] should redirect to [https://www.${domain}]`, async ({ page }) => {
    await page.goto(`http://www.${domain}`);
    await page.waitForURL(`https://www.${domain}`);
  });

});

test.describe("gen[domainRedirect:naked->www] naked https to www https redirect", () => {

  test(`1: [https://${domain}] should redirect to [https://www.${domain}]`, async ({ page }) => {
    await page.goto(`https://${domain}`);
    await page.waitForURL(`https://www.${domain}`);
  });

});


