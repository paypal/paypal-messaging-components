import { create } from 'zoid/src';

import { getMeta, getEnv, getGlobalUrl, getGlobalVariable } from '../../utils';
import validate from '../message/validation';
import containerTemplate from './containerTemplate';

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
            onApply: {
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
            payerId: {
                type: 'string',
                queryParam: 'payer_id',
                value: ({ props }) => (props.account.type === 'payer_id:' ? props.account.id : undefined),
                required: false
            },
            clientId: {
                type: 'string',
                queryParam: 'client_id',
                value: ({ props }) => (props.account.type === 'client-id:' ? props.account.id : undefined),
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
