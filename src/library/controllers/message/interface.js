import objectEntries from 'core-js-pure/stable/object/entries';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import {
    objectMerge,
    getInlineOptions,
    getGlobalState,
    getAllBySelector,
    getAttributeObserver,
    nextIndex,
    logger,
    getCurrentTime,
    addPerformanceMeasure,
    PERFORMANCE_MEASURE_KEYS,
    globalEvent,
    ppDebug,
    awaitTreatments
} from '../../../utils';

import { getMessageComponent } from '../../zoid/message';
import { Modal } from '../modal';

export default (options = {}) => ({
    render: (selector = '[data-pp-message]') => {
        addPerformanceMeasure(PERFORMANCE_MEASURE_KEYS.FIRST_RENDER_DELAY);
        const renderStart = getCurrentTime();
        const { messagesMap } = getGlobalState();
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

        return awaitTreatments.then(() =>
            ZalgoPromise.all(
                validContainers.map((container, mapIndex) => {
                    return new ZalgoPromise((resolve, reject) => {
                        // return resolved render and updateProps
                        const renderOrUpdateMessage = () => {
                            try {
                                const merchantOptions = objectMerge(
                                    getGlobalState().config,
                                    objectMerge(options, getInlineOptions(container))
                                );

                                if (!container.hasAttribute('data-pp-id')) {
                                    container.setAttribute('data-pp-id', nextIndex());
                                }

                                const index = container.getAttribute('data-pp-id');
                                const {
                                    account,
                                    merchantId,
                                    customerId,
                                    currency,
                                    amount,
                                    placement,
                                    style,
                                    offer,
                                    buyerCountry,
                                    ignoreCache,
                                    onClick,
                                    onRender,
                                    onApply,
                                    channel,
                                    ecToken,
                                    cspNonce
                                } = merchantOptions;

                                // Explicitly select props to pass in to avoid unintentionally sending
                                // in props meant for only either the message or modal (e.g. onClick)
                                const commonProps = {
                                    account,
                                    merchantId,
                                    customerId,
                                    currency,
                                    amount,
                                    buyerCountry,
                                    ignoreCache,
                                    channel,
                                    ecToken,
                                    cspNonce
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
                                    onApply,
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
                                    const { render, state, updateProps, clone } = getMessageComponent()(messageProps);

                                    state.renderStart = renderStart;
                                    state.style = messageProps.style;

                                    messagesMap.set(container, { render, updateProps, state, clone });

                                    getAttributeObserver().observe(container, { attributes: true });

                                    ppDebug(
                                        `{
                            clientID: ${account},
                            merchantID: ${merchantId},
                            customerID: ${customerId},
                            offer: ${offer},
                            currency: ${currency},
                            ignoreCache: ${ignoreCache},
                            channel: ${channel},
                            ecToken: ${ecToken},
                    
                            index: data-pp-id="${index}",
                            style: ${JSON.stringify(style)},
                            amount: ${amount},
                            buyerCountry: ${buyerCountry},
                            placement: ${placement},
                    
                            renderStart: ${new Date(renderStart).toLocaleString()},
                            renderMessageTime: ${new Date().toLocaleString()}
                            }`
                                    );

                                    return render(container)
                                        .then(() => globalEvent.trigger('render'))
                                        .then(resolve);
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
                                    (acc, [key, val]) =>
                                        typeof val === 'undefined' ? acc : Object.assign(acc, { [key]: val }),
                                    {}
                                );

                                return updateProps(updatedMessageProps)
                                    .then(() => globalEvent.trigger('render'))
                                    .then(resolve);
                            } catch (err) {
                                // We only want console.warn to be called once
                                // check for the known error offer_validation_error and if it’s not that error then we should throw the error again so it gets surfaced
                                //  catch that known/safe error, but allow any other errors to escape through
                                if (err.message === 'offer_validation_error') {
                                    return resolve();
                                }
                                return reject(err);
                            }
                        };

                        if (mapIndex === 0) {
                            renderOrUpdateMessage();
                            return;
                        }

                        if (window.requestIdleCallback) {
                            // check that requestIdleCallback is available
                            window.requestIdleCallback(renderOrUpdateMessage);
                        } else {
                            // basic fallback for Safari
                            setTimeout(renderOrUpdateMessage, mapIndex * 20);
                        }
                    });
                })
            )
        );
    }
});
