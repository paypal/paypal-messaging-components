import arrayFrom from 'core-js-pure/stable/array/from';
import arrayFlatMap from 'core-js-pure/stable/array/flat-map';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise';

import { curry } from './functional';
import { objectMerge, flattenedToObject } from './objects';

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
    const dataOptions = arrayFrom(container.attributes)
        .filter(({ nodeName }) => stringStartsWith(nodeName, 'data-pp-'))
        .reduce((accumulator, { nodeName, nodeValue }) => {
            if (nodeValue) {
                return objectMerge(accumulator, flattenedToObject(nodeName.replace('data-pp-', ''), nodeValue));
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

    const bannerY = (containerRect.top + containerRect.bottom) / 2;
    const bannerX = (containerRect.left + containerRect.right) / 2;

    if (bannerY > window.innerHeight || bannerY < 0) {
        return false;
    }
    if (bannerX > window.innerWidth || bannerX < 0) {
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
    if (typeof window.getComputedStyle === 'function') {
        const containerStyles = window.getComputedStyle(container);
        if (
            containerStyles.getPropertyValue('display') === 'none' ||
            containerStyles.getPropertyValue('visibility') === 'hidden' ||
            containerStyles.getPropertyValue('clip') !== 'auto'
        )
            return true;
    }

    const containerRect = container.getBoundingClientRect();
    if (
        containerRect.left > window.document.body.scrollWidth ||
        containerRect.right < 0 ||
        containerRect.top > window.document.body.scrollHeight ||
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
