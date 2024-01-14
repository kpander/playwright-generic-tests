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
const fs = require("fs");
const path = require("path");
const isEnabled = test.SHAREDCONFIG && test.SHAREDCONFIG[id] && test.SHAREDCONFIG[id].enabled !== false ? true : false;

const cleanFilename = function(url) {
  return url
    .replace(/^https?:\/\//, "")
    .replaceAll("/", "--")
    .replaceAll("?", "--")
    .replaceAll("#", "--")
    ;
};

if (!isEnabled) {
  console.info(`[${id}] tests disabled. No configuration given.`);
} else {
  const config = test.SHAREDCONFIG[id];
  const urls = config.urls || [];
  const tagsInclude = config.tagsInclude || [];
  const tagsExclude = config.tagsExclude || [];
  const saveReport = config.saveReport || false;
  const saveJson = config.saveJson || false;
  const outputFolder = config.outputFolder || "";

  if (saveReport || saveJson) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

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

        if (saveReport) {
          const axeReport = require("axe-html-reporter");
          const output = axeReport.createHtmlReport({
            results: results,
            options: {
              projectKey: url
            }
          });

          const filename = path.join(outputFolder, cleanFilename(url) + ".html");
          fs.writeFileSync(filename, output, "utf8");
        }

        if (saveJson) {
          const output = JSON.stringify(results.violations, null, 2);
          const filename = path.join(outputFolder, cleanFilename(url) + ".json");
          fs.writeFileSync(filename, output, "utf8");
        }

        expect(results.violations.length).toEqual(0);
      });
    });
  });

}
