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
// Common function for running Axe accessibility scans
const runAxeCoreScan = async (page, options = {}) => {
    const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];
    const { disableRules = [] } = options; // Optionally pass disable rules

    const results = await new AxeBuilder({ page })
        .include('body') // Include everything inside iframe or page
        .withTags(tags)
        .disableRules(disableRules) // Disable rules based on options
        .analyze();

    expect(results.violations).toEqual([]);
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

    messageAxeCoreScan: async ({ page }, use) => {
        await use(async () => {
            await runAxeCoreScan(page, {
                disableRules: ['page-has-heading-one', 'landmark-one-main']
                // ignore heading levels on message and need for landmark
            });
        });
    },

    modalAxeCoreScan: async ({ page }, use) => {
        await use(async () => {
            await runAxeCoreScan(page);
        });
    }
});
