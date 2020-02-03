import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import { memoizeOnProps, getGlobalUrl, request } from '../../../utils';

const currencyMap = {
    US: 'USD',
    DE: 'EUR'
};

function assembleUrl({ account, amount, offerCountry }) {
    const baseUrl = getGlobalUrl('TERMS');
    const queries = [
        'json=true',
        stringStartsWith(account, 'client-id') ? `cid=${account.slice(10)}` : `mid=${account}`,
        `country=${offerCountry}`,
        `currency=${currencyMap[offerCountry]}`
    ];

    if (amount) {
        queries.push(`amount=${amount}`);
    }

    return `${baseUrl}?${queries.join('&')}`;
}

function fetcher(options) {
    return request('GET', assembleUrl(options))
        .then(res => res.data)
        .catch(() => ({ error: true }));
}

export default memoizeOnProps(fetcher, ['account', 'amount']);
