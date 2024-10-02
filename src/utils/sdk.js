/* eslint-disable eslint-comments/disable-enable-pair, no-else-return */
import arrayFrom from 'core-js-pure/stable/array/from';

import { getStorage as getBelterStorage } from '@krakenjs/belter/src';
import { SDK_QUERY_KEYS, SDK_SETTINGS } from '@paypal/sdk-constants/src';
import {
    getClientID,
    getMerchantID,
    getSDKScript,
    getEnv as getSDKEnv,
    getFundingEligibility,
    getSDKMeta,
    getSDKAttributes,
    getSDKQueryParam,
    getCSPNonce,
    getNamespace as getSDKNamespace,
    getDefaultNamespace as getDefaultSDKNamespace,
    getSessionID as getSDKSessionID,
    getStorageID as getSDKStorageID,
    getStorageState as getSDKStorageState,
    getPayPalDomain as getSDKPayPalDomain,
    getDisableSetCookie as getSDKDisableCookie,
    getPageType as getSDKPageType
} from '@paypal/sdk-client/src';

import { TAG } from './constants';

export function getDisableSetCookie() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKDisableCookie();
    } else {
        return false;
    }
}

export function getNativeModal() {
    if (typeof __MESSAGES__.__NATIVE_MODAL__ !== 'undefined') {
        return __MESSAGES__.__NATIVE_MODAL__;
    }

    return false;
}

// SDK helper functions with standalone build polyfills
export function getEnv() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKEnv();
    } else {
        return __ENV__;
    }
}

export function getMerchantConfig() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        // TODO: remove getFundingEligibility call and try catch after globals swap
        try {
            return __MESSAGING_GLOBALS__?.merchantProfile?.hash;
        } catch {
            return getFundingEligibility()?.paylater?.merchantConfigHash;
        }
    } else {
        return undefined;
    }
}

export function getAccount() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        // TODO: Should we pass both up if they exist so that nodeweb can create a partner context?
        return getMerchantID().join(',') || `client-id:${getClientID()}`;
    } else {
        return undefined;
    }
}
export function getPageType() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKPageType();
    } else {
        return undefined;
    }
}
export function getNonce() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getCSPNonce();
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

export function getDefaultNamespace() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getDefaultSDKNamespace();
    } else {
        return 'paypal';
    }
}

export function getNamespace() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKNamespace();
    } else {
        return getScript()?.getAttribute('data-pp-namespace') || getDefaultNamespace();
    }
}

export function getLibraryVersion() {
    return __MESSAGES__.__VERSION__;
}

export function isZoidComponent() {
    // Merchants may use `zoid` to place our components inside an IFrame
    // so we ensure that we check for the tags of our components
    return Object.values(TAG).some(tag => window.name.startsWith(`__zoid__${tag.replace(/-/g, '_')}`));
}

export function getStorage() {
    return getBelterStorage({ name: getNamespace() });
}

// Use SDK methods when available, otherwise manually fetch storage via belter
// see: https://github.com/paypal/paypal-sdk-client/blob/master/src/session.js
export function getSessionID() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKSessionID();
    } else {
        return getStorage().getSessionID();
    }
}

// Retrieves storageID. NOTE: Creates new ID if not already in local storage.
export function getOrCreateDeviceID() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKStorageID();
    } else {
        return getStorage().getID();
    }
}

export function updateStorage(values) {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKStorageState(storage => Object.assign(storage, values));
    } else {
        return getStorage().getState(storage => Object.assign(storage, values));
    }
}

// Check if the current script is in the process of being destroyed since
// the MutationObservers can fire before the SDK destroy lifecycle hook
export const isScriptBeingDestroyed = () => {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        const currentSdkScript = getScript();
        // URL API not supported in IE11, but anchor tags have parsed href properties
        const location = document.createElement('a');
        location.href = currentSdkScript.src;

        // Ensure that there are currently no other SDK scripts that might be in the process of destroying this script
        return arrayFrom(document.querySelectorAll(`script[src*="${location.host}/sdk/js"]`)).some(
            script =>
                script !== currentSdkScript &&
                script.getAttribute(SDK_SETTINGS.NAMESPACE) === currentSdkScript.getAttribute(SDK_SETTINGS.NAMESPACE)
        );
    } else {
        return false;
    }
};

export function getPayPalDomain() {
    if (getEnv() !== 'production' && getEnv() !== 'sandbox') {
        const testEnviroment = window.__TEST_ENV__ ?? __MESSAGES__.__TEST_ENV__;

        if (testEnviroment) {
            return testEnviroment;
        }

        // eslint-disable-next-line security/detect-unsafe-regex
        if (window.location.origin.match(/\.paypal\.com(:\d+)?$/)) {
            return window.location.origin;
        }
    }

    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKPayPalDomain();
    } else {
        const domain = __MESSAGES__.__DOMAIN__[`__${getEnv().toUpperCase()}__`];

        if (domain) {
            return domain;
        }

        throw new Error('Missing PayPal Domain');
    }
}

export function getStageTag() {
    if (__MESSAGES__.__STAGE_TAG__) {
        if (__MESSAGES__.__STAGE_TAG__ === 'local') {
            return window.location.origin;
        } else {
            return __MESSAGES__.__STAGE_TAG__;
        }
    } else {
        return undefined;
    }
}
export function getDevTouchpoint() {
    const devTouchpoint = window.__DEV_TOUCHPOINT__ ?? __MESSAGES__.__DEV_TOUCHPOINT__;
    if (devTouchpoint && getEnv() !== 'production' && getEnv() !== 'sandbox') {
        return true;
    } else {
        return undefined; // Prevent the zoid query param
    }
}

// Combine static features and input features into single string
export function getFeatures(featureProps) {
    const staticFeatures = [];

    if (getNativeModal()) {
        staticFeatures.push('native-modal');
    }

    let newFeatures = featureProps || '';
    if (staticFeatures.length > 0) {
        newFeatures += newFeatures ? `,${staticFeatures.join(',')}` : staticFeatures.join(',');
    }

    return featureProps === undefined && newFeatures === '' ? undefined : newFeatures;
}

// open mini-browser with message lander url
export function getURIPopup(lander, label) {
    return window.open(lander, label, 'width=460,height=900');
}
