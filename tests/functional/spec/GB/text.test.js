import createBannerTest from '../createBannerTest';
import accounts from './acounts';

describe('GB > text', () => {
    const viewport = {
        width: 1000,
        height: 100
    };

    const runBannerTest = createBannerTest('GB');

    accounts.forEach(account => {
        describe(account, () => {
            const getConfig = style => ({
                account,
                style: {
                    layout: 'text',
                    ...style
                }
            });

            // Each valid logo type
            ['primary', 'alternative', 'inline', 'none'].forEach(type => {
                runBannerTest(
                    viewport,
                    getConfig({
                        logo: {
                            type
                        }
                    })
                );
            });

            // Each font size option logo.type-primary
            [10, 12, 16].forEach(size => {
                runBannerTest(
                    viewport,
                    getConfig({
                        logo: {
                            type: 'primary'
                        },
                        text: {
                            size
                        }
                    })
                );
            });

            // Each logo type, logo.position-left_text.color-white
            ['primary', 'alternative', 'inline', 'none'].forEach(type => {
                runBannerTest(
                    viewport,
                    getConfig({
                        logo: {
                            type
                        },
                        text: {
                            color: 'white'
                        }
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
