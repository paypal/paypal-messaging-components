import arrayFind from 'core-js-pure/stable/array/find';
import arrayFrom from 'core-js-pure/stable/array/from';
import arrayFlatMap from 'core-js-pure/stable/array/flat-map';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import { curry } from './functional';
import { objectMerge, flattenedToObject } from './objects';
import { ppDebug } from './debug';

export const getWindowFromElement = node => node?.ownerDocument?.defaultView;

export const getTopWindow = () => {
    try {
        // Try to access body which will throw an error if cross domain
        return window.top.document.body && window.top;
    } catch (err) {
        return undefined;
    }
};

/**
 * Check if object is an HTMLElement instance
 * @param {HTMLElement} el Element to check
 * @returns {Boolean} Is an HTMLElement
 */
export function isElement(el) {
    return typeof HTMLElement === 'object'
        ? el instanceof HTMLElement
        : el && typeof el === 'object' && el !== null && el.nodeType === 1 && typeof el.nodeName === 'string';
}

/**
 * Return options object from valid container data attributes
 * @param {HTMLElement} container Container element with data attributes
 * @returns {Object} Options object
 */
export function getInlineOptions(container) {
    // Allows for data attributes dependent on camel casing to function properly.
    const attributeNameOverride = {
        buyercountry: 'buyerCountry',
        merchantid: 'merchantId',
        cspnonce: 'cspNonce',
        ectoken: 'ecToken',
        customerid: 'customerId',
        fontfamily: 'fontFamily',
        fontsource: 'fontSource',
        onclick: 'onClick',
        onapply: 'onApply',
        onrender: 'onRender',
        'style-text-fontfamily': 'style-text-fontFamily',
        'style-text-fontsource': 'style-text-fontSource'
    };

    const inlineEventHandlers = ['onclick', 'onapply', 'onrender'];

    const getOptionValue = (name, value) => {
        if (stringStartsWith(value, '[')) {
            try {
                return flattenedToObject(name, JSON.parse(value.replace(/'/g, '"')));
            } catch (err) {} // eslint-disable-line no-empty
        }
        return flattenedToObject(name, value);
    };

    const dataOptions = arrayFrom(container.attributes)
        .filter(({ nodeName }) => stringStartsWith(nodeName, 'data-pp-'))
        .reduce((accumulator, { nodeName, nodeValue }) => {
            if (nodeValue) {
                const attributeName = nodeName.replace('data-pp-', '');
                const value = arrayIncludes(inlineEventHandlers, attributeName)
                    ? // eslint-disable-next-line no-new-func
                      new Function(nodeValue)
                    : nodeValue;

                return objectMerge(
                    accumulator,
                    getOptionValue(attributeNameOverride[attributeName] ?? attributeName, value)
                );
            }

            return accumulator;
        }, {});

    if (
        !container.firstElementChild ||
        container.firstElementChild.tagName !== 'SCRIPT' ||
        container.firstElementChild.getAttribute('type') !== 'text/template'
    ) {
        return dataOptions;
    }

    // For custom banners with inline markup
    const markup = container.firstElementChild.textContent.trim();
    container.removeChild(container.firstElementChild);

    return objectMerge(dataOptions, { style: { markup } });
}

/**
 * Search for the first element of specified class name
 * @param {HTMLElement} container Container to search for element
 * @param {String} className Base element class name without prefix
 * @returns {HTMLElement} Matched element
 */
export const getElement = curry(
    (prefix, container, className) => container.getElementsByClassName(`${prefix}__${className}`)[0]
);

/**
 * Create a new style element and prepend it to the container
 * @param {HTMLElement} container Container element to prepend new style
 * @param {String} text Text content of the style element
 * @returns {void}
 */
export const prependStyle = curry((container, text) => {
    const elem = document.createElement('style');
    elem.textContent = text;
    container.insertBefore(elem, container.firstChild);
});

/**
 * Append text data into the container element
 * @param {HTMLElement} container Container element to append text
 * @param {any} obj Various inputs representing text to be appended
 * @returns {void}
 */
export const appendText = curry((container, obj) => {
    if (Array.isArray(obj)) {
        obj.forEach(elem => container.appendChild(elem));
    } else if (obj instanceof HTMLElement) {
        container.appendChild(obj);
    } else if (typeof obj === 'string') {
        const span = document.createElement('span');
        span.innerHTML = obj;
        container.appendChild(span);
    } else if (obj === false) {
        container.parentNode.removeChild(container);
    }
});

/**
 * Append text data into the container element
 * @param {HTMLElement} container Container element to append text
 * @param {any} obj Various inputs representing text to be appended
 * @returns {void}
 */
export const prependText = curry((container, obj) => {
    if (Array.isArray(obj)) {
        [...obj].reverse().forEach(elem => container.insertBefore(elem, container.firstChild));
    } else if (obj instanceof HTMLElement) {
        container.insertBefore(obj, container.firstChild);
    } else if (typeof obj === 'string') {
        const span = document.createElement('span');
        span.innerHTML = obj;
        container.insertBefore(span, container.firstChild);
    } else if (obj === false) {
        container.parentNode.removeChild(container);
    }
});

/**
 * Append a new image into the container element
 * @param {HTMLElement} container Container element to append image
 * @param {String} url Image src attribute
 * @param {String} alt Image alt attribute
 * @param {String} srcset Image srcset attribute
 * @returns {void}
 */
export const appendImage = curry((container, url, alt = 'PayPal Credit', srcset = '') => {
    if (Array.isArray(url)) {
        url.forEach(logo => appendImage(container, logo, alt));
    } else if (typeof url === 'string') {
        const logo = new Image();
        logo.alt = alt;
        logo.className = 'message__logo';
        logo.src = url;

        if (srcset) {
            logo.srcset = srcset;
        }

        container.appendChild(logo);
    } else if (typeof url === 'object') {
        const {
            src,
            dimensions: [width, height]
        } = url;

        const logo = new Image();
        logo.src = src;
        logo.alt = alt;

        const svgWrapper = document.createElement('div');
        svgWrapper.className = 'message__logo message__logo--svg';

        const canvas = document.createElement('canvas');
        canvas.height = height;
        canvas.width = width;

        svgWrapper.appendChild(logo);
        svgWrapper.appendChild(canvas);
        container.appendChild(svgWrapper);
    } else {
        container.parentNode.removeChild(container);
    }
}, 2); // Need to manually set curry arity because of default parameters and transpiling

/**
 * Ensure element is ready to be worked with. Necessary since
 * creating an iframe is asynchronous
 * @param {HTMLElement} element HTML Element
 * @returns {Promise<void>} Promise resolves when element is ready
 */
export const waitForElementReady = element =>
    new ZalgoPromise(resolve => {
        if (element.tagName === 'IFRAME' && element.contentWindow.document.readyState !== 'complete') {
            element.addEventListener('load', resolve);
        } else {
            resolve();
        }
    });

/**
 * Check if an element is within the current viewport
 * @param {HTMLElement} container DOM element
 * @returns {boolean} Visible or not visible
 */
export function isInViewport(container) {
    const containerRect = container.getBoundingClientRect();
    const containerWindow = getWindowFromElement(container);

    const bannerY = (containerRect.top + containerRect.bottom) / 2;
    const bannerX = (containerRect.left + containerRect.right) / 2;

    if (bannerY > containerWindow.innerHeight || bannerY < 0) {
        return false;
    }
    if (bannerX > containerWindow.innerWidth || bannerX < 0) {
        return false;
    }

    return true;
}

/**
 * Check if an element is visually hidden on a page
 * @param {HTMLElement} container DOM element
 * @returns {boolean} Hidden or not hidden
 */
export function isHidden(container) {
    const containerWindow = getWindowFromElement(container);

    if (typeof containerWindow.getComputedStyle === 'function') {
        const containerStyles = containerWindow.getComputedStyle(container);
        if (
            containerStyles.getPropertyValue('display') === 'none' ||
            containerStyles.getPropertyValue('visibility') === 'hidden' ||
            containerStyles.getPropertyValue('clip') !== 'auto'
        )
            return true;
    }

    const containerRect = container.getBoundingClientRect();
    if (
        containerRect.left > containerWindow.document.body.scrollWidth ||
        containerRect.right < 0 ||
        containerRect.top > containerWindow.document.body.scrollHeight ||
        containerRect.bottom < 0
    )
        return true;

    return container.offsetWidth === 0 || container.offsetHeight === 0;
}

export function getAllBySelector(selector) {
    if (typeof selector === 'string') {
        return arrayFrom(document.querySelectorAll(selector));
    }

    if (isElement(selector)) {
        return [selector];
    }

    if (Array.isArray(selector) && selector.every(isElement)) {
        return arrayFlatMap(selector, getAllBySelector);
    }

    return [];
}

/**
 * Check if an element is completely within the bounds of another element
 * @param {HTMLElement} parentEl Parent element.
 * @param {HTMLElement} childEl Element to check if inside of parent.
 * @returns {boolean}
 */
export const elementContains = (parentEl, childEl) => {
    if (
        (parentEl?.nodeType !== Node.ELEMENT_NODE && !(parentEl instanceof Window)) ||
        childEl?.nodeType !== Node.ELEMENT_NODE
    ) {
        return false;
    }

    const parentBounds =
        parentEl instanceof Window
            ? {
                  top: 0,
                  left: 0,
                  bottom: parentEl.innerHeight,
                  right: parentEl.innerWidth
              }
            : parentEl.getBoundingClientRect();
    const childBounds = childEl.getBoundingClientRect();

    return (
        parentBounds.top <= childBounds.top &&
        parentBounds.bottom >= childBounds.bottom &&
        parentBounds.left <= childBounds.left &&
        parentBounds.right >= childBounds.right
    );
};

/**
 * Check if an element is completely outside the bounds of another element
 * @param {HTMLElement} parentEl Parent element.
 * @param {HTMLElement} childEl Element to check if outside of parent.
 * @returns {boolean}
 */

export const elementOutside = (parentEl, childEl) => {
    if (
        (parentEl?.nodeType !== Node.ELEMENT_NODE && !(parentEl instanceof Window)) ||
        childEl?.nodeType !== Node.ELEMENT_NODE
    ) {
        return false;
    }

    const parentBounds =
        parentEl instanceof Window
            ? {
                  top: 0,
                  left: 0,
                  bottom: parentEl.innerHeight,
                  right: parentEl.innerWidth
              }
            : parentEl.getBoundingClientRect();
    const childBounds = childEl.getBoundingClientRect();

    return (
        childBounds.left >= parentBounds.right ||
        childBounds.right <= parentBounds.left ||
        childBounds.bottom <= parentBounds.top ||
        childBounds.top >= parentBounds.bottom
    );
};

/**
 * Get the computed page root element that serves as the best wrapping element
 * that encompasses the entire content on the page without overflowing content
 * @param {HTMLElement} baseElement Element from which to create a path to determine the root
 * @returns {HTMLElement}
 */
export const getRoot = baseElement => {
    const elementWindow = getWindowFromElement(baseElement);

    const domPath = [];
    {
        let el = baseElement;
        // Loop up the DOM tree to the root html node
        while (el?.parentNode.nodeType === Node.ELEMENT_NODE) {
            // Skip elements that are collapsed due to various CSS rules
            // which causes an issue with determining the root element
            if (el.parentNode.offsetHeight !== 0) {
                domPath.push(el.parentNode);
            }
            el = el.parentNode;
        }
    }

    let biggestEl;

    const computedRoot = arrayFind(domPath.reverse(), (el, index, elements) => {
        // We are searching for the element that contains the page scrolling.
        // Some merchant sites will use height 100% on elements such as html and body
        // that cause the intersection observer to hide elements below the fold.

        const child = elements[index + 1];
        // Check if the next element is bigger than the current element and if so, save it and move on to the next element in the array
        if (!biggestEl || (child && el.offsetHeight <= child.offsetHeight)) {
            biggestEl = child;
            return false;
        }

        const height = el.offsetHeight;
        const biggestElHeight = biggestEl.offsetHeight;
        // window.innerHeight has a variable value on mobile based on the URL bar so
        // we are looking for the element that is larger than the window
        // TODO: This could potentially provide a false positive if a merchant is using height 100vh
        // we are also checking to see if the height of the element we're currently on is also bigger or equal to
        // the biggest element's height in the array.
        if (height > elementWindow.innerHeight && height >= biggestElHeight) {
            return true;
        }

        // Use array index instead of parentNode be default because collapsed
        // elements may have been filtered out and should not be used for calculations
        const parent = elements[index - 1] ?? el.parentNode; // First element should be <html> and will have a parent of document

        // Ensure that the selected root is the larger of the parent
        // and contains the child otherwise there may not be a proper page wrapper
        // e.g. https://www.acwholesalers.com
        if (child && child.offsetHeight < height && elementContains(parent, el)) {
            return true;
        }

        return false;
    });

    // If the root element is entirely within the viewport then return undefined
    // so that the viewport is used as the root. This helps with position fixed
    // containers that may have content outside of the root element.
    const root = elementContains(elementWindow, computedRoot) ? undefined : computedRoot;

    ppDebug('Root:', {
        debugObj: root || 'undefined. Viewport is used as the root.'
    });

    return root;
};
