import { getClientID, getSDKScript } from '@paypal/sdk-client/src';

import { globalState, setGlobalState } from '../utils/globalState';
import Messages from '../messages';
import { getInlineOptions } from '../utils';

export function setup() {
    // Populate global config options
    if (__MESSAGES__.__SDK__) {
        const script = getSDKScript();
        if (script) {
            setGlobalState({
                globalConfig: {
                    account: `client-id:${getClientID()}`,
                    ...getInlineOptions(script)
                }
            });
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
}

export { Messages };
