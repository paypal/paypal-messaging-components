import { getSDKAttributes } from '@paypal/sdk-client/src';

import createContainer from 'utils/createContainer';
import { runStats, buildStatsPayload } from 'src/utils/stats';
import { logger } from 'src/utils/logger';
import { getGlobalState } from 'src/utils/global';
import { checkAdblock } from 'src/utils/adblock';

jest.mock('src/utils/logger', () => ({
    logger: {
        track: jest.fn(),
        addMetaBuilder: jest.fn()
    }
}));

jest.mock('src/utils/global', () => {
    const globalUtils = jest.requireActual('src/utils/global');
    return {
        ...globalUtils,
        getGlobalState: jest.fn()
    };
});

jest.mock('src/utils/adblock', () => ({
    checkAdblock: jest.fn().mockResolvedValue('true')
}));

jest.mock('@paypal/sdk-client/src', () => ({
    getSDKAttributes: jest.fn().mockReturnValue({ 'data-partner-attribution-id': 'some-partner-id' })
}));

window.getComputedStyle = () => ({
    getPropertyValue: () => 'auto'
});

const intersectionObserverMock = () => ({
    observe: () => null
});

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

const addEventListener = window.addEventListener.bind(window);
const removeEventListener = window.removeEventListener.bind(window);
window.addEventListener = jest.fn((...args) => addEventListener(...args));
window.removeEventListener = jest.fn((...args) => removeEventListener(...args));

const start = Date.now();

describe('stats', () => {
    const index = '1';

    // Attributes required to be attached to stats event
    const statsEvent = {
        index: expect.stringNumber(),
        et: 'CLIENT_IMPRESSION',
        event_type: 'stats',
        first_render_delay: expect.stringNumber()
    };

    const defaultProps = {
        index,
        pos_x: '100',
        pos_y: '30',
        browser_width: '1024',
        browser_height: '768',
        adblock: 'true',
        blocked: 'true',
        visible: 'true',
        active_tags: expect.any(String),
        render_duration: expect.stringNumber(),
        request_duration: expect.stringNumber(),
        first_render_delay: expect.stringNumber()
    };

    const messagesMap = new Map();

    beforeAll(() => {
        getGlobalState.mockReturnValue({ messagesMap });
    });

    const INTEGRATION_TYPE = 'STANDALONE';

    beforeEach(() => {
        __MESSAGES__.__TARGET__ = INTEGRATION_TYPE;
    });

    afterEach(() => {
        document.body.innerHTML = '';

        logger.track.mockReset();
        logger.addMetaBuilder.mockReset();

        checkAdblock.mockClear();
    });

    test('Fires standard payload and attaches events', async () => {
        const { container } = createContainer('iframe');
        container.getBoundingClientRect = () => ({
            left: 100,
            right: 20,
            top: 30,
            bottom: 25
        });
        messagesMap.set(container, { state: { renderStart: start } });

        runStats({ container, activeTags: '', index, requestDuration: -1 });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(logger.track).toHaveBeenCalledTimes(2);
        // Page load
        expect(logger.track).toHaveBeenCalledWith({
            dom_load_delay: '-1',
            et: 'CLIENT_IMPRESSION',
            event_type: 'page_loaded',
            page_load_delay: '-1',
            script_load_delay: '-1'
        });

        expect(logger.track).toHaveBeenCalledWith(statsEvent);
        expect(window.addEventListener).not.toHaveBeenCalled();
    });

    test('Fires payload with sdk attributes', async () => {
        __MESSAGES__.__TARGET__ = 'SDK';
        const { container } = createContainer('iframe');
        container.getBoundingClientRect = () => ({
            left: 100,
            right: 20,
            top: 30,
            bottom: 25
        });
        messagesMap.set(container, { state: { renderStart: start } });

        runStats({ container, activeTags: '', index, requestDuration: 0 });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(getSDKAttributes).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(statsEvent);
        expect(window.addEventListener).not.toHaveBeenCalled();
    });

    test('Fires scroll event when loads outside of the viewport fold and scrolls into view', async () => {
        window.innerHeight = 747;

        const { container } = createContainer('iframe');
        container.getBoundingClientRect = () => ({
            left: 968,
            right: 1348,
            top: 28,
            bottom: 49
        });
        messagesMap.set(container, { state: { renderStart: start } });

        const payload = {
            ...defaultProps,
            pos_x: '968',
            pos_y: '28',
            browser_width: '1024',
            browser_height: '747',
            visible: 'false'
        };

        runStats({ container, activeTags: '', index, requestDuration: 1 });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(statsEvent);
        expect(payload.visible).toBe('false');
        if (payload.visible === 'true') {
            expect(logger.track).toHaveBeenCalledWith({
                index,
                et: 'CLIENT_IMPRESSION',
                event_type: 'scroll',
                visible: 'true'
            });
        }
    });

    describe('buildStatsPayload', () => {
        it('Builds the expected payload', async () => {
            window.innerHeight = defaultProps.browser_height;

            const { container } = createContainer('iframe');

            // Pull out attributes from defaultProps that are not returned by the base buildStatsPayload
            const {
                et,
                event_type: evntType,
                first_render_delay: frd,
                render_duration: rd,
                request_duration: rqd,
                ...expectedPayload
            } = defaultProps;

            container.getBoundingClientRect = () => ({
                left: 100,
                right: 20,
                top: 30,
                bottom: 25
            });

            messagesMap.set(container, { state: { renderStart: start } });

            const statsPayload = await buildStatsPayload({
                container,
                activeTags: 'headline:MEDIUM::subheadline:NONE::disclaimer:NONE',
                index: '1',
                requestDuration: rqd
            });

            expect(statsPayload).toMatchObject(expectedPayload);
            expect(statsPayload).toMatchInlineSnapshot(`
                Object {
                  "active_tags": "headline:MEDIUM::subheadline:NONE::disclaimer:NONE",
                  "adblock": "true",
                  "blocked": "true",
                  "bn_code": undefined,
                  "browser_height": "768",
                  "browser_width": "1024",
                  "index": "1",
                  "pos_x": "100",
                  "pos_y": "30",
                  "render_duration": undefined,
                  "request_duration": "NaN",
                  "visible": "true",
                }
            `);
        });
    });

    // it('Builds the expected payload', async () => {
    //     // pageLoaded
    //     // message1Rendered
    //     // message1Hovered
    //     // message2Rendered
    //     // message3Rendered
    //     // message4Rendered
    //     // message3Hovered
    //     // message3Clicked
    //     // modalRendered
    //     // modalViewed

    //     // stats -> message_rendered

    //     // const statsPayload = await buildStatsPayload({
    //     //     container,
    //     //     activeTags: 'headline:MEDIUM::subheadline:NONE::disclaimer:NONE',
    //     //     index: '1',
    //     //     requestDuration: rqd
    //     // });

    //     const positionData = [
    //         { pos_x: '33', pos_y: '236', browser_width: '712', browser_height: '888' },

    //         { pos_x: '33', pos_y: '419', browser_width: '712', browser_height: '888' },

    //         { pos_x: '33', pos_y: '585', browser_width: '712', browser_height: '888' },

    //         { pos_x: '33', pos_y: '734', browser_width: '712', browser_height: '888' }
    //     ];

    //     const messageContainers = [null, null, null, null].map((_, index) => {
    //         const { container } = createContainer('iframe');

    //         container.getBoundingClientRect = () =>
    //             positionData[index];
    //             // {
    //             //     left: 100,
    //             //     right: 20,
    //             //     top: 30,
    //             //     bottom: 25
    //             // }

    //         messagesMap.set(container, { state: { renderStart: start } });

    //         // onReady
    //         logger.addMetaBuilder(existingMeta => {
    //             // Remove potential existing meta info
    //             // Necessary because beaver-logger will not override an existing meta key if these values change
    //             // eslint-disable-next-line no-param-reassign
    //             delete existingMeta[index];

    //             // Need to capture existing attributes under global before destroying
    //             const { global: existingGlobal = {} } = existingMeta;
    //             // eslint-disable-next-line no-param-reassign
    //             delete existingMeta.global;

    //             return {
    //                 // Need to merge global attribute here due to preserve performance attributes
    //                 global: {
    //                     ...existingGlobal,
    //                     ts: tsCookie,
    //                     // deviceID from internal iframe storage
    //                     // should be populated previously by the treatments component
    //                     deviceID: getOrCreateDeviceID(),
    //                     // Session ID from parent local storage,
    //                     sessionID: getSessionID()
    //                 },
    //                 [index]: {
    //                     type: 'message',
    //                     messageRequestId,
    //                     account: merchantId || account,
    //                     partnerClientId,
    //                     trackingDetails
    //                 }
    //             };
    //         });
    //         runStats
    //             buildStatsPayload
    //                 logger.track({
    //                     index,
    //                     et: 'CLIENT_IMPRESSION',
    //                     event_type: 'stats',
    //                     first_render_delay: frd
    //                 });

    //         return container
    //     });

    //     const messageClickedIndex = '3';

    //     onClick
    //         logger.track({
    //             index:messageClickedIndex,
    //             et: 'CLICK',
    //             event_type: 'MORS'
    //         });

    //         logger.track({
    //             index:messageClickedIndex,
    //             et: 'CLICK',
    //             event_type: 'click',
    //             link: 'Banner Wrapper'
    //         });

    //     messageContainers.forEach(container=>{

    //     })

    //     expect(statsPayload).toMatchObject({
    //         meta: {
    //             1: {
    //                 type: 'message',
    //                 messageRequestId: expect.toBeUid(),
    //                 account: 'NL9LCZLBWJVRE',
    //                 trackingDetails: {
    //                     payload:
    //                         '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'
    //                 },
    //                 stats: {
    //                     index: '1',
    //                     adblock: 'false',
    //                     blocked: 'false',
    //                     pos_x: '33',
    //                     pos_y: '236',
    //                     browser_width: '712',
    //                     browser_height: '888',
    //                     visible: 'true',
    //                     active_tags: 'headline:XSMALL::subheadline:NONE::disclaimer:NONE',
    //                     request_duration: expect.stringNumber(),
    //                     render_duration: expect.stringNumber()
    //                 }
    //             },
    //             2: {
    //                 type: 'modal',
    //                 messageRequestId: expect.toBeUid(),
    //                 account: 'NL9LCZLBWJVRE',
    //                 trackingDetails: {
    //                     payload:
    //                         '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'
    //                 }
    //             },
    //             3: {
    //                 type: 'message',
    //                 messageRequestId: expect.toBeUid(),
    //                 account: 'NL9LCZLBWJVRE',
    //                 trackingDetails: {
    //                     payload:
    //                         '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'
    //                 },
    //                 stats: {
    //                     index: '3',
    //                     adblock: 'false',
    //                     blocked: 'false',
    //                     pos_x: '33',
    //                     pos_y: '419',
    //                     browser_width: '712',
    //                     browser_height: '888',
    //                     visible: 'true',
    //                     active_tags: 'headline:XSMALL::subheadline:NONE::disclaimer:NONE',
    //                     request_duration: expect.stringNumber(),
    //                     render_duration: expect.stringNumber()
    //                 }
    //             },
    //             4: {
    //                 type: 'message',
    //                 messageRequestId: expect.toBeUid(),
    //                 account: 'NL9LCZLBWJVRE',
    //                 trackingDetails: {
    //                     payload:
    //                         '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'
    //                 },
    //                 stats: {
    //                     index: '4',
    //                     adblock: 'false',
    //                     blocked: 'false',
    //                     pos_x: '33',
    //                     pos_y: '585',
    //                     browser_width: '712',
    //                     browser_height: '888',
    //                     visible: 'true',
    //                     active_tags: 'headline:XSMALL::subheadline:NONE::disclaimer:NONE',
    //                     request_duration: expect.stringNumber(),
    //                     render_duration: expect.stringNumber()
    //                 }
    //             },
    //             5: {
    //                 type: 'message',
    //                 messageRequestId: expect.toBeUid(),
    //                 account: 'NL9LCZLBWJVRE',
    //                 trackingDetails: {
    //                     payload:
    //                         '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'
    //                 },
    //                 stats: {
    //                     index: '5',
    //                     adblock: 'false',
    //                     blocked: 'false',
    //                     pos_x: '33',
    //                     pos_y: '734',
    //                     browser_width: '712',
    //                     browser_height: '888',
    //                     visible: 'false',
    //                     active_tags: 'headline:XSMALL::subheadline:NONE::disclaimer:NONE',
    //                     request_duration: expect.stringNumber(),
    //                     render_duration: expect.stringNumber()
    //                 }
    //             },
    //             global: {
    //                 integration_type: INTEGRATION_TYPE,
    //                 messaging_version: '1.41.0',
    //                 ts: {
    //                     vr: expect.stringMatching(/^[\da-f]{32}$/),
    //                     vt: expect.stringMatching(/^[\da-f]{32}$/)
    //                 },
    //                 deviceID: expect.toBeUid(),
    //                 sessionID: expect.toBeUid()
    //             }
    //         },
    //         events: [
    //             {
    //                 level: 'info',
    //                 event: 'paypal_messages_visible',
    //                 payload: {
    //                     index: '5',
    //                     duration: expect.any(Number),
    //                     timestamp: expect.stringNumber()
    //                 }
    //             },
    //             {
    //                 level: 'info',
    //                 event: 'paypal_messages_visible',
    //                 payload: {
    //                     index: '1',
    //                     duration: expect.any(Number),
    //                     timestamp: expect.stringNumber()
    //                 }
    //             },
    //             {
    //                 level: 'info',
    //                 event: 'paypal_messages_visible',
    //                 payload: {
    //                     index: '4',
    //                     duration: expect.any(Number),
    //                     timestamp: expect.stringNumber()
    //                 }
    //             },
    //             {
    //                 level: 'info',
    //                 event: 'paypal_messages_visible',
    //                 payload: {
    //                     index: '3',
    //                     duration: expect.any(Number),
    //                     timestamp: expect.stringNumber()
    //                 }
    //             },
    //             {
    //                 level: 'info',
    //                 event: 'paypal_messages_modal_render',
    //                 payload: {
    //                     index: '2',
    //                     refIndex: '4',
    //                     duration: expect.any(Number),
    //                     timestamp: expect.stringNumber()
    //                 }
    //             }
    //         ],
    //         tracking: [
    //             {
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'page_loaded',
    //                 script_load_delay: expect.stringMatching(/^-?\d+$/),
    //                 dom_load_delay: expect.stringNumber(),
    //                 page_load_delay: expect.stringNumber(),
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '5',
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'MORS',
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '5',
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'stats',
    //                 first_render_delay: expect.stringNumber(),
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '5',
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'hover',
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '1',
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'stats',
    //                 first_render_delay: expect.stringNumber(),
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '1',
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'MORS',
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '4',
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'stats',
    //                 first_render_delay: expect.stringNumber(),
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '4',
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'MORS',
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '3',
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'stats',
    //                 first_render_delay: expect.stringNumber(),
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '3',
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'MORS',
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '4',
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'hover',
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '4',
    //                 et: 'CLICK',
    //                 event_type: 'MORS',
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '4',
    //                 et: 'CLICK',
    //                 event_type: 'click',
    //                 link: 'Banner Wrapper',
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '2',
    //                 refIndex: '4',
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'modal-render',
    //                 modal: 'product_list_pay_later_long_term_pay_later_short_term_paypal_credit_no_interest:PRODUCT_LIST',
    //                 first_modal_render_delay: expect.stringNumber(),
    //                 render_duration: expect.stringNumber(),
    //                 timestamp: expect.any(Number)
    //             },
    //             {
    //                 index: '2',
    //                 refIndex: '4',
    //                 et: 'CLIENT_IMPRESSION',
    //                 event_type: 'modal-open',
    //                 src: 'message_click',
    //                 timestamp: expect.any(Number)
    //             }
    //         ]
    //     });
    // });
});
