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
            return globalAccount.replace(/^client-id:/, '');
        }
    }

    return undefined;
}

export const Messages = config => ({
    render: selector =>
        getInclusionList().then(inclusionList => {
            const account = config.merchantId || config.account;

            if (inclusionList.includes(account)) {
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
    getInclusionList().then(inclusionList => {
        const account = getGlobalAccount();

        if (inclusionList.includes(account)) {
            newSetup();
        } else {
            oldSetup();
        }
    });
}

export function destroy() {
    getInclusionList().then(inclusionList => {
        const account = getGlobalAccount();

        if (inclusionList.includes(account)) {
            newDestroy();
        } else {
            oldDestroy();
        }
    });
}
