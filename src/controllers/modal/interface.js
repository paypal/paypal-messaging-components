import { ZalgoPromise } from 'zalgo-promise';

import {
    memoizeOnProps,
    getCurrentTime,
    awaitWindowLoad,
    getInlineOptions,
    isElement,
    globalState,
    objectMerge
} from '../../utils';
import { Modal } from '../../zoid/modal';

const memoizedModal = memoizeOnProps(
    ({ account, merchantId, currency, amount, buyerCountry, offer, onReady, onCalculate, onApply, onClose }) => {
        const { render, hide, updateProps, state } = Modal({
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

        let renderProm;
        const renderModal = (selector = 'body') => {
            state.renderStart = getCurrentTime();

            if (!renderProm) {
                renderProm = awaitWindowLoad
                    // Give priority to other merchant scripts waiting for the load event
                    .then(() => ZalgoPromise.delay(0))
                    .then(() => render(selector))
                    // The render promise will resolve before Preact renders and picks up changes
                    // via updateProps so a small delay is added after the initial "render" promise
                    .then(() => ZalgoPromise.delay(100));
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
