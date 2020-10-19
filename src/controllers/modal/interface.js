import { ZalgoPromise } from 'zalgo-promise';

import { logger, memoizeOnProps, getCurrentTime, viewportHijack, awaitWindowLoad } from '../../utils';
import { Modal } from '../../zoid/modal';

export default memoizeOnProps(
    ({ account, merchantId, currency, amount, buyerCountry, offer, onReady, onCalculate, onApply, onClose, index }) => {
        const [hijackViewport] = viewportHijack();

        const { render, hide, updateProps, state } = Modal({
            index,
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

        const showModal = (newOptions = {}) => {
            state.renderStart = getCurrentTime();
            if (!renderProm) {
                renderProm = renderModal('body');
            }
            return renderProm.then(() => {
                hijackViewport();

                logger.track({
                    index: newOptions.index,
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'modal-open'
                });

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
