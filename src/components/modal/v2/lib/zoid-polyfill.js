/* global Android */
import { isAndroidWebview, isIosWebview, getPerformance } from '@krakenjs/belter/src';
import { getOrCreateDeviceID, logger } from '../../../../utils';
import { validateProps, isIframe } from './utils';
import { sendEvent, createPostMessengerEvent, POSTMESSENGER_EVENT_NAMES } from './postMessage';

const IOS_INTERFACE_NAME = 'paypalMessageModalCallbackHandler';
const ANDROID_INTERFACE_NAME = 'paypalMessageModalCallbackHandler';

function updateProps(newProps, propListeners) {
    Array.from(propListeners.values()).forEach(listener => {
        listener({ ...window.xprops, ...newProps });
    });
    Object.assign(window.xprops, newProps);
}

export function handlePropsUpdateEvent(propListeners, updatedPropsEvent) {
    const {
        data: { eventPayload: newProps }
    } = updatedPropsEvent;
    if (newProps && typeof newProps === 'object') {
        const validProps = validateProps(newProps);
        updateProps(validProps, propListeners);
    }
}

export function logModalClose(linkName) {
    logger.track({
        index: '1',
        et: 'CLICK',
        event_type: 'modal_close',
        page_view_link_name: linkName
    });
}

export function handleBrowserEvents(clientOrigin, propListeners, event) {
    const {
        origin: eventOrigin,
        data: { eventName, id }
    } = event;
    if (eventOrigin !== clientOrigin) {
        return;
    }
    if (eventName === 'PROPS_UPDATE') {
        handlePropsUpdateEvent(propListeners, event);
    }
    if (eventName === 'MODAL_CLOSED') {
        logModalClose(event.data.eventPayload.linkName);
    }
    // send event ack with original event id so PostMessenger will stop reposting event
    sendEvent(createPostMessengerEvent('ack', id), clientOrigin);
}

const getAccount = (merchantId, clientId, payerId) => {
    if (merchantId) {
        return merchantId;
    }

    // Logger endpoint expects account field to be prefixed if the value is a clientId
    if (clientId) {
        return `client-id:${clientId}`;
    }

    return payerId;
};

const setupBrowser = props => {
    const propListeners = new Set();

    let trustedOrigin = decodeURIComponent(props.origin || '');
    if (isIframe && document.referrer && !process.env.NODE_ENV === 'test') {
        trustedOrigin = new window.URL(document.referrer).origin;
    }

    window.addEventListener(
        'message',
        event => {
            handleBrowserEvents(trustedOrigin, propListeners, event);
        },
        false
    );

    window.xprops = {
        onProps: listener => propListeners.add(listener),
        // TODO: Verify these callbacks are instrumented correctly
        onReady: ({ products, meta }) => {
            const { clientId, payerId, merchantId, offer, partnerAttributionId } = props;
            const { trackingDetails } = meta;

            logger.addMetaBuilder(existingMeta => {
                // Remove potential existing meta info
                // Necessary because beaver-logger will not override an existing meta key if these values change
                // eslint-disable-next-line no-param-reassign
                delete existingMeta[1];

                // Need to capture existing attributes under global before destroying
                const { global: existingGlobal = {} } = existingMeta;
                // eslint-disable-next-line no-param-reassign
                delete existingMeta.global;

                return {
                    global: {
                        ...existingGlobal,
                        // integration_type needs to be sent or it will default to lander
                        integration_type: props.integrationType ?? __MESSAGES__.__TARGET__,
                        // Device ID should be correctly set during message render
                        deviceID: getOrCreateDeviceID()
                        // sessionID: getSessionID()
                    },
                    1: {
                        // TODO: This should likely be specific to this integration type
                        type: 'modal',
                        // messageRequestId,
                        account: getAccount(merchantId, clientId, payerId),
                        trackingDetails
                    }
                };
            });

            logger.track({
                index: '1',
                et: 'CLIENT_IMPRESSION',
                event_type: 'modal_rendered',
                modal: `${products.join('_').toLowerCase()}:${offer ? offer.toLowerCase() : products[0]}`,
                // For standalone modal the stats event does not run, so we duplicate some data here
                bn_code: partnerAttributionId
                // first_modal_render_delay: Math.round(firstModalRenderDelay).toString(),
                // render_duration: Math.round(getCurrentTime() - renderStart).toString()
            });
        },
        onClick: ({ linkName, src }) => {
            logger.track({
                index: '1',
                et: 'CLICK',
                event_type: 'modal_rendered',
                page_view_link_name: linkName,
                page_view_link_source: src ?? linkName
            });
        },
        onCalculate: ({ value }) => {
            sendEvent(createPostMessengerEvent('message', POSTMESSENGER_EVENT_NAMES.CALCULATE), trustedOrigin);
            logger.track({
                index: '1',
                et: 'CLICK',
                event_type: 'modal_rendered',
                page_view_link_name: 'Calculator',
                page_view_link_source: 'Calculator',
                calculator_input: value
            });
        },
        onShow: () => {
            sendEvent(createPostMessengerEvent('message', POSTMESSENGER_EVENT_NAMES.SHOW), trustedOrigin);
            logger.track({
                index: '1',
                et: 'CLIENT_IMPRESSION',
                event_type: 'modal_viewed',
                page_view_link_source: 'Show'
            });
        },
        onClose: ({ linkName }) => {
            const eventPayload = {
                linkName
                // for data security, also add new params to createSafePayload in ./postMessage.js
            };
            sendEvent(
                createPostMessengerEvent('message', POSTMESSENGER_EVENT_NAMES.CLOSE, eventPayload),
                trustedOrigin
            );
            logModalClose(linkName);
        },
        // Overridable defaults
        integrationType: __MESSAGES__.__TARGET__,
        // Specified props via query params
        ...props
    };
};

const setupWebview = props => {
    const postMessage = (() => {
        if (window.webkit?.messageHandlers?.[IOS_INTERFACE_NAME]) {
            return window.webkit.messageHandlers[IOS_INTERFACE_NAME].postMessage.bind(
                window.webkit.messageHandlers[IOS_INTERFACE_NAME]
            );
        }

        // `Android` is not on the `window` object but rather an adjacent top level object
        if (typeof Android !== 'undefined') {
            return Android[ANDROID_INTERFACE_NAME].bind(Android);
        }

        // This scenario should only ever occur when developing locally
        // eslint-disable-next-line no-console
        return payload => console.warn('postMessage:', JSON.parse(payload));
    })();

    const propListeners = new Set();
    const sendCallbackMessage = (name, ...args) => postMessage(JSON.stringify({ name, args }));
    // Functions called from the native app
    window.actions = {
        updateProps: newProps => {
            if (newProps && typeof newProps === 'object') {
                updateProps(newProps, propListeners);
            }
        }
    };
    window.xprops = {
        onProps: listener => propListeners.add(listener),

        onReady: ({ meta }) => {
            const { trackingDetails } = meta;
            const performance = getPerformance();
            const timing = performance?.getEntriesByType('navigation')[0];

            sendCallbackMessage('onReady', {
                __shared__: {
                    // Analytic Details
                    fdata: trackingDetails.fdata,
                    experimentation_experience: trackingDetails.experimentation_experience_ids,
                    experimentation_treatment: trackingDetails.experimentation_treatment_ids,
                    credit_product_identifiers: trackingDetails.credit_product_identifiers,
                    offer_country_code: trackingDetails.offer_country_code,
                    merchant_country_code: trackingDetails.merchant_country_code,
                    views: trackingDetails.views,
                    qualified_products: trackingDetails.qualified_products,
                    debug_id: trackingDetails.debug_id
                },
                event_type: 'modal_rendered',
                request_duration: timing && Math.round(timing.responseEnd - timing.requestStart).toString(),
                render_duration: timing && Math.round(performance.now() - timing.responseEnd).toString()
            });
        },

        onClick: ({ linkName, src = linkName }) => {
            sendCallbackMessage('onClick', {
                event_type: 'modal_clicked',
                page_view_link_name: linkName,
                page_view_link_source: src
            });
        },

        onCalculate: ({ value }) => {
            sendCallbackMessage('onCalculate', {
                event_type: 'modal_clicked',
                page_view_link_name: 'Calculator',
                page_view_link_source: 'Calculator',
                calculator_input: value
            });
        },

        onShow: () => {
            sendCallbackMessage('onShow', {
                event_type: 'modal_viewed',
                page_view_link_name: 'Show',
                page_view_link_source: 'Show'
            });
        },

        onClose: ({ linkName, src = linkName }) => {
            sendCallbackMessage('onClose', {
                event_type: 'modal_closed',
                page_view_link_name: linkName,
                page_view_link_source: src
            });
        },
        // Overridable defaults
        integrationType: __MESSAGES__.__TARGET__,
        // Specified props via query params
        ...props
    };
};

export default function polyfillZoid() {
    const props = window.location.search
        .slice(1)
        .split('&')
        .reduce((acc, query) => {
            const [key, value] = query.split('=');

            if (value) {
                const propName = key.replace(/_([a-z])/g, (_, p1) => p1.toUpperCase());

                acc[propName] = value;
            }

            return acc;
        }, {});

    const { userAgent } = window.navigator;

    if (isIosWebview(userAgent) || isAndroidWebview(userAgent)) {
        setupWebview(props);
    } else {
        setupBrowser(props);
    }
}
