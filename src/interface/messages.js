import { getClientID, getSDKScript } from '@paypal/sdk-client/src';

import { globalState } from '../utils/globalState';
import Messages from '../messages';
import { getInlineOptions } from '../utils';

export function setup() {
    // Populate global config options
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        const script = getSDKScript();
        if (script) {
            Messages.setGlobalConfig({
                account: `client-id:${getClientID()}`,
                ...getInlineOptions(script)
            });
        }
    } else {
        // eslint-disable-next-line compat/compat
        const script = document.currentScript || document.querySelector('script[src$="messaging.js"]');
        if (script) {
            Messages.setGlobalConfig(getInlineOptions(script));
        }

        // When importing the library directly using UMD, window.paypal will not exist
        if (window.paypal) {
            // Alias for pilot merchant support
            window.paypal.Message = Messages;
        }
    }

    // Requires a merchant account to render a message
    if (globalState.config.account) {
        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', () => Messages.render({ _auto: true }));
        } else {
            Messages.render({ _auto: true });
        }
    }
}

export { Messages };
