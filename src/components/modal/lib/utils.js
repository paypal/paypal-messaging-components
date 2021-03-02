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

        return request('GET', `${window.location.origin}/credit-presentment/modalContent?${query}`).then(
            ({ data }) => data
        );
    },
    ['currency', 'amount', 'country', 'clientId', 'payerId', 'merchantId', 'buyerCountry']
);
