import setupTestPage from '../utils/setupTestPage';

describe('message inside another iframe', () => {
    test('opens lander page', async () => {
        // eslint-disable-next-line no-console
        console.log(`Running test [iframe]`);
        page.on('pageerror', error => {
            // eslint-disable-next-line no-console
            console.log(`rerender.test page error for [iframe]`, error);
        });

        const { bannerFrame } = await setupTestPage({
            config: { account: 'DEV0000000GPL' },
            testPage: 'iframe.html',
            frameName: 'message iframe'
        });

        await page.waitFor(2 * 1000);

        await bannerFrame.click('button');

        await page.waitFor(2 * 1000);

        const lander = (await page.browser().pages()).find(page => page.url().includes('/ptrk'));

        expect(lander).not.toBeUndefined();
    });
});
