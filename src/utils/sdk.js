/* eslint-disable eslint-comments/disable-enable-pair, no-else-return */
import {
    getClientID,
    getMerchantID,
    getSDKScript,
    getEnv as getSDKEnv,
    getSDKMeta,
    getSDKAttributes,
    getSDKQueryParam,
    getNamespace as getSDKNamespace
} from '@paypal/sdk-client/src';
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

export function getScript() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKScript();
    } else {
        return (
            document.querySelector('script[src$="messaging.js"]') ||
            document.querySelector('script[src$="merchant.js"]') ||
            document.currentScript
        );
    }
}

export function getCurrency() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        // Returns 'currency' query param without default to USD
        return getSDKQueryParam('currency');
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
