import { getSDKAttributes } from '@paypal/sdk-client/src';

import createContainer from 'utils/createContainer';
import { runStats } from 'src/utils/stats';
import { logger } from 'src/utils/logger';

jest.mock('src/utils/logger', () => ({
    logger: {
        track: jest.fn()
    }
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

describe('stats', () => {
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
        const index = '1';
        const payload = {
            index,
            et: 'CLIENT_IMPRESSION',
            event_type: 'stats',
            integration_type: 'STANDALONE',
            messaging_version: expect.any(String),
            pos_x: '100',
            pos_y: '30',
            browser_width: '1024',
            browser_height: '768',
            visible: 'true',
            adblock: 'true',
            blocked: 'true',
            active_tags: expect.any(String)
        };

        runStats({ container, activeTags: '', index });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(payload);
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
        const index = '1';
        const payload = {
            index,
            et: 'CLIENT_IMPRESSION',
            event_type: 'stats',
            integration_type: 'SDK',
            messaging_version: expect.any(String),
            bn_code: 'some-partner-id',
            pos_x: '100',
            pos_y: '30',
            browser_width: '1024',
            browser_height: '768',
            visible: 'true',
            adblock: 'true',
            blocked: 'true',
            active_tags: expect.any(String)
        };

        runStats({ container, activeTags: '', index });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(getSDKAttributes).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(payload);
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
        const index = '1';
        const payload = {
            index,
            et: 'CLIENT_IMPRESSION',
            event_type: 'stats',
            messaging_version: expect.any(String),
            integration_type: 'STANDALONE',
            pos_x: '968',
            pos_y: '28',
            browser_width: '1024',
            browser_height: '747',
            visible: 'false',
            adblock: 'true',
            blocked: 'true',
            active_tags: expect.any(String)
        };

        runStats({ container, activeTags: '', index });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(payload);
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
});
