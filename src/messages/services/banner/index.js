/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
import objectEntries from 'core-js-pure/stable/object/entries';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise';

import { memoizeOnProps, objectGet, objectMerge, objectFlattenToArray } from '../../../utils';
import { logger, EVENTS, ERRORS } from '../logger';
import getCustomTemplate from './customTemplate';

// Using same JSONP callback namespace as original merchant.js
window.__PP = window.__PP || {};

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
function fetcher(options) {
    const { account, amount, countryCode } = options;
    return new ZalgoPromise(resolve => {
        // Create JSONP callback
        const callbackName = `c${Math.floor(Math.random() * 10 ** 19)}`;

        // Fire off JSONP request
        const rootUrl = __MESSAGES__.__BANNER_URL__;
        const queryParams = {
            dimensions: PLACEMENT,
            currency_value: amount,
            format: 'HTML',
            presentation_types: 'HTML',
            ch: 'UPSTREAM',
            call: `__PP.${callbackName}`
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

        window.__PP[callbackName] = markup => {
            // LOGGER: Received
            logger.info(EVENTS.MESSAGE_FETCH_RECEIVED, {
                account,
                amount
            });
            document.head.removeChild(script);
            delete window.__PP[callbackName];
            try {
                resolve({ markup: JSON.parse(markup.replace(/<\/?div>/g, '')), options });
            } catch (err) {
                resolve({ markup, options });
            }
        };
    });
}

/**
 * Extract annotations from markup into a single options object
 * @param {string} markup String of banner HTML markup
 * @returns {Object} Banner annotations
 */
function getBannerOptions(markup) {
    const annotationsString = markup.match(/^<!--([\s\S]+?)-->/);
    if (annotationsString) {
        try {
            return JSON.parse(annotationsString[1]);
        } catch (err) {
            throw new Error(ERRORS.INVALID_CUSTOM_BANNER_JSON);
        }
    }
    return {};
}

const memoFetcher = memoizeOnProps(fetcher, ['account', 'amount', 'countryCode']);

export default function getBannerMarkup(options) {
    if (objectGet(options, 'style.layout') !== 'custom') {
        return memoFetcher(options);
    }

    return ZalgoPromise.all([memoFetcher(options), getCustomTemplate(options.style)]).then(([data, template]) => {
        if (typeof data.markup === 'object') {
            if (template === '') {
                logger.error({ message: ERRORS.INVALID_STYLE_OPTIONS });
            }
            data.markup.template = template;

            const bannerOptions = getBannerOptions(template);

            const mergedOptions = objectMerge(options, bannerOptions);
            mergedOptions.style._flattened = objectFlattenToArray(mergedOptions.style);

            return { markup: data.markup, options: mergedOptions };
        }
        return { markup: data.markup, options };
    });
}
