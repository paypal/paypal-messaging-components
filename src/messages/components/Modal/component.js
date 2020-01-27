import startsWith from 'core-js-pure/stable/string/starts-with';
import { create } from 'zoid/src';

import { getTargetMeta, getGlobalUrl } from '../../../utils';
import containerTemplate from './containerTemplate';

export default create({
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
        type: {
            type: 'string',
            queryParam: true,
            required: true
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
