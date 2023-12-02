// @ts-check
const path = require("path");
const { test, expect } = require('@playwright/test');
const urls = test.SHAREDCONFIG.http200.urls || [];

test.describe("gen[http200] pages load successfully", () => {
  urls.forEach(url => {
    test(`URL (${url}) loads with HTTP 200`, async ({ page }) => {
      const response = await page.goto(url);
      await page.waitForURL(url);
      await expect(response.ok()).toEqual(true);
    });
  });
});

