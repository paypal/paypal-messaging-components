import { messageTest } from '../../../pages/messages_fixture';

messageTest.describe('@AU Short Term', () => {
    messageTest('AU Message short term non qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_AU_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest('AU Message short term qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_AU_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
});
messageTest.describe('@ES Short Term', () => {
    messageTest('ES Message short term non qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_ES_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest('ES Message short term qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_ES_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
});
messageTest.describe('@FR Short Term', () => {
    messageTest('FR Message short term non qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest('FR Message short term qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
});
messageTest.describe('@GB Short Term', () => {
    messageTest('GB Message short term non qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest('GB Message short term qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest(
        'GB Message short term checkout qualifying',
        async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
            await navigatePage({ account: 'DEV_GB_SHORT_TERM_CHECKOUT', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
            const messageIFrame = await loadMessage();
            await messageAxeCoreScan(messageIFrame);
        }
    );

    messageTest(
        'GB Message short term checkout non qualifying',
        async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
            await navigatePage({ account: 'DEV_GB_SHORT_TERM_CHECKOUT', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
            const messageIFrame = await loadMessage();
            await messageAxeCoreScan(messageIFrame);
        }
    );
});
messageTest.describe('@IT Short Term', () => {
    messageTest('IT Message short term non qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_IT_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest('IT Message short term qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_IT_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
});
messageTest.describe('@US Short Term', () => {
    messageTest('US Message short term non qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest('US Message short term qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest('US Message short term checkout', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
});
