import { expect } from '@playwright/test';
import { test } from './modals_fixture';

// Helper function to navigate to the URL and wait for the page to load
export const navigatePage = async (page, account, amount, offer) => {
    const url = `/snapshot/v2/sdk.html?account=${account}&amount=${amount}&offer=${offer}`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('domcontentloaded');
};

test.describe('US SDK Messages Accessibility Tests', () => {
    test('Short Term', async ({ page, runAxeCoreScan }) => {
        navigatePage(page, 'DEV_US_MULTI', 100, 'PAY_LATER_SHORT_TERM');
        await expect(page.frameLocator('iframe[name*="__zoid__paypal_message__"]')).toBeVisible({
            timeout: 30000
        });

        const zoidIFrame = await page.$('iframe[name*="__zoid__paypal_message__"]');
        const messageIframe = await zoidIFrame.contentFrame();
        const button = await messageIframe.$('button');
        // Run Axe accessibility checks on the modal iframe
        await runAxeCoreScan(button);
    });
    test('Short Term Checkout', async ({ page, runAxeCoreScan }) => {
        await page.goto(
            '/snapshot/v2/sdk.html?account=DEV_US_SHORT_TERM_CHECKOUT&amount=100&offer=PAY_LATER_SHORT_TERM&env=local'
        );
        await page.waitForLoadState('domcontentloaded');
        const zoidIFrame = await page.waitForSelector('iframe[name*="__zoid__paypal_message__"]');
        const messageIframe = await zoidIFrame.contentFrame();

        const button = await messageIframe.$('button');
        // Run Axe accessibility checks on the modal iframe
        await runAxeCoreScan(button);
    });
    test('Short Term PL2GO', async ({ page, runAxeCoreScan }) => {
        await page.goto(
            '/snapshot/v2/sdk.html?account=DEV_US_SHORT_TERM_PL2GO&amount=100&offer=PAY_LATER_SHORT_TERM&env=local'
        );
        await page.waitForLoadState('domcontentloaded');
        const zoidIFrame = await page.waitForSelector('iframe[name*="__zoid__paypal_message__"]');
        const messageIframe = await zoidIFrame.contentFrame();

        const button = await messageIframe.$('button');
        // Run Axe accessibility checks on the modal iframe
        await runAxeCoreScan(button);
    });
    test('Long Term', async ({ page, runAxeCoreScan }) => {
        await page.goto(
            '/snapshot/v2/sdk.html?account=DEV_US_LONG_TERM&amount=100&offer=PAY_LATER_LONG_TERM&env=local'
        );
        await page.waitForLoadState('domcontentloaded');
        const zoidIFrame = await page.waitForSelector('iframe[name*="__zoid__paypal_message__"]');
        const messageIframe = await zoidIFrame.contentFrame();

        const button = await messageIframe.$('button');
        // Run Axe accessibility checks on the modal iframe
        await runAxeCoreScan(button);
    });
    test('Long Term Checkout', async ({ page, runAxeCoreScan }) => {
        await page.goto(
            '/snapshot/v2/sdk.html?account=DEV_US_LONG_TERM_CHECKOUT&amount=100&offer=PAY_LATER_LONG_TERM&env=local'
        );
        await page.waitForLoadState('domcontentloaded');
        const zoidIFrame = await page.waitForSelector('iframe[name*="__zoid__paypal_message__"]');
        const messageIframe = await zoidIFrame.contentFrame();

        const button = await messageIframe.$('button');
        // Run Axe accessibility checks on the modal iframe
        await runAxeCoreScan(button);
    });
    test('Long Term PL2GO', async ({ page, runAxeCoreScan }) => {
        await page.goto(
            '/snapshot/v2/sdk.html?account=DEV_US_LONG_TERM_PL2GO&amount=100&offer=PAY_LATER_LONG_TERM&env=local'
        );
        await page.waitForLoadState('domcontentloaded');
        const zoidIFrame = await page.waitForSelector('iframe[name*="__zoid__paypal_message__"]');
        const messageIframe = await zoidIFrame.contentFrame();

        const button = await messageIframe.$('button');
        // Run Axe accessibility checks on the modal iframe
        await runAxeCoreScan(button);
    });
    test('No Interest', async ({ page, runAxeCoreScan }) => {
        await page.goto('/snapshot/v2/sdk.html?account=DEV_US_NO_INTEREST&amount=100&offer=NI&env=local');
        await page.waitForLoadState('domcontentloaded');
        const zoidIFrame = await page.waitForSelector('iframe[name*="__zoid__paypal_message__"]');
        const messageIframe = await zoidIFrame.contentFrame();

        const button = await messageIframe.$('button');
        // Run Axe accessibility checks on the modal iframe
        await runAxeCoreScan(button);
    });
});
