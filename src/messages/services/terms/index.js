import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import { memoizeOnProps, getGlobalUrl, request } from '../../../utils';

function assembleUrl({ account, amount }) {
    const baseUrl = getGlobalUrl('TERMS');
    const queries = [
        'json=true',
        stringStartsWith(account, 'client-id') ? `cid=${account.slice(10)}` : `mid=${account}`
    ];

    // TODO: Look to dynamically set these values as we push for location driven logic
    queries.push('country=US');
    queries.push('currency=USD');

    if (amount) {
        queries.push(`amount=${amount}`);
    }

    return `${baseUrl}?${queries.join('&')}`;
}

function fetcher(options) {
    return request('GET', assembleUrl(options))
        .then(res => {
            return JSON.parse(res.data);
        })
        .catch(() => ({ error: true }));
}

export default memoizeOnProps(fetcher, ['account', 'amount']);
