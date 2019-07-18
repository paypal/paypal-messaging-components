import arrayFrom from 'core-js-pure/stable/array/from';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import { logger, EVENTS } from '../services/logger';
import Banner from '../models/Banner';
import { objectMerge, flattenedToObject, isElement, getInlineOptions } from '../../utils';
import { globalState, setGlobalState } from '../../utils/globalState';

/**
 * Render Banner into all selector container elements
 * @param {string|HTMLElement|Array<HTMLElement>} selector CSS selector
 * @param {Object} options Banner options
 * @returns {void}
 */
export default function render(options, selector = '[data-pp-message]') {
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
            container.setAttribute('data-pp-id', globalState.nextId);
            setGlobalState({ nextId: (globalState.nextId += 1) });
        }

        totalOptions.id = container.getAttribute('data-pp-id');

        const observer = new MutationObserver(mutationList => {
            const newConfig = mutationList.reduce((accumulator, mutation) => {
                if (!stringStartsWith(mutation.attributeName, 'data-pp-')) return accumulator;

                return {
                    ...accumulator,
                    ...flattenedToObject(
                        mutation.attributeName.slice(8),
                        mutation.target.getAttribute(mutation.attributeName)
                    )
                };
            }, {});

            Banner.init(container, newConfig);
        });
        observer.observe(container, { attributes: true });

        return [Banner.init(container, totalOptions), container, totalOptions];
    });

    return newOptions =>
        updateFns.forEach(([updateBanner, container, prevOptions]) => {
            const totalOptions = objectMerge(prevOptions, objectMerge(newOptions, getInlineOptions(container)));
            totalOptions.id = container.getAttribute('data-pp-id');

            updateBanner(totalOptions);
        });
}
