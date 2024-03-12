import {
    getInlineOptions,
    getGlobalState,
    getScript,
    getAccount,
    getCurrency,
    getPartnerAccount,
    getInsertionObserver,
    isZoidComponent,
    ppDebug,
    getOverflowObserver,
    ensureTreatments,
    getPageType
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

    // Populate global config options
    const script = getScript();
    if (script) {
        ppDebug('Script:', { debugObj: script });
        const inlineScriptOptions = getInlineOptions(script);
        const partnerAccount = getPartnerAccount();

        Messages.setGlobalConfig({
            account: partnerAccount || getAccount(),
            merchantId: partnerAccount && getAccount(),
            currency: getCurrency(),
            pageType: getPageType(),
            ...inlineScriptOptions
        });
    }

    const { namespace } = getGlobalState().config;

    // Allow specified global namespace override
    if (namespace) {
        window[namespace] = {
            ...(window[namespace] || {}),
            Messages
        };

        if (window.paypal) {
            delete window.paypal.Messages;
            delete window.paypal.Message;

            if (Object.keys(window.paypal).length === 0) {
                delete window.paypal;
            }
        }
    }

    // When importing the library directly using UMD, window.paypal will not exist
    if (__MESSAGES__.__TARGET__ !== 'SDK' && window.paypal) {
        // Alias for pilot merchant support
        window.paypal.Message = Messages;
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
