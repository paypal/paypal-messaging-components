import arrayIncludes from 'core-js-pure/stable/array/includes';
import { create } from 'zoid/src';

import { getMeta, getEnv, getGlobalUrl, getGlobalVariable } from '../../utils';
import validate from '../message/validation';
import containerTemplate from './containerTemplate';

// Determine pre-selected tab based on the offer type of the banner.
// Currently only applicable to the US
const determineInitialTab = (type = 'NI') => {
    switch (true) {
        case arrayIncludes(
            ['EZP:ANY:EQZ', 'EZP:ANY:GTZ', 'PALA:MULTI:EQZ', 'PALA:MULTI:GTZ', 'PALA:SINGLE:EQZ', 'PALA:SINGLE:GTZ'],
            type.toUpperCase()
        ):
            return 'EZP';
        default:
            return 'NI';
    }
};

export default getGlobalVariable('__paypal_credit_modal__', () =>
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
                type: 'object',
                queryParam: false,
                required: true,
                serialization: 'json',
                value: validate.account
            },
            currency: {
                type: 'string',
                queryParam: true,
                required: false,
                value: validate.currency
            },
            amount: {
                type: 'number',
                queryParam: true,
                required: false,
                value: validate.amount
            },
            refId: {
                type: 'string',
                queryParam: false,
                required: false
            },
            buyerCountry: {
                type: 'string',
                queryParam: 'buyer_country',
                required: false,
                value: validate.buyerCountry
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
            payerId: {
                type: 'string',
                queryParam: 'payer_id',
                value: ({ props }) => (props.account.type === 'payer_id' ? props.account.id : undefined),
                required: false
            },
            clientId: {
                type: 'string',
                queryParam: 'client_id',
                value: ({ props }) => (props.account.type === 'client_id' ? props.account.id : undefined),
                required: false
            },
            merchantId: {
                type: 'string',
                queryParam: 'merchant_id',
                value: ({ props }) => props.account.subject,
                required: false
            },
            sdkMeta: {
                type: 'string',
                queryParam: true,
                sendToChild: false,
                required: false,
                value: getMeta
            },
            env: {
                type: 'string',
                queryParam: true,
                value: getEnv
            },
            version: {
                type: 'string',
                queryParam: true,
                value: () => __MESSAGES__.__VERSION__
            }
        }
    })
);
