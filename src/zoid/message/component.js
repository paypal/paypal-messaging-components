import { create } from 'zoid/src';

import { getTargetMeta, getGlobalUrl, getGlobalComponent } from '../../utils';
import containerTemplate from './containerTemplate';

export default getGlobalComponent('__paypal_credit_message__', () =>
    create({
        tag: 'paypal-message',
        url: getGlobalUrl('MESSAGE'),
        // eslint-disable-next-line security/detect-unsafe-regex
        domain: /\.paypal\.com(:\d+)?$/,
        containerTemplate,
        autoResize: {
            width: false,
            height: true
        },
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
                serialization: 'json'
            },
            amount: {
                type: 'number',
                queryParam: true,
                required: false
            },
            currency: {
                type: 'string',
                queryParam: true,
                required: false
            },
            placement: {
                type: 'string',
                queryParam: true,
                required: false
            },
            style: {
                type: 'object',
                serialization: 'json',
                default: () => ({})
            },

            // Callbacks
            // TODO: Is onRender provided out of the box by zoid?
            // onRender: {
            //     type: 'function',
            //     required: false
            // },
            onApply: {
                type: 'function',
                required: false
            },
            onClick: {
                type: 'function',
                required: false
            },
            onReady: {
                type: 'function',
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
            targetMeta: {
                type: 'string',
                queryParam: true,
                sendToChild: false,
                value: getTargetMeta
            },
            index: {
                type: 'number',
                queryParam: true,
                value: () => {
                    if (!window.__paypal_credit_message__.index) {
                        window.__paypal_credit_message__.index = 0;
                    }
                    // eslint-disable-next-line no-plusplus
                    return window.__paypal_credit_message__.index++;
                }
            }
        }
    })
);
