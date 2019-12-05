import createBannerTest from '../createBannerTest';
import accounts from './accounts';

describe('US > text', () => {
    const viewport = {
        width: 600,
        height: 100
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
                    layout: 'text',
                    ...style
                }
            });

            // Each valid logo combination
            ['primary', 'alternative'].forEach(type => {
                ['top', 'left', 'right'].forEach(position => {
                    runBannerTest(
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
                    getConfig({
                        logo: {
                            type
                        }
                    })
                );
            });

            // Each font size option logo.type-alternative_logo.position-left
            for (let size = 10; size <= 16; size += 1) {
                runBannerTest(
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
            }

            // Each logo type, logo.position-left_text.color-white
            ['primary', 'alternative', 'inline', 'none'].forEach(type => {
                runBannerTest(
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
        });
    });
});
