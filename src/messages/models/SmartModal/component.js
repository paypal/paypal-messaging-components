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
            queryParam: true,
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
        amount: {
            type: 'string',
            queryParam: true,
            required: false
        },
        onClose: {
            type: 'function',
            queryParam: false,
            required: false
        }
    }
});
