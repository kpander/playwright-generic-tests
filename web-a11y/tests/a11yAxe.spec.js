/**
 * @file
 * a11yAxe.spec.js
 *
 * Test that all given URLs pass Deque Axe accessibility tests.
 */
// @ts-check
const id = "a11yAxe";
const { test, expect } = require('@playwright/test');
const AxeBuilder = require("@axe-core/playwright").default;
const isEnabled = test.SHAREDCONFIG && test.SHAREDCONFIG[id] && test.SHAREDCONFIG[id].enabled !== false ? true : false;

if (!isEnabled) {
  console.info(`[${id}] tests disabled. No configuration given.`);
} else {
  const config = test.SHAREDCONFIG[id];
  const urls = config.urls || [];
  const tagsInclude = config.tagsInclude || [];
  const tagsExclude = config.tagsExclude || [];

  test.describe(`[${id}] pages pass accessibility tests`, () => {

    // GIVEN a url
    // WHEN we analyze the page with Deque axe-core
    // THEN it has no violations
    urls.forEach(url => {
      test(`URL (${url}) passes accessibility tests`, async ({ page }) => {
        // Given...
        const makeAxeBuilder = () => new AxeBuilder({ page })
          .withTags(tagsInclude)
          .exclude(tagsExclude);

        await page.goto(url);

        // When...
        const results = await makeAxeBuilder({ page }).analyze();
        const issues = results.violations.map(obj => {
          return obj.description;
        });

        // Then...
        if (issues.length) {
          console.log(url, "has", results.violations.length, "WCAG issues:", issues);
        }

        expect(results.violations).toEqual([]);
      });
    });
  });

}
