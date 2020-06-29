import arrayFrom from 'core-js-pure/stable/array/from';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise/src';

import { objectMerge, flattenedToObject, isElement, getInlineOptions, runStats } from '../../utils';
import { Logger } from '../../services/logger';
import { Message } from '../../zoid/message';
import { Modal } from '../modal';

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
            const merchantOptions = objectMerge(options, getInlineOptions(container));

            if (!messages.has(container)) {
                const modal = Modal({
                    account: merchantOptions.account,
                    currency: merchantOptions.currency,
                    amount: merchantOptions.amount,
                    onApply: merchantOptions.onApply
                });

                const totalOptions = {
                    ...merchantOptions,
                    // Library options
                    onReady: ({ messageRequestId }) => {
                        modal.render('body');
                        runStats({ messageRequestId, container });
                    },
                    onClick: ({ messageRequestId }) => {
                        modal.show({
                            messageRequestId,
                            currency: merchantOptions.currency,
                            amount: merchantOptions.amount,
                            onApply: merchantOptions.onApply
                        });

                        if (typeof merchantOptions.onClick === 'function') {
                            merchantOptions.onClick({ messageRequestId });
                        }
                    }
                };

                const message = Message(totalOptions);

                const updateProps = newProps => {
                    message.updateProps({
                        ...newProps,
                        onClick: ({ messageRequestId }) => {
                            modal.show({
                                messageRequestId,
                                currency: newProps.currency,
                                amount: newProps.amount,
                                onApply: newProps.onApply
                            });

                            if (typeof newProps.onClick === 'function') {
                                newProps.onClick({ messageRequestId });
                            }
                        }
                    });
                };

                const observer = new MutationObserver(mutationList => {
                    const newMerchantOptions = mutationList.reduce((accumulator, mutation) => {
                        if (!stringStartsWith(mutation.attributeName, 'data-pp-')) return accumulator;

                        return objectMerge(
                            accumulator,
                            flattenedToObject(
                                mutation.attributeName.slice(8),
                                mutation.target.getAttribute(mutation.attributeName)
                            )
                        );
                    }, {});

                    updateProps(newMerchantOptions);
                });
                observer.observe(container, { attributes: true });

                messages.set(container, { render: message.render, updateProps });

                modal.render('body');
                return message.render(container);
            }

            const { updateProps } = messages.get(container);

            return updateProps(merchantOptions);
        })
    );
}
