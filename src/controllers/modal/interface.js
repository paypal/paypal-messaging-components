import { ZalgoPromise } from 'zalgo-promise';

import { getLogger, memoizeOnProps } from '../../utils';
import { Modal } from '../../zoid/modal';
import useViewportHijack from './viewportHijack';

export default memoizeOnProps(
    ({ account, currency, amount, refId, onApply, onClose }) => {
        const [hijackViewport, replaceViewport] = useViewportHijack();
        const logger = getLogger();

        const createOnCalculateHandler = (props = {}) => value => {
            logger.track({ et: 'CLICK', event_type: 'click', link: 'Calculator', amount: value });

            if (typeof props.onCalculate === 'function') {
                props.onCalculate({ value });
            }
        };

        const createOnClickHandler = (props = {}) => ({ linkName }) => {
            logger.track({ et: 'CLICK', event_type: 'click', link: linkName });

            if (typeof props.onApply === 'function' && linkName.includes('Apply Now')) {
                props.onApply();
            }
        };

        const createOnCloseHandler = (props = {}) => ({ linkName }) => {
            replaceViewport();
            logger.track({ et: 'CLICK', event_type: 'modal-close', link: linkName });

            if (typeof props.onClose === 'function') {
                props.onClose({ linkName });
            }
        };

        const { render, hide, updateProps } = Modal({
            account,
            currency,
            amount,
            refId,
            logger,
            onCalculate: createOnCalculateHandler(),
            onClick: createOnClickHandler({ onApply }),
            onClose: createOnCloseHandler({ onClose })
        });

        let renderProm;
        const renderModal = selector => {
            // The render promise will resolve before Preact renders and picks up changes
            // via updateProps so a small delay is added after the initial "render" promise
            if (!renderProm) {
                renderProm = render(selector).then(() => ZalgoPromise.delay(100));
                hide();
            }

            return renderProm;
        };

        const showModal = (newOptions = {}) => {
            if (!renderProm) {
                renderProm = renderModal('body');
            }
            return renderProm.then(() => {
                logger.track({ et: 'CLIENT_IMPRESSION', event_type: 'modal-open', modal: 'FIXME:' });
                hijackViewport();

                return updateProps({
                    visible: true,
                    ...newOptions,
                    onCalculate: createOnCalculateHandler(),
                    onClick: createOnClickHandler(newOptions),
                    onClose: createOnCloseHandler(newOptions)
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
    ['account']
);
