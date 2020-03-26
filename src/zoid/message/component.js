import startsWith from 'core-js-pure/stable/string/starts-with';
import { create } from 'zoid/src';

import { getTargetMeta, getGlobalUrl } from '../../utils';
import containerTemplate from './containerTemplate';

export default create({
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
            type: 'string',
            queryParam: false,
            // sendToChild: false,
            required: true
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
        merchantId: {
            type: 'string',
            queryParam: 'merchant_id',
            sendToChild: true,
            required: false
        },
        style: {
            type: 'object',
            serialization: 'json'
        },

        // Callbacks
        onRender: {
            type: 'function',
            required: false
        },
        onApply: {
            type: 'function',
            required: false
        },
        onClick: {
            type: 'function',
            required: false
        },

        // Computed Props
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
        }
    }
});
