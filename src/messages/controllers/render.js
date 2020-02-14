import arrayFrom from 'core-js-pure/stable/array/from';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise/src';

import { Logger } from '../services/logger';
import Banner from '../models/Banner';
import { objectMerge, flattenedToObject, isElement, getInlineOptions, nextId } from '../../utils';

/**
 * Render Banner into all selector container elements
 * @param {string|HTMLElement|Array<HTMLElement>} selector CSS selector
 * @param {Object} options Banner options
 * @returns {void}
 */
export default function render(options, selector) {
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
        return Logger.warn('Invalid selector', selector);
    }

    containers = containers.filter(container => {
        // Ensure container is in the DOM in order for proper iframe population
        if (!container.ownerDocument.body.contains(container)) {
            Logger.warn('Skipping container. Must be in the document:', container);
            return false;
        }

        // Do not auto-load messages that have already been populated by another render call
        if (options._auto && container.hasAttribute('data-pp-id')) {
            return false;
        }

        return true;
    });

    return ZalgoPromise.all(
        containers.map(container => {
            const totalOptions = objectMerge(options, getInlineOptions(container));

            if (!container.hasAttribute('data-pp-id')) {
                container.setAttribute('data-pp-id', nextId());
            }

            const observer = new MutationObserver(mutationList => {
                const newConfig = mutationList.reduce((accumulator, mutation) => {
                    if (!stringStartsWith(mutation.attributeName, 'data-pp-')) return accumulator;

                    return objectMerge(
                        accumulator,
                        flattenedToObject(
                            mutation.attributeName.slice(8),
                            mutation.target.getAttribute(mutation.attributeName)
                        )
                    );
                }, {});

                Banner.init(container, selectorType, newConfig);
            });
            observer.observe(container, { attributes: true });

            totalOptions.id = container.getAttribute('data-pp-id');

            return Banner.init(container, selectorType, totalOptions);
        })
    );
}
