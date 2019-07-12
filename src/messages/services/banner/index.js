import objectAssign from 'core-js-pure/stable/object/assign';
import objectEntries from 'core-js-pure/stable/object/entries';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise';

import { memoizeOnProps, objectGet, objectMerge, objectFlattenToArray, passThrough, partial } from '../../../utils';
import { EVENTS, ERRORS } from '../logger';
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
        document.head.appendChild(script);

        window.__PP[callbackName] = markup => {
            document.head.removeChild(script);
            delete window.__PP[callbackName];
            try {
                resolve({ markup: JSON.parse(markup.replace(/<\/?div>/g, '')) });
            } catch (err) {
                resolve({ markup });
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

export default function getBannerMarkup({ options, logger }) {
    logger.info(EVENTS.FETCH_START);

    return (objectGet(options, 'style.layout') !== 'custom'
        ? memoFetcher(options).then(partial(objectAssign, { options }))
        : ZalgoPromise.all([memoFetcher(options), getCustomTemplate(options.style)]).then(([data, template]) => {
              if (typeof data.markup === 'object') {
                  if (template === '') {
                      logger.error({ message: ERRORS.INVALID_STYLE_OPTIONS });
                  }
                  data.markup.template = template; // eslint-disable-line no-param-reassign

                  return { markup: data.markup, options: objectMerge(options, getBannerOptions(template)) };
              }

              return { markup: data.markup, options };
          })
    ).then(
        passThrough(data => {
            logger.info(EVENTS.FETCH_END);
            data.options.style._flattened = objectFlattenToArray(data.options.style); // eslint-disable-line no-param-reassign
        })
    );
}
