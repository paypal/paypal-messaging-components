import objectEntries from 'core-js-pure/stable/object/entries';

import { request, memoize } from '@library/common';

export const getContent = memoize(({ currency, amount, payerId, clientId, merchantId, buyerCountry, version, env }) => {
    const query = objectEntries({
        currency,
        amount,
        payer_id: payerId,
        client_id: clientId,
        merchant_id: merchantId,
        buyer_country: buyerCountry,
        version,
        env
    })
        .filter(([, val]) => Boolean(val))
        .reduce(
            (acc, [key, val]) =>
                `${acc}&${key}=${encodeURIComponent(typeof val === 'object' ? JSON.stringify(val) : val)}`,
            ''
        )
        .slice(1);

    return request('GET', `${window.location.origin}/credit-presentment/modalContent?${query}`).then(
        ({ data }) => data
    );
});
