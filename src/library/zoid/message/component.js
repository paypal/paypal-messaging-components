import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { SDK_SETTINGS } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { uniqueID, getCurrentScriptUID } from '@krakenjs/belter/src';
import { create } from '@krakenjs/zoid/src';

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
    writeToLocalStorage,
    getOrCreateStorageID,
    getStageTag,
    getFeatures,
    getNonce,
    ppDebug,
    isScriptBeingDestroyed,
    getScriptAttributes,
    getDevTouchpoint,
    getMerchantConfig,
    getLocalTreatments,
    getTsCookieFromStorage
} from '../../../utils';
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
            customerId: {
                type: 'string',
                queryParam: 'customer_id',
                required: false,
                value: validate.customerId
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
            channel: {
                type: 'string',
                queryParam: 'channel',
                required: false,
                default: () => 'UPSTREAM',
                value: validate.channel
            },
            ecToken: {
                type: 'string',
                queryParam: 'ec_token',
                required: false,
                value: validate.ecToken
            },
            // Callbacks
            onClick: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onClick } = props;

                    return ({ meta }) => {
                        const {
                            modal,
                            index,
                            account,
                            merchantId,
                            currency,
                            amount,
                            buyerCountry,
                            onApply,
                            getContainer
                        } = props;
                        const { offerType, offerCountry, messageRequestId } = meta;

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
                            offerCountry,
                            refId: messageRequestId,
                            refIndex: index,
                            src: 'message_click',
                            onClose: () => {
                                getContainer().querySelector('iframe').focus();
                            }
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
                    const { index, onHover } = props;
                    let hasHovered = false;

                    return ({ meta }) => {
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
                    return ({ meta, activeTags, deviceID, ts, requestDuration, messageRequestId }) => {
                        const { account, merchantId, index, modal, getContainer } = props;
                        const { trackingDetails, offerType, ppDebugId } = meta;
                        const partnerClientId = merchantId && account.slice(10); // slice is to remove the characters 'client-id:' from account name

                        ppDebug(`Message Correlation ID: ${ppDebugId}`);

                        // Write deviceID and ts cookie from iframe localStorage to merchant domain localStorage
                        // Even though we are attempting to get this value before the initial message render (see utils/experiments.js)
                        // We still want to write it here to handle the scenario where the SDK has never been loaded
                        // and thus the inner iframe has no value for deviceID until after the first message render
                        const tsCookie = typeof ts !== 'undefined' ? ts : getTsCookieFromStorage();
                        writeToLocalStorage({ id: deviceID, ts: tsCookie });

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
                                    ts: tsCookie,
                                    deviceID, // deviceID from internal iframe storage
                                    sessionID: getSessionID() // Session ID from parent local storage,
                                },
                                [index]: {
                                    type: 'message',
                                    messageRequestId,
                                    account: merchantId || account,
                                    partnerClientId,
                                    trackingDetails
                                }
                            };
                        });

                        runStats({
                            container: getContainer(),
                            activeTags,
                            index,
                            requestDuration
                        });
                        modal.updateProps({ refIndex: index, offer: offerType });

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
                        const CLEAN_UP_DELAY = 0;
                        const { getContainer } = props;
                        const { messagesMap } = getGlobalState();
                        const container = getContainer();
                        // Let the cleanup finish before re-rendering
                        ZalgoPromise.delay(CLEAN_UP_DELAY).then(() => {
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
                decorate: ({ props }) => {
                    return stringStartsWith(props.account, 'client-id:') ? props.account.slice(10) : null;
                },
                default: () => '',
                required: false
            },
            merchantConfigHash: {
                type: 'string',
                queryParam: 'merchant_config',
                required: false,
                value: getMerchantConfig,
                debug: ppDebug(`Merchant Config Hash: ${getMerchantConfig()}`)
            },
            treatmentsHash: {
                type: 'string',
                queryParam: 'treatments',
                required: false,
                value: getLocalTreatments,
                debug: ppDebug(`Treatments Hash: ${getLocalTreatments()}`)
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
            integrationType: {
                type: 'string',
                queryParam: true,
                value: () => __MESSAGES__.__TARGET__,
                debug: ppDebug(`Library Integration: ${__MESSAGES__.__TARGET__}`)
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
            messageRequestId: {
                type: 'string',
                queryParam: 'message_request_id',
                value: ({ state }) => {
                    // This function is called multiple times throughout zoid's lifecycle
                    // so we do not want to call a function with side-effects more than once
                    if (!state.messageRequestId) {
                        state.messageRequestId = uniqueID(); // eslint-disable-line no-param-reassign
                    }

                    ppDebug(`Message Request ID: ${state.messageRequestId}`);
                    return state.messageRequestId;
                }
            },
            debug: {
                type: 'boolean',
                queryParam: 'pp_debug',
                required: false,
                value: () => (/(\?|&)pp_debug=true(&|$)/.test(window.location.search) ? true : undefined)
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
            },
            partnerAttributionId: {
                type: 'string',
                queryParam: true,
                required: false,
                value: () => (getScriptAttributes() ?? {})[SDK_SETTINGS.PARTNER_ATTRIBUTION_ID] ?? null,
                debug: ppDebug(
                    `Partner Attribution ID: ${(getScriptAttributes() ?? {})[SDK_SETTINGS.PARTNER_ATTRIBUTION_ID]}`
                )
            },
            devTouchpoint: {
                type: 'boolean',
                queryParam: true,
                required: false,
                value: getDevTouchpoint
            },
            features: {
                type: 'string',
                queryParam: true,
                required: false,
                value: getFeatures
            },
            cspNonce: {
                type: 'string',
                required: false,
                default: getNonce,
                value: validate.cspNonce
            }
        }
    })
);
