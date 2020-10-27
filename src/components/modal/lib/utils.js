import arrayIncludes from 'core-js-pure/stable/array/includes';
import objectEntries from 'core-js-pure/stable/object/entries';
import { request, memoizeOnProps } from '../../../utils';

export const getContent = memoizeOnProps(
    ({ currency, amount, payerId, clientId, merchantId, buyerCountry }) => {
        const query = objectEntries({
            currency,
            amount,
            payer_id: payerId,
            client_id: clientId,
            merchant_id: merchantId,
            buyer_country: buyerCountry
        })
            .filter(([, val]) => Boolean(val))
            .reduce(
                (acc, [key, val]) =>
                    `${acc}&${key}=${encodeURIComponent(typeof val === 'object' ? JSON.stringify(val) : val)}`,
                ''
            )
            .slice(1);

        return request('GET', `${window.location.origin}/credit-presentment/calculateTerms?${query}`).then(
            ({ data }) => data
        );
    },
    ['currency', 'amount', 'country', 'clientId', 'payerId', 'merchantId', 'buyerCountry']
);

export function getProductForOffer(offer) {
    if (
        arrayIncludes(
            ['EZP:ANY:EQZ', 'EZP:ANY:GTZ', 'PALA:MULTI:EQZ', 'PALA:MULTI:GTZ', 'PALA:SINGLE:EQZ', 'PALA:SINGLE:GTZ'],
            offer.toUpperCase()
        )
    ) {
        return 'EZP';
    }

    if (arrayIncludes(['GPL', 'GPLQ', 'GPLNQ'], offer.toUpperCase())) {
        return 'GPL';
    }

    return 'NI';
}
