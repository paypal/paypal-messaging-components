import arrayFind from 'core-js-pure/stable/array/find';
import { ZalgoPromise } from 'zalgo-promise/src';

import {
    logger,
    memoizeOnProps,
    getCurrentTime,
    awaitWindowLoad,
    getInlineOptions,
    isElement,
    getGlobalState,
    objectMerge,
    getProductForOffer,
    addPerformanceMeasure,
    globalEvent
} from '../../../utils';
import { getModalComponent } from '../../zoid/modal';

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
        onClose,
        channel
    }) => {
        addPerformanceMeasure('firstModalRenderDelay');

        const { render, updateProps, state, event } = getModalComponent()({
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
            onClose,
            channel
        });
        // Fired from inside the default onReady callback
        const modalReady = new ZalgoPromise(resolve => event.once('ready', resolve));

        let renderProm;
        const renderModal = (selector = 'body') => {
            state.renderStart = getCurrentTime();

            if (!renderProm) {
                const SCRIPT_DELAY = 0;
                renderProm = awaitWindowLoad
                    // Give priority to other merchant scripts waiting for the load event
                    .then(() => ZalgoPromise.delay(SCRIPT_DELAY))
                    .then(() => ZalgoPromise.all([render(selector), modalReady]))
                    .then(() => globalEvent.trigger('modal-render'));
            }

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
            state.renderStart = getCurrentTime();

            if (!renderProm) {
                renderProm = renderModal('body');
            }

            const requestedProduct = getProductForOffer(options.offer);

            if (
                typeof options.offer !== 'undefined' &&
                Array.isArray(state.products) &&
                !arrayFind(state.products, supportedProduct => supportedProduct === requestedProduct)
            ) {
                logger.warn('invalid_option_value', {
                    location: 'offer',
                    description: `Expected one of ["${state.products.join('", "')}"] but received "${options.offer}".`
                });
                return ZalgoPromise.resolve();
            }

            // Tells containerTemplate to show the prerender modal as soon as possible if zoid has not
            // rendered anything yet and the show/hide events are not hooked up yet
            state.open = true;
            event.trigger('modal-show');

            return renderProm.then(() => updateProps(newOptions));
        };

        const hideModal = () => {
            if (!renderProm) {
                renderProm = renderModal('body');
            }

            event.trigger('modal-hide');

            return renderProm;
        };

        // Expose these functions through the computed onReady callback
        // for merchant integrations
        state.show = showModal;
        state.hide = hideModal;
        // Follow existing zoid interface
        return {
            render: renderModal,
            show: showModal,
            hide: hideModal,
            updateProps
        };
    },
    ['account', 'merchantId']
);

export default options => memoizedModal(objectMerge(getGlobalState().config, options));
