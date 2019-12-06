import createBannerTest from '../createBannerTest';

describe('US > legacy', () => {
    const viewport = {
        width: 1000,
        height: 400
    };

    const runBannerTest = createBannerTest(viewport, 'US', true);

    beforeAll(async () => {
        await page.setViewport(viewport);
    });

    // NI
    ['168x374', '340x60', '765x60', '1000x50', '234x100', '1000x36', '310x100'].forEach(dimensions => {
        runBannerTest({
            account: 'DEV00000000NI',
            style: {
                layout: 'legacy',
                dimensions
            }
        });
    });

    // EZP accounts chosen based on common usage
    ['DEV0000000EAZ', 'DEV0000000PSZ'].forEach(account => {
        [
            '1000x36',
            '120x90',
            '234x60',
            '250x250',
            '300x50',
            '340x60',
            '468x60',
            '728x90',
            '540x200',
            '170x100'
        ].forEach(dimensions => {
            runBannerTest({
                account,
                style: {
                    layout: 'legacy',
                    dimensions
                }
            });
        });
    });
});
