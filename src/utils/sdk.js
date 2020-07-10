import objectAssign from 'core-js-pure/stable/object/assign';
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
import { base64encode } from 'belter/src';

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
            document.currentScript ||
            document.querySelector('script[src$="messaging.js"]') ||
            document.querySelector('script[src$="merchant.js"]')
        );
    }
}

export function getCurrency() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKCurrency();
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

export function getTargetMeta() {
    const metaObject = {
        target: __MESSAGES__.__TARGET__,
        componentUrl:
            getEnv() !== 'production'
                ? `${window.location.origin}/smart-credit-modal.js`
                : `https://www.paypalobjects.com/upstream/bizcomponents/js/versioned/smart-credit-modal@${__MESSAGES__.__VERSION__}.js`
    };

    if (__MESSAGES__.__TARGET__ === 'SDK') {
        objectAssign(
            metaObject,
            JSON.parse(
                // Slightly modified from belter/src base64decode due to clash on merchant site:
                // https://www.myrobotcenter.de/de_de/yardforce-sa600h-2019
                decodeURIComponent(
                    atob(getSDKMeta())
                        .split('')
                        .map(c => {
                            return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
                        })
                        .join('')
                )
            )
        );
    } else {
        const script = getScript();

        objectAssign(metaObject, {
            url:
                script && (stringStartsWith(script.src, 'https') || getEnv() === 'local')
                    ? script.src
                    : 'https://www.paypalobjects.com/upstream/bizcomponents/js/messaging.js'
        });
    }

    return base64encode(JSON.stringify(metaObject));
}
