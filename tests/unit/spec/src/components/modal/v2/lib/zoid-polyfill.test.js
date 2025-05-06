import zoidPolyfill, { handleBrowserEvents } from 'src/components/modal/v2/lib/zoid-polyfill';
import { POSTMESSENGER_EVENT_NAMES } from 'src/components/modal/v2/lib/postMessage';
import { logger } from 'src/utils';

// Mock all of utils because the `stats` util that would be included has a side-effect call to logger.track
jest.mock('src/utils', () => {
    const originalModule = jest.requireActual('@krakenjs/belter/src');

    return {
        ...originalModule,
        logger: {
            track: jest.fn(),
            addMetaBuilder: jest.fn(),
            warn: jest.fn()
        }
    };
});

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
jest.mock('src/components/modal/v2/lib/utils', () => {
    const originalModule = jest.requireActual('src/components/modal/v2/lib/utils');

    return {
        ...originalModule,
        isIframe: true
    };
});

const addEventListenerSpy = jest.fn();
const addEventListener = window.addEventListener.bind(window);
window.addEventListener = (...args) => {
    addEventListenerSpy(...args);
    addEventListener(...args);
};

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
    beforeAll(() => {
        const postMessage = jest.fn();
        window.parent.postMessage = postMessage;
    });
    afterEach(() => {
        postMessage.mockClear();
    });
    describe('sets up xprops for browser', () => {
        beforeAll(() => {
            mockLoadUrl(
                'https://localhost.paypal.com:8080/credit-presentment/lander/modal?client_id=client_1&logo_type=inline&amount=500&devTouchpoint=true&integration_identifier=messagesModal'
            );

            zoidPolyfill();
        });
        afterEach(() => {
            logger.track.mockClear();
            addEventListenerSpy.mockClear();
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
                    devTouchpoint: 'true',
                    integrationIdentifier: 'messagesModal'
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
            window.xprops.onCalculate({ value: '500' });

            expect(logger.track).toHaveBeenCalledTimes(1);
            expect(logger.track).toHaveBeenCalledWith(
                expect.objectContaining({
                    event_type: 'modal_rendered',
                    page_view_link_name: 'Calculator',
                    page_view_link_source: 'Calculator',
                    calculator_input: '500'
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
            'https://localhost.paypal.com:8080/credit-presentment/native/modal?client_id=client_1&logo_type=inline&amount=500&dev_touchpoint=true',
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
                  "render_duration": "50",
                  "request_duration": "100",
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

        window.xprops.onCalculate({ value: '500' });

        expect(postMessage).toHaveBeenCalledTimes(1);
        expect(postMessage.mock.calls[0][0]).toEqual(expect.any(String));
        expect(JSON.parse(postMessage.mock.calls[0][0])).toMatchInlineSnapshot(`
            Object {
              "args": Array [
                Object {
                  "calculator_input": "500",
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

    describe('notifies when props update', () => {
        test('webview', () => {
            mockLoadUrl(
                'https://localhost.paypal.com:8080/credit-presentment/native/modal?client_id=client_1&logo_type=inline&amount=500&devTouchpoint=true',
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
                      "render_duration": "50",
                      "request_duration": "100",
                    },
                  ],
                  "name": "onReady",
                }
            `);
            postMessage.mockClear();
        });
        describe('browser', () => {
            beforeAll(() => {
                mockLoadUrl(
                    'https://localhost.paypal.com:8080/credit-presentment/lander/modal?client_id=client_1&logo_type=inline&amount=500&devTouchpoint=true&origin=http://example.com'
                );
                zoidPolyfill();
            });
            afterEach(() => {
                logger.track.mockClear();
                addEventListenerSpy.mockClear();
            });
            test('event listener is added', () => {
                expect(window.xprops).toEqual(
                    expect.objectContaining({
                        onProps: expect.any(Function)
                    })
                );

                expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
                expect(addEventListenerSpy).toHaveBeenCalledWith('message', expect.any(Function), false);
            });
            test('handleBrowserEvents handles PROPS_UPDATE and updates props when values are valid', () => {
                // jest doesn't support calling postMessage, so we cannot use the event listener above
                // instead we will manually verify that handleBrowserEvents works as intended
                const clientOrigin = 'http://example.com';

                const newPropsEvent = {
                    origin: clientOrigin,
                    data: {
                        eventName: 'PROPS_UPDATE',
                        eventPayload: {
                            amount: 1000,
                            offerType: ['PAY_LATER_LONG_TERM', 'PAY_LATER_SHORT_TERM']
                        }
                    }
                };

                const propListeners = new Set();
                const onPropsCallback = jest.fn();
                propListeners.add(onPropsCallback);
                handleBrowserEvents(clientOrigin, propListeners, newPropsEvent);

                expect(onPropsCallback).toHaveBeenCalledTimes(1);
                expect(onPropsCallback).toHaveBeenCalledWith(
                    expect.objectContaining({
                        clientId: 'client_1',
                        logoType: 'inline',
                        amount: 1000,
                        offer: 'PAY_LATER_LONG_TERM,PAY_LATER_SHORT_TERM'
                    })
                );
            });
            test('handleBrowserEvents handles MODAL_CLOSE and logs close method', () => {
                // jest doesn't support calling postMessage, so we cannot use the event listener above
                // instead we will manually verify that handleBrowserEvents works as intended
                const clientOrigin = 'http://example.com';

                const newPropsEvent = {
                    origin: clientOrigin,
                    data: {
                        eventName: 'MODAL_CLOSED',
                        eventPayload: {
                            linkName: 'Custom Close Button'
                        }
                    }
                };

                const propListeners = new Set();
                const onPropsCallback = jest.fn();
                propListeners.add(onPropsCallback);
                handleBrowserEvents(clientOrigin, propListeners, newPropsEvent);

                expect(logger.track).toHaveBeenCalledTimes(1);
                expect(logger.track).toHaveBeenCalledWith(
                    expect.objectContaining({
                        index: '1',
                        et: 'CLICK',
                        event_type: 'modal_close',
                        page_view_link_name: 'Custom Close Button'
                    })
                );
            });
            test('handleBrowserEvents handles unrelated events with no data', () => {
                const unrelatedEvent = {
                    data: {}
                };

                const propListeners = new Set();
                const onPropsCallback = jest.fn();
                propListeners.add(onPropsCallback);
                handleBrowserEvents(window.xprops, propListeners, unrelatedEvent);

                expect(onPropsCallback).toHaveBeenCalledTimes(0);
            });
        });
    });

    describe('communication with parent window on modal events ', () => {
        beforeAll(() => {
            mockLoadUrl(
                'https://localhost.paypal.com:8080/credit-presentment/lander/modal?client_id=client_1&logo_type=inline&amount=500&devTouchpoint=true&origin=http://localhost.paypal.com:8080'
            );
            zoidPolyfill();
        });
        afterEach(() => {
            logger.track.mockClear();
        });
        describe('communication with parent window on onClose ', () => {
            test.skip('does not send post message to parent window when referrer not present', () => {
                window.xprops.onClose({ linkName: 'Escape Key' });
                expect(postMessage).not.toHaveBeenCalled();
            });

            test('sends post message to parent window when referrer is present', () => {
                Object.defineProperty(window.document, 'referrer', {
                    value: 'http://localhost.paypal.com:8080/lander'
                });

                window.xprops.onClose({ linkName: 'Escape Key' });

                expect(postMessage).toHaveBeenCalledTimes(1);
                expect(postMessage).toBeCalledWith(
                    expect.objectContaining({ eventName: POSTMESSENGER_EVENT_NAMES.CLOSE }),
                    'http://localhost.paypal.com:8080'
                );
            });
        });
        describe('communication with parent window on onShow ', () => {
            test('sends post message to parent window when referrer is present', () => {
                Object.defineProperty(window.document, 'referrer', {
                    value: 'http://localhost.paypal.com:8080/lander'
                });

                window.xprops.onShow();

                expect(postMessage).toHaveBeenCalledTimes(1);
                expect(postMessage).toBeCalledWith(
                    expect.objectContaining({ eventName: POSTMESSENGER_EVENT_NAMES.SHOW }),
                    'http://localhost.paypal.com:8080'
                );
            });
        });
        describe('communication with parent window on onCalculate ', () => {
            test('sends post message to parent window when referrer is present', () => {
                Object.defineProperty(window.document, 'referrer', {
                    value: 'http://localhost.paypal.com:8080/lander'
                });

                window.xprops.onCalculate({ amount: 40 });

                expect(postMessage).toHaveBeenCalledTimes(1);
                expect(postMessage).toBeCalledWith(
                    expect.objectContaining({ eventName: POSTMESSENGER_EVENT_NAMES.CALCULATE }),
                    'http://localhost.paypal.com:8080'
                );
            });
        });
    });
});
