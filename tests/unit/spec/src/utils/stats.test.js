import { fireEvent } from '@testing-library/dom';

import { getSDKAttributes } from '@paypal/sdk-client/src';

import createContainer from 'utils/createContainer';
import { runStats } from 'src/utils/stats';
import { logger } from 'src/utils/logger';
import { globalState } from 'src/utils/global';
import { globalEvent } from '../../../../../src/utils';

jest.mock('src/utils/logger', () => ({
    logger: {
        track: jest.fn()
    }
}));

jest.mock('@paypal/sdk-client/src', () => ({
    getSDKAttributes: jest.fn().mockReturnValue({ 'data-partner-attribution-id': 'some-partner-id' })
}));

jest.mock('belter/src', () => {
    const original = jest.requireActual('belter/src');
    return {
        ...original,
        getPerformance: () => ({
            getEntriesByName: name => {
                const duration = {
                    __paypal_messaging_performance__scriptLoadDelay: 1,
                    __paypal_messaging_performance__domLoadDelay: 2,
                    __paypal_messaging_performance__firstRenderDelay: 3,
                    __paypal_messaging_performance__pageLoadDelay: 4
                }[name];

                return [{ duration }];
            },
            measure: () => {},
            mark: () => {},
            clearMeasures: () => {},
            clearMarks: () => {}
        })
    };
});

window.getComputedStyle = () => ({
    getPropertyValue: () => 'auto'
});

const addEventListener = window.addEventListener.bind(window);
const removeEventListener = window.removeEventListener.bind(window);
window.addEventListener = jest.fn((...args) => addEventListener(...args));
window.removeEventListener = jest.fn((...args) => removeEventListener(...args));

const start = Date.now();

describe('stats', () => {
    const index = '1';

    const defaultProps = {
        index,
        et: 'CLIENT_IMPRESSION',
        event_type: 'stats',
        pos_x: '100',
        pos_y: '30',
        browser_width: '1024',
        browser_height: '768',
        adblock: 'true',
        blocked: 'true',
        visible: 'true',
        active_tags: expect.any(String),
        render_duration: expect.any(String)
    };

    beforeAll(() => {
        globalState.messagesMap = new Map();
    });

    beforeEach(() => {
        __MESSAGES__.__TARGET__ = 'STANDALONE';
    });

    afterEach(() => {
        document.body.innerHTML = '';
        logger.track.mockReset();
    });

    test('Fires standard payload and attaches events', async () => {
        const { container } = createContainer('iframe');
        container.getBoundingClientRect = () => ({
            left: 100,
            right: 20,
            top: 30,
            bottom: 25
        });
        globalState.messagesMap.set(container, { state: { renderStart: start } });

        runStats({ container, activeTags: '', index });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(defaultProps);
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
        globalState.messagesMap.set(container, { state: { renderStart: start } });

        const payload = {
            ...defaultProps,
            bn_code: 'some-partner-id'
        };

        runStats({ container, activeTags: '', index });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(getSDKAttributes).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(payload);
        expect(window.addEventListener).not.toHaveBeenCalled();
    });

    test('Fires scroll event when loads below fold and scrolls into view', async () => {
        window.innerHeight = 10;

        const { container } = createContainer('iframe');
        container.getBoundingClientRect = () => ({
            left: 100,
            right: 20,
            top: 30,
            bottom: 25
        });
        globalState.messagesMap.set(container, { state: { renderStart: start } });

        const payload = {
            ...defaultProps,
            visible: 'false',
            browser_height: '10'
        };

        runStats({ container, activeTags: '', index });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(payload);
        expect(window.addEventListener).toHaveBeenCalledTimes(2);
        expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });

        container.getBoundingClientRect = () => ({
            left: 100,
            right: 20,
            top: 0,
            bottom: 5
        });

        fireEvent.scroll(window);

        expect(logger.track).toHaveBeenCalledTimes(2);
        expect(logger.track).toHaveBeenLastCalledWith({
            index,
            et: 'CLIENT_IMPRESSION',
            event_type: 'scroll',
            visible: 'true'
        });
        expect(window.removeEventListener).toHaveBeenCalledTimes(1);
        expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
    });

    test('Fires page_loaded event after first render', async () => {
        globalEvent.trigger('render');

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith({
            et: 'CLIENT_IMPRESSION',
            event_type: 'page_loaded',
            scriptLoadDelay: '1',
            domLoadDelay: '2',
            firstRenderDelay: '3',
            pageLoadDelay: '4'
        });
    });
});
