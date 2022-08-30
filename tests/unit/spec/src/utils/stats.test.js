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

    beforeEach(() => {
        __MESSAGES__.__TARGET__ = 'STANDALONE';
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
        });
    });
});
