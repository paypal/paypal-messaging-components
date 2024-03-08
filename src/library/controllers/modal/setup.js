import {
    getInlineOptions,
    getGlobalState,
    awaitDOMContentLoaded,
    getAllBySelector,
    objectMerge,
    isZoidComponent,
    setupGlobalState
} from '../../../utils';
import Modal from './interface';
import { getModalComponent } from '../../zoid/modal';

export default function setup() {
    // Load the zoid components into memory so that the zoid interface can bootstrap between parent and child
    getModalComponent();

    setupGlobalState();

    const { namespace } = getGlobalState().config;

    // Allow specified global namespace override
    if (namespace && namespace !== 'paypal') {
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
    if (!isZoidComponent()) {
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
