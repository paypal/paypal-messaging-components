import objectEntries from 'core-js-pure/stable/object/entries';
import { ZalgoPromise } from 'zalgo-promise/src';

import {
    objectMerge,
    getInlineOptions,
    globalState,
    getAllBySelector,
    attributeObserver,
    nextIndex,
    logger,
    getCurrentTime,
    globalEvent
} from '../../utils';

import { Message } from '../../zoid/message';
import { Modal } from '../modal';

export default (options = {}) => ({
    render: (selector = '[data-pp-message]') => {
        const renderStart = getCurrentTime();
        const { messagesMap } = globalState;
        const containers = getAllBySelector(selector);

        if (containers.length === 0) {
            if (!options._auto) {
                logger.warn('invalid_selector', {
                    description: `No elements were found with the following selector: "${selector}"`,
                    selector
                });
            }

            return ZalgoPromise.resolve();
        }

        const validContainers = containers.filter(container => {
            // Ensure container is in the DOM in order for proper iframe population
            if (!container.ownerDocument.body.contains(container)) {
                logger.warn('not_in_document', {
                    description: 'Container must be in the document.',
                    container
                });

                return false;
            }

            // Do not auto-load messages that have already been populated by another render call
            if (options._auto && container.hasAttribute('data-pp-id')) {
                return false;
            }

            return true;
        });

        return ZalgoPromise.all(
            validContainers.map(container => {
                const merchantOptions = objectMerge(
                    globalState.config,
                    objectMerge(options, getInlineOptions(container))
                );

                if (!container.hasAttribute('data-pp-id')) {
                    container.setAttribute('data-pp-id', nextIndex());
                }

                const index = container.getAttribute('data-pp-id');
                const {
                    account,
                    merchantId,
                    currency,
                    amount,
                    placement,
                    style,
                    offer,
                    buyerCountry,
                    ignoreCache,
                    onClick,
                    onRender,
                    onApply
                } = merchantOptions;

                // Explicitly select props to pass in to avoid unintentionally sending
                // in props meant for only either the message or modal (e.g. onClick)
                const commonProps = {
                    account,
                    merchantId,
                    currency,
                    amount,
                    buyerCountry
                };
                const modalProps = {
                    ...commonProps,
                    onApply
                };
                const messageProps = {
                    ...commonProps,
                    index,
                    placement,
                    style,
                    offer,
                    onClick,
                    ignoreCache,
                    onReady: (...args) => {
                        if (typeof onRender === 'function') {
                            onRender(...args);
                        }
                    },
                    // Used in the computed callback props
                    getContainer: () => container
                };

                // Account can be undefined in the case where the attribute observer fires and there
                // is no global account, such as when rendering entirely using the JavaScript API
                if (account) {
                    messageProps.modal = Modal(modalProps);
                }

                if (!messagesMap.has(container)) {
                    const { render, state, updateProps, clone } = Message(messageProps);

                    state.renderStart = renderStart;
                    state.style = messageProps.style;

                    messagesMap.set(container, { render, updateProps, state, clone });

                    attributeObserver.observe(container, { attributes: true });

                    return render(container).then(() => globalEvent.trigger('render'));
                }

                const { updateProps, state } = messagesMap.get(container);

                if (state.renderComplete) {
                    state.renderStart = renderStart;
                }

                // Merge new styles into previous styles
                // Especially useful when combining inline attribute styles with JS API styles
                if (state.style && messageProps.style) {
                    const totalStyle = objectMerge(state.style, messageProps.style);
                    state.style = totalStyle;
                    messageProps.style = totalStyle;
                }

                // Filter out undefined to prevent overwriting previous values
                const updatedMessageProps = objectEntries(messageProps).reduce(
                    (acc, [key, val]) => (typeof val === 'undefined' ? acc : Object.assign(acc, { [key]: val })),
                    {}
                );

                return updateProps(updatedMessageProps).then(() => globalEvent.trigger('render'));
            })
        );
    }
});
