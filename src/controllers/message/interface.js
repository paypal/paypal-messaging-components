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
    logger,
    getCurrentTime
} from '../../utils';

import { Message } from '../../zoid/message';
import { Modal } from '../modal';

export default options => ({
    render: (selector = '[data-pp-message]') => {
        const renderStart = getCurrentTime();
        const { messagesMap } = globalState;
        const containers = getAllBySelector(selector);

        if (containers.length === 0) {
            logger.warn('invalid_selector', {
                description: `No elements were found with the following selector: "${selector}"`,
                selector
            });

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
                    const modal = Modal({
                        ...merchantOptions,
                        onClose: () => container.firstChild.focus()
                    });

                    const createOnReadyHandler = props => ({ meta }) => {
                        logger.addMetaBuilder(() => {
                            return {
                                [index]: { messageRequestId: meta.messageRequestId, account: merchantOptions.account },
                                [meta.messageRequestId]: {
                                    uuid:
                                        meta.displayedMessage ||
                                        // FIXME:
                                        'NI:NON-US::layout:text::logo.position:left::logo.type:primary::text.color:black::text.size:12',
                                    ...meta.trackingDetails
                                }
                            };
                        });

                        runStats({ container, index });

                        modal.updateProps({ index });
                        modal.render('body');

                        logger.track({
                            index,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'MORS'
                        });
                        logger.track({
                            index,
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
                            index,
                            onClose: () => container.firstChild.focus()
                        });

                        logger.track({
                            index,
                            et: 'CLICK',
                            event_type: 'MORS'
                        });
                        logger.track({
                            index,
                            et: 'CLICK',
                            event_type: 'click',
                            link: 'Banner Wrapper'
                        });

                        if (typeof props.onClick === 'function') {
                            props.onClick({ meta });
                        }
                    };

                    const handleHover = once(() => {
                        logger.track({
                            index,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'hover'
                        });
                    });
                    const createOnHoverHandler = () => ({ meta }) => handleHover({ meta });

                    const totalOptions = {
                        ...merchantOptions,
                        onReady: createOnReadyHandler(merchantOptions),
                        onClick: createOnClickHandler(merchantOptions),
                        onHover: createOnHoverHandler(merchantOptions)
                    };

                    const { render, state, updateProps } = Message(totalOptions);

                    state.renderStart = renderStart;
                    state.options = merchantOptions;

                    const updatePropsWithHandlers = newOptions => {
                        state.options = objectMerge(state.options, newOptions);

                        return updateProps({
                            ...state.options,
                            onReady: createOnReadyHandler(state.options),
                            onClick: createOnClickHandler(state.options),
                            onHover: createOnHoverHandler(state.options)
                        });
                    };

                    messagesMap.set(container, { render, updateProps: updatePropsWithHandlers, state });

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
