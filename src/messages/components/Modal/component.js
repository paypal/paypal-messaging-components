import startsWith from 'core-js-pure/stable/string/starts-with';
import { create } from 'zoid/src';
import { getCurrentScriptUID } from 'belter/src';

import { getEnv, getTargetMeta, getGlobalUrl } from '../../../utils';
import containerTemplate from './containerTemplate';

// Multiple Zoid components of the same tag cannot be created, so a
// global instance must be shared between all variants of the library running
// on a single page. Predominantly solves for multiple instances of merchant.js.
const getGlobalComponent = (namespace, fn) => {
    if (!window[namespace]) {
        window[namespace] = fn();
    }

    return window[namespace];
};

// Determine pre-selected tab based on the offer type of the banner.
// Currently only applicable to the US
const determineInitialTab = (type = 'NI') => {
    switch (true) {
        case [
            'EZP:ANY:EQZ',
            'EZP:ANY:GTZ',
            'PALA:MULTI:EQZ',
            'PALA:MULTI:GTZ',
            'PALA:SINGLE:EQZ',
            'PALA:SINGLE:GTZ'
        ].includes(type.toUpperCase()):
            return 'EZP';
        default:
            return 'NI';
    }
};

export default getGlobalComponent('__paypal_credit_modal__', () =>
    create({
        tag: 'paypal-credit-modal',
        url: getGlobalUrl('MODAL'),
        // eslint-disable-next-line security/detect-unsafe-regex
        domain: /\.paypal\.com(:\d+)?$/,
        containerTemplate,
        attributes: {
            iframe: {
                scrolling: 'no'
            }
        },
        props: {
            account: {
                type: 'string',
                queryParam: false,
                sendToChild: false,
                required: true
            },
            merchantId: {
                type: 'string',
                queryParam: 'merchant_id',
                sendToChild: true,
                required: false
            },
            country: {
                type: 'string',
                queryParam: true,
                required: true
            },
            currency: {
                type: 'string',
                queryParam: true,
                required: false
            },
            amount: {
                type: 'number',
                queryParam: true,
                required: false
            },
            refId: {
                type: 'string',
                queryParam: false,
                required: false
            },
            // Callbacks
            onClick: {
                type: 'function',
                queryParam: false,
                required: false
            },
            onCalculate: {
                type: 'function',
                queryParam: false,
                required: false
            },
            onClose: {
                type: 'function',
                queryParam: false,
                required: false
            },
            onReady: {
                type: 'function',
                queryParam: false,
                required: false
            },
            // Computed Props
            offer: {
                type: 'string',
                value: ({ props }) => determineInitialTab(props.offer),
                required: false
            },
            env: {
                type: 'string',
                queryParam: true,
                value: getEnv
            },
            payerId: {
                type: 'string',
                queryParam: 'payer_id',
                value: ({ props }) => (startsWith(props.account, 'client-id:') ? undefined : props.account),
                required: false
            },
            clientId: {
                type: 'string',
                queryParam: 'client_id',
                value: ({ props }) => (startsWith(props.account, 'client-id:') ? props.account.slice(10) : undefined),
                required: false
            },
            targetMeta: {
                type: 'string',
                queryParam: true,
                sendToChild: false,
                value: getTargetMeta
            },
            scriptUID: {
                type: 'string',
                queryParam: true,
                value: getCurrentScriptUID
            }
        }
    })
);
