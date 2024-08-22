// import { test, expect } from '@playwright/test';
// import { AxeBuilder } from '@axe-core/playwright';
// import testCases from './us_config.json'; // Import the test cases from the JSON file

// // Helper function to generate the URL based on input parameters
// const generateUrl = ({ account, amount, offer }) => {
//     let url = `/snapshot/v2/standalone-modal.html?account=${account}`;

//     if (amount !== undefined) {
//         url += `&amount=${amount}`;
//     }

//     if (offer !== undefined && offer !== '') {
//         url += `&offer=${offer}`;
//     }

//     return url;
// };

// // Helper function to navigate to the URL and wait for the page to load
// const pageURL = async (page, account, amount, offer) => {
//     const url = generateUrl({ account, amount, offer });
//     await page.goto(url);
//     await page.waitForLoadState('domcontentloaded');
// };

// // Helper function to load the modal and ensure it's visible
// const navigateLoadedPage = async page => {
//     const messageButton = await page.$('button');
//     await messageButton.click();

//     const modalIframe = await page.waitForSelector('iframe[name*="__zoid__paypal_credit_modal"]');
//     const modalFrame = await modalIframe.contentFrame();

//     await modalFrame.locator('.content__wrapper').waitFor({
//         state: 'visible'
//     });

//     // Return the modal iframe for further processing
//     return modalIframe;
// };

// // Helper function to run Axe accessibility checks
// const runAxeCoreScan = async (page, modalIframe) => {
//     const results = await new AxeBuilder({ page })
//         .include(modalIframe)
//         .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
//         .analyze();

//     expect(results.violations).toEqual([]);
// };

// test.describe('modals', () => {
//     // Iterate over the test cases from the imported JSON file
//     testCases.forEach(({ name, account, amount, offer }) => {
//         test(name, async ({ page }) => {
//             // Navigate to the URL with dynamic parameters
//             await pageURL(page, account, amount, offer);

//             // Load the modal and wait for the elements
//             const modalIframe = await navigateLoadedPage(page);

//             // Run Axe accessibility check
//             await runAxeCoreScan(page, modalIframe);
//         });
//     });
// });
