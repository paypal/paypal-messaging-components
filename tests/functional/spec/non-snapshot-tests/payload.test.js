import packageConfig from '../../../../package.json';
import { bannerStyles } from '../utils/testStylesConfig';
import selectors from '../utils/selectors';
import setupTestPage from '../utils/setupTestPage';

const EVENT_TYPES = ['MORS', 'click', 'hover', 'modal-close', 'modal-render', 'modal-open', 'stats', 'scroll'];

const createSpy = async () => {
    const spy = { matchingStats: [], meta: {} };
    page.on('request', request => {
        const url = request.url();
        const postDataString = request.postData();
        if (url.includes('log') && postDataString) {
            const postData = JSON.parse(postDataString);

            // eslint-disable-next-line camelcase
            const hasEvent = postData.tracking?.filter(({ event_type }) => EVENT_TYPES.includes(event_type));
            if (hasEvent) {
                spy.meta = { ...spy.meta, ...postData.meta };
                spy.matchingStats = spy.matchingStats.concat(postData.tracking);
            }
        }
    });
    return spy;
};

const clickBanner = async bannerFrame => {
    await bannerFrame.click(selectors.banner.messageMessaging);
    await page.waitForSelector(selectors.modal.iframe, { visible: true });
    await page.waitFor(5 * 1000);
};

const runTest = async ({
    testName,
    testPage = 'banner.html',
    statName,
    config,
    callback,
    matchObjects = [],
    matchMeta = []
}) => {
    // eslint-disable-next-line no-console
    console.log(`Running test [${testName}]`);
    page.on('pageerror', error => {
        // eslint-disable-next-line no-console
        console.log(`payload.test page error for [${testName}]`, error);
    });

    const payloadSpy = await createSpy();
    const { bannerFrame, modalFrame } = await setupTestPage({ config, testPage });

    await page.waitFor(5 * 1000);
    if (callback) await callback({ bannerFrame, modalFrame });
    await page.waitFor(15 * 1000);

    const { matchingStats, meta } = payloadSpy;
    matchObjects.forEach(matchObject => {
        // eslint-disable-next-line camelcase
        const { link, event_type } = matchObject;
        const matchingStat = matchingStats.find(stat =>
            // eslint-disable-next-line camelcase
            typeof link === 'string' ? stat.link === link : stat.event_type === event_type
        );

        if (!matchingStat) {
            // eslint-disable-next-line no-console
            console.error(`[${statName || testName}] stat not found, sent stats:`, matchingStats);
        }

        expect(matchingStat).toBeDefined();
        expect(matchingStat).toMatchObject(matchObject);
    });

    matchMeta.forEach(matchObject => {
        const { type } = matchObject;

        const matchingMeta = Object.values(meta).find(metaEntry => metaEntry.type === type);

        if (!matchingMeta) {
            // eslint-disable-next-line no-console
            console.error(`[${statName || testName}] meta not found, sent meta:`, meta);
        }

        expect(matchingMeta).toBeDefined();
        expect(matchingMeta).toMatchObject(matchObject);
    });
};

describe('payload testing', () => {
    const config = {
        account: 'DEV0000000EAZ',
        amount: 500,
        style: bannerStyles[0]
    };

    test('initial payload', async () => {
        await runTest({
            testName: 'initial payload',
            config,
            matchMeta: [
                {
                    type: 'message',
                    messageRequestId: expect.any(String),
                    account: config.account,
                    displayedMessage: expect.any(String)
                },
                {
                    type: 'modal',
                    messageRequestId: expect.any(String),
                    account: config.account,
                    displayedMessage: expect.any(String)
                },
                { integration_type: 'STANDALONE', messaging_version: packageConfig.version }
            ],
            matchObjects: [
                {
                    index: expect.any(String),
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'stats',
                    pos_x: '0',
                    pos_y: '0',
                    browser_width: '800',
                    browser_height: '600',
                    visible: 'true',
                    active_tags: expect.any(String),
                    adblock: 'false',
                    blocked: 'false',
                    first_render_delay: expect.stringNumber(),
                    timestamp: expect.any(Number)
                },
                {
                    index: expect.any(String),
                    event_type: 'modal-render',
                    modal: expect.stringMatching(/(NI)|(EZP)|(INST)/i),
                    first_modal_render_delay: expect.stringNumber(),
                    timestamp: expect.any(Number)
                },
                {
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'page_loaded',
                    script_load_delay: expect.stringNumber(),
                    dom_load_delay: expect.stringNumber(),
                    page_load_delay: expect.stringNumber(),
                    timestamp: expect.any(Number)
                }
            ]
        });
    });

    test('scroll stat sent if below fold', async () => {
        await page.viewport({ width: 600, height: 200 });
        await runTest({
            testName: 'scroll stat sent if below fold',
            testPage: 'banner-scroll.html',
            config,
            callback: async () => {
                await page.evaluate(() => window.scrollBy(0, 1000));
                await page.waitFor(5 * 1000);
            },
            matchObjects: [
                {
                    index: expect.any(String),
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'scroll',
                    visible: 'true'
                }
            ]
        });
    });

    test('click stat sent', async () => {
        await runTest({
            testName: 'click stat sent',
            config,
            callback: async ({ bannerFrame }) => {
                await clickBanner(bannerFrame);
            },
            matchObjects: [
                {
                    index: expect.any(String),
                    et: 'CLICK',
                    event_type: 'click',
                    link: 'Banner Wrapper'
                },
                {
                    index: expect.any(String),
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'modal-open'
                }
            ]
        });
    });

    test('hover stat sent', async () => {
        await runTest({
            testName: 'hover stat sent',
            config,
            callback: async ({ bannerFrame }) => {
                await bannerFrame.hover('.message__messaging');
            },
            matchObjects: [
                {
                    index: expect.any(String),
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'hover'
                }
            ]
        });
    });

    test.todo('fix modal calculate stat sent');
    test.skip('modal calculate stat sent', async () => {
        await runTest({
            testName: 'modal calculate stat sent',
            config,
            callback: async ({ bannerFrame, modalFrame }) => {
                await clickBanner(bannerFrame);
                await modalFrame.click(selectors.calculator.calcInput, { clickCount: 3 });
                await modalFrame.type(selectors.calculator.calcInput, '650');
                // TODO: find a fix for this request
                // After clicking, test fails due to this request failing:
                // https://localhost.paypal.com:8080/smart-credit-common.js
                await modalFrame.click(selectors.button.btnSecondary);
            },
            matchObjects: [
                {
                    index: expect.any(String),
                    et: 'CLICK',
                    event_type: 'click',
                    link: 'Calculator',
                    amount: expect.any(String)
                }
            ]
        });
    });

    test('modal click stat sent', async () => {
        await runTest({
            testName: 'modal click stat sent',
            config,
            callback: async ({ bannerFrame, modalFrame }) => {
                await clickBanner(bannerFrame);
                await modalFrame.click(selectors.button.contentHeader);
            },
            matchObjects: [
                {
                    index: expect.any(String),
                    et: 'CLICK',
                    event_type: 'click',
                    link: 'Apply Now'
                }
            ]
        });
    });

    test('modal close stat sent', async () => {
        await runTest({
            testName: 'modal close stat sent',
            config,
            callback: async ({ bannerFrame, modalFrame }) => {
                await clickBanner(bannerFrame);
                await modalFrame.click(selectors.button.closeBtn);
            },
            matchObjects: [
                {
                    index: expect.any(String),
                    et: 'CLICK',
                    event_type: 'modal-close',
                    link: 'Close Button'
                }
            ]
        });
    });
});
