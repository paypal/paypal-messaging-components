import startsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise';

import { memoizeOnProps, createState } from '../../../utils';
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

const useViewportHijack = () => {
    const [viewportState, setViewportState] = createState({});

    return [
        () => {
            // Save existing body style
            const bodyStyle = document.body.getAttribute('style');

            // Create hijack viewport
            const newViewport = document.createElement('meta');
            newViewport.setAttribute('name', 'viewport');
            newViewport.setAttribute(
                'content',
                'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no'
            );

            // Save old viewport
            const existingViewport = document.head.querySelector('meta[name="viewport"]');

            const placeholderViewport = document.createElement('meta');
            placeholderViewport.setAttribute('name', 'viewport');
            placeholderViewport.setAttribute('content', '');

            if (!existingViewport) {
                // If no viewport exists, some browsers will not respect the change of simply removing the hijack viewport
                // Add a blank viewport to replace the hijack in this case

                document.head.appendChild(placeholderViewport);
            }

            const oldViewport = existingViewport || placeholderViewport;

            document.head.removeChild(oldViewport);
            document.head.appendChild(newViewport);

            document.body.style.overflow = 'hidden';
            document.body.style.msOverflowStyle = 'scrollbar';

            setViewportState({
                bodyStyle,
                newViewport,
                oldViewport
            });
        },
        () => {
            document.head.removeChild(viewportState.newViewport);
            document.head.appendChild(viewportState.oldViewport);

            document.body.setAttribute('style', viewportState.bodyStyle || '');
        }
    ];
};

const renderModal = memoizeOnProps(
    ({ options, meta, track, wrapper, type }) => {
        const [hijackViewport, replaceViewport] = useViewportHijack();

        const { render, hide, updateProps } = Modal({
            account: options.account,
            merchantId: options.merchantId,
            country: meta.offerCountry,
            currency: options.currency,
            type,
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
                replaceViewport();
                wrapper.firstChild.focus();
                track({ et: 'CLICK', event_type: 'modal-close', link: linkName });
            }
        });

        const show = () => {
            hijackViewport();
            updateProps({ visible: true });
        };

        hide();
        // The render promise will resolve before Preact renders and picks up changes
        // via updateProps so a small delay is added after the initial "render" promise
        return {
            renderProm: render('body').then(() => ZalgoPromise.delay(100)),
            show
        };
    },
    ['options', 'meta', 'type']
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
            const { renderProm, show } = renderModal({ options, meta, track, wrapper, type: modalType });

            events.on('click', () => {
                renderProm.then(() => {
                    track({ et: 'CLIENT_IMPRESSION', event_type: 'modal-open', modal: modalType });

                    show();
                });
            });
        }
    }
};
