import arrayFind from 'core-js-pure/stable/array/find';
import { ZalgoPromise } from 'zalgo-promise/src';

import {
    logger,
    memoizeOnProps,
    getCurrentTime,
    awaitWindowLoad,
    getInlineOptions,
    isElement,
    globalState,
    objectMerge,
    getProductForOffer
} from '../../utils';
import { Modal } from '../../zoid/modal';

const memoizedModal = memoizeOnProps(
    ({ account, merchantId, currency, amount, buyerCountry, offer, onReady, onCalculate, onApply, onClose }) => {
        const { render, hide, updateProps, state, event } = Modal({
            account,
            merchantId,
            currency,
            amount,
            buyerCountry,
            offer,
            onReady,
            onCalculate,
            onApply,
            onClose
        });
        // Fired from inside the default onReady callback
        const modalReady = new ZalgoPromise(resolve => event.once('ready', resolve));

        let renderProm;
        const renderModal = (selector = 'body') => {
            state.renderStart = getCurrentTime();

            if (!renderProm) {
                renderProm = awaitWindowLoad
                    // Give priority to other merchant scripts waiting for the load event
                    .then(() => ZalgoPromise.delay(0))
                    .then(() => ZalgoPromise.all([render(selector), modalReady]));
                hide();
            }

            return renderProm;
        };

        const showModal = (options = {}) => {
            const newOptions = isElement(options) ? getInlineOptions(options) : options;

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

            return renderProm.then(() => {
                return updateProps({
                    visible: true,
                    ...newOptions
                });
            });
        };

        const hideModal = () => {
            if (!renderProm) {
                renderProm = renderModal('body');
            }

            return renderProm.then(() => updateProps({ visible: false }));
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

export default options => memoizedModal(objectMerge(globalState.config, options));
