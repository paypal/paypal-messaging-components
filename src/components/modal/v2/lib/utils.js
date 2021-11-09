import objectEntries from 'core-js-pure/stable/object/entries';
import { request, memoize, ppDebug } from '../../../../utils';

export const getContent = memoize(
    ({
        currency,
        amount,
        payerId,
        clientId,
        merchantId,
        buyerCountry,
        ignoreCache,
        version,
        env,
        stageTag,
        integrationType,
        channel,
        devTouchpoint
    }) => {
        const query = objectEntries({
            currency,
            amount,
            payer_id: payerId,
            client_id: clientId,
            merchant_id: merchantId,
            buyer_country: buyerCountry,
            ignore_cache: ignoreCache,
            version,
            env,
            stageTag,
            integrationType,
            channel,
            devTouchpoint
        })
            .filter(([, val]) => Boolean(val))
            .reduce(
                (acc, [key, val]) =>
                    `${acc}&${key}=${encodeURIComponent(typeof val === 'object' ? JSON.stringify(val) : val)}`,
                ''
            )
            .slice(1);

        ppDebug('Updating modal with new props...', { inZoid: true });

        return request('GET', `${window.location.origin}/credit-presentment/modalContent?${query}`).then(
            ({ data }) => data
        );
    }
);

/**
 * Checks if target is lander. If true, lander-specific styles will be used.
 * @returns boolean
 */
export const isLander = __MESSAGES__.__TARGET__ === 'LANDER';
