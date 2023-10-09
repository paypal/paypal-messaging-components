import arrayFrom from 'core-js-pure/stable/array/from';
import objectEntries from 'core-js-pure/stable/object/entries';
import { request, memoize, ppDebug } from '../../../utils';

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

export function setupTabTrap() {
    const focusableElementsString =
        "a[href], button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])";

    function trapTabKey(e) {
        // Check for TAB key press
        if (e.keyCode === 9) {
            const tabArray = arrayFrom(document.querySelectorAll(focusableElementsString)).filter(
                node => window.getComputedStyle(node).visibility === 'visible'
            );
            let nextElement;
            // SHIFT + TAB
            if (e.shiftKey && document.activeElement === tabArray[0]) {
                nextElement = tabArray[tabArray.length - 1];
            } else if (document.activeElement === tabArray[tabArray.length - 1]) {
                // eslint-disable-next-line prefer-destructuring
                nextElement = tabArray[0];
            }

            if (typeof nextElement !== 'undefined') {
                e.preventDefault();
                nextElement.focus();
            }
        }
    }
    window.addEventListener('keydown', trapTabKey);
}
