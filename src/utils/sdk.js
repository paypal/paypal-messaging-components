import arrayFrom from 'core-js-pure/stable/array/from';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';

/* eslint-disable eslint-comments/disable-enable-pair, no-else-return */
import {
    getClientID,
    getMerchantID,
    getSDKScript,
    getEnv as getSDKEnv,
    getCurrency as getSDKCurrency,
    getSDKMeta
} from '@paypal/sdk-client/src';

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

export function getScript() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKScript();
    } else {
        // eslint-disable-next-line compat/compat
        return document.currentScript || document.querySelector('script[src$="messaging.js"]');
    }
}

export function getCurrency() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKCurrency();
    } else {
        return undefined;
    }
}

export function getTargetMeta() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKMeta();
    } else {
        const path =
            getEnv() === 'local'
                ? 'http://localhost.paypal.com:8080'
                : 'https://www.paypalobjects.com/upstream/bizcomponents/js';
        const str = JSON.stringify({
            url: __MESSAGES__.__TARGET__ === 'LEGACY' ? `${path}/merchant.js` : `${path}/messaging.js`,
            attributes: arrayFrom(getScript().attributes)
                .filter(({ name }) => stringStartsWith(name, 'data-pp-'))
                .map(({ name, value }) => [name, value])
        });

        return btoa(
            encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (m, p1) => {
                return String.fromCharCode(parseInt(p1, 16));
            })
        ).replace(/=+$/, '');
    }
}
