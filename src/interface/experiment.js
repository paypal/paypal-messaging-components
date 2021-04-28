import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import {
    Treatment,
    getExperimentTreatment,
    getInlineOptions,
    getScript,
    getAccount,
    getPartnerAccount,
    getLibraryVersion
} from '../utils';
import {
    setup as newSetup,
    destroy as newDestroy,
    Messages as NewMessages,
    MessagesModal as NewMessagesModal
} from '.';
import { setup as oldSetup, destroy as oldDestroy, Messages as OldMessages } from '../old/interface/messages';
import { getMessageComponent } from '../zoid/message';
import { getModalComponent } from '../zoid/modal';

// Required since the SSR ramp file request is async and delays these calls in newSetup()
// Should be safe to remove after the pre-SSR logic is all removed
if (stringStartsWith(window.name, '__zoid__')) {
    getMessageComponent();
    getModalComponent();
}

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

Messages.version = getLibraryVersion();
Messages.render = (config, selector) => Messages(config).render(selector);
// Old and New are the same
Messages.setGlobalConfig = NewMessages.setGlobalConfig;

export const MessagesModal = config => {
    const { normalizedAccount, merchantId } = getAccounts(config);
    const runIfTestTreatment = fn =>
        getExperimentTreatment([normalizedAccount, merchantId]).then(treatment => treatment === Treatment.TEST && fn());

    // Ensure that standalone modals invoked via the JS SDK wait for the experiment request to finish
    // so that the setup functions can run before the component rendering code
    return {
        render: selector => runIfTestTreatment(() => NewMessagesModal(config).render(selector)),
        show: selector => runIfTestTreatment(() => NewMessagesModal(config).show(selector)),
        hide: () => runIfTestTreatment(() => NewMessagesModal(config).hide()),
        updateProps: props => runIfTestTreatment(() => NewMessagesModal(config).updateProps(props))
    };
};

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
    } else {
        newSetup();
    }
}

export function destroy() {
    newDestroy();
    oldDestroy();
}
