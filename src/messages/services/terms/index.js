import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise/src';

import { memoizeOnProps, getGlobalUrl } from '../../../utils';

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
