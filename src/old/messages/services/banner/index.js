import objectEntries from 'core-js-pure/stable/object/entries';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import stringIncludes from 'core-js-pure/stable/string/includes';
import arrayFrom from 'core-js-pure/stable/array/from';
import { ZalgoPromise } from 'zalgo-promise/src';

import { memoizeOnProps, objectGet, objectMerge, objectFlattenToArray, getGlobalUrl, request } from '../../../../utils';

import { EVENTS, ERRORS } from '../logger';
import getCustomTemplate from './customTemplate';
import Template from '../../models/Template';
import createContainer from '../../models/Container';
import { setLocale } from '../../../locale';
import { validateStyleOptions } from '../../models/Banner/validateOptions';

// New fetcher
const PLACEMENT_VARIANT = 'C'; // A | B | C

function fetcher({ account, merchantId, amount, offerType, currency, buyerCountry, style: { typeEZP } }) {
    const rootUrl = getGlobalUrl('MESSAGE_A');

    const queryParams = {
        merchant_id: merchantId, // Partner integrations
        amount,
        currency,
        buyer_country: buyerCountry,
        variant: PLACEMENT_VARIANT,
        credit_type: typeEZP === '' || offerType === 'NI' ? 'NI' : undefined
    };

    if (stringStartsWith(account, 'client-id')) {
        queryParams.client_id = account.slice(10);
    } else {
        queryParams.payer_id = account;
    }

    const queryString = objectEntries(queryParams)
        .filter(([, val]) => val)
        .reduce((accumulator, [key, val]) => `${accumulator}&${key}=${val}`, '')
        .slice(1);

    return request('GET', `${rootUrl}?${queryString}`, { withCredentials: true }).then(res => {
        const { meta, ...data } = res.data;

        return {
            markup: { meta, data }
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

const memoFetcher = memoizeOnProps(fetcher, ['account', 'merchantId', 'amount', 'offerType', 'buyerCountry']);

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
        template.innerHTML = markup || '';
        if (markup === '') {
            logger.warn('No message was found for the given configuration parameters.');
        }

        return { markup, options: totalOptions, template, meta: { offerCountry: 'US', offerType: 'NI' } };
    });
}
