import { messageTest } from '../../../pages/messages_fixture';

messageTest.describe('@AU Short Term', () => {
    messageTest('AU Message short term non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_AU_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('AU Message short term qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_AU_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']);
    });
});
messageTest.describe('@ES Short Term', () => {
    messageTest('ES Message short term non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_ES_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('ES Message short term qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_ES_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
});
messageTest.describe('@FR Short Term', () => {
    messageTest('FR Message short term non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('FR Message short term qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_FR_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
});
messageTest.describe('@GB Short Term', () => {
    messageTest('GB Message short term non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('GB Message short term qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('GB Message short term checkout qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_GB_SHORT_TERM_CHECKOUT', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });

    messageTest(
        'GB Message short term checkout non qualifying',
        async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
            await navigatePage({ account: 'DEV_GB_SHORT_TERM_CHECKOUT', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
            const messageIFrame = await loadMessage();
            await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
        }
    );
});
messageTest.describe('@IT Short Term', () => {
    messageTest('IT Message short term non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_IT_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('IT Message short term qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_IT_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
});
messageTest.describe('@US Short Term', () => {
    messageTest('US Message short term non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('US Message short term qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('US Message short term checkout', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
});
