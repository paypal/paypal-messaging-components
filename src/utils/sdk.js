/* eslint-disable eslint-comments/disable-enable-pair, no-else-return */
import { getClientID, getMerchantID, getSDKScript, getEnv as getSDKEnv, getCurrency } from '@paypal/sdk-client/src';

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
        return getMerchantID()[0] || `client-id:${getClientID()}`;
    } else {
        return undefined;
    }
}

export function getScript() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKScript();
    } else {
        // eslint-disable-next-line compat/compat
        return document.currentScript || document.querySelector('script[src$="messaging.js"]');
    }
}

export function getCurrencyCode() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getCurrency();
    } else {
        return 'USD';
    }
}
