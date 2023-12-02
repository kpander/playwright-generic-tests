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
const { test, expect } = require('@playwright/test');

const urls = test.SHAREDCONFIG.canonical.urlsLoad || [];
const urlsCanonical = test.SHAREDCONFIG.canonical.urlsCanonical || [];
const urlsError = test.SHAREDCONFIG.canonical.urlsError || [];

test.describe("gen[canonical] Pages have canonical link", () => {

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

test.describe("gen[canonical] Error pages do NOT have canonical link", () => {

  urlsError.forEach(url => {

    test(`Error page [${url}] does not have a canonical link`, async ({ page }) => {
      const response = await page.goto(url);

      const canonical = await page.$('link[rel="canonical"]');
      await expect(canonical).toBeNull();
    });

  });

});

