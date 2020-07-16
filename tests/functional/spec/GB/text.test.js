import createBannerTest from '../createBannerTest';
import accounts from './accounts';

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

            // Logo type primary and all valid logo position options
            ['primary'].forEach(type => {
                ['top', 'left', 'right'].forEach(position => {
                    runBannerTest(
                        viewport,
                        getConfig({
                            logo: {
                                position,
                                type
                            }
                        })
                    );
                });
            });

            // Logo types that do not have different logo position options
            ['alternative', 'inline', 'none'].forEach(type => {
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
