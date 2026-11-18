import setupTestPage from '../utils/setupTestPage';
import { selectors } from '../../v2/utils';

describe.each(['text', 'flex'])('Rewrite %s focus feedback', layout => {
    const mainSelector = layout === 'text' ? '.pp-message .main' : '.pp-flex__content';
    const actionSelector = layout === 'text' ? '.action__link' : '.pp-flex__action span';

    const setupMessage = async (rewrite = true) => {
        const { bannerElement } = await setupTestPage({
            testPage: 'banner.html',
            config: {
                account: 'DEV_US_SHORT_TERM',
                amount: 100,
                features: rewrite ? 'useRenderV2Message' : undefined,
                style: { layout, color: 'blue', ratio: '8x1', text: { color: 'black' } }
            }
        });
        const frame = await bannerElement.contentFrame();
        await frame.waitForSelector(rewrite ? '.pp-message' : '.message__content', { visible: true });
        expect(await frame.$eval('.message__messaging', el => el.dataset.testV2Renderer === 'true')).toBe(rewrite);
        await page.evaluate(() => {
            const before = document.createElement('button');
            before.id = 'focus-before';
            before.textContent = 'Before message';
            const after = document.createElement('button');
            after.id = 'focus-after';
            after.textContent = 'After message';
            const container = document.querySelector('.container');
            container.before(before);
            container.after(after);
        });
        return frame;
    };

    const dismissLoadingModal = async (keyboard = false) => {
        const modalElement = await page.waitForSelector('iframe[title^="Prerender PayPal Modal"]', { visible: true });
        const modalFrame = await modalElement.contentFrame();
        await modalFrame.waitForSelector('#prerender-close-btn', { visible: true });
        if (keyboard) {
            // The local fixture can focus the covered content modal before its loading overlay is removed.
            await modalFrame.focus('#prerender-close-btn');
            await page.keyboard.press('Enter');
        } else {
            await modalFrame.click('#prerender-close-btn');
        }
        await page.waitForSelector(selectors.modal.iframe, { hidden: true });
    };

    const expectMessageFocus = frame =>
        frame.waitForFunction(() => document.hasFocus() && document.activeElement.tagName === 'BUTTON');

    const expectFeedback = async (frame, underline) => {
        await frame.waitForFunction(
            (selector, expected) => getComputedStyle(document.querySelector(selector)).textDecorationLine === expected,
            { timeout: 5000 },
            mainSelector,
            underline ? 'underline' : 'none'
        );
        expect(await frame.$eval(actionSelector, el => getComputedStyle(el).textDecorationLine)).toBe('underline');
    };

    test('clears pointer feedback after dismissing the loading modal while restoring focus', async () => {
        const frame = await setupMessage();
        await frame.click('button');
        await dismissLoadingModal();
        await page.mouse.move(0, 0);
        await expectMessageFocus(frame);
        await expectFeedback(frame, false);
    });

    test('restores keyboard feedback on Tab and Shift+Tab after pointer input and clears it on exit', async () => {
        const frame = await setupMessage();
        await frame.click('button');
        await dismissLoadingModal();
        await page.click('#focus-before');
        await expectFeedback(frame, false);

        await page.keyboard.press('Tab');
        await expectMessageFocus(frame);
        await expectFeedback(frame, true);
        await page.keyboard.press('Tab');
        expect(await page.$eval('#focus-after', el => document.activeElement === el)).toBe(true);
        await expectFeedback(frame, false);

        await page.keyboard.down('Shift');
        await page.keyboard.press('Tab');
        await page.keyboard.up('Shift');
        await expectMessageFocus(frame);
        await expectFeedback(frame, true);
        await page.keyboard.down('Shift');
        await page.keyboard.press('Tab');
        await page.keyboard.up('Shift');
        expect(await page.$eval('#focus-before', el => document.activeElement === el)).toBe(true);
        await expectFeedback(frame, false);
    });

    test.each(['Enter', 'Space'])('preserves keyboard feedback after %s activation and modal dismissal', async key => {
        const frame = await setupMessage();
        await page.click('#focus-before');
        await page.keyboard.press('Tab');
        await expectMessageFocus(frame);
        await expectFeedback(frame, true);
        await page.keyboard.press(key);
        await dismissLoadingModal(true);
        await expectMessageFocus(frame);
        await expectFeedback(frame, true);
    });

    test('preserves legacy pointer focus styling', async () => {
        const frame = await setupMessage(false);
        await frame.click('.message__content');
        await dismissLoadingModal();
        await expectMessageFocus(frame);
        expect(await frame.$eval('.message__content', el => getComputedStyle(el).textDecorationLine)).toBe('underline');
    });
});
