// import { test } from '../../../pages/modals_fixture';

// test.describe('Short Term', () => {
//     test('US Modal product list', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
//         await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: '' });

//         const modalIframe = await loadModal();

//         await runAxeCoreScan(modalIframe);
//     });

//     test('US Modal short term non qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
//         await navigatePage({ account: 'DEV_US_MULTI', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
//         const modalIframe = await loadModal();
//         await runAxeCoreScan(modalIframe);
//     });

//     test('US Modal short term qualifying', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
//         await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
//         const modalIframe = await loadModal();
//         await runAxeCoreScan(modalIframe);
//     });

//     test('US Modal short term checkout', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
//         await navigatePage({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
//         const modalIframe = await loadModal();
//         await runAxeCoreScan(modalIframe);
//     });
//     // Test out differnt countries
//     test('AU Modal', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
//         await navigatePage({ account: 'DEV_AU_SHORT_TERM', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });

//         const modalIframe = await loadModal();

//         await runAxeCoreScan(modalIframe);
//     });
// });
