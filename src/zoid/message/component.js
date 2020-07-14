import { create } from 'zoid/src';

import { getTargetMeta, getEnv, getGlobalUrl, getGlobalVariable } from '../../utils';
import validate from './validation';
import containerTemplate from './containerTemplate';

export default getGlobalVariable('__paypal_credit_message__', () =>
    create({
        tag: 'paypal-message',
        url: getGlobalUrl('MESSAGE'),
        // eslint-disable-next-line security/detect-unsafe-regex
        domain: /\.paypal\.com(:\d+)?$/,
        containerTemplate,
        autoResize: {
            width: true,
            height: true,
            element: 'button'
        },
        attributes: {
            iframe: {
                scrolling: 'no'
            }
        },
        props: {
            account: {
                type: 'object',
                serialization: 'json',
                queryParam: false,
                required: true,
                // Creates object from account string and merchantId string
                value: validate.account
            },
            amount: {
                type: 'number',
                queryParam: true,
                required: false,
                value: validate.amount
            },
            currency: {
                type: 'string',
                queryParam: true,
                required: false,
                value: validate.currency
            },
            placement: {
                type: 'string',
                queryParam: true,
                required: false,
                value: validate.placement
            },
            style: {
                type: 'object',
                serialization: 'json',
                queryParam: true,
                required: false,
                value: validate.style
            },
            offer: {
                type: 'string',
                queryParam: true,
                required: false,
                value: validate.offer
            },

            // Callbacks
            onClick: {
                type: 'function',
                queryParam: false,
                required: false
            },
            onHover: {
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
            targetMeta: {
                type: 'string',
                queryParam: true,
                sendToChild: false,
                value: getTargetMeta
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
