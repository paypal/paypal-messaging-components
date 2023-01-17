import zoidPolyfill from 'src/components/modal/v2/lib/zoid-polyfill';
import { logger } from 'src/utils';

// Mock all of utils because the `stats` util that would be included has a side-effect call to logger.track
jest.mock('src/utils', () => ({
    logger: {
        track: jest.fn(),
        addMetaBuilder: jest.fn()
    }
}));

const mockLoadUrl = (url, { platform = 'web' } = {}) => {
    delete window.location;
    delete window.xprops;
    delete window.actions;
    delete window.navigator;
    delete window.webkit;
    delete global.Android;

    window.location = new URL(url);
    window.navigator = {
        userAgent: (() => {
            switch (platform) {
                case 'web':
                    return 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0';

                case 'ios':
                    window.webkit = {
                        messageHandlers: {
                            paypalMessageModalCallbackHandler: {
                                postMessage: jest.fn()
                            }
                        }
                    };

                    return 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';

                case 'android':
                    global.Android = {
                        paypalMessageModalCallbackHandler: jest.fn()
                    };

                    return 'Mozilla/5.0 (Linux; Android 11; sdk_gphone_arm64 Build/RSR1.210722.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36';

                default:
                    throw new Error(`Invalid platform: ${platform}`);
            }
        })()
    };
};

describe('zoidPollyfill', () => {
    test('sets up xprops for browser', () => {
        mockLoadUrl(
            'https://localhost.paypal.com:8080/credit-presentment/native/message?client_id=client_1&logo_type=inline&amount=500&devTouchpoint=true'
        );

        zoidPolyfill();

        expect(window.actions).toBeUndefined();
        expect(window.xprops).toEqual(
            expect.objectContaining({
                onProps: expect.any(Function),
                onReady: expect.any(Function),
                onClick: expect.any(Function),
                onCalculate: expect.any(Function),
                onShow: expect.any(Function),
                onClose: expect.any(Function),
                integrationType: 'STANDALONE',
                clientId: 'client_1',
                logoType: 'inline',
                amount: '500',
                devTouchpoint: 'true'
            })
        );

        window.xprops.onReady({
            products: ['PRODUCT_1', 'PRODUCT_2'],
            deviceID: 'abc123',
            meta: { trackingDetails: 'trackingDetails' }
        });

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(
            expect.objectContaining({
                event_type: 'modal-render',
                modal: 'product_1_product_2:PRODUCT_1'
            })
        );
        logger.track.mockClear();

        window.xprops.onClick({ linkName: 'test link', src: 'test src' });

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(
            expect.objectContaining({
                event_type: 'click',
                link: 'test link',
                src: 'test src'
            })
        );
        logger.track.mockClear();

        window.xprops.onCalculate({ value: 500 });

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(
            expect.objectContaining({
                event_type: 'click',
                link: 'Calculator',
                src: 'Calculator',
                amount: 500
            })
        );
        logger.track.mockClear();

        window.xprops.onShow();

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(
            expect.objectContaining({
                event_type: 'modal-open',
                src: 'Show'
            })
        );
        logger.track.mockClear();

        window.xprops.onClose({ linkName: 'Close Button' });

        expect(logger.track).toHaveBeenCalledTimes(1);
        expect(logger.track).toHaveBeenCalledWith(
            expect.objectContaining({
                event_type: 'modal-close',
                link: 'Close Button'
            })
        );
        logger.track.mockClear();
    });

    test('sets up xprops for webview', () => {
        mockLoadUrl(
            'https://localhost.paypal.com:8080/credit-presentment/native/message?client_id=client_1&logo_type=inline&amount=500&devTouchpoint=true',
            {
                platform: 'ios'
            }
        );
        const { postMessage } = window.webkit.messageHandlers.paypalMessageModalCallbackHandler;

        zoidPolyfill();

        expect(window.actions).toEqual(
            expect.objectContaining({
                updateProps: expect.any(Function)
            })
        );
        expect(window.xprops).toEqual(
            expect.objectContaining({
                onProps: expect.any(Function),
                onReady: expect.any(Function),
                onClick: expect.any(Function),
                onCalculate: expect.any(Function),
                onShow: expect.any(Function),
                onClose: expect.any(Function),
                integrationType: 'STANDALONE',
                clientId: 'client_1',
                logoType: 'inline',
                amount: '500',
                devTouchpoint: 'true'
            })
        );

        window.xprops.onReady({
            products: ['PRODUCT_1', 'PRODUCT_2'],
            deviceID: 'abc123',
            meta: { trackingDetails: 'trackingDetails' }
        });

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toEqual({
            name: 'onReady',
            args: [
                expect.objectContaining({
                    event_type: 'modal-render',
                    modal: 'product_1_product_2:PRODUCT_1'
                })
            ]
        });
        postMessage.mockClear();

        window.xprops.onClick({ linkName: 'test link', src: 'test src' });

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toEqual({
            name: 'onClick',
            args: [
                expect.objectContaining({
                    event_type: 'click',
                    link_name: 'test link',
                    src: 'test src'
                })
            ]
        });
        postMessage.mockClear();

        window.xprops.onCalculate({ value: 500 });

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toEqual({
            name: 'onCalculate',
            args: [
                expect.objectContaining({
                    event_type: 'click',
                    link_name: 'Calculator',
                    src: 'Calculator',
                    amount: 500
                })
            ]
        });
        postMessage.mockClear();

        window.xprops.onShow();

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toEqual({
            name: 'onShow',
            args: [
                expect.objectContaining({
                    event_type: 'modal-open',
                    src: 'Show'
                })
            ]
        });
        postMessage.mockClear();

        window.xprops.onClose({ linkName: 'Close Button' });

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toEqual({
            name: 'onClose',
            args: [
                expect.objectContaining({
                    event_type: 'modal-close',
                    link_name: 'Close Button'
                })
            ]
        });
        postMessage.mockClear();
    });

    test('notifies when props update', () => {
        mockLoadUrl(
            'https://localhost.paypal.com:8080/credit-presentment/native/message?client_id=client_1&logo_type=inline&amount=500&devTouchpoint=true',
            {
                platform: 'android'
            }
        );
        const postMessage = global.Android.paypalMessageModalCallbackHandler;

        zoidPolyfill();

        expect(window.actions).toEqual(
            expect.objectContaining({
                updateProps: expect.any(Function)
            })
        );
        expect(window.xprops).toEqual(
            expect.objectContaining({
                onProps: expect.any(Function)
            })
        );

        const onPropsCallback = jest.fn();

        window.xprops.onProps(onPropsCallback);
        window.actions.updateProps({ amount: 1000 });

        expect(onPropsCallback).toHaveBeenCalledTimes(1);
        expect(onPropsCallback).toHaveBeenCalledWith(
            expect.objectContaining({
                clientId: 'client_1',
                logoType: 'inline',
                amount: 1000
            })
        );

        window.actions.updateProps({ offer: 'TEST' });

        expect(onPropsCallback).toHaveBeenCalledTimes(2);
        expect(onPropsCallback).toHaveBeenCalledWith(
            expect.objectContaining({
                clientId: 'client_1',
                logoType: 'inline',
                amount: 1000,
                offer: 'TEST'
            })
        );

        window.xprops.onReady({
            products: ['PRODUCT_1', 'PRODUCT_2'],
            deviceID: 'abc123',
            meta: { trackingDetails: 'trackingDetails' }
        });

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toEqual({
            name: 'onReady',
            args: [
                expect.objectContaining({
                    event_type: 'modal-render',
                    modal: 'product_1_product_2:test'
                })
            ]
        });
        postMessage.mockClear();
    });
});
