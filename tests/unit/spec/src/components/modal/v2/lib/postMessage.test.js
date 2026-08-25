import { sendEvent } from 'src/components/modal/v2/lib/postMessage';

describe('sendEvent', () => {
    const ORIGINAL_NODE_ENV = process.env.NODE_ENV;
    const originalOpener = window.opener;

    afterEach(() => {
        process.env.NODE_ENV = ORIGINAL_NODE_ENV;
        Object.defineProperty(window, 'opener', { value: originalOpener, configurable: true, writable: true });
        jest.restoreAllMocks();
    });

    it('no-ops when trustedOrigin is empty (standalone tab opened with no referrer)', () => {
        const postMessageSpy = jest.spyOn(window, 'postMessage').mockImplementation(() => {});

        expect(() => sendEvent({ type: 'message' }, '')).not.toThrow();
        expect(postMessageSpy).not.toHaveBeenCalled();
    });

    it('posts to window.parent when embedded (default test path uses window.parent)', () => {
        const postMessageSpy = jest.spyOn(window, 'postMessage').mockImplementation(() => {});
        const payload = { type: 'message' };

        sendEvent(payload, 'https://www.paypal.com');

        expect(postMessageSpy).toHaveBeenCalledWith(payload, 'https://www.paypal.com');
    });

    describe('top-level browser tab (window.parent === window)', () => {
        beforeEach(() => {
            // Under Jest, NODE_ENV === 'test' short-circuits sendEvent to always use window.parent.
            process.env.NODE_ENV = 'production';
        });

        it('does not throw when opened from another page with no opener (regression: lander calculator crash)', () => {
            // A referrer-bearing tab sets a truthy trustedOrigin, which previously let execution reach targetWindow.postMessage while window.opener was null.
            Object.defineProperty(window, 'opener', { value: null, configurable: true, writable: true });

            expect(() => sendEvent({ type: 'message' }, 'https://www.merchant.com')).not.toThrow();
        });

        it('posts to window.opener when an opener is present', () => {
            const openerPostMessage = jest.fn();
            Object.defineProperty(window, 'opener', {
                value: { postMessage: openerPostMessage },
                configurable: true,
                writable: true
            });
            const payload = { type: 'message' };

            sendEvent(payload, 'https://www.merchant.com');

            expect(openerPostMessage).toHaveBeenCalledWith(payload, 'https://www.merchant.com');
        });
    });
});
