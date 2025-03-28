import packageConfig from '../../../../package.json';
import { bannerStyles } from '../utils/testStylesConfig';
import { selectors } from '../../v2/utils';
import setupTestPage from '../utils/setupTestPage';

const EVENT_TYPES = ['MORS', 'modal_rendered', 'message_hovered', 'modal_close', 'modal_viewed', 'scroll'];

const createSpy = async () => {
    const spy = { components: {}, matchingComponentEvents: [] };
    page.on('request', request => {
        const url = request.url();
        const postDataString = request.postData();
        if (url.includes('glog') && postDataString) {
            const postData = JSON.parse(postDataString);

            const events = postData.data?.components.reduce((acc, component) => {
                return acc.concat(component.component_events);
            }, []);

            // eslint-disable-next-line camelcase
            const hasEvent = events.filter(({ event_type }) => EVENT_TYPES.includes(event_type));
            if (hasEvent) {
                spy.components = { ...spy.components, ...postData.data?.components };
                spy.data = postData.data;
                spy.matchingEvents = postData.data?.events;
                spy.matchingComponentEvents = spy.matchingComponentEvents.concat(events);
            }
        }
    });
    return spy;
};

const runTest = async ({
    testName,
    testPage = 'banner.html',
    statName,
    config,
    callback,
    matchData = {},
    matchEvents = [],
    matchComponents = [],
    matchComponentEvents = []
}) => {
    // eslint-disable-next-line no-console
    console.log(`Running test [${testName}]`);
    page.on('pageerror', error => {
        // eslint-disable-next-line no-console
        console.log(`payload.test page error for [${testName}]`, error);
    });

    const payloadSpy = await createSpy();
    const { bannerFrame, openModal } = await setupTestPage({ config, testPage });
    const { modalFrame } = await openModal();

    await page.waitFor(5 * 1000);
    if (callback) await callback({ bannerFrame, modalFrame });
    await page.waitFor(15 * 1000);

    const { data, matchingEvents, components, matchingComponentEvents } = payloadSpy;

    expect(data).toBeDefined();
    expect(data).toMatchObject(matchData);

    matchEvents.forEach(matchEvent => {
        // eslint-disable-next-line camelcase
        const { event_type } = matchEvent;
        // eslint-disable-next-line camelcase
        const matchingEvent = matchingEvents.find(event => event.event_type === event_type);

        if (!matchingEvent) {
            // eslint-disable-next-line no-console
            console.error(`[${testName}] event not found, sent events:`, matchingEvents);
        }

        expect(matchingEvent).toBeDefined();
        expect(matchingEvent).toMatchObject(matchEvent);
    });

    matchComponentEvents.forEach(matchObject => {
        // eslint-disable-next-line camelcase
        const { page_view_link_name, event_type } = matchObject;
        const matchingComponentEvent = matchingComponentEvents.find(stat =>
            // eslint-disable-next-line camelcase
            typeof page_view_link_name === 'string'
                ? // eslint-disable-next-line camelcase
                  stat.page_view_link_name === page_view_link_name
                : // eslint-disable-next-line camelcase
                  stat.event_type === event_type
        );

        if (!matchingComponentEvent) {
            // eslint-disable-next-line no-console
            console.error(
                `[${statName || testName}] component_event not found, sent component_events:`,
                matchingComponentEvents
            );
        }

        expect(matchingComponentEvent).toBeDefined();
        expect(matchingComponentEvent).toMatchObject(matchObject);
    });

    matchComponents.forEach(matchObject => {
        // eslint-disable-next-line camelcase
        const { component_type } = matchObject;

        const matchingComponent = Object.values(components).find(
            // eslint-disable-next-line camelcase
            componentEntry => componentEntry.component_type === component_type
        );

        if (!matchingComponent) {
            // eslint-disable-next-line no-console
            console.error(`[${statName || testName}] component not found, sent components:`, matchingComponent);
        }

        expect(matchingComponent).toBeDefined();
        expect(matchingComponent).toMatchObject(matchObject);
    });
};

describe('payload testing', () => {
    const config = {
        account: 'DEV_US_NO_INTEREST',
        amount: 500,
        style: bannerStyles[0]
    };

    test('initial payload', async () => {
        await runTest({
            testName: 'initial payload',
            config,
            matchData: {
                merchant_id: config.account,
                integration_version: packageConfig.version,
                integration_type: 'STANDALONE'
            },
            matchEvents: [],
            matchComponents: [
                {
                    component_type: 'message',
                    instance_id: expect.any(String)
                },
                {
                    component_type: 'modal',
                    instance_id: expect.any(String)
                }
            ],
            matchComponentEvents: [
                {
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'message_rendered',
                    first_render_delay: expect.stringNumber(),
                    timestamp: expect.any(Number),
                    render_duration: expect.any(String),
                    request_duration: expect.any(String)
                },
                {
                    index: expect.any(String),
                    event_type: 'modal_rendered',
                    modal: expect.stringMatching(/(NI)|(NO_INTEREST)/i),
                    first_modal_render_delay: expect.stringNumber(),
                    timestamp: expect.any(Number),
                    render_duration: expect.any(String)
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
            matchComponentEvents: [
                {
                    index: expect.any(String),
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'scroll',
                    visible: 'true',
                    timestamp: expect.any(Number),
                    render_duration: expect.any(String),
                    request_duration: expect.any(String)
                }
            ]
        });
    });

    test('click stat sent', async () => {
        await runTest({
            testName: 'click stat sent',
            config,
            matchComponentEvents: [
                {
                    index: expect.any(String),
                    et: 'CLICK',
                    event_type: 'message_clicked',
                    page_view_link_name: 'Banner Wrapper',
                    timestamp: expect.any(Number),
                    render_duration: expect.any(String),
                    request_duration: expect.any(String)
                },
                {
                    index: expect.any(String),
                    refIndex: expect.any(String),
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'modal_viewed',
                    src: 'show',
                    timestamp: expect.any(Number)
                }
            ]
        });
    });

    test('hover stat sent', async () => {
        await runTest({
            testName: 'hover stat sent',
            config,
            callback: async () => {
                await page.hover(selectors.message.messageIframe);
            },
            matchObjematchComponentEventscts: [
                {
                    index: expect.any(String),
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'message_hovered',
                    timestamp: expect.any(Number),
                    render_duration: expect.any(String),
                    request_duration: expect.any(String)
                }
            ]
        });
    });

    test('modal click stat sent', async () => {
        await runTest({
            testName: 'modal click stat sent',
            config,
            matchComponentEvents: [
                {
                    index: expect.any(String),
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'modal_rendered',
                    timestamp: expect.any(Number)
                }
            ]
        });
    });

    test('modal close stat sent', async () => {
        await runTest({
            testName: 'modal close stat sent',
            config,
            callback: async ({ modalFrame }) => {
                await modalFrame.click(selectors.modal.button.close);
            },
            matchComponentEvents: [
                {
                    index: expect.any(String),
                    et: 'CLICK',
                    event_type: 'modal_close',
                    page_view_link_name: 'Close Button'
                }
            ]
        });
    });
});
