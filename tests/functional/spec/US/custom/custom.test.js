import createBannerTest from '../../createBannerTest';

describe.skip('US > custom', () => {
    const viewport = {
        width: 600,
        height: 200
    };

    const runBannerTest = createBannerTest('US');

    // Logitech banner
    runBannerTest(viewport, {
        account: 'DEV0000000EAZ',
        style: {
            layout: 'custom',
            markup: 'https://www.paypalobjects.com/upstream/assets/custom/6QXSKQZUKASMW-1.html'
        }
    });

    // Phoenix Suns banner
    runBannerTest(viewport, {
        account: 'DEV00000000NI',
        style: {
            layout: 'custom',
            markup: 'https://www.paypalobjects.com/upstream/assets/custom/S3STW9PF9H6MW-1.html'
        }
    });

    // BBB banner
    runBannerTest(viewport, {
        account: 'DEV0000000GPL',
        style: {
            layout: 'custom',
            markup: 'https://www.paypalobjects.com/upstream/assets/custom/LZ25HUZDSKSPN-2.html'
        }
    });
});
