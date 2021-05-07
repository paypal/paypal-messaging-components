/* eslint-disable eslint-comments/disable-enable-pair, no-else-return */
import arrayFrom from 'core-js-pure/stable/array/from';
import { SDK_QUERY_KEYS, SDK_SETTINGS } from '@paypal/sdk-constants/src';

import {
    getClientID,
    getMerchantID,
    getSDKScript,
    getEnv as getSDKEnv,
    getSDKMeta,
    getSDKAttributes,
    getSDKQueryParam,
    getNamespace as getSDKNamespace,
    getSessionID as getSDKSessionID,
    getStorageID as getSDKStorageID,
    getHost as getSDKHost
} from '@paypal/sdk-client/src';

import { getStorage } from 'belter/src';

import 'core-js-pure/stable/object/entries';

// SDK helper functions with standalone build polyfills
export function getEnv() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKEnv();
    } else {
        return __ENV__;
    }
}

export function getAccount() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        // TODO: Should we pass both up if they exist so that nodeweb can create a partner context?
        return getMerchantID()[0] || `client-id:${getClientID()}`;
    } else {
        return undefined;
    }
}

// Partner accounts should always integrate using client id so no need to prefix it with 'client-id:'
export function getPartnerAccount() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getMerchantID()[0] && `client-id:${getClientID()}`;
    } else {
        return undefined;
    }
}

const { currentScript } = typeof document !== 'undefined' ? document : {};
export function getScript() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKScript();
    } else {
        return (
            currentScript ||
            document.querySelector('script[src$="messaging.js"]') ||
            document.querySelector('script[src$="merchant.js"]')
        );
    }
}

export function getCurrency() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        // Returns 'currency' query param without default to USD
        return getSDKQueryParam(SDK_QUERY_KEYS.CURRENCY);
    } else {
        return undefined;
    }
}

export function getMeta() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKMeta();
    } else {
        return undefined;
    }
}

export function getScriptAttributes() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKAttributes();
    } else {
        return {};
    }
}

export function getNamespace() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKNamespace();
    } else {
        return getScript()?.getAttribute('data-pp-namespace') || 'paypal';
    }
}

export function getLibraryVersion() {
    return __MESSAGES__.__VERSION__;
}

// Use SDK methods when available, otherwise manually fetch storage via belter
// see: https://github.com/paypal/paypal-sdk-client/blob/master/src/session.js
export function getSessionID() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKSessionID();
    } else {
        return getStorage({ name: getNamespace() }).getSessionID();
    }
}

export function getStorageID() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKStorageID();
    } else {
        return getStorage({ name: getNamespace() }).getID();
    }
}

export function getHost() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKHost();
    } else {
        return 'paypal.com';
    }
}

// Check if the current script is in the process of being destroyed since
// the MutationObservers can fire before the SDK destroy lifecycle hook
export const isScriptBeingDestroyed = () => {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        const currentSdkScript = getScript();
        const host = getHost();

        // Ensure that there are currently no other SDK scripts that might be in the process of destroying this script
        return arrayFrom(document.querySelectorAll(`script[src*="${host}/sdk/js"]`)).some(
            script =>
                script !== currentSdkScript &&
                script.getAttribute(SDK_SETTINGS.NAMESPACE) === currentSdkScript.getAttribute(SDK_SETTINGS.NAMESPACE)
        );
    } else {
        return false;
    }
};
