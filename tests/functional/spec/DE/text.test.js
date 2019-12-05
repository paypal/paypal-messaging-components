import createBannerTest from '../createBannerTest';
import accounts from './accounts';

describe('DE > text', () => {
    const viewport = {
        width: 1000,
        height: 100
    };

    const runBannerTest = createBannerTest(viewport, 'DE');

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

            // Each valid logo type
            ['primary', 'alternative', 'inline', 'none'].forEach(type => {
                runBannerTest(
                    getConfig({
                        logo: {
                            type
                        }
                    })
                );
            });

            // Each font size option logo.type-primary
            for (let size = 10; size <= 16; size += 1) {
                runBannerTest(
                    getConfig({
                        logo: {
                            type: 'primary'
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
                            type
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
