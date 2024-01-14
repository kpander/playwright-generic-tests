/**
 * @file
 * canonical.spec.js
 *
 * Test that all URLs have the correct canonical link.
 *
 * We assume that the URL in the sitemap.xml file should match
 * the defined canonical link in the page.
 */

// @ts-check
const id = "canonical";
const { test, expect } = require('@playwright/test');
const isEnabled = test.SHAREDCONFIG && test.SHAREDCONFIG[id] && test.SHAREDCONFIG[id].enabled !== false ? true : false;

if (!isEnabled) {
  console.info(`[${id}] tests disabled. No configuration given.`);
} else {
  const config = test.SHAREDCONFIG[id];
  const urls = config.urls || [];
  const urlsCanonical = config.urlsCanonical || [];
  const urlsError = config.urlsError || [];

  test.describe(`[${id}] Pages have canonical link`, () => {

    urls.forEach((url, index) => {

      test(`URL (${url}) has correct canonical link`, async ({ page }) => {
        const response = await page.goto(url);

        const canonical = await page.$('link[rel="canonical"]');
        const href = await canonical.getAttribute("href");

        // Expect the same URL as the sitemap.
        const expected = urlsCanonical[index];
        await expect(href).toEqual(expected);
      });

    });

  });

  test.describe(`[${id}] Error pages do NOT have canonical link`, () => {

    urlsError.forEach(url => {

      test(`Error page [${url}] does not have a canonical link`, async ({ page }) => {
        const response = await page.goto(url);

        const canonical = await page.$('link[rel="canonical"]');
        await expect(canonical).toBeNull();
      });

    });

  });

}
