import { ZalgoPromise } from 'zalgo-promise';

import { getLogger, memoizeOnProps } from '../../utils';
import { Modal } from '../../zoid/modal';

export default memoizeOnProps(
    ({ account, currency, amount, messageRequestId, onApply }) => {
        const logger = getLogger();
        const { render, hide, updateProps, ...rest } = Modal({
            account,
            currency,
            amount,
            refId: messageRequestId,
            logger,
            onCalculate: value => logger.track({ et: 'CLICK', event_type: 'click', link: 'Calculator', amount: value }),
            onClick: linkName => {
                if (onApply && linkName.includes('Apply Now')) {
                    onApply();
                }
                logger.track({ et: 'CLICK', event_type: 'click', link: linkName });
            },
            onClose: linkName => {
                // TODO: wrapper.firstChild.focus();
                logger.track({ et: 'CLICK', event_type: 'modal-close', link: linkName });
            }
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
                updateProps({ visible: true, ...newOptions });
            });
        };

        const hideModal = () => {
            if (!renderProm) {
                renderProm = renderModal('body');
            }
            return renderProm.then(() => {
                updateProps({ visible: false });
            });
        };

        console.warn(1, rest.clone({ decorate: props => ({ ...props, currency: 'GBP' }) }).render('body'));

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
