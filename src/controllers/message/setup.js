import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import {
    getInlineOptions,
    globalState,
    getScript,
    getAccount,
    getCurrency,
    getPartnerAccount,
    insertionObserver
} from '../../utils';
import Messages from './adapter';

export default function setup() {
    // Populate global config options
    const script = getScript();
    if (script) {
        const { merchantid, ...inlineScriptOptions } = getInlineOptions(script);
        const partnerAccount = getPartnerAccount();

        Messages.setGlobalConfig({
            account: partnerAccount || getAccount(),
            merchantId: (partnerAccount && getAccount()) || merchantid,
            currency: getCurrency(),
            ...inlineScriptOptions
        });

        // Allow specified global namespace override
        if (inlineScriptOptions.namespace) {
            window[inlineScriptOptions.namespace] = {
                ...(window[inlineScriptOptions.namespace] || {}),
                Messages
            };

            // Don't clear window.paypal if SDK loaded first
            if (window.paypal && !window.paypal.version) {
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
    if (!stringStartsWith(window.name, '__zoid__')) {
        const autoRender = () => {
            // If merchant includes multiple SDK scripts, the 1st script will destroy itself
            // and its globalState before this runs causing the account to be undefined
            if (globalState.config.account) {
                Messages.render({ _auto: true });
            }

            insertionObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
        };

        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', autoRender);
        } else {
            // TODO: Remove setTimeout after ramp. Needed for ramp because the async top level inclusion/exclusion
            // list fetch causes the order of manual render calls and the auto render call to mix up
            setTimeout(autoRender, 0);
        }
    }
}
