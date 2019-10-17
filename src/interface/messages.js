import { getInlineOptions, globalState, getScript, getAccount, getEnv } from '../utils';
import { Logger } from '../messages/services/logger';
import Messages from '../messages';

export function setup() {
    // Populate global config options
    const script = getScript();
    if (script) {
        Messages.setGlobalConfig({
            account: getAccount(),
            ...getInlineOptions(script)
        });
    }

    if (__MESSAGES__.__TARGET__ !== 'SDK') {
        // When importing the library directly using UMD, window.paypal will not exist
        if (window.paypal) {
            // Alias for pilot merchant support
            window.paypal.Message = Messages;
        }
    } else if (getEnv() === 'sandbox') {
        Logger.warn('The messages component does not currently support the PayPal sandbox environment.');
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
