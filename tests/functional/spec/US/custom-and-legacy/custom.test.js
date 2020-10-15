import createBannerTest from '../../createBannerTest';

describe('US > custom', () => {
    const viewport = {
        width: 600,
        height: 200
    };

    const runBannerTest = createBannerTest('US');

    // Logitech banner
    runBannerTest(viewport, {
        account: '6QXSKQZUKASMW',
        style: {
            layout: 'custom',
            markup: 'https://www.paypalobjects.com/upstream/assets/custom/6QXSKQZUKASMW-1.html'
        }
    });

    // Phoenix Suns banner
    runBannerTest(viewport, {
        account: 'S3STW9PF9H6MW',
        style: {
            layout: 'custom',
            markup: 'https://www.paypalobjects.com/upstream/assets/custom/S3STW9PF9H6MW-1.html'
        }
    });
});
