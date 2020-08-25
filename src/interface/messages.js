import arrayIncludes from 'core-js-pure/stable/array/includes';

import { getInclusionList, getInlineOptions, getScript, getAccount, getPartnerAccount } from '../utils';
import { setup as newSetup, destroy as newDestroy, Messages as NewMessages } from '.';
import { setup as oldSetup, destroy as oldDestroy, Messages as OldMessages } from '../old/interface/messages';

function getGlobalAccount() {
    const script = getScript();

    if (script) {
        const { merchantid, account: inlineAccount } = getInlineOptions(script);
        const partnerAccount = getPartnerAccount();
        const account = partnerAccount || getAccount() || inlineAccount;
        const merchantId = (partnerAccount && getAccount()) || merchantid;
        const globalAccount = merchantId || account;

        if (globalAccount) {
            return { normalizedAccount: globalAccount.replace(/^client-id:/, ''), merchantId };
        }
    }

    return {};
}

export const Messages = config => ({
    render: selector =>
        getInclusionList().then(inclusionList => {
            const { account, merchantId } = config;
            const normalizedAccount = account.replace(/^client-id:/, '');

            if (
                arrayIncludes(inclusionList, normalizedAccount) ||
                (merchantId && arrayIncludes(inclusionList, merchantId))
            ) {
                NewMessages(config).render(selector);
            } else {
                OldMessages(config).render(selector);
            }
        })
});

Messages.render = (config, selector) => Messages(config).render(selector);
// Old and New are the same
Messages.setGlobalConfig = NewMessages.setGlobalConfig;

export function setup() {
    // This must run synchronously so that it's available immediately for the merchant to use
    if (__MESSAGES__.__TARGET__ !== 'SDK' && window.paypal) {
        // Alias for pilot merchant support
        window.paypal.Message = Messages;
    }

    getInclusionList().then(inclusionList => {
        const { normalizedAccount, merchantId } = getGlobalAccount();

        if (
            arrayIncludes(inclusionList, normalizedAccount) ||
            (merchantId && arrayIncludes(inclusionList, merchantId))
        ) {
            newSetup();
        } else {
            oldSetup();
        }
    });
}

export function destroy() {
    newDestroy();
    oldDestroy();
}
