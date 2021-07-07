import { bannerStyles } from '../utils/testStylesConfig';
import setupTestPage from '../utils/setupTestPage';

const runTest = async ({ testName, testPage = 'banner.html', config, callback }) => {
    // eslint-disable-next-line no-console
    console.log(`Running test [${testName}]`);
    page.on('pageerror', error => {
        // eslint-disable-next-line no-console
        console.log(`rerender.test page error for [${testName}]`, error);
    });

    await setupTestPage({ config, testPage });

    // Set a global account on the test page so that a new element has one to use
    await page.evaluate(account => {
        window.paypal.Messages.setGlobalConfig({
            account
        });
    }, config.account);

    await page.waitFor(5 * 1000);
    await callback();
    await page.waitFor(15 * 1000);

    const bannerContainers = await page.$$('[data-pp-id]');
    expect(bannerContainers.length).toBe(2);
};

describe('dynamic attribute detection testing', () => {
    const config = {
        account: 'DEV0000000GPL',
        amount: 500,
        style: bannerStyles[0]
    };

    test('new element with data-pp-message', async () => {
        await runTest({
            config,
            testName: 'new element',
            callback: async () => {
                await page.evaluate(() => {
                    const div = document.createElement('div');
                    div.setAttribute('data-pp-message', '');
                    document.body.appendChild(div);
                });
            }
        });
    });

    test('existing element with data-pp-message added', async () => {
        await runTest({
            config,
            testName: 'existing element',
            callback: async () => {
                await page.evaluate(async () => {
                    const div = document.createElement('div');
                    document.body.appendChild(div);

                    await new Promise(resolve => setTimeout(resolve, 2000));

                    div.setAttribute('data-pp-message', '');
                });
            }
        });
    });
});
