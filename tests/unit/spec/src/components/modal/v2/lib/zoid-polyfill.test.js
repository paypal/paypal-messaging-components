import zoidPolyfill from 'src/components/modal/v2/lib/zoid-polyfill';
import { logger } from 'src/utils';

// Mock all of utils because the `stats` util that would be included has a side-effect call to logger.track
jest.mock('src/utils', () => ({
    logger: {
        track: jest.fn(),
        addMetaBuilder: jest.fn()
    }
}));

jest.mock('@krakenjs/belter/src', () => {
    const originalModule = jest.requireActual('@krakenjs/belter/src');

    return {
        ...originalModule,
        getPerformance: () => ({
            now: () => 250,
            getEntriesByType: () => [
                {
                    requestStart: 100,
                    responseEnd: 200
                }
            ]
        })
    };
});
jest.mock('src/components/modal/v2/lib/utils', () => ({
    isIframe: true
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
    describe('sets up xprops for browser', () => {
        beforeAll(() => {
            mockLoadUrl(
                'https://localhost.paypal.com:8080/credit-presentment/native/message?client_id=client_1&logo_type=inline&amount=500&devTouchpoint=true'
            );

            zoidPolyfill();
        });
        afterEach(() => {
            logger.track.mockClear();
        });
        test('window.xprops initalized', () => {
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
        });
        test('onReady returns a log message', () => {
            window.xprops.onReady({
                products: ['PRODUCT_1', 'PRODUCT_2'],
                meta: { trackingDetails: 'trackingDetails' }
            });

            expect(logger.track).toHaveBeenCalledTimes(1);
            expect(logger.track).toHaveBeenCalledWith(
                expect.objectContaining({
                    event_type: 'modal_rendered',
                    modal: 'product_1_product_2:PRODUCT_1'
                })
            );
        });
        test('onClick returning a log message', () => {
            window.xprops.onClick({ linkName: 'test link', src: 'test src' });

            expect(logger.track).toHaveBeenCalledTimes(1);
            expect(logger.track).toHaveBeenCalledWith(
                expect.objectContaining({
                    event_type: 'modal_rendered',
                    page_view_link_name: 'test link',
                    page_view_link_source: 'test src'
                })
            );
        });
        test('onCalculate returning a log message', () => {
            window.xprops.onCalculate({ value: 500 });

            expect(logger.track).toHaveBeenCalledTimes(1);
            expect(logger.track).toHaveBeenCalledWith(
                expect.objectContaining({
                    event_type: 'modal_rendered',
                    page_view_link_name: 'Calculator',
                    page_view_link_source: 'Calculator',
                    calculator_input: 500
                })
            );
        });
        test('onShow returning a log message', () => {
            window.xprops.onShow();

            expect(logger.track).toHaveBeenCalledTimes(1);
            expect(logger.track).toHaveBeenCalledWith(
                expect.objectContaining({
                    event_type: 'modal_viewed',
                    page_view_link_source: 'Show'
                })
            );
        });
        test('onClose returning a log message', () => {
            window.xprops.onClose({ linkName: 'Close Button' });

            expect(logger.track).toHaveBeenCalledTimes(1);
            expect(logger.track).toHaveBeenCalledWith(
                expect.objectContaining({
                    event_type: 'modal_close',
                    page_view_link_name: 'Close Button'
                })
            );
        });
        test('Escape key onClose returning a log message', () => {
            window.xprops.onClose({ linkName: 'Escape Key' });

            expect(logger.track).toHaveBeenCalledTimes(1);
            expect(logger.track).toHaveBeenCalledWith(
                expect.objectContaining({
                    index: '1',
                    et: 'CLICK',
                    event_type: 'modal_close',
                    page_view_link_name: 'Escape Key'
                })
            );
        });
    });

    test('sets up xprops for webview', () => {
        mockLoadUrl(
            'https://localhost.paypal.com:8080/credit-presentment/native/message?client_id=client_1&logo_type=inline&amount=500&dev_touchpoint=true',
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
            meta: {
                trackingDetails: {
                    fdata: '123abc',
                    credit_product_identifiers: ['PAY_LATER_LONG_TERM_US'],
                    offer_country_code: 'US',
                    extra_field: 'should not be present'
                }
            }
        });

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toMatchInlineSnapshot(`
            Object {
              "args": Array [
                Object {
                  "__shared__": Object {
                    "credit_product_identifiers": Array [
                      "PAY_LATER_LONG_TERM_US",
                    ],
                    "fdata": "123abc",
                    "offer_country_code": "US",
                  },
                  "event_type": "modal_rendered",
                  "render_duration": 50,
                  "request_duration": 100,
                },
              ],
              "name": "onReady",
            }
        `);
        postMessage.mockClear();

        window.xprops.onClick({ linkName: 'test link', src: 'test src' });

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toMatchInlineSnapshot(`
            Object {
              "args": Array [
                Object {
                  "event_type": "modal_clicked",
                  "page_view_link_name": "test link",
                  "page_view_link_source": "test src",
                },
              ],
              "name": "onClick",
            }
        `);
        postMessage.mockClear();

        window.xprops.onCalculate({ value: 500 });

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toMatchInlineSnapshot(`
            Object {
              "args": Array [
                Object {
                  "calculator_input": 500,
                  "event_type": "modal_clicked",
                  "page_view_link_name": "Calculator",
                  "page_view_link_source": "Calculator",
                },
              ],
              "name": "onCalculate",
            }
        `);
        postMessage.mockClear();

        window.xprops.onShow();

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toMatchInlineSnapshot(`
            Object {
              "args": Array [
                Object {
                  "event_type": "modal_viewed",
                  "page_view_link_name": "Show",
                  "page_view_link_source": "Show",
                },
              ],
              "name": "onShow",
            }
        `);
        postMessage.mockClear();

        window.xprops.onClose({ linkName: 'Close Button' });

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toMatchInlineSnapshot(`
            Object {
              "args": Array [
                Object {
                  "event_type": "modal_closed",
                  "page_view_link_name": "Close Button",
                  "page_view_link_source": "Close Button",
                },
              ],
              "name": "onClose",
            }
        `);
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
            meta: {
                trackingDetails: {
                    fdata: '123abc',
                    credit_product_identifiers: ['PAY_LATER_LONG_TERM_US'],
                    offer_country_code: 'US',
                    extra_field: 'should not be present'
                }
            }
        });

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toMatchInlineSnapshot(`
            Object {
              "args": Array [
                Object {
                  "__shared__": Object {
                    "credit_product_identifiers": Array [
                      "PAY_LATER_LONG_TERM_US",
                    ],
                    "fdata": "123abc",
                    "offer_country_code": "US",
                  },
                  "event_type": "modal_rendered",
                  "render_duration": 50,
                  "request_duration": 100,
                },
              ],
              "name": "onReady",
            }
        `);
        postMessage.mockClear();
    });

    describe('communication with parent window on onClose ', () => {
        beforeAll(() => {
            mockLoadUrl(
                'https://localhost.paypal.com:8080/credit-presentment/native/message?client_id=client_1&logo_type=inline&amount=500&devTouchpoint=true'
            );
            zoidPolyfill();
            const postMessage = jest.fn();
            window.parent.postMessage = postMessage;
        });
        afterEach(() => {
            logger.track.mockClear();
            postMessage.mockClear();
        });
        test('does not send post message to parent window when referrer not present', () => {
            window.xprops.onClose({ linkName: 'Escape Key' });
            expect(postMessage).not.toHaveBeenCalled();
        });

        test('sends post message to parent window when referrer is present', () => {
            Object.defineProperty(window.document, 'referrer', {
                value: 'http://localhost.paypal.com:8080/lander'
            });

            window.xprops.onClose({ linkName: 'Escape Key' });

            expect(postMessage).toHaveBeenCalledTimes(1);
            expect(postMessage).toBeCalledWith('paypal-messages-modal-close', 'http://localhost.paypal.com:8080');
        });
    });
});
