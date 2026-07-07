import { isIosWebview, isAndroidWebview } from '@krakenjs/belter/src';
import { request, memoize, ppDebug, getGlobalUrl } from '../../../../utils';
import validate from '../../../../library/zoid/message/validation';

export const getContent = memoize(
    ({
        currency,
        amount,
        payerId,
        clientId,
        merchantId,
        customerId,
        buyerCountry,
        language,
        locale,
        ignoreCache,
        deviceID,
        version,
        env,
        stageTag,
        integrationType,
        channel,
        contextualComponents,
        devTouchpoint,
        disableSetCookie,
        features,
        buttonSessionId,
        integrationIdentifier,
        experimentExperience,
        experimentName
    }) => {
        const query = Object.entries({
            currency,
            amount,
            payer_id: payerId,
            client_id: clientId,
            merchant_id: merchantId,
            customer_id: customerId,
            buyer_country: buyerCountry,
            language,
            locale,
            ignore_cache: ignoreCache,
            deviceID,
            version,
            env,
            stageTag,
            integrationType,
            channel,
            contextual_components: contextualComponents,
            devTouchpoint,
            disableSetCookie,
            features,
            buttonSessionId,
            integrationIdentifier,
            experiment_experience: experimentExperience,
            experiment_name: experimentName
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
const { userAgent } = window.navigator;
export const isIframe = window.top !== window || isIosWebview(userAgent) || isAndroidWebview(userAgent);

export function getIosMajorVersionFromUserAgent(ua = userAgent) {
    const match = ua.match(/OS\s(\d+)[_.]/i);

    if (!match) {
        return null;
    }

    return Number.parseInt(match[1], 10);
}

export const isIos26Webview = isIosWebview(userAgent) && getIosMajorVersionFromUserAgent(userAgent) === 26;

export function setupTabTrap() {
    // Disable tab trap functionality for modal lander
    if (isLander) {
        return;
    }

    const focusableElementsString =
        "a[href], button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])";

    function trapTabKey(e) {
        // Check for TAB key press
        if (e.keyCode === 9 && !document.querySelector('.modal-closed')) {
            const tabArray = Array.from(document.querySelectorAll(focusableElementsString)).filter(
                node => window.getComputedStyle(node).visibility === 'visible'
            );
            // SHIFT + TAB
            if (e.shiftKey && document.activeElement === tabArray[0]) {
                e.preventDefault();
                tabArray[tabArray.length - 1].focus();
            } else if (document.activeElement === tabArray[tabArray.length - 1]) {
                e.preventDefault();
                tabArray[0].focus();
            }
            // auto scroll into view for focused element
            setTimeout(() => {
                document.activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 0);
        }
    }
    window.addEventListener('keydown', trapTabKey);
}

export function formatDateByCountry(country) {
    const currentDate = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    if (country === 'US') {
        return currentDate.toLocaleDateString('en-US', options);
    }
    return currentDate.toLocaleDateString('en-GB', options);
}

const EURO_STYLE_CLASS = 'DE';
const EURO_STYLE_COUNTRIES = new Set(['DE', 'AT']);

export function getEuroStyleClass(country) {
    return EURO_STYLE_COUNTRIES.has(country) ? EURO_STYLE_CLASS : '';
}

export function validateProps(updatedProps) {
    const validatedProps = {};
    Object.entries(updatedProps).forEach(entry => {
        const [k, v] = entry;
        if (k === 'offerType') {
            validatedProps.offer = validate.offer({ props: { offer: v } });
        } else if (!Object.keys(validate).includes(k)) {
            validatedProps[k] = v;
        } else {
            validatedProps[k] = validate[k]({ props: { [k]: v } });
        }
    });
    return validatedProps;
}

/**
 * Redirect the modal window to the CAP_s prequalification route.
 * Accepts query params (e.g., token, offer).
 *
 * @param {Object} params - query parameters to append to the URL
 */
export function openPrequalification(params = {}) {
    const { token, offer } = params;
    const baseUrl = getGlobalUrl('PREQUALIFICATION');
    const query = Object.entries({ offer })
        .filter(([, val]) => typeof val !== 'undefined' && val !== null && val !== '')
        // Encode values to keep URL valid; keys are expected to be safe identifiers.
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&');
    // TODO: sessionIdentifier is being discussed; currently using ecToken.
    const url = `${baseUrl}?token=${encodeURIComponent(token ?? '')}${query ? `&${query}` : ''}`;

    window.location.assign(url);
}
