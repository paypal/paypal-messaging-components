// modalsFixture.js
import { test as base, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

// Function to generate URL based on parameters
export const generateUrl = (baseUrl, { account, amount, offer }) => {
    let url = `${baseUrl}?account=${account}`;
    if (amount !== undefined) {
        url += `&amount=${amount}`;
    }
    if (offer !== undefined && offer !== '') {
        url += `&offer=${offer}`;
    }
    return url;
};

// Extend Playwright base test with custom fixtures
export const baseTest = base.extend({
    navigatePage: async ({ page }, use) => {
        const navigate = async (baseurl, { account, amount, offer }) => {
            const url = generateUrl(baseurl, { account, amount, offer });
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        };
        await use(navigate);
    },
    // Fixture for running Axe accessibility checks
    runAxeCoreScan: async ({ page }, use) => {
        const runAxeCoreScan = async (element, tags = []) => {
            const results = await new AxeBuilder({ page }).include(element).withTags(tags).analyze();
            expect(results.violations).toEqual([]);
        };
        await use(runAxeCoreScan);
    }
});
