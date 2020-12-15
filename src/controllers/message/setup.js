import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import { getInlineOptions, globalState, getScript, getAccount, getCurrency, getPartnerAccount } from '../../utils';
import Messages from './adapter';

export default function setup() {
    // Populate global config options
    const script = getScript();
    if (script) {
        const { ...inlineScriptOptions } = getInlineOptions(script);
        const partnerAccount = getPartnerAccount();

        Messages.setGlobalConfig({
            account: partnerAccount || getAccount(),
            merchantId: partnerAccount && getAccount(),
            currency: getCurrency(),
            ...inlineScriptOptions
        });
    }

    const { namespace } = globalState.config;

    // Allow specified global namespace override
    if (namespace) {
        window[namespace] = {
            ...(window[namespace] || {}),
            Messages
        };

        // Don't clear window.paypal if SDK loaded first
        if (window.paypal && !window.paypal.version) {
            delete window.paypal;
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
        const handleContentLoaded = () => {
            // If merchant includes multiple SDK scripts, the 1st script will destroy itself
            // and its globalState before this runs causing the account to be undefined
            if (globalState.config.account) {
                Messages.render({ _auto: true });
            }
        };
        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', handleContentLoaded);
        } else {
            // TODO: Remove setTimeout after ramp. Needed for ramp because the async top level inclusion/exclusion
            // list fetch causes the order of manual render calls and the auto render call to mix up
            setTimeout(() => handleContentLoaded, 0);
        }
    }
}
