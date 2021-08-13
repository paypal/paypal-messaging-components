import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import { getInlineOptions, getGlobalState, awaitDOMContentLoaded, getAllBySelector, objectMerge } from '../../utils';
import Modal from './interface';

export default function setup() {
    const { namespace } = getGlobalState().config;

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
            if (getGlobalState().config.account) {
                const attachEls = getAllBySelector('[data-pp-messagesmodal]');

                if (attachEls.length > 0) {
                    const options = objectMerge(getGlobalState().config, getInlineOptions(attachEls[0]));
                    const modal = Modal(options);

                    attachEls.forEach(el => {
                        el.setAttribute('tabindex', 0);
                        el.addEventListener('click', () => modal.show(el));
                    });
                }
            }
        };

        awaitDOMContentLoaded.then(handleContentLoaded);
    }
}
