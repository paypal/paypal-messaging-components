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
    messageAxeCoreScan: async ({ page }, use) => {
        const runAxeCoreScan = async () => {
            const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];
            const results = await new AxeBuilder({ page })
                .include('body') // Include everything inside iframe
                .withTags(tags)
                .disableRules(['page-has-heading-one', 'landmark-one-main'])
                // evaluating a message on a larger page on merchant website, does not need level one heading
                // does not need landmark because it is a button that opens a modal that has a landmark
                .analyze();

            expect(results.violations).toEqual([]);
        };
        await use(runAxeCoreScan);
    },

    modalAxeCoreScan: async ({ page }, use) => {
        const runAxeCoreScan = async () => {
            const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];
            const results = await new AxeBuilder({ page })
                .include('body') // Include everything inside iframe
                .withTags(tags)
                .analyze();

            expect(results.violations).toEqual([]);
        };
        await use(runAxeCoreScan);
    }
});
