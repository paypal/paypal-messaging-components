import {
    Treatment,
    getExperimentTreatment,
    getInlineOptions,
    getScript,
    getAccount,
    getPartnerAccount
} from '../utils';
import { setup as newSetup, destroy as newDestroy, Messages as NewMessages } from '.';
import { setup as oldSetup, destroy as oldDestroy, Messages as OldMessages } from '../old/interface/messages';

function getAccounts(config = {}) {
    if (config.account) {
        const { account, merchantId } = config;
        return { normalizedAccount: account.replace(/^client-id:/, ''), merchantId };
    }

    const script = getScript();

    if (script) {
        const { merchantid, account: inlineAccount } = getInlineOptions(script);
        const partnerAccount = getPartnerAccount();
        const account = partnerAccount || getAccount() || inlineAccount;
        const merchantId = (partnerAccount && getAccount()) || merchantid;

        if (account || merchantId) {
            return { normalizedAccount: account.replace(/^client-id:/, ''), merchantId };
        }
    }

    return {};
}

export const Messages = config => ({
    render: selector => {
        const { normalizedAccount, merchantId } = getAccounts(config);

        return getExperimentTreatment([normalizedAccount, merchantId]).then(treatment => {
            if (treatment === Treatment.TEST) {
                NewMessages(config).render(selector);
            } else {
                OldMessages(config).render(selector);
            }
        });
    }
});

Messages.__VERSION__ = __MESSAGES__.__VERSION__;
Messages.__DOMAIN__ = __MESSAGES__.__DOMAIN__;
Messages.render = (config, selector) => Messages(config).render(selector);
// Old and New are the same
Messages.setGlobalConfig = NewMessages.setGlobalConfig;

export function setup() {
    // This must run synchronously so that it's available immediately for the merchant to use
    if (__MESSAGES__.__TARGET__ !== 'SDK' && window.paypal) {
        // Alias for pilot merchant support
        window.paypal.Message = Messages;
    }

    const { normalizedAccount, merchantId } = getAccounts();

    if (normalizedAccount || merchantId) {
        getExperimentTreatment([normalizedAccount, merchantId]).then(treatment => {
            if (treatment === Treatment.TEST) {
                newSetup();
            } else {
                oldSetup();
            }
        });
    }
}

export function destroy() {
    newDestroy();
    oldDestroy();
}
