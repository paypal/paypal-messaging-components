import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise/src';

import { memoizeOnProps } from '../../../utils';

const currenyMap = {
    US: 'USD',
    DE: 'EUR'
};

function assembleUrl({ account, amount }) {
    const baseUrl = __MESSAGES__.__TERMS_URL__;
    const queries = [
        'json=true',
        stringStartsWith(account, 'client-id') ? `cid=${account.slice(10)}` : `mid=${account}`
    ];

    queries.push(`country=${__MESSAGES__.__LOCALE__}`);
    queries.push(`currency=${currenyMap[__MESSAGES__.__LOCALE__]}`);

    if (amount) {
        queries.push(`amount=${amount}`);
    }

    return `${baseUrl}?${queries.join('&')}`;
}

function fetcher(options) {
    return new ZalgoPromise(resolve => {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                switch (xhttp.status) {
                    case 200:
                        resolve(JSON.parse(xhttp.responseText));
                        break;
                    default:
                        resolve({ error: true });
                }
            }
        };

        xhttp.open('GET', assembleUrl(options), true);
        xhttp.send();
    });
}

export default memoizeOnProps(fetcher, ['account', 'amount']);
