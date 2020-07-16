import createBannerTest from '../createBannerTest';
import accounts from './accounts';

describe('GB > flex', () => {
    const viewport = {
        width: 1100,
        height: 700
    };

    const runBannerTest = createBannerTest('GB');

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
                const config = getConfig({
                    ratio,
                    color: 'blue'
                });

                runBannerTest(viewport, config);

                // Small viewport
                runBannerTest(
                    {
                        width: 100,
                        height: 700
                    },
                    config
                );

                // Medium viewport
                runBannerTest(
                    {
                        width: 400,
                        height: 700
                    },
                    config
                );
            });

            // Each additional background color option, ratio-1x1
            ['black', 'white', 'gray', 'white-no-border'].forEach(color => {
                runBannerTest(
                    viewport,
                    getConfig({
                        ratio: '1x1',
                        color
                    })
                );
            });

            // Small viewport
            runBannerTest(
                {
                    width: 200,
                    height: 100
                },
                getConfig({
                    logo: {
                        type: 'primary',
                        position: 'left'
                    }
                })
            );
        });
    });
});
