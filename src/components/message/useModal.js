import startsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise';

function getModalType(offerCountry, offerType) {
    switch (offerCountry) {
        case 'DE':
            return 'INST';
        case 'US':
        default:
            return startsWith(offerType, 'NI') ? 'NI' : 'EZP';
    }
}

export default function getModal({ country, offerType, messageRequestId }) {
    const { account, amount, currency, onApply } = window.xprops;

    const track = () => {}; // TODO: tracker
    const modalType = getModalType(country, offerType);
    const { render, hide, updateProps } = window.paypal.Modal({
        account,
        country,
        currency,
        type: modalType,
        amount,
        refId: messageRequestId,
        onCalculate: value => track({ et: 'CLICK', event_type: 'click', link: 'Calculator', amount: value }),
        onClick: linkName => {
            if (onApply && linkName.includes('Apply Now')) {
                onApply();
            }
            track({ et: 'CLICK', event_type: 'click', link: linkName });
        },
        onClose: linkName => {
            // TODO: wrapper.firstChild.focus();
            track({ et: 'CLICK', event_type: 'modal-close', link: linkName });
        }
    });

    hide();
    // The render promise will resolve before Preact renders and picks up changes
    // via updateProps so a small delay is added after the initial "render" promise
    const renderProm = render('body').then(() => ZalgoPromise.delay(100));

    return {
        open: () => {
            renderProm.then(() => {
                track({ et: 'CLIENT_IMPRESSION', event_type: 'modal-open', modal: modalType });

                updateProps({ visible: true });
            });
        }
    };
}
