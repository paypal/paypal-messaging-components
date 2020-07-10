import { ZalgoPromise } from 'zalgo-promise/src';

import {
    objectMerge,
    getInlineOptions,
    runStats,
    globalState,
    getAllBySelector,
    attributeObserver,
    nextIndex
} from '../../utils';

import { Logger } from '../../services/logger';
import { Message } from '../../zoid/message';
import { Modal } from '../modal';

export default options => ({
    render: (selector = '[data-pp-message]') => {
        const { messagesMap } = globalState;
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

                if (!container.hasAttribute('data-pp-id')) {
                    container.setAttribute('data-pp-id', nextIndex());
                }

                if (!messagesMap.has(container)) {
                    const modal = Modal({
                        account: merchantOptions.account,
                        currency: merchantOptions.currency,
                        amount: merchantOptions.amount,
                        onApply: merchantOptions.onApply
                    });

                    const totalOptions = {
                        ...merchantOptions,
                        // Library options
                        index: container.getAttribute('data-pp-id'),
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

                    messagesMap.set(container, { render: message.render, updateProps });
                    attributeObserver.observe(container, { attributes: true });
                    modal.render('body');

                    return message.render(container);
                }

                const { updateProps } = messagesMap.get(container);

                return updateProps(merchantOptions);
            })
        );
    }
});
