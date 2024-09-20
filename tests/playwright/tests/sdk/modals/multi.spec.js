import { modalTest } from '../../../pages/modals_fixture';

modalTest.describe('@US Multi Modals', () => {
    modalTest('US Modal long term non qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 20001, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    modalTest('US Modal long term qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 1501, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    modalTest('US Modal product list', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: '' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    modalTest('US Modal short term non qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    modalTest('US Modal short term qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
modalTest.describe('@DE Multi Modals', () => {
    modalTest('DE Modal PRODUCT LIST', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_MULTI', amount: 200, offer: '' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    modalTest('DE Modal PAY IN ONE', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_MULTI', amount: 200, offer: 'PAY_LATER_PAY_IN_1' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
