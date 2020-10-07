import arrayFrom from 'core-js-pure/stable/array/from';
import { destroy as zoidDestroy } from 'zoid/src';
import { destroy as bannerDestroy } from '../messages/controllers/render';
import { getInlineOptions, globalState, getScript, getAccount, getCurrency, getPartnerAccount } from '../../utils';
import Messages from '../messages';

export function setup() {
    // Populate global config options
    const script = getScript();
    if (script) {
        // Inline attributes are set to lowercase
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

    if (__MESSAGES__.__TARGET__ !== 'SDK') {
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
            setTimeout(() => {
                Messages.render({ _auto: true });
            }, 0);
        }
    }
}

export function destroy() {
    zoidDestroy();

    bannerDestroy();

    arrayFrom(document.querySelectorAll('[data-pp-id]')).forEach(node => {
        node.removeAttribute('data-pp-id');
        node.firstChild.remove();
    });
}

export { Messages };
