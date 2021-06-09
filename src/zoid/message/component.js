import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { create } from 'zoid/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getCurrentScriptUID } from 'belter/src';

import {
    getMeta,
    getEnv,
    getGlobalUrl,
    createGlobalVariableGetter,
    getLibraryVersion,
    runStats,
    logger,
    getSessionID,
    getGlobalState,
    getCurrentTime,
    writeStorageID,
    getOrCreateStorageID,
    getStageTag,
    ppDebug,
    isScriptBeingDestroyed
} from '../../utils';
import validate from './validation';
import containerTemplate from './containerTemplate';

export default createGlobalVariableGetter('__paypal_credit_message__', () =>
    create({
        tag: 'paypal-message',
        url: getGlobalUrl('MESSAGE'),
        // eslint-disable-next-line security/detect-unsafe-regex
        domain: /\.paypal\.com(:\d+)?$/,
        containerTemplate,
        autoResize: {
            width: true,
            height: true,
            element: 'button'
        },
        attributes: {
            iframe: {
                title: 'PayPal Message',
                scrolling: 'no'
            }
        },
        props: {
            account: {
                type: 'string',
                queryParam: false,
                required: true,
                value: validate.account
            },
            merchantId: {
                type: 'string',
                queryParam: 'merchant_id',
                required: false,
                value: validate.merchantId
            },
            amount: {
                type: 'number',
                queryParam: true,
                required: false,
                value: validate.amount
            },
            currency: {
                type: 'string',
                queryParam: true,
                required: false,
                value: validate.currency
            },
            placement: {
                type: 'string',
                queryParam: true,
                required: false,
                value: validate.placement
            },
            style: {
                type: 'object',
                serialization: 'json',
                queryParam: true,
                required: false,
                value: validate.style
            },
            offer: {
                type: 'string',
                queryParam: 'credit_type',
                required: false,
                value: validate.offer
            },
            buyerCountry: {
                type: 'string',
                queryParam: 'buyer_country',
                required: false,
                value: validate.buyerCountry
            },
            ignoreCache: {
                type: 'boolean',
                queryParam: 'ignore_cache',
                required: false,
                value: validate.ignoreCache
            },

            // Callbacks
            onClick: {
                type: 'function',
                queryParam: false,
                value: ({ props, focus }) => {
                    const { onClick } = props;

                    return ({ meta }) => {
                        const { modal, index, account, merchantId, currency, amount, buyerCountry, onApply } = props;
                        const { offerType, messageRequestId } = meta;

                        // Avoid spreading message props because both message and modal
                        // zoid components have an onClick prop that functions differently
                        modal.show({
                            account,
                            merchantId,
                            currency,
                            amount,
                            buyerCountry,
                            onApply,
                            offer: offerType,
                            refId: messageRequestId,
                            refIndex: index,
                            src: 'message_click',
                            onClose: () => focus()
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

                        if (typeof onClick === 'function') {
                            onClick({ meta });
                        }
                    };
                }
            },
            onHover: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onHover } = props;
                    let hasHovered = false;

                    return ({ meta }) => {
                        const { index } = props;

                        if (!hasHovered) {
                            hasHovered = true;
                            logger.track({
                                index,
                                et: 'CLIENT_IMPRESSION',
                                event_type: 'hover'
                            });
                        }

                        if (typeof onHover === 'function') {
                            onHover({ meta });
                        }
                    };
                }
            },
            onReady: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onReady } = props;

                    return ({ meta, activeTags, deviceID }) => {
                        const { account, merchantId, index, modal, getContainer } = props;
                        const { messageRequestId, trackingDetails, offerType, ppDebugId } = meta;
                        ppDebug(`Message Correlation ID: ${ppDebugId}`);

                        // Write deviceID from iframe localStorage to merchant domain localStorage
                        writeStorageID(deviceID);

                        logger.addMetaBuilder(existingMeta => {
                            // Remove potential existing meta info
                            // Necessary because beaver-logger will not override an existing meta key if these values change
                            // eslint-disable-next-line no-param-reassign
                            delete existingMeta[index];

                            // Need to capture existing attributes under global before destroying
                            const { global: existingGlobal = {} } = existingMeta;
                            // eslint-disable-next-line no-param-reassign
                            delete existingMeta.global;

                            return {
                                // Need to merge global attribute here due to preserve performance attributes
                                global: {
                                    ...existingGlobal,
                                    deviceID, // deviceID from internal iframe storage
                                    sessionID: getSessionID() // Session ID from parent local storage
                                },
                                [index]: {
                                    type: 'message',
                                    messageRequestId,
                                    account: merchantId || account,
                                    trackingDetails
                                }
                            };
                        });

                        runStats({
                            container: getContainer(),
                            activeTags,
                            index
                        });
                        // Set visible to false to prevent this update from popping open the modal
                        // when the user has previously opened the modal
                        modal.updateProps({ refIndex: index, offer: offerType, visible: false });
                        modal.render('body');

                        logger.track({
                            index,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'MORS'
                        });

                        if (typeof onReady === 'function') {
                            onReady({ meta });
                        }
                    };
                }
            },
            onMarkup: {
                type: 'function',
                queryParam: false,
                value: ({ props, event }) => {
                    const { onMarkup } = props;

                    return ({ styles, warnings, ...rest }) => {
                        const { getContainer } = props;

                        if (typeof styles !== 'undefined') {
                            event.trigger('styles', { styles });
                        }

                        if (warnings) {
                            warnings.forEach(warning => {
                                logger.warn('render_warning', {
                                    description: warning,
                                    container: getContainer()
                                });
                            });
                        }

                        return onMarkup && onMarkup({ styles, warnings, ...rest });
                    };
                }
            },
            onDestroy: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onDestroy } = props;

                    // Handle moving the iframe around the DOM
                    return () => {
                        const { getContainer } = props;
                        const { messagesMap } = getGlobalState();
                        const container = getContainer();
                        // Let the cleanup finish before re-rendering
                        ZalgoPromise.delay(0).then(() => {
                            if (
                                container &&
                                container.ownerDocument.body.contains(container) &&
                                !isScriptBeingDestroyed()
                            ) {
                                // Will re-render with the full config options stored in the zoid props
                                const { render, state, updateProps, clone } = messagesMap.get(container).clone();

                                state.renderStart = getCurrentTime();

                                messagesMap.set(container, { render, updateProps, state, clone });

                                render(container);
                            }
                        });

                        if (typeof onDestroy === 'function') {
                            onDestroy();
                        }
                    };
                }
            },

            // Computed Props
            payerId: {
                type: 'string',
                queryParam: 'payer_id',
                decorate: ({ props }) => (!stringStartsWith(props.account, 'client-id:') ? props.account : null),
                default: () => '',
                required: false
            },
            clientId: {
                type: 'string',
                queryParam: 'client_id',
                decorate: ({ props }) =>
                    stringStartsWith(props.account, 'client-id:') ? props.account.slice(10) : null,
                default: () => '',
                required: false
            },
            sdkMeta: {
                type: 'string',
                queryParam: true,
                sendToChild: false,
                required: false,
                value: getMeta,
                debug: ppDebug(`SDK Meta: ${getMeta()}`)
            },
            env: {
                type: 'string',
                queryParam: true,
                value: getEnv,
                debug: ppDebug(`Environment: ${getEnv()}`)
            },
            version: {
                type: 'string',
                queryParam: true,
                value: getLibraryVersion,
                debug: ppDebug(`Library Version: ${getLibraryVersion()}`)
            },
            deviceID: {
                type: 'string',
                queryParam: true,
                value: getOrCreateStorageID,
                debug: ppDebug(`Device ID: ${getOrCreateStorageID()}`)
            },
            sessionID: {
                type: 'string',
                queryParam: true,
                value: getSessionID,
                debug: ppDebug(`Session ID: ${getSessionID()}`)
            },
            scriptUID: {
                type: 'string',
                queryParam: true,
                value: getCurrentScriptUID,
                debug: ppDebug(`ScriptUID: ${getCurrentScriptUID()}`)
            },
            debug: {
                type: 'boolean',
                queryParam: 'pp_debug',
                value: () => /(\?|&)pp_debug=true(&|$)/.test(window.location.search)
            },
            messageLocation: {
                type: 'string',
                queryParam: false,
                value: () => window.location.href,
                debug: ppDebug(`Message Location: ${window.location.href}`)
            },
            stageTag: {
                type: 'string',
                queryParam: true,
                required: false,
                value: getStageTag
            }
        }
    })
);
