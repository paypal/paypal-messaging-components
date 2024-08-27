import { modalTest } from '../../../pages/modals_fixture';

modalTest.describe('Short Term', () => {
    modalTest('US Modal short term non qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });

    modalTest('US Modal short term qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });

    modalTest('US Modal short term checkout', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    // Test out differnt countries
    modalTest('AU Modal', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_AU_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });

        const modalIframe = await loadModal();

        await runAxeCoreScan(modalIframe, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
});
