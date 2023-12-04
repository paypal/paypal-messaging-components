/* global Android */
import { isAndroidWebview, isIosWebview, getPerformance } from '@krakenjs/belter/src';
import { getOrCreateDeviceID, logger, FPTI_EVENTS } from '../../../../utils';

const IOS_INTERFACE_NAME = 'paypalMessageModalCallbackHandler';
const ANDROID_INTERFACE_NAME = 'paypalMessageModalCallbackHandler';

const setupBrowser = props => {
    window.xprops = {
        // We will never recieve new props via this integration style
        onProps: () => {},
        // TODO: Verify these callbacks are instrumented correctly
        onReady: ({ products, meta }) => {
            const { clientId, payerId, merchantId, offer, partnerAttributionId } = props;
            const { trackingDetails } = meta;
            const { pname: pageView } = trackingDetails;
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
                        account: merchantId || clientId || payerId,
                        trackingDetails
                    }
                };
            });

            logger.track({
                index: '1',
                eventType: FPTI_EVENTS.MODAL_RENDERED,
                pageView,
                // modal: `${products.join('_').toLowerCase()}:${offer ? offer.toLowerCase() : products[0]}`,
                // products,
                // offer,

                // For standalone modal the stats event does not run, so we duplicate some data here
                // bn_code: partnerAttributionId
                renderDelay: Math.round(firstModalRenderDelay).toString(),
                renderDuration: Math.round(getCurrentTime() - renderStart).toString()
            });
        },
        onClick: ({ linkName, src }) => {
            if (linkName || src) {
                logger.track({
                    index: '1',
                    eventType: FPTI_EVENTS.MODAL_RENDERED,
                    link: linkName,
                    src: src ?? linkName
                });
            }
        },
        onCalculate: ({ value }) => {
            logger.track({
                index: '1',
                eventType: FPTI_EVENTS.MODAL_RENDERED,
                link: 'Calculator',
                src: 'Calculator',
                amount: value
            });
        },
        onShow: () => {
            logger.track({
                index: '1',
                eventType: FPTI_EVENTS.MODAL_VIEWED,
                src: 'Show'
            });
        },
        onClose: ({ linkName }) => {
            logger.track({
                index: '1',
                eventType: FPTI_EVENTS.MODAL_CLOSE,
                link: linkName
            });
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
        return payload => console.warn('postMessage:', JSON.parse(payload));
    })();

    const propListeners = new Set();
    const sendCallbackMessage = (name, ...args) => postMessage(JSON.stringify({ name, args }));
    // Functions called from the native app
    window.actions = {
        updateProps: newProps => {
            if (newProps && typeof newProps === 'object') {
                Array.from(propListeners.values()).forEach(listener => {
                    listener({ ...window.xprops, ...newProps });
                });

                Object.assign(window.xprops, newProps);
            }
        }
    };
    window.xprops = {
        onProps: listener => propListeners.add(listener),

        onReady: ({ meta }) => {
            const { trackingDetails } = meta;
            const timing = getPerformance()?.getEntriesByType('navigation')[0];

            sendCallbackMessage('onReady', {
                __shared__: {
                    // Analytic Details
                    fdata: trackingDetails.fdata,
                    experimentation_experience_ids: trackingDetails.experimentation_experience_ids,
                    experimentation_treatment_ids: trackingDetails.experimentation_treatment_ids,
                    credit_product_identifiers: trackingDetails.credit_product_identifiers,
                    offer_country_code: trackingDetails.offer_country_code,
                    merchant_country_code: trackingDetails.merchant_country_code,
                    views: trackingDetails.views,
                    qualified_products: trackingDetails.qualified_products,
                    debug_id: trackingDetails.debug_id
                },
                eventType: FPTI_EVENTS.MODAL_RENDERED,
                requestDuration: timing && timing.responseEnd - timing.requestStart,
                renderDuration: timing && timing.loadEventEnd - timing.responseEnd
            });
        },

        onClick: ({ linkName, src = linkName }) => {
            sendCallbackMessage('onClick', {
                eventType: FPTI_EVENTS.MODAL_RENDERED,
                link_name: linkName,
                link_src: src
            });
        },

        onCalculate: ({ value }) => {
            sendCallbackMessage('onCalculate', {
                eventType: FPTI_EVENTS.MODAL_RENDERED,
                link_name: 'Calculator',
                link_src: 'Calculator',
                data: value
            });
        },

        onShow: () => {
            sendCallbackMessage('onShow', {
                eventType: FPTI_EVENTS.MODAL_VIEWED,
                link_name: 'Show',
                link_src: 'Show'
            });
        },

        onClose: ({ linkName, src = linkName }) => {
            sendCallbackMessage('onClose', {
                eventType: FPTI_EVENTS.MODAL_CLOSE,
                link_name: linkName,
                link_src: src
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
