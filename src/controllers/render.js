import arrayFrom from 'core-js-pure/stable/array/from';
import startsWith from 'core-js-pure/stable/string/starts-with';

import { logger, EVENTS } from '../services/logger';
import Banner from '../models/Banner';
import { objectMerge } from '../utils';

function flattenedToObject(option, attributeValue) {
    const firstIndex = option.indexOf('-');
    if (firstIndex === -1) {
        return { [option]: attributeValue };
    }

    const key = option.slice(0, firstIndex);
    const val = option.slice(firstIndex + 1);

    return { [key]: flattenedToObject(val, attributeValue) };
}

/**
 * Return options object from valid container data attributes
 * @param {HTMLElement} container Container element with data attributes
 * @returns {Object} Options object
 */
export function getInlineOptions(container) {
    const dataOptions = arrayFrom(container.attributes)
        .filter(({ nodeName }) => startsWith(nodeName, 'data-pp-'))
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

function isElement(el) {
    return typeof HTMLElement === 'object'
        ? el instanceof HTMLElement
        : el && typeof el === 'object' && el !== null && el.nodeType === 1 && typeof el.nodeName === 'string';
}

/**
 * Render Banner into all selector container elements
 * @param {string|HTMLElement|Array<HTMLElement>} selector CSS selector
 * @param {Object} options Banner options
 * @returns {void}
 */
function bootstrapBanners(selector, options) {
    let containers;
    let selectorType;
    if (typeof selector === 'string') {
        containers = arrayFrom(document.querySelectorAll(selector));
        selectorType = selector;
    } else if (isElement(selector)) {
        containers = [selector];
        selectorType = 'HTMLElement';
    } else if (Array.isArray(selector) && selector.every(isElement)) {
        containers = [...selector];
        selectorType = 'Array<HTMLElement>';
    } else {
        return logger.warn('Invalid selector', selector);
    }

    containers = containers.filter(container => {
        // Ensure container is in the DOM in order for proper iframe population
        if (!container.ownerDocument.body.contains(container)) {
            logger.warn('Skipping container. Must be in the document:', container);
            return false;
        }

        // Do not auto-load messages that have already been populated by another render call
        if (options._auto && container.hasAttribute('data-pp-id')) {
            return false;
        }

        return true;
    });

    logger.info(EVENTS.STARTING_MESSAGE_RENDER, {
        url: window.location.href,
        selector: selectorType
    });

    const updateFns = containers.map(container => {
        const totalOptions = objectMerge(options, getInlineOptions(container));

        if (!container.hasAttribute('data-pp-id')) {
            container.setAttribute('data-pp-id', window.paypal.Messages.__state__.nextId);
            window.paypal.Messages.__state__.nextId += 1;
        }

        totalOptions.id = container.getAttribute('data-pp-id');

        return [Banner.init(container, totalOptions), container, totalOptions];
    });

    return newOptions =>
        updateFns.forEach(([updateBanner, container, prevOptions]) => {
            const totalOptions = objectMerge(prevOptions, objectMerge(newOptions, getInlineOptions(container)));
            totalOptions.id = container.getAttribute('data-pp-id');

            updateBanner(totalOptions);
        });
}

/**
 * Render Banner into all selector container elements
 * @param {Object} options Banner options
 * @param {string} selector CSS selector
 * @returns {Function} Re-render banner with updated options
 */
export default function render(options, selector = '[data-pp-message]') {
    return bootstrapBanners(selector, options);
}
