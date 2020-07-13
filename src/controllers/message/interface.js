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
                        ...merchantOptions,
                        onClose: () => container.firstChild.focus()
                    });

                    const createOnReadyHandler = props => ({ messageRequestId }) => {
                        runStats({ messageRequestId, container });

                        if (typeof props.onReady === 'function') {
                            props.OnReady({ messageRequestId });
                        }
                    };

                    const createOnClickHandler = props => ({ messageRequestId }) => {
                        modal.show({
                            refId: messageRequestId,
                            ...props,
                            onClose: () => container.firstChild.focus()
                        });

                        if (typeof props.onClick === 'function') {
                            props.onClick({ messageRequestId });
                        }
                    };

                    const totalOptions = {
                        ...merchantOptions,
                        // Library options
                        index: container.getAttribute('data-pp-id'),
                        onReady: createOnReadyHandler(options),
                        onClick: createOnClickHandler(options)
                    };

                    const message = Message(totalOptions);

                    const updateProps = newProps =>
                        message.updateProps({
                            ...newProps,
                            // Library options
                            index: container.getAttribute('data-pp-id'),
                            onReady: createOnReadyHandler(newProps),
                            onClick: createOnClickHandler(newProps)
                        });

                    messagesMap.set(container, { render: message.render, updateProps });

                    modal.render('body');

                    attributeObserver.observe(container, { attributes: true });

                    return message.render(container);
                }

                const { updateProps } = messagesMap.get(container);

                return updateProps(merchantOptions);
            })
        );
    }
});
