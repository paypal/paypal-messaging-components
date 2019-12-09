import startsWith from 'core-js-pure/stable/string/starts-with';
import { create } from 'zoid/src';

import containerTemplate from './containerTemplate';

export default create({
    tag: 'paypal-credit-modal',
    url: 'http://localhost.paypal.com:8443/crcpresentmentnodeweb/smart/modal',
    // eslint-disable-next-line security/detect-unsafe-regex, unicorn/no-unsafe-regex
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
        onClose: {
            type: 'function',
            queryParam: false,
            required: false
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
        }
    }
});
