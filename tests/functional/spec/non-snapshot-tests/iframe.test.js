import setupTestPage from '../utils/setupTestPage';

describe('message inside another iframe', () => {
    const getPopup = async () => {
        const popup = await page
            .browser()
            .waitForTarget(target => target.url().includes('smart/modal'))
            .then(target => target.page());
        const closeButton = await popup.waitForSelector('button.close');

        return { popup, closeButton };
    };

    test('opens popup page', async () => {
        // eslint-disable-next-line no-console
        console.log(`Running test [iframe popup]`);
        page.on('pageerror', error => {
            // eslint-disable-next-line no-console
            console.log(`rerender.test page error for [iframe popup]`, error);
        });

        const { bannerFrame } = await setupTestPage({
            config: { account: 'DEV_US_MULTI' },
            testPage: 'iframe.html',
            frameName: 'message iframe'
        });

        await bannerFrame.click('button');

        const { popup: popup1, closeButton: closeButton1 } = await getPopup();

        expect(popup1).not.toBeUndefined();
        expect(popup1).not.toBe(page);

        await closeButton1.click();

        await new Promise(res => setTimeout(res, 1000));

        expect(popup1.isClosed()).toBe(true);

        // Re-open the modal

        await bannerFrame.click('button');

        const { popup: popup2, closeButton: closeButton2 } = await getPopup();

        expect(popup2).not.toBeUndefined();
        expect(popup2).not.toBe(page);
        expect(popup2).not.toBe(popup1);

        await closeButton2.click();

        await new Promise(res => setTimeout(res, 1000));

        expect(popup2.isClosed()).toBe(true);
    });
});
