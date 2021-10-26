import { logger } from '../../../../utils';

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
                // index,
                // refIndex,
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
                // index,
                // refIndex,
                et: 'CLICK',
                event_type: 'click',
                link: linkName,
                src: src ?? linkName
            });
        },
        onCalculate: ({ value }) => {
            logger.track({
                // index,
                // refIndex,
                et: 'CLICK',
                event_type: 'click',
                link: 'Calculator',
                src: 'Calculator',
                amount: value
            });
        },
        onShow: () => {
            logger.track({
                // index,
                // refIndex,
                et: 'CLIENT_IMPRESSION',
                event_type: 'modal-open'
                // src
            });
        },
        onClose: ({ linkName }) => {
            logger.track({
                // index,
                // refIndex,
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
}
