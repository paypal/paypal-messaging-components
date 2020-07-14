import { ZalgoPromise } from 'zalgo-promise/src';
import { once } from 'belter/src';

import {
    objectMerge,
    getInlineOptions,
    runStats,
    globalState,
    getAllBySelector,
    attributeObserver,
    nextIndex,
    getLogger
} from '../../utils';

import { Logger } from '../../services/logger';
import { Message } from '../../zoid/message';
import { Modal } from '../modal';

export default options => ({
    render: (selector = '[data-pp-message]') => {
        const { messagesMap } = globalState;
        const logger = getLogger();
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
                    const index = container.getAttribute('data-pp-id');
                    const modal = Modal({
                        ...merchantOptions,
                        onClose: () => container.firstChild.focus()
                    });

                    const createOnReadyHandler = props => ({ meta }) => {
                        runStats({ container, refId: `${meta.messageRequestId}-${index}` });

                        modal.updateProps({ refId: `${meta.messageRequestId}-${index}` });
                        modal.render('body');

                        logger.track({
                            message_request_id: `${meta.messageRequestId}-${index}`,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'MORS',
                            url: meta.trackingDetails.impressionUrl
                        });
                        logger.track({
                            message_request_id: `${meta.messageRequestId}-${index}`,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'render',
                            amount: props.amount,
                            clientId: props.clientId,
                            payerId: props.payerId,
                            merchantId: props.merchantId,
                            placement: props.placement,
                            uuid: meta.uuid
                        });

                        if (typeof props.onReady === 'function') {
                            props.onReady({ meta });
                        }
                    };

                    const createOnClickHandler = props => ({ meta }) => {
                        modal.show({
                            ...props,
                            refId: `${meta.messageRequestId}-${index}`,
                            onClose: () => container.firstChild.focus()
                        });

                        logger.track({
                            message_request_id: `${meta.messageRequestId}-${index}`,
                            et: 'CLICK',
                            event_type: 'MORS'
                        });
                        logger.track({
                            message_request_id: `${meta.messageRequestId}-${index}`,
                            et: 'CLICK',
                            event_type: 'click',
                            link: 'Banner Wrapper'
                        });

                        if (typeof props.onClick === 'function') {
                            props.onClick({ meta });
                        }
                    };

                    const handleHover = once(({ meta }) => {
                        logger.track({
                            message_request_id: `${meta.messageRequestId}-${index}`,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'hover'
                        });
                    });
                    const createOnHoverHandler = () => ({ meta }) => handleHover({ meta });

                    const totalOptions = {
                        ...merchantOptions,
                        onReady: createOnReadyHandler(options),
                        onClick: createOnClickHandler(options),
                        onHover: createOnHoverHandler(options)
                    };

                    const message = Message(totalOptions);

                    const updateProps = newOptions =>
                        message.updateProps({
                            ...newOptions,
                            onReady: createOnReadyHandler(newOptions),
                            onClick: createOnClickHandler(newOptions),
                            onHover: createOnHoverHandler(newOptions)
                        });

                    messagesMap.set(container, { render: message.render, updateProps });

                    attributeObserver.observe(container, { attributes: true });

                    return message.render(container);
                }

                const { updateProps } = messagesMap.get(container);

                return updateProps(merchantOptions);
            })
        );
    }
});
