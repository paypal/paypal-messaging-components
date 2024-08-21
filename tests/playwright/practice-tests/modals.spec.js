// import { test, expect } from '@playwright/test';
// import { AxeBuilder } from '@axe-core/playwright';

// test.describe('modals', () => {
//     test('US Modal product list', async ({ page }) => {
//         // Navigate to page
//         await page.goto(`/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI`);
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('US Modal short term non qualifying', async ({ page }) => {
//         // Navigate to page
//         await page.goto(`/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI&amount=29&offer=PAY_LATER_SHORT_TERM`);
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('US Modal short term qualifying', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI&amount=200&offer=PAY_LATER_SHORT_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('US Modal Long term non qualifying', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI&amount=20001&offer=PAY_LATER_LONG_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });
//         // TODO: US non qualifying long term 'best-practice' tag error
//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('US Modal Long term qualifying', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI&amount=1501&offer=PAY_LATER_LONG_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });
//         // TODO: US qualifying long term 'best-practice' tag error
//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('US Modal no interest', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI&amount=200&offer=PAYPAL_CREDIT_NO_INTEREST`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('IT non qualifying modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_IT_SHORT_TERM&amount=29&offer=PAY_LATER_SHORT_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('IT qualifying modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_IT_SHORT_TERM&amount=200&offer=PAY_LATER_SHORT_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('GB non qualifying modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_GB_SHORT_TERM&amount=29&offer=PAY_LATER_SHORT_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('GB qualifying modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_GB_SHORT_TERM&amount=200&offer=PAY_LATER_SHORT_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('FR non qualifying modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_FR_SHORT_TERM&amount=29&offer=PAY_LATER_SHORT_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('FR qualifying modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_FR_SHORT_TERM&amount=200&offer=PAY_LATER_SHORT_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('ES non qualifying modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_ES_SHORT_TERM&amount=29&offer=PAY_LATER_SHORT_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('ES qualifying modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_ES_SHORT_TERM&amount=200&offer=PAY_LATER_SHORT_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('DE prduct list page', async ({ page }) => {
//         // Navigate to page
//         await page.goto(`/snapshot/v2/standalone-modal.html?account=DEV_DE_MULTI`);
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('DE qualifying PAY IN ONE modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(`/snapshot/v2/standalone-modal.html?account=DEV_DE_MULTI&amount=200&offer=PAY_LATER_PAY_IN_1`);
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('DE non qualifying LONG TERM modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_DE_MULTI&amount=50&offer=PAY_LATER_LONG_TERM
//             `
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });
//         // TODO: 'best-practice' are resulting in errors, non qualifying long term DE
//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('DE qualifying LONG TERM modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_DE_MULTI&amount=500&offer=PAY_LATER_LONG_TERM
//             `
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });
//         // TODO: 'best-practice' are resulting in errors, qualifying long term DE
//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('AU non qualifying modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_AU_SHORT_TERM&amount=29&offer=PAY_LATER_SHORT_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
//     test('AU qualifying modal', async ({ page }) => {
//         // Navigate to page
//         await page.goto(
//             `/snapshot/v2/standalone-modal.html?account=DEV_AU_SHORT_TERM&amount=200&offer=PAY_LATER_SHORT_TERM`
//         );
//         page.waitForLoadState('domcontentloaded');

//         const messageButton = await page.$('button');
//         await messageButton.click();

//         const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
//         const modalFrame = await modalIframe.contentFrame();

//         await modalFrame.locator('.content__wrapper').waitFor({
//             state: 'visible'
//         });

//         const results = await new AxeBuilder({ page })
//             .include(modalIframe)
//             .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
//             .analyze();
//         expect(results.violations).toEqual([]);
//     });
// });
