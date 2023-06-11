import arrayFind from 'core-js-pure/stable/array/find';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import {
    logger,
    memoizeOnProps,
    getCurrentTime,
    awaitWindowLoad,
    getInlineOptions,
    isElement,
    getGlobalState,
    objectMerge,
    getStandardProductOffer,
    addPerformanceMeasure,
    PERFORMANCE_MEASURE_KEYS,
    globalEvent,
    getTopWindow
} from '../../../utils';
import { getModalComponent } from '../../zoid/modal';

const SCRIPT_DELAY = 0;

const memoizedModal = memoizeOnProps(
    ({
        account,
        merchantId,
        customerId,
        currency,
        amount,
        buyerCountry,
        ignoreCache,
        offer,
        onReady,
        onCalculate,
        onApply,
        onShow,
        onClose,
        channel,
        ecToken,
        cspNonce,
        integrationIdentifier
    }) => {
        addPerformanceMeasure(PERFORMANCE_MEASURE_KEYS.FIRST_MODAL_RENDER_DELAY);

        // Hold onto the full object reference so we can overwite the properties, but save the object reference
        const zoidComponent = getModalComponent()({
            account,
            merchantId,
            customerId,
            currency,
            amount,
            buyerCountry,
            ignoreCache,
            offer,
            onReady,
            onCalculate,
            onApply,
            onShow,
            onClose,
            channel,
            ecToken,
            cspNonce,
            integrationIdentifier
        });
        // Fired from inside the default onReady callback
        let renderProm;
        // eslint-disable-next-line default-param-last
        const renderModal = (selector = 'body', newProps, options = { intent: 'render' }) => {
            const context = getTopWindow() === window ? 'iframe' : 'popup';

            if (renderProm && context !== 'popup') {
                return renderProm.then(() => newProps && zoidComponent.updateProps(newProps));
            }

            if (renderProm && context === 'popup') {
                // If the context is popup, the zoid component completely destroys itself
                // where it can't be reused and must be recreated. We can clone the destroyed
                // instance to transfer the state and latest props to the new instance
                Object.assign(zoidComponent, zoidComponent.clone());
            }

            const modalReady = new ZalgoPromise(resolve => zoidComponent.event.once('ready', resolve));

            zoidComponent.state.renderStart = getCurrentTime();

            const renderDelay =
                options.intent === 'show'
                    ? // Render modal immediately if the user has made a clear intent
                      ZalgoPromise.resolve()
                    : // Give priority to other merchant scripts waiting for the load event
                      awaitWindowLoad.then(() => ZalgoPromise.delay(SCRIPT_DELAY));

            renderProm = renderDelay
                // Give priority to other merchant scripts waiting for the load event
                .then(() =>
                    ZalgoPromise.all([
                        newProps && zoidComponent.updateProps(newProps),
                        zoidComponent.render(selector, context),
                        modalReady
                    ])
                )
                .then(() => globalEvent.trigger('modal-render'));

            return renderProm;
        };

        const showModal = (options = {}) => {
            const newOptions = isElement(options) ? getInlineOptions(options) : options;

            if (isElement(options)) {
                newOptions.src =
                    options.id ??
                    [...options.classList]
                        .filter(Boolean)
                        .reduce((acc, className) => `${acc ?? ''}.${className}`, null) ??
                    options.constructor?.name ??
                    'element';
            }

            renderProm = renderModal('body', newOptions, { intent: 'show' });

            const requestedProduct = getStandardProductOffer(options.offer);

            // TODO: Remove after DE universal modal ramp is complete. Allows both old and new modals to work with DE messages while ramping.
            const validDEProductValues = ['PAY_LATER_LONG_TERM', 'PAY_LATER_PAY_IN_1', 'PAY_LATER_SHORT_TERM'];
            // TODO: Remove after DE universal modal ramp is complete
            const productState = options?.offerCountry === 'DE' ? validDEProductValues : zoidComponent.state.products;

            if (
                typeof requestedProduct !== 'undefined' &&
                requestedProduct !== 'NONE' &&
                Array.isArray(zoidComponent.state.products) &&
                !arrayFind(productState, supportedProduct => supportedProduct === requestedProduct)
            ) {
                logger.warn('invalid_option_value', {
                    location: 'offer',
                    description: `Expected one of ["${zoidComponent.state.products.join('", "')}"] but received "${
                        options.offer
                    }".`
                });
                return ZalgoPromise.resolve();
            }

            // Tells containerTemplate to show the prerender modal as soon as possible if zoid has not
            // rendered anything yet and the show/hide events are not hooked up yet
            zoidComponent.state.open = true;
            zoidComponent.event.trigger('modal-show');

            return renderProm;
        };

        const hideModal = () => {
            renderProm = renderModal('body');

            zoidComponent.event.trigger('modal-hide');

            return renderProm;
        };

        const updateModal = props => {
            zoidComponent.updateProps(props);
        };

        // Expose these functions through the computed onReady callback
        // for merchant integrations
        zoidComponent.state.show = showModal;
        zoidComponent.state.hide = hideModal;
        // Follow existing zoid interface
        return {
            render: renderModal,
            show: showModal,
            hide: hideModal,
            updateProps: updateModal
        };
    },
    ['account', 'merchantId', 'buyerCountry']
);

export default options => memoizedModal(objectMerge(getGlobalState().config, options));
