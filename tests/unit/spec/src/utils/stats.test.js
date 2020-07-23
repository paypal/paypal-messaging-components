import { fireEvent } from '@testing-library/dom';

import createContainer from 'utils/createContainer';
import { runStats } from 'src/utils/stats';
import { logger } from 'src/utils/logger';

jest.mock('src/utils/logger', () => ({
    logger: {
        track: jest.fn()
    }
}));

window.getComputedStyle = () => ({
    getPropertyValue: () => 'auto'
});

const addEventListener = window.addEventListener.bind(window);
const removeEventListener = window.removeEventListener.bind(window);
window.addEventListener = jest.fn((...args) => addEventListener(...args));
window.removeEventListener = jest.fn((...args) => removeEventListener(...args));

describe('stats', () => {
    afterEach(() => {
        document.body.innerHTML = '';
        logger.track.mockReset();
    });

    it('Fires standard payload and attaches events', async () => {
        const { container } = createContainer('iframe');
        container.getBoundingClientRect = () => ({
            left: 100,
            right: 20,
            top: 30,
            bottom: 25
        });
        const refId = '12345';
        const payload = {
            message_request_id: refId,
            et: 'CLIENT_IMPRESSION',
            event_type: 'stats',
            integration_type: 'STANDALONE',
            messaging_version: expect.any(String),
            pos_x: 100,
            pos_y: 30,
            browser_width: 1024,
            browser_height: 768,
            visible: true,
            adblock: true,
            blocked: true
        };

        runStats({ container, refId });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(payload);
        expect(window.addEventListener).not.toHaveBeenCalled();
    });

    it('Fires scroll event when loads below fold and scrolls into view', async () => {
        window.innerHeight = 10;

        const { container } = createContainer('iframe');
        container.getBoundingClientRect = () => ({
            left: 100,
            right: 20,
            top: 30,
            bottom: 25
        });
        const refId = '12345';
        const payload = {
            message_request_id: refId,
            et: 'CLIENT_IMPRESSION',
            event_type: 'stats',
            messaging_version: expect.any(String),
            integration_type: 'STANDALONE',
            pos_x: 100,
            pos_y: 30,
            browser_width: 1024,
            browser_height: 10,
            visible: false,
            adblock: true,
            blocked: true
        };

        runStats({ container, refId });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(payload);
        expect(window.addEventListener).toHaveBeenCalledTimes(1);
        expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));

        container.getBoundingClientRect = () => ({
            left: 100,
            right: 20,
            top: 0,
            bottom: 5
        });

        fireEvent.scroll(window);

        expect(logger.track).toHaveBeenCalledTimes(2);
        expect(logger.track).toHaveBeenLastCalledWith({
            message_request_id: refId,
            et: 'CLIENT_IMPRESSION',
            event_type: 'scroll',
            visible: true
        });
        expect(window.removeEventListener).toHaveBeenCalledTimes(1);
        expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
});
