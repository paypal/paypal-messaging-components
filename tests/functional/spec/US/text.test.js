import createBannerTest from '../createBannerTest';
import accounts from './accounts';

describe('US > text', () => {
    const viewport = {
        width: 600,
        height: 100
    };

    const runBannerTest = createBannerTest('US');

    accounts.forEach(account => {
        describe(account, () => {
            const getConfig = style => ({
                account,
                style: {
                    layout: 'text',
                    ...style
                }
            });

            // Each valid logo combination
            ['primary', 'alternative'].forEach(type => {
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

            ['inline', 'none'].forEach(type => {
                runBannerTest(
                    viewport,
                    getConfig({
                        logo: {
                            type
                        }
                    })
                );
            });

            // Each font size option logo.type-alternative_logo.position-left
            [10, 12, 16].forEach(size => {
                runBannerTest(
                    viewport,
                    getConfig({
                        logo: {
                            type: 'alternative',
                            position: 'left'
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
                            type,
                            position: 'left'
                        },
                        text: {
                            color: 'white'
                        }
                    })
                );
            });

            // Each logo type, logo.position-left_text.color-monochrome
            ['primary', 'alternative', 'inline', 'none'].forEach(type => {
                runBannerTest(
                    viewport,
                    getConfig({
                        logo: {
                            type,
                            position: 'left'
                        },
                        text: {
                            color: 'monochrome'
                        }
                    })
                );
            });

            // Each logo type, logo.position-left_text.color-grayscale
            ['primary', 'alternative', 'inline', 'none'].forEach(type => {
                runBannerTest(
                    viewport,
                    getConfig({
                        logo: {
                            type,
                            position: 'left'
                        },
                        text: {
                            color: 'grayscale'
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
