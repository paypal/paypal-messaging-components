import {
    getInlineOptions,
    globalState,
    setGlobalState,
    getScript,
    getAccount,
    getCurrency,
    getPartnerAccount
} from 'utils';
import Messages from './interface';
import { Modal } from '../../zoid/modal';

export default function setup() {
    setGlobalState({ messagesMap: new Map() });
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
        window.paypal.Modal = Modal;
        // Alias for pilot merchant support
        window.paypal.Message = Messages;
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
