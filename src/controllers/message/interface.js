import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import objectValues from 'core-js-pure/stable/object/values';
import { ZalgoPromise } from 'zalgo-promise/src';

import { objectMerge, flattenedToObject, getInlineOptions, runStats, globalState, getAllBySelector } from '../../utils';

import { Logger } from '../../services/logger';
import { Message } from '../../zoid/message';
import { Modal } from '../modal';

const messages = new Map();

const attributeObserver = new MutationObserver(mutationList => {
    const messagesToUpdate = mutationList.reduce((accumulator, mutation) => {
        if (!messages.has(mutation.target) || !stringStartsWith(mutation.attributeName, 'data-pp-')) {
            return accumulator;
        }

        const id = mutation.target.getAttribute('data-pp-id');

        return {
            [id]: objectMerge(
                accumulator[id] || { container: mutation.target },
                flattenedToObject(mutation.attributeName.slice(8), mutation.target.getAttribute(mutation.attributeName))
            )
        };
    }, {});

    objectValues(messagesToUpdate).forEach(({ container, ...newMerchantOptions }) =>
        messages.get(container).updateProps(newMerchantOptions)
    );
});

export default options => ({
    render: (selector = '[data-pp-message]') => {
        const containers = getAllBySelector(selector);

        if (selector.length === 0) {
            return Logger.warn('Invalid selector', selector);
        }

        const validContainers = containers.filter(container => {
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
            validContainers.map(container => {
                const merchantOptions = objectMerge(
                    globalState.config,
                    objectMerge(options, getInlineOptions(container))
                );

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

                    const updateProps = newProps =>
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

                    messages.set(container, { render: message.render, updateProps });
                    attributeObserver.observe(container, { attributes: true });
                    modal.render('body');

                    return message.render(container);
                }

                const { updateProps } = messages.get(container);

                return updateProps(merchantOptions);
            })
        );
    }
});
