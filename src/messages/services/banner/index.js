import objectEntries from 'core-js-pure/stable/object/entries';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import stringIncludes from 'core-js-pure/stable/string/includes';
import arrayFrom from 'core-js-pure/stable/array/from';
import { ZalgoPromise } from 'zalgo-promise/src';

import {
    memoizeOnProps,
    objectGet,
    objectMerge,
    objectFlattenToArray,
    getGlobalUrl,
    request,
    getCurrency
} from '../../../utils';

import { EVENTS, ERRORS } from '../logger';
import getCustomTemplate from './customTemplate';
import Template from '../../models/Template';
import createContainer from '../../models/Container';
import { setLocale } from '../../../locale';
import { validateStyleOptions } from '../../models/Banner/validateOptions';

// Using same JSONP callback namespace as original merchant.js
window.__PP = window.__PP || {};

// Specific dimensions tied to JSON banners in Campaign Studio
// Swap the placement tag when changes for banners and messaging.js are required in sync
// const PLACEMENT = 'x200x51';
const PLACEMENT = 'x215x80';

const NI_ONLY_PLACEMENT = 'x199x99';

// Creates a mock UUID. Temporary until crcpresentmentnodeserv is live.
// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0;
        // eslint-disable-next-line no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

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
        amount,
        offerType,
        currency,
        style: { typeEZP }
    } = options;
    return new ZalgoPromise(resolve => {
        // Create JSONP callback
        const callbackName = `c${Math.floor(Math.random() * 10 ** 19)}`;

        // For legacy banner placements where there is no EZP banner, use a separate placement tag that will always return NI
        const dimensions = typeEZP === '' || offerType === 'NI' ? NI_ONLY_PLACEMENT : PLACEMENT;

        // Fire off JSONP request
        const rootUrl = getGlobalUrl('MESSAGE');
        const queryParams = {
            dimensions,
            currency_value: amount,
            currency_code: currency || getCurrency(),
            format: 'HTML',
            presentation_types: 'HTML',
            ch: 'UPSTREAM',
            call: `__PP.${callbackName}`
        };

        const queryString = objectEntries(queryParams)
            .filter(([, val]) => val)
            .reduce(
                (accumulator, [key, val]) => `${accumulator}&${key}=${val}`,
                stringStartsWith(account, 'client-id') ? `client_id=${account.slice(10)}` : `pub_id=${account}`
            );
        const script = document.createElement('script');
        script.async = true;

        // Manual request instead of traditional JSONP so that we can catch 204 no content stalling
        request('GET', `${rootUrl}?${queryString}`, { withCredentials: true }).then(res => {
            script.text = res.data;
            document.head.appendChild(script);
        });

        window.__PP[callbackName] = markup => {
            document.head.removeChild(script);
            delete window.__PP[callbackName];

            // Handles markup for v2, v1, v0
            if (typeof markup === 'object') {
                // Mutate Markup handles personalization studio json response
                resolve({ markup: mutateMarkup(markup) });
            } else {
                try {
                    resolve({
                        markup: JSON.parse(markup.replace(/<\/?div>/g, ''))
                    });
                } catch (err) {
                    resolve({ markup });
                }
            }
        };
    });
}

/**
 * Extract annotations from markup into a single options object
 * @param {string} markup String of banner HTML markup
 * @returns {Object} Banner annotations
 */
function getBannerOptions(logger, markup) {
    const annotationsString = markup.match(/^<!--([\s\S]+?)-->/);
    if (annotationsString) {
        try {
            return JSON.parse(annotationsString[1]);
        } catch (err) {
            logger.error({ name: ERRORS.CUSTOM_JSON_OPTIONS_FAIL });
        }
    }

    return {};
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

const memoFetcher = memoizeOnProps(fetcher, ['account', 'amount', 'offerType', 'countryCode']);

export default function getBannerMarkup({ options, logger }) {
    logger.info(EVENTS.FETCH_START);

    return (objectGet(options, 'style.layout') !== 'custom'
        ? memoFetcher(options)
        : ZalgoPromise.all([memoFetcher(options), getCustomTemplate(options.style)]).then(([data, template]) => {
              if (typeof data.markup === 'object') {
                  if (template === '') {
                      logger.error({ name: ERRORS.CUSTOM_TEMPLATE_FAIL });
                  }
                  data.markup.template = template; // eslint-disable-line no-param-reassign

                  return {
                      markup: data.markup,
                      options: objectMerge(options, getBannerOptions(logger, template))
                  };
              }

              return { markup: data.markup };
          })
    ).then(({ markup, options: customOptions = {} }) => {
        logger.info(EVENTS.FETCH_END);

        const offerCountry = (markup && markup.meta && markup.meta.offerCountry) || 'US';
        setLocale(offerCountry);

        const style = validateStyleOptions(logger, options.style);

        const totalOptions = {
            ...options,
            style,
            ...customOptions
        };

        totalOptions.style._flattened = objectFlattenToArray(style);

        if (typeof markup === 'object') {
            const meta = {
                ...markup.meta,
                offerCountry
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
        template.innerHTML = markup;

        return { markup, options: totalOptions, template, meta: {} };
    });
}
