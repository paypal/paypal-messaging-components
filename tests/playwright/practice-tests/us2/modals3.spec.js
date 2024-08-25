import { generateUrl, test } from '../../../pages/modals_fixture';

test.describe('Modals Accessibility Tests', () => {
    test('US Modal product list', async ({ page, loadModal, runAxeCoreScan }) => {
        await page.goto(`/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI&amount=200`);
        await page.waitForLoadState('domcontentloaded');

        // Use the fixture to navigate to the page
        // await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: '' });

        // Load the modal and retrieve the iframe
        const modalIframe = await loadModal();

        // Run Axe accessibility checks on the modal iframe
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal short term non qualifying', async ({ page, loadModal, runAxeCoreScan }) => {
        await page.goto(`/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI&amount=29&offer=PAY_LATER_SHORT_TERM`);
        page.waitForLoadState('domcontentloaded');
        // await navigatePage({ account: 'DEV_US_MULTI', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal short term qualifying', async ({ page, loadModal, runAxeCoreScan }) => {
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI&amount=200&offer=PAY_LATER_SHORT_TERM`
        );
        page.waitForLoadState('domcontentloaded');
        // await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal long term non qualifying', async ({ page, loadModal, runAxeCoreScan }) => {
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI&amount=20001&offer=PAY_LATER_LONG_TERM`
        );
        page.waitForLoadState('domcontentloaded');
        // await navigatePage({ account: 'DEV_US_MULTI', amount: 20001, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal long term qualifying', async ({ page, loadModal, runAxeCoreScan }) => {
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI&amount=1501&offer=PAY_LATER_LONG_TERM`
        );
        page.waitForLoadState('domcontentloaded');
        // await navigatePage({ account: 'DEV_US_MULTI', amount: 1501, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('US Modal no interest', async ({ page, loadModal, runAxeCoreScan }) => {
        await page.goto(
            `/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI&amount=200&offer=PAYPAL_CREDIT_NO_INTEREST`
        );
        page.waitForLoadState('domcontentloaded');
        // await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: 'PAYPAL_CREDIT_NO_INTEREST' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    // TODO: check inputs for checkout and pl2go
    test('US Modal short term checkout', async ({ page, loadModal, runAxeCoreScan }) => {
        const url = generateUrl({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        await page.goto(url);
        await page.waitForLoadState('domcontentloaded');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('US Modal long term checkout', async ({ page, loadModal, runAxeCoreScan }) => {
        const url = generateUrl({ account: 'DEV_US_LONG_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_LONG_TERM' });
        await page.goto(url);
        await page.waitForLoadState('domcontentloaded');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    // test('US Modal short term pl2go', async ({ page, loadModal, runAxeCoreScan }) => {
    //     const url = generateUrl({ accoun: 'DEV_US_SHORT_TERM_PL2GO', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
    //     await page.goto(url);
    //     await page.waitForLoadState('domcontentloaded');
    //     const modalIframe = await loadModal();
    //     await runAxeCoreScan(modalIframe);
    // });
    test('US Modal long term pl2go', async ({ page, loadModal, runAxeCoreScan }) => {
        const url = generateUrl({ account: 'DEV_US_LONG_TERM_PL2GO', amount: 200, offer: 'PAY_LATER_LONG_TERM' });
        await page.goto(url);
        await page.waitForLoadState('domcontentloaded');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
