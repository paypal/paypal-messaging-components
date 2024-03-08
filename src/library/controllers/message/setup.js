import {
    getGlobalState,
    getInsertionObserver,
    isZoidComponent,
    ppDebug,
    getOverflowObserver,
    ensureTreatments,
    setupGlobalState,
    getNamespace
} from '../../../utils';
import Messages from './adapter';
import { getMessageComponent } from '../../zoid/message';
import { getTreatmentsComponent } from '../../zoid/treatments';

export default function setup() {
    // Load treatments component
    getTreatmentsComponent();
    // Load the zoid components into memory so that the zoid interface can bootstrap between parent and child
    getMessageComponent();
    // Preload the overflow observer so that IE11 polyfills can be downloaded if needed
    getOverflowObserver();

    setupGlobalState();

    if (__MESSAGES__.__TARGET__ !== 'SDK') {
        const namespace = getNamespace();

        window[namespace] = window[namespace] ?? {};
        window[namespace].Messages = Messages;
        // Alias for pilot merchant support
        window[namespace].Message = Messages;
    }

    // Requires a merchant account to render a message
    // Prevent auto render from firing inside zoid iframe
    if (!isZoidComponent()) {
        const handleContentLoaded = () => {
            // Ensure experiment treatments will be ready for the first message render
            ensureTreatments();

            // If merchant includes multiple SDK scripts, the 1st script will destroy itself
            // and its globalState before this runs causing the account to be undefined
            if (getGlobalState().config.account) {
                Messages.render({ _auto: true });
            }

            // Using a "global" observer to watch for and automatically render
            // any message containers that are dynamically added after auto render
            getInsertionObserver().observe(document.body, {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: ['data-pp-message']
            });

            ppDebug(`DOMContentLoaded at ${new Date().toLocaleString()}`);
        };

        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', handleContentLoaded);
        } else {
            handleContentLoaded();
        }
    }
}
