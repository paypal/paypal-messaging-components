import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import { getInlineOptions, globalState, awaitDOMContentLoaded, getAllBySelector, objectMerge } from '@library/common';
import Modal from './interface';

export default function setup() {
    const { namespace } = globalState.config;

    // Allow specified global namespace override
    if (namespace) {
        window[namespace] = {
            ...(window[namespace] || {}),
            MessagesModal: Modal
        };

        // Don't clear window.paypal if SDK loaded first
        if (window.paypal && !window.paypal.version) {
            delete window.paypal;
        }
    }

    // Prevent auto render from firing inside zoid iframe
    if (!stringStartsWith(window.name, '__zoid__')) {
        const handleContentLoaded = () => {
            // If merchant includes multiple SDK scripts, the 1st script will destroy itself
            // and its globalState before this runs causing the account to be undefined
            if (globalState.config.account) {
                const attachEls = getAllBySelector('[data-pp-messagesmodal]');

                if (attachEls.length > 0) {
                    const options = objectMerge(globalState.config, getInlineOptions(attachEls[0]));

                    // Automatically hook up click events
                    options.onReady = ({ show }) => {
                        attachEls.forEach(el => {
                            el.setAttribute('tabindex', 0);
                            el.addEventListener('click', () => show(el));
                        });
                    };

                    Modal(options).render('body');
                }
            }
        };

        awaitDOMContentLoaded.then(handleContentLoaded);
    }
}
