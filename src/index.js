import objectAssign from 'core-js-pure/stable/object/assign';
import { getClientID, getSDKScript } from '@paypal/sdk-client/src';

import render, { getInlineOptions } from './controllers/render';
import scanLegacyScripts from './utils/legacy';
import { objectGet } from './utils';

const isBrowser = () => !!window;
const globalConfig = {};

const Messages = config => ({ render: selector => render({ ...globalConfig, ...config }, selector) });

objectAssign(Messages, {
    render: (config = {}, selector) => render({ ...globalConfig, ...config }, selector),
    setGlobalConfig: (config = {}) => objectAssign(globalConfig, config)
});

// Check for window object in case imported into server side rendered app
if (isBrowser()) {
    // __LEGACY__ variable injected by webpack. If target build is merchant.js value will be true, otherwise false.
    // Webpack will tree shake this when build not targeting merchant.js
    if (__MESSAGES__.__LEGACY__) {
        scanLegacyScripts();
    }

    // Setup global library state
    Object.defineProperty(Messages, '__state__', {
        value: objectGet(window, 'paypal.Messages.__state__') || { nextId: 0, globalConfig },
        enumerable: false,
        writable: false
    });
    // If multiple instances of library on page, copy from what is globally stored
    objectAssign(globalConfig, objectGet(window, 'paypal.Messages.__state__.globalConfig'));

    // Populate global config options
    if (__MESSAGES__.__SDK__) {
        // TODO: Update to client ID when imadserver supports it
        globalConfig.account = `client-id:${getClientID()}`;
        const script = getSDKScript();
        if (script) {
            objectAssign(globalConfig, getInlineOptions(script));
        }
    } else {
        // eslint-disable-next-line compat/compat
        const script = document.currentScript || document.querySelector('script[src$="messaging.js"]');
        if (script) {
            objectAssign(globalConfig, getInlineOptions(script));
        }

        // Alias for pilot merchant support
        window.paypal.Message = Messages;
    }

    // Requires a merchant account to render a message
    if (globalConfig.account) {
        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', () => Messages.render({ _auto: true }));
        } else {
            Messages.render({ _auto: true });
        }
    }
}

// eslint-disable-next-line import/prefer-default-export
export { Messages };
