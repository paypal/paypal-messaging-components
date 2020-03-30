import startsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise';
import { memoize } from 'belter/src';

function getModalType(offerCountry, offerType) {
    switch (offerCountry) {
        case 'DE':
            return 'INST';
        case 'US':
        default:
            return startsWith(offerType, 'NI') ? 'NI' : 'EZP';
    }
}

export default memoize(function useModal({ logger, country, offerType, messageRequestId }) {
    const { account, amount, currency, onApply, getParent } = window.xprops;
    const modalType = getModalType(country, offerType);

    const { renderTo, hide, updateProps } = window.paypal.Modals({
        account,
        country,
        currency,
        type: modalType,
        amount,
        refId: messageRequestId,
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

    // The render promise will resolve before Preact renders and picks up changes
    // via updateProps so a small delay is added after the initial "render" promise
    const renderProm = renderTo(getParent(), 'body').then(() => ZalgoPromise.delay(100));

    hide();

    return {
        open: () => {
            renderProm.then(() => {
                logger.track({ et: 'CLIENT_IMPRESSION', event_type: 'modal-open', modal: modalType });

                updateProps({ visible: true });
            });
        }
    };
});
