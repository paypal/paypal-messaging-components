import createBannerTest from '../createBannerTest';
import accounts from './accounts';

describe('US > flex', () => {
    const viewport = {
        width: 1100,
        height: 700
    };

    const runBannerTest = createBannerTest(viewport, 'US');

    beforeAll(async () => {
        await page.setViewport(viewport);
    });

    accounts.forEach(account => {
        describe(account, () => {
            const getConfig = style => ({
                account,
                style: {
                    layout: 'flex',
                    ...style
                }
            });

            // Each valid ratio
            ['1x1', '1x4', '8x1', '20x1'].forEach(ratio => {
                runBannerTest(
                    getConfig({
                        ratio,
                        color: 'blue'
                    })
                );
            });

            // Each additional background color option, ratio-1x1
            ['black', 'white', 'gray', 'white-no-border'].forEach(color => {
                runBannerTest(
                    getConfig({
                        ratio: '1x1',
                        color
                    })
                );
            });
        });
    });
});
