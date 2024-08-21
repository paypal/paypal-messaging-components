import { test } from './modals_fixture';

test.describe('Modals Accessibility Tests', () => {
    test('US Modal product list', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        // Use the fixture to navigate to the page
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: '' });

        // Load the modal and retrieve the iframe
        const modalIframe = await loadModal();

        // Run Axe accessibility checks on the modal iframe
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal short term non qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal short term qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal long term non qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 20001, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal long term qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 1501, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('US Modal no interest', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: 'PAYPAL_CREDIT_NO_INTEREST' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    // TODO: check inputs for checkout and pl2go
    test('US Modal short term checkout', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('US Modal long term checkout', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('US Modal short term pl2go', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_PL2GO', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('US Modal long term pl2go', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM_PL2GO', amount: 200, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
