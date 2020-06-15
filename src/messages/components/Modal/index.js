import startsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise';

import { memoizeOnProps } from '../../../utils';
import Modal from './component';

function getModalType(offerCountry, offerType) {
    switch (offerCountry) {
        case 'DE':
            return 'INST';
        case 'US':
        default:
            return startsWith(offerType, 'NI') ? 'NI' : 'EZP';
    }
}

const renderModal = memoizeOnProps(
    ({ options, track, wrapper, type, meta }) => {
        const { render, hide, updateProps } = Modal({
            type,

            // Even though these props are not included in memoize,
            // we want to pass the initial values in so we can preload one set of terms
            account: options.account,
            merchantId: options.merchantId,
            country: meta.offerCountry,
            currency: options.currency,
            amount: options.amount,
            refId: meta.messageRequestId,
            onCalculate: amount => track({ et: 'CLICK', event_type: 'click', link: 'Calculator', amount }),
            onClick: linkName => {
                if (options.onApply && linkName.includes('Apply Now')) {
                    options.onApply();
                }
                track({ et: 'CLICK', event_type: 'click', link: linkName });
            },
            onClose: linkName => {
                wrapper.firstChild.focus();
                track({ et: 'CLICK', event_type: 'modal-close', link: linkName });
            }
        });

        hide();
        // The render promise will resolve before Preact renders and picks up changes
        // via updateProps so a small delay is added after the initial "render" promise
        return { renderProm: render('body').then(() => ZalgoPromise.delay(100)), updateProps };
    },
    ['type']
);

export default {
    // Extract out the id from options for modal memoization
    init: ({ options: { id, ...options }, meta, events, track, wrapper }) => {
        // For legacy image banners, open a popup instead of the modal
        if (options._legacy && startsWith(meta.offerType, 'NI')) {
            events.on('click', evt => {
                const { target } = evt;

                if (target.tagName === 'IMG' && target.parentNode.tagName === 'A') {
                    window.open(
                        target.parentNode.href,
                        'PayPal Credit Terms',
                        'width=650,height=600,scrollbars=yes,resizable=no,location=no,toolbar=no,menubar=no,dependent=no,dialog=yes,minimizable=no'
                    );

                    evt.preventDefault();
                } else {
                    window.open(meta.clickUrl, '_blank');
                }
            });
        } else {
            const modalType = getModalType(meta.offerCountry, meta.offerType);
            const { renderProm, updateProps } = renderModal({ options, meta, track, wrapper, type: modalType });

            events.on('click', () => {
                renderProm.then(() => {
                    track({ et: 'CLIENT_IMPRESSION', event_type: 'modal-open', modal: modalType });

                    updateProps({
                        visible: true,
                        account: options.account,
                        merchantId: options.merchantId,
                        country: meta.offerCountry,
                        currency: options.currency,
                        amount: options.amount,
                        refId: meta.messageRequestId
                    });
                });
            });
        }
    }
};
