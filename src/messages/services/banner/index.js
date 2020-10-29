import objectEntries from 'core-js-pure/stable/object/entries';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import stringIncludes from 'core-js-pure/stable/string/includes';
import arrayFrom from 'core-js-pure/stable/array/from';
import { ZalgoPromise } from 'zalgo-promise/src';

import {
    memoizeOnProps,
    objectGet,
    objectFlattenToArray,
    getGlobalUrl,
    request,
    getCurrency,
    createUUID
} from '../../../utils';

import { EVENTS, ERRORS } from '../logger';
import Template from '../../models/Template';
import createContainer from '../../models/Container';
import { setLocale } from '../../../locale';
import { validateStyleOptions } from '../../models/Banner/validateOptions';

// Old fetcher
// Swap the placement tag when changes for banners and messaging.js are required in sync
const PLACEMENT = 'UCCU_200x51';
// const PLACEMENT = 'UCCU_215x80';

const NI_ONLY_PLACEMENT = 'UCCU_199x99';

// Using same JSONP callback namespace as original merchant.js
window.__PP = window.__PP || {};

function mutateMarkup(markup) {
    try {
        const content = markup.content.json;
        const tracking = markup.tracking_details;
        const meta = JSON.parse(content.meta);
        const mutatedMarkup = {
            data: {
                disclaimer: JSON.parse(content.disclaimer),
                headline: JSON.parse(content.headline),
                subHeadline: JSON.parse(content.subHeadline)
            },
            meta: {
                clickUrl: tracking.click_url,
                messageRequestId: createUUID(),
                impressionUrl: tracking.impression_url,
                ...meta
            }
        };
        return mutatedMarkup;
    } catch (err) {
        throw new Error(ERRORS.MESSAGE_INVALID_MARKUP);
    }
}

/**
 * Fetch banner markup from imadserver via JSONP
 * @param {Object} options Banner options
 * @returns {Promise<string>} Banner Markup
 */
function fetcher(options) {
    const {
        account,
        merchantId,
        amount,
        offerType,
        currency,
        buyerCountry,
        style: { typeEZP }
    } = options;
    return new ZalgoPromise(resolve => {
        // Create JSONP callback
        const callbackName = `c${Math.floor(Math.random() * 10 ** 19)}`;

        // For legacy banner placements where there is no EZP banner, use a separate placement tag that will always return NI
        const touchpoint = typeEZP === '' || offerType === 'NI' ? NI_ONLY_PLACEMENT : PLACEMENT;

        // Fire off JSONP request
        const rootUrl = getGlobalUrl('MESSAGE');
        const queryParams = {
            touchpoint,
            currency_value: amount,
            currency_code: currency || getCurrency(),
            buyer_country: buyerCountry,
            format: 'HTML',
            presentation_types: 'HTML',
            ch: 'UPSTREAM',
            call: `__PP.${callbackName}`,
            // Future prep for credit-presentment partner integration, ignored by imadserv
            merchant_id: merchantId
        };

        const queryString = objectEntries(queryParams)
            .filter(([, val]) => val)
            .reduce(
                (accumulator, [key, val]) => `${accumulator}&${key}=${val}`,
                // TODO: This logic needs to be modified when switching from imadserv
                // to credit-presentment in order to properly handle partner integrations
                !merchantId && stringStartsWith(account, 'client-id')
                    ? `client_id=${account.slice(10)}`
                    : `pub_id=${merchantId || account}`
            );
        const script = document.createElement('script');
        script.async = true;

        // Manual request instead of traditional JSONP so that we can catch 204 no content stalling
        request('GET', `${rootUrl}?${queryString}`, { withCredentials: true }).then(res => {
            script.text = res.data || `__PP.${callbackName}('')`;
            document.head.appendChild(script);
        });

        window.__PP[callbackName] = markup => {
            document.head.removeChild(script);
            delete window.__PP[callbackName];

            if (__MESSAGES__.__DEMO__) {
                if (window.__PP_DEMO_BANNER_HOOK) {
                    window.__PP_DEMO_BANNER_HOOK(markup);
                }
            }

            // Handles markup for v2, v1, v0
            if (typeof markup === 'object') {
                // Mutate Markup handles personalization studio json response
                resolve({ markup: mutateMarkup(markup) });
            } else {
                try {
                    const { meta, ...data } = JSON.parse(markup.replace(/<\/?div>/g, ''));

                    resolve({ markup: { meta, data } });
                } catch (err) {
                    resolve({ markup });
                }
            }
        };
    });
}

/**
 * IMPORTANT: This function is fragile and very dependent on how
 * IE handles sizing containers with specific style property values
 * @param {HTMLElement} container Container element
 * @returns {Number} Container width
 */
const getContentMinWidth = templateNode => {
    const [calcIframe, { insertMarkup }] = createContainer('iframe');
    calcIframe.setAttribute('style', 'opacity: 0; width: 0; height: 0; position: absolute; left: -99999px;');
    document.body.appendChild(calcIframe);

    return insertMarkup(templateNode).then(() => {
        const contentContainer = calcIframe.contentWindow.document.querySelector('.message__content');
        const contentStyles = calcIframe.contentWindow.getComputedStyle(contentContainer);
        const children = arrayFrom(contentContainer.children);
        const properties = [
            'margin-left',
            'border-left-width',
            'padding-left',
            'width',
            'padding-right',
            'border-right-width',
            'margin-right'
        ];
        // When the display is flex, we are stacking the child components horizontally.
        // We calculate the total width by adding the width of all the children.
        const minWidth = stringIncludes(contentStyles.getPropertyValue('display'), 'flex')
            ? Math.round(
                  children.reduce((accumulator, child) => {
                      const childStyles = calcIframe.contentWindow.getComputedStyle(child);
                      return (
                          accumulator +
                          properties.reduce(
                              (accumlator, prop) => accumlator + parseFloat(childStyles.getPropertyValue(prop)),
                              0
                          )
                      );
                  }, 0)
              )
            : // If the display is not flex, it should be block to stack the child components vertically.
              // We use display block instead of flex because IE does not support the column orientation very well.
              // We calculate the width of the container by the largest width of all the stacked children.
              Math.max(
                  ...children.map(child => {
                      const childStyles = calcIframe.contentWindow.getComputedStyle(child);
                      return Math.round(
                          properties.reduce(
                              (accumlator, prop) => accumlator + parseFloat(childStyles.getPropertyValue(prop)),
                              0
                          )
                      );
                  })
              );

        document.body.removeChild(calcIframe);

        return minWidth;
    });
};

const memoFetcher = memoizeOnProps(fetcher, ['account', 'merchantId', 'amount', 'offerType', 'buyerCountry']);

export default function getBannerMarkup({ options, logger }) {
    logger.info(EVENTS.FETCH_START);

    return memoFetcher(options).then(({ markup }) => {
        logger.info(EVENTS.FETCH_END);

        const offerCountry = (markup && markup.meta && markup.meta.offerCountry) || 'US';
        setLocale(offerCountry);

        const style = validateStyleOptions(logger, options.style);

        const totalOptions = {
            ...options,
            style
        };

        totalOptions.style._flattened = objectFlattenToArray(style);

        if (typeof markup === 'object') {
            const meta = {
                ...markup.meta,
                offerCountry,
                messageRequestId: createUUID()
            };

            const template = Template.getTemplateNode(totalOptions, markup);

            return objectGet(totalOptions, 'style.layout') === 'text'
                ? getContentMinWidth(template).then(minWidth => ({
                      markup,
                      options: totalOptions,
                      template,
                      meta: { ...meta, minWidth }
                  }))
                : {
                      markup,
                      options: totalOptions,
                      template,
                      meta: { ...meta, minWidth: template.minWidth }
                  };
        }

        const template = document.createElement('div');
        template.innerHTML = markup || '';
        if (markup === '') {
            logger.warn('No message was found for the given configuration parameters.');
        }

        return { markup, options: totalOptions, template, meta: { offerCountry: 'US', offerType: 'NI' } };
    });
}
