import arrayFrom from 'core-js-pure/stable/array/from';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise/src';

import { objectMerge, flattenedToObject, isElement, getInlineOptions, runStats } from '../../utils';
import { Logger } from '../../services/logger';
import { Message } from '../../zoid/message';

const messages = new Map();

/**
 * Render Banner into all selector container elements
 * @param {string|HTMLElement|Array<HTMLElement>} selector CSS selector
 * @param {Object} options Banner options
 * @returns {void}
 */
export default function renderMessages(options, selector) {
    let containers;
    // let selectorType;
    if (typeof selector === 'string') {
        containers = arrayFrom(document.querySelectorAll(selector));
        // selectorType = selector;
    } else if (isElement(selector)) {
        containers = [selector];
        // selectorType = 'HTMLElement';
    } else if (Array.isArray(selector) && selector.every(isElement)) {
        containers = [...selector];
        // selectorType = 'Array<HTMLElement>';
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
            const totalOptions = {
                // Merchant options
                ...objectMerge(options, getInlineOptions(container)),
                // Library options
                onReady: ({ messageRequestId }) => runStats({ messageRequestId, container })
            };

            if (!messages.has(container)) {
                messages.set(container, Message(totalOptions));
            }

            const { render, updateProps } = messages.get(container);

            // TODO: Do not create observers when rerendering
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

                updateProps(newConfig);
            });
            observer.observe(container, { attributes: true });

            return render(container);
        })
    );
}
