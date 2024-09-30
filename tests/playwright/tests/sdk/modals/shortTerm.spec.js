import { modalTest } from '../../../pages/modals_fixture';

modalTest.describe('@SHORTTERM US/GB Short Term Checkout', () => {
    modalTest('US Modal short term checkout Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US Modal short term checkout NQ', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('GB Modal short term checkout Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('GB Modal short term checkout NQ', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM_CHECKOUT', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});
modalTest.describe('@SHORTTERM GB Short Term', () => {
    modalTest('GB  Modal short term Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('GB  Modal short term NQ', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});

modalTest.describe('@SHORTTERM US/FR/IT/ES/AU Short Term', () => {
    modalTest('US, FR, IT, ES, AU short term Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });

    modalTest('US, FR, IT, ES, AU short term NQ', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});
