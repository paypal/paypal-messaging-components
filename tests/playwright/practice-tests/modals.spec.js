import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('modals', () => {
    test('IT non qualifying modal', async ({ page }) => {
        // Navigate to page
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_IT_SHORT_TERM&amount=29&offer=PAY_LATER_SHORT_TERM`
        );
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
    test('IT qualifying modal', async ({ page }) => {
        // Navigate to page
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_IT_SHORT_TERM&amount=200&offer=PAY_LATER_SHORT_TERM`
        );
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
    test('GB non qualifying modal', async ({ page }) => {
        // Navigate to page
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_GB_SHORT_TERM&amount=29&offer=PAY_LATER_SHORT_TERM`
        );
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
    test('GB qualifying modal', async ({ page }) => {
        // Navigate to page
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_GB_SHORT_TERM&amount=200&offer=PAY_LATER_SHORT_TERM`
        );
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
    test('FR non qualifying modal', async ({ page }) => {
        // Navigate to page
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_FR_SHORT_TERM&amount=29&offer=PAY_LATER_SHORT_TERM`
        );
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
    test('FR qualifying modal', async ({ page }) => {
        // Navigate to page
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_FR_SHORT_TERM&amount=200&offer=PAY_LATER_SHORT_TERM`
        );
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
    test('ES non qualifying modal', async ({ page }) => {
        // Navigate to page
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_ES_SHORT_TERM&amount=29&offer=PAY_LATER_SHORT_TERM`
        );
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
    test('ES qualifying modal', async ({ page }) => {
        // Navigate to page
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_ES_SHORT_TERM&amount=200&offer=PAY_LATER_SHORT_TERM`
        );
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
    // TODO: DE getting product modal??
    test('DE qualifying PAY IN ONE modal', async ({ page }) => {
        // Navigate to page
        await page.goto(`/snapshot/v2/standalone-modal.html?account=DEV_DE_MULTI&amount=200&offer=DEV_DE_PAY_IN_1`);
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
    test('DE non qualifying LONG TERM modal', async ({ page }) => {
        // Navigate to page
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_DE_MULTI&amount=50&offer=DEV_DE_LONG_TERM
            `
        );
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
    test('DE qualifying LONG TERM modal', async ({ page }) => {
        // Navigate to page
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_DE_MULTI&amount=500&offer=DEV_DE_LONG_TERM
            `
        );
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
    test('AU non qualifying modal', async ({ page }) => {
        // Navigate to page
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_AU_SHORT_TERM&amount=29&offer=PAY_LATER_SHORT_TERM`
        );
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
    test('AU qualifying modal', async ({ page }) => {
        // Navigate to page
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_AU_SHORT_TERM&amount=200&offer=PAY_LATER_SHORT_TERM`
        );
        page.waitForLoadState('domcontentloaded');

        const messageButton = await page.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const results = await new AxeBuilder({ page })
            .include(modalIframe)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(results.violations).toEqual([]);
    });
});
