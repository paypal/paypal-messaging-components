import { test, expect, testInfo } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { accessibilityBuilder } from './fixtures.spec';

test.describe('homepage', () => {
    // 2
    test('should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('https://google.com/'); // 3

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

        expect(accessibilityScanResults.violations).toEqual([]); // 5
    });
});

test('navigation menu should not have automatically detectable accessibility violations', async ({ page }) => {
    await page.goto('https://your-site.com/');

    await page.getByRole('button', { name: 'Navigation Menu' }).click();

    // It is important to waitFor() the page to be in the desired
    // state *before* running analyze(). Otherwise, axe might not
    // find all the elements your test expects it to scan.
    await page.locator('#navigation-menu-flyout').waitFor();

    const accessibilityScanResults = await new AxeBuilder({ page }).include('#navigation-menu-flyout').analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
});

test('should not have any automatically detectable WCAG A or AA violations', async ({ page }) => {
    await page.goto('https://your-site.com/');

    const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
});
test('should not have any accessibility violations outside of elements with known issues', async ({ page }) => {
    await page.goto('https://your-site.com/page-with-known-issues');

    const accessibilityScanResults = await new AxeBuilder({ page }).exclude('#element-with-known-issue').analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
});

// This is less fragile than snapshotting the entire violations array.
// expect(violationFingerprints(accessibilityScanResults)).toMatchSnapshot();

// my-test-utils.js
function violationFingerprints(accessibilityScanResults) {
    const violationFingerprints = accessibilityScanResults.violations.map(violation => ({
        rule: violation.id,
        // These are CSS selectors which uniquely identify each element with
        // a violation of the rule in question.
        targets: violation.nodes.map(node => node.target)
    }));

    return JSON.stringify(violationFingerprints, null, 2);
}
// testInfo get full analysis of test
test('basic', async ({ page }, testInfo) => {
    await page.goto('https://commitquality.com/practice-api');
    // wait for page to fully load before analyze
    // await a link to load to know page is loaded .waitFor()
    await page.locator('.back-link').waitFor();

    // checks the whole page
    const axeBuilder = await new AxeBuilder({ page })
        // what tests do these tags cover exactly?
        // https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
        // fails with best-practice, passes without it
        // In error output check which tags are failing
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        //disable rule
        // .disableRules(["region"])

        // .exclude("h2")
        // .include(".back-link")
        .analyze();

    // get more test information
    // link scan results
    // adjust config for getting snap shots and videos
    await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(axeBuilder, null, 2),
        contentType: 'application/json'
    });

    // expect the page to equal no violations
    expect(axeBuilder.violations).toEqual([]);
});

// test("fixture", async ({ page, accessibilityBuilder }) => {
//   await page.goto("https://commitquality.com/practice-api");
//   // wait for page to fully load before analyze
//   // await a link to load to know page is loaded .waitFor()
//   await page.locator(".back-link").waitFor();

//   // checks the whole page
//   const axeBuilder = await accessibilityBuilder.analyze();

//   // expect the page to equal no violations
//   expect(axeBuilder.violations).toEqual([]);
// });
