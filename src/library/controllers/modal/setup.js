import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import { getInlineOptions, getGlobalState, awaitDOMContentLoaded, getAllBySelector, objectMerge } from '../../../utils';
import Modal from './interface';
import { getModalComponent } from '../../zoid/modal';

export default function setup() {
    // Load the zoid components into memory so that the zoid interface can bootstrap between parent and child
    getModalComponent();

    const { namespace } = getGlobalState().config;

    // Allow specified global namespace override
    if (namespace) {
        window[namespace] = {
            ...(window[namespace] || {}),
            MessagesModal: Modal
        };

        if (window.paypal) {
            delete window.paypal.MessagesModal;

            if (Object.keys(window.paypal).length === 0) {
                delete window.paypal;
            }
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
