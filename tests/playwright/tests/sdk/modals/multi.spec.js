import { modalTest } from '../../../pages/modals_fixture';

modalTest.describe('Long Term Modals', () => {
    modalTest('US Long Term Multi & LT Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 1501, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US/DE Long Term Multi & LT NQ', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 20001, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('DE Long Term Multi & LT Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_LONG_TERM', amount: 200, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });

    modalTest('US Long Term Manual Error', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM', amount: '', offer: 'PAY_LATER_LONG_TERM' });
        const modalIframeElement = await loadModal();
        const modalIframe = await modalIframeElement.contentFrame();
        await modalIframe.locator('input').type('90');
        await modalIframe.waitForTimeout(3000);
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US Paypal Credit No Interest', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 29, offer: 'PAYPAL_CREDIT_NO_INTEREST' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US Long Term pl2go', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM_PL2GO', amount: 200, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});

modalTest.describe('Short Term Modals', () => {
    modalTest('US Short Term Multi & ST Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest(
        'US Modal Short Term Multi & ST & No Amount NQ',
        async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
            await navigatePage({ account: 'DEV_US_MULTI', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
            const modalIframe = await loadModal();
            await modalAxeCoreScan(modalIframe);
        }
    );
    modalTest('GB Short Term Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('DE Pay In One', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_MULTI', amount: 200, offer: 'PAY_LATER_PAY_IN_1' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });

    modalTest('FR, IT, ES, AU Short Term Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });

    modalTest('FR, IT, ES, AU Short Term NQ', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});

modalTest.describe('US/DE Product List Modals', () => {
    modalTest('US, DE Product List', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: '' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});

modalTest.describe('US/GB Checkout', () => {
    modalTest('GB Short Term Checkout Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US Short Term Checkout Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});
