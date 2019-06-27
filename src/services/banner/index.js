import objectEntries from 'core-js-pure/stable/object/entries';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise';

import { memoizeOnProps, objectGet } from '../../utils';
import { logger, EVENTS } from '../logger';
import getCustomTemplate from './customTemplate';

// Specific dimensions tied to JSON banners in Campaign Studio
// Swap the placement tag when changes for banners and messaging.js are required in sync
const PLACEMENT = 'x200x51';
// const PLACEMENT = 'x215x80';

const LOCALE_MAP = {
    US: 'en_US',
    GB: 'en_GB',
    FR: 'fr_FR',
    DE: 'de_DE'
};

/**
 * Fetch banner markup from imadserver via JSONP
 * @param {Object} options Banner options
 * @returns {Promise<string>} Banner Markup
 */
function fetcher({ account, amount, countryCode }) {
    return new ZalgoPromise(resolve => {
        // Create JSONP callback
        const callbackName = `_c${Math.floor(Math.random() * 10 ** 19)}`;

        // Fire off JSONP request
        const rootUrl = __BANNER_URL__;
        const queryParams = {
            dimensions: PLACEMENT,
            currency_value: amount,
            format: 'HTML',
            presentation_types: 'HTML',
            ch: 'UPSTREAM',
            call: `paypal.${callbackName}`
        };

        // Country code is optional. MORS will default to merchant's country by default
        if (countryCode && LOCALE_MAP[countryCode]) {
            queryParams.country_code = countryCode;
            queryParams.locale = LOCALE_MAP[countryCode];
        }

        const queryString = objectEntries(queryParams)
            .filter(([, val]) => val)
            .reduce(
                (accumulator, [key, val]) => `${accumulator}&${key}=${val}`,
                stringStartsWith(account, 'client-id') ? `client_id=${account.slice(10)}` : `pub_id=${account}`
            );
        const script = document.createElement('script');
        script.async = true;
        script.src = `${rootUrl}?${queryString}`;
        // LOGGER: Initiated
        logger.info(EVENTS.MESSAGE_FETCH_INITIATED, {
            account,
            amount
        });
        document.head.appendChild(script);

        window.paypal[callbackName] = markup => {
            // LOGGER: Received
            logger.info(EVENTS.MESSAGE_FETCH_RECEIVED, {
                account,
                amount
            });
            document.head.removeChild(script);
            delete window.paypal[callbackName];
            try {
                resolve({ markup: JSON.parse(markup.replace(/<\/?div>/g, '')) });
            } catch (err) {
                resolve({ markup });
            }
        };
    });
}

const memoFetcher = memoizeOnProps(fetcher, ['account', 'amount', 'countryCode']);

export default function getBannerMarkup(options) {
    if (objectGet(options, 'style.layout') !== 'custom') {
        return memoFetcher(options);
    }

    const sign = objectGet(options, 'sign');
    return ZalgoPromise.all([memoFetcher(options), getCustomTemplate(sign, options.account, options.style)]).then(
        ([data, template]) => {
            if (typeof data.markup === 'object') {
                // eslint-disable-next-line no-param-reassign
                data.markup.template = template;
            }

            return data;
        }
    );
}
