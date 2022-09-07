import { isIosWebview, isAndroidWebview } from '@krakenjs/belter/src';
import { logger } from '../../../../utils';

const IOS_INTERFACE_NAME = 'paypalMessageModalCallbackHandler';
const ANDROID_INTERFACE_NAME = 'PayPalMessageModalInterface';

const setupBrowser = props => {
    window.xprops = {
        // We will never recieve new props via this integration style
        onProps: () => {},
        // TODO: Verify these callbacks are instrumented correctly
        onReady: ({ products, meta, deviceID }) => {
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
                        deviceID
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
                et: 'CLIENT_IMPRESSION',
                event_type: 'modal-render',
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
                event_type: 'click',
                link: linkName,
                src: src ?? linkName
            });
        },
        onCalculate: ({ value }) => {
            logger.track({
                index: '1',
                et: 'CLICK',
                event_type: 'click',
                link: 'Calculator',
                src: 'Calculator',
                amount: value
            });
        },
        onShow: () => {
            logger.track({
                index: '1',
                et: 'CLIENT_IMPRESSION',
                event_type: 'modal-open',
                src: 'Show'
            });
        },
        onClose: ({ linkName }) => {
            logger.track({
                index: '1',
                et: 'CLICK',
                event_type: 'modal-close',
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

        if (window[ANDROID_INTERFACE_NAME]) {
            return window[ANDROID_INTERFACE_NAME].postMessage.bind(window[ANDROID_INTERFACE_NAME]);
        }

        // THis scenario should only ever occur when developing locally
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
        onReady: ({ products, meta, deviceID }) => {
            const { offer, partnerAttributionId } = props;
            const { tracking_details: trackingDetails } = meta;

            sendCallbackMessage('onReady', {
                et: 'CLIENT_IMPRESSION',
                event_type: 'modal-render',
                device_id: deviceID,
                bn_code: partnerAttributionId,
                products: `${products.join('_').toLowerCase()}:${offer ? offer.toLowerCase() : products[0]}`,
                integration_type: props.integrationType ?? __MESSAGES__.__TARGET__,
                ...trackingDetails
            });
        },
        onClick: ({ linkName, src }) => {
            sendCallbackMessage('onClick', {
                et: 'CLICK',
                event_type: 'click',
                linkName,
                src: src ?? linkName
            });
        },
        onCalculate: ({ value }) => {
            sendCallbackMessage('onCalculate', {
                et: 'CLICK',
                event_type: 'click',
                link: 'Calculator',
                src: 'Calculator',
                amount: value
            });
        },
        onShow: () => {
            sendCallbackMessage('onShow', {
                et: 'CLIENT_IMPRESSION',
                event_type: 'modal-open',
                src: 'Show'
            });
        },
        onClose: ({ linkName }) => {
            sendCallbackMessage('onClose', {
                et: 'CLICK',
                event_type: 'modal-close',
                link: linkName
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
