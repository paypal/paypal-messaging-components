import { ZalgoPromise } from 'zalgo-promise/src';

import {
    objectMerge,
    getInlineOptions,
    globalState,
    getAllBySelector,
    attributeObserver,
    nextIndex,
    logger,
    getCurrentTime
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

                if (!messagesMap.has(container)) {
                    const index = container.getAttribute('data-pp-id');
                    const modal = Modal(merchantOptions);

                    const totalOptions = {
                        ...merchantOptions,
                        modal,
                        index
                    };

                    const { render, state, updateProps, clone } = Message(totalOptions);

                    state.renderStart = renderStart;

                    messagesMap.set(container, { render, updateProps, state, clone });

                    attributeObserver.observe(container, { attributes: true });

                    return render(container);
                }

                const { updateProps, state } = messagesMap.get(container);

                if (state.renderComplete) {
                    state.renderStart = renderStart;
                }

                return updateProps(merchantOptions);
            })
        );
    }
});
