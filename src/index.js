import { getMerchantID, getSDKScript } from '@paypal/sdk-client/src';
import { globalState } from './utils/globalState';
import Messages from './controllers/bootstrap';
import { getInlineOptions } from './controllers/render';

// Populate global config options
if (__SDK__) {
    // TODO: Update to client ID when imadserver supports it
    Messages.setGlobalConfig({ account: getMerchantID() });
    const script = getSDKScript();
    if (script) {
        Messages.setGlobalConfig(getInlineOptions(script));
    }
} else {
    // eslint-disable-next-line compat/compat
    const script = document.currentScript || document.querySelector('script[src$="messaging.js"]');
    if (script) {
        Messages.setGlobalConfig(getInlineOptions(script));
    }

    // Alias for pilot merchant support
    window.paypal.Message = Messages;
}

// Requires a merchant account to render a message
if (globalState.globalConfig.account) {
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', () => Messages.render({ _auto: true }));
    } else {
        Messages.render({ _auto: true });
    }
}

// eslint-disable-next-line import/prefer-default-export
export { Messages };
