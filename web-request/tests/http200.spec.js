/**
 * @file
 * http200.spec.js
 *
 * Test that all given URLs load successfully.
 */
// @ts-check
const id = "http200";
const { test, expect } = require('@playwright/test');
const isEnabled = test.SHAREDCONFIG && test.SHAREDCONFIG[id] && test.SHAREDCONFIG[id].enabled !== false ? true : false;

if (!isEnabled) {
  console.info(`[${id}] tests disabled. No configuration given.`);
} else {
  const config = test.SHAREDCONFIG[id];
  const urls = config.urls || [];

  test.describe(`[${id}] pages load successfully`, () => {
    urls.forEach(url => {
      test(`URL (${url}) loads with HTTP 200`, async ({ page }) => {
        const response = await page.goto(url);
        //await page.waitForURL(url);
        await expect(response.ok()).toEqual(true);
      });
    });
  });

}
