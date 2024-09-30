import { modalTest } from '../../../pages/modals_fixture';

modalTest.describe('@MODALS Long Term Modals', () => {
    modalTest('US LONG TERM MULTI & LT Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 1501, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US / DE LONG TERM MULTI & LT NQ', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 20001, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('DE LONG TERM MULTI & LT Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_LONG_TERM', amount: 200, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });

    modalTest('US LONG TERM MANUAL ERROR', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM', amount: '', offer: 'PAY_LATER_LONG_TERM' });
        const modalIframeElement = await loadModal();
        const modalIframe = await modalIframeElement.contentFrame();
        await modalIframe.locator('input').type('90');
        await modalIframe.waitForTimeout(3000);
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US PAYPAL CREDIT NO INTEREST', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 29, offer: 'PAYPAL_CREDIT_NO_INTEREST' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US LONG TERM PL2GO', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM_PL2GO', amount: 200, offer: 'PAY_LATER_LONG_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});

modalTest.describe('@MODALS Short Term Modals', () => {
    modalTest('US SHORT TERM MULTI & ST Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest(
        'US Modal SHORT TERM MULTI & ST & NO AMOUNT NQ',
        async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
            await navigatePage({ account: 'DEV_US_MULTI', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
            const modalIframe = await loadModal();
            await modalAxeCoreScan(modalIframe);
        }
    );
    modalTest('GB SHORT TERM Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('DE PAY IN ONE', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_MULTI', amount: 200, offer: 'PAY_LATER_PAY_IN_1' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });

    modalTest('FR, IT, ES, AU SHORT TERM Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });

    modalTest('FR, IT, ES, AU SHORT TERM NQ', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});

modalTest.describe('@MODALS US/DE Product List Modals', () => {
    modalTest('US, DE PRODUCT LIST', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: '' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});

modalTest.describe('@MODALS US/GB Checkout', () => {
    modalTest('GB SHORT TERM CHECKOUT Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
    modalTest('US SHORT TERM CHEKOUT Q', async ({ navigatePage, loadModal, modalAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const modalIframe = await loadModal();
        await modalAxeCoreScan(modalIframe);
    });
});
