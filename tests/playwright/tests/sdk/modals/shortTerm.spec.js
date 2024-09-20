import { modalTest } from '../../../pages/modals_fixture';

modalTest.describe('@US Short Term', () => {
    modalTest('US Modal short term non qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    modalTest('US Modal short term qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    modalTest('US Modal short term checkout', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
modalTest.describe('@AU Short Term', () => {
    modalTest('AU Modal qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_AU_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    modalTest('AU Modal non qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_AU_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
modalTest.describe('@ES Short Term', () => {
    modalTest('ES Modal qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_ES_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    modalTest('ES Modal non qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_ES_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
modalTest.describe('@FR Short Term', () => {
    modalTest('FR Modal qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    modalTest('FR Modal non qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
modalTest.describe('@GB Short Term', () => {
    modalTest('GB Modal qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    modalTest('GB Modal non qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
modalTest.describe('@IT Short Term', () => {
    modalTest('IT Modal qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_IT_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    modalTest('IT Modal non qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_IT_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
