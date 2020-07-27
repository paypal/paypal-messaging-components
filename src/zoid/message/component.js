import { create } from 'zoid/src';

import { getMeta, getEnv, getGlobalUrl, getGlobalVariable } from 'utils';
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
                queryParam: 'credit_type',
                required: false,
                value: validate.offer
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
            onHover: {
                type: 'function',
                queryParam: false,
                required: false
            },
            onReady: {
                type: 'function',
                queryParam: false,
                value: ({ props, event }) => {
                    const { onReady } = props;

                    return ({ styles, ...rest }) => {
                        if (styles) {
                            event.trigger('styles', { styles });
                        }

                        return onReady && onReady({ styles, ...rest });
                    };
                }
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
