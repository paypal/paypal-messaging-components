import objectEntries from 'core-js-pure/stable/object/entries';
import { request, memoize, ppDebug } from '../../../utils';

export const getContent = memoize(
    ({ currency, amount, payerId, clientId, merchantId, buyerCountry, ignoreCache, version, env, stageTag }) => {
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
            stageTag
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

export function setupTabIndex() {
    const modal = document.querySelector('.modal-container');
    const focusableElementsString =
        "a[href], button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])";
    const focusableElements = modal.querySelectorAll(focusableElementsString);
    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length - 1];
    function trapTabKey(e) {
        // Check for TAB key press
        if (e.keyCode === 9) {
            // SHIFT + TAB
            if (e.shiftKey) {
                if (document.activeElement === firstTabStop) {
                    e.preventDefault();
                    lastTabStop.focus();
                }
                // TAB
            } else if (document.activeElement === lastTabStop) {
                e.preventDefault();
                firstTabStop.focus();
            }
        }
    }
    modal.addEventListener('keydown', trapTabKey);
}
