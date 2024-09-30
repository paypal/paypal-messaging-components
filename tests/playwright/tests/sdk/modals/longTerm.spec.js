import { modalTest } from '../../../pages/modals_fixture';

modalTest.describe('@LONGTERM US Long Term Modals', () => {
    modalTest('US Modal long term non qualifying', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM', amount: 20001, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });

    modalTest('US Modal long term qualifying', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM', amount: 1501, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US Modal long term checkout', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({
            account: 'DEV_US_LONG_TERM_CHECKOUT',
            amount: 200,
            offer: 'PAY_LATER_LONG_TERM'
        });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US Modal long term pl2go', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM_PL2GO', amount: 200, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});
modalTest.describe('@LONGTERM DE Long Term Modals', () => {
    modalTest('DE Modal LONG TERM Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_LONG_TERM', amount: 500, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('DE Modal LONG TERM NQ', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_LONG_TERM', amount: 50, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});
