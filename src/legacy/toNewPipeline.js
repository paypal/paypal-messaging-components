import arrayFind from 'core-js-pure/stable/array/find';
import arrayIncludes from 'core-js-pure/stable/array/includes';

import Messages from '../controllers/bootstrap';
import {
    colorMap,
    ratioMap,
    flexMap,
    dimensionsStyleMap,
    styles,
    dimensions,
    htmlNIMap,
    htmlEZPMap,
    customBannerLEs,
    customBannerMap
} from './map';

/**
 * Check for supported legacy image and html banners and return the
 * the supported dimension and style codes
 * @param {String} dimension Legacy banner dimension
 * @param {String} style Legacy banner style
 * @param {String} account Merchant ID to exclude custom LE banners
 * @returns {Array<String>} [typeNI, typeEZP, dimension, style]
 */
function getSupportedAttributes(dimension, style) {
    // All legacy banners with style tag are image banners
    if (style) {
        if (styles[dimension] && arrayIncludes(styles[dimension], style)) {
            return ['image', '', dimension, style];
        }

        if (flexMap[dimension] && arrayIncludes(flexMap[dimension], style)) {
            return ['flex', 'flex', dimension, style];
        }

        return [];
    }

    // These banners will have a style tag added, so are always image banners
    if (dimensionsStyleMap[dimension]) {
        return ['image', '', ...dimensionsStyleMap[dimension]];
    }

    const isImage = arrayIncludes(dimensions, dimension);
    const isNIHTML = arrayIncludes(htmlNIMap, dimension);
    const isEZPHTML = arrayIncludes(htmlEZPMap, dimension);

    const ezpType = isEZPHTML ? 'html' : '';

    if (isImage) {
        return ['image', ezpType, dimension, 'none'];
    }

    if (isNIHTML) {
        return ['html', ezpType, dimension, 'none'];
    }

    return [];
}

/**
 * Create a special style object supported by messaging.js
 * @param {String} typeNI Legacy type for NI offer type
 * @param {String} typeEZP Legacy type for EZP offer type
 * @param {String} dimension Legacy dimension code
 * @param {String} style Legacy style code
 * @returns {Object} Style config object
 */
function getStyleConfig(typeNI, typeEZP, dimension, style) {
    const size = dimension.slice(1);
    let color = 'none';
    let border = false;
    if (style.length === 10) {
        color = colorMap[style.slice(0, 3)];
        border = style.slice(6, 7) === 'Y';
    }

    if (typeNI === 'flex' && typeEZP === 'flex') {
        return {
            layout: 'flex',
            color: color === 'white' && !border ? 'white-no-border' : color,
            ratio: ratioMap[dimension]
        };
    }

    return {
        layout: 'legacy',
        typeNI,
        typeEZP,
        size,
        color,
        border
    };
}

/**
 * Attempt to render legacy script through messaging.js by searching
 * against supported dimension and style values
 * @param {PPScript} ppScript PPScript instance
 * @returns {Boolean} Able to render through messaging.js pipeline
 */
export default function toNewPipeline(ppScript) {
    const kvs = ppScript.getKVs();
    const account = kvs.payer_id || kvs.pub_id;
    const [typeNI, typeEZP, dimension, style] = getSupportedAttributes(kvs.dimensions, kvs.style);

    if (dimension) {
        const customLEAccount = arrayFind(customBannerLEs, ids => arrayIncludes(ids, account));
        if (customLEAccount) {
            const [payerId] = customLEAccount;
            // If this merchant has a custom banner of this dimension, we should fallback to legacy pipeline
            if (arrayIncludes(customBannerMap[payerId], dimension)) {
                return false;
            }
        }

        const styleConfig = getStyleConfig(typeNI, typeEZP, dimension, style);
        const span = document.createElement('span');

        ppScript.el.parentNode.insertBefore(span, ppScript.el);

        // Wait until next tick to ensure that window.paypal has been populated when render() is called
        setTimeout(() => {
            Messages({
                _legacy: typeNI !== 'flex' && typeEZP !== 'flex',
                account,
                amount: kvs.currency_value,
                style: styleConfig,
                countryCode: 'US'
            }).render(span);
        }, 0);
        ppScript.destroyDom();

        return true;
    }

    return false;
}
