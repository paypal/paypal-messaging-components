// import { messageTest } from '../../../pages/messages_fixture';

// messageTest.describe('Multi Messages', () => {
//     messageTest('US long term non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
//         await navigatePage({ account: 'DEV_US_MULTI', amount: 20001, offer: 'PAY_LATER_LONG_TERM' });
//         const messageIframe = await loadMessage();
//         await runAxeCoreScan(messageIframe, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
//     });

//     messageTest('US long term qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
//         await navigatePage({ account: 'DEV_US_MULTI', amount: 1501, offer: 'PAY_LATER_LONG_TERM' });
//         const messageIframe = await loadMessage();
//         await runAxeCoreScan(messageIframe, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
//     });

//     messageTest('US product list', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
//         await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: '' });
//         const messageIframe = await loadMessage();
//         await runAxeCoreScan(messageIframe, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
//     });

//     messageTest('US short term non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
//         await navigatePage({ account: 'DEV_US_MULTI', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
//         const messageIframe = await loadMessage();
//         await runAxeCoreScan(messageIframe, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
//     });

//     messageTest('US short term qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
//         await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
//         const messageIframe = await loadMessage();
//         await runAxeCoreScan(messageIframe, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
//     });
// });
