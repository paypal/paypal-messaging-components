import stringIncludes from 'core-js-pure/stable/string/includes';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { SDK_SETTINGS } from '@paypal/sdk-constants';
import { create } from 'zoid/src';
import { getCurrentScriptUID } from 'belter/src';

import {
    getMeta,
    getEnv,
    getGlobalUrl,
    createGlobalVariableGetter,
    getCurrentTime,
    getLibraryVersion,
    getScriptAttributes,
    logger,
    nextIndex,
    getPerformanceMeasure,
    getSessionID,
    getOrCreateStorageID,
    getStageTag,
    ppDebug
} from '../../utils';
import validate from '../message/validation';
import containerTemplate from './containerTemplate';
import prerenderTemplate from './prerenderTemplate';

export default createGlobalVariableGetter('__paypal_credit_modal__', () =>
    create({
        tag: 'paypal-credit-modal',
        url: getGlobalUrl('MODAL'),
        // eslint-disable-next-line security/detect-unsafe-regex
        domain: /\.paypal\.com(:\d+)?$/,
        containerTemplate,
        prerenderTemplate,
        attributes: {
            iframe: {
                title: 'PayPal Modal',
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
            currency: {
                type: 'string',
                queryParam: true,
                required: false,
                value: validate.currency
            },
            amount: {
                type: 'number',
                queryParam: true,
                required: false,
                value: validate.amount
            },
            buyerCountry: {
                type: 'string',
                queryParam: 'buyer_country',
                required: false,
                value: validate.buyerCountry
            },
            offer: {
                type: 'string',
                queryParam: false,
                required: false
            },
            refId: {
                type: 'string',
                queryParam: false,
                required: false
            },
            refIndex: {
                type: 'string',
                queryParam: false,
                required: false
            },

            // Callbacks
            onClick: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onClick, onApply } = props;

                    return ({ linkName, src }) => {
                        const { index, refIndex } = props;

                        logger.track({
                            index,
                            refIndex,
                            et: 'CLICK',
                            event_type: 'click',
                            link: linkName,
                            src: src ?? linkName
                        });

                        if (typeof onClick === 'function') {
                            onClick({ linkName });
                        }

                        if (typeof onApply === 'function' && stringIncludes(linkName, 'Apply Now')) {
                            onApply();
                        }
                    };
                }
            },
            onCalculate: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onCalculate } = props;

                    return ({ value }) => {
                        const { index, refIndex } = props;

                        logger.track({
                            index,
                            refIndex,
                            et: 'CLICK',
                            event_type: 'click',
                            link: 'Calculator',
                            src: 'Calculator',
                            amount: value
                        });

                        if (typeof onCalculate === 'function') {
                            onCalculate({ value });
                        }
                    };
                }
            },
            onShow: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onShow } = props;

                    return () => {
                        const { index, refIndex, src = 'show' } = props;

                        logger.track({
                            index,
                            refIndex,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'modal-open',
                            src
                        });

                        if (typeof onShow === 'function') {
                            onShow();
                        }
                    };
                }
            },
            onClose: {
                type: 'function',
                queryParam: false,
                value: ({ props, event }) => {
                    const { onClose } = props;

                    return ({ linkName }) => {
                        const { index, refIndex } = props;

                        event.trigger('modal-hide');

                        logger.track({
                            index,
                            refIndex,
                            et: 'CLICK',
                            event_type: 'modal-close',
                            link: linkName
                        });

                        if (typeof onClose === 'function') {
                            onClose({ linkName });
                        }
                    };
                }
            },
            onReady: {
                type: 'function',
                queryParam: false,
                value: ({ props, state, event }) => {
                    const { onReady } = props;
                    // Fired anytime we fetch new content (e.g. amount change)
                    return ({ products, meta, deviceID }) => {
                        const { index, offer, merchantId, account, refIndex } = props;
                        const { renderStart, show, hide } = state;
                        const { messageRequestId, trackingDetails, ppDebugId } = meta;
                        ppDebug(`Modal Correlation ID: ${ppDebugId}`);

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
                                global: {
                                    ...existingGlobal,
                                    // Device ID should be correctly set during message render
                                    deviceID,
                                    sessionID: getSessionID()
                                },
                                [index]: {
                                    type: 'modal',
                                    messageRequestId,
                                    account: merchantId || account,
                                    trackingDetails
                                }
                            };
                        });

                        const firstModalRenderDelay = getPerformanceMeasure('firstModalRenderDelay');

                        logger.info('modal_render', {
                            index,
                            refIndex,
                            duration: getCurrentTime() - renderStart
                        });

                        logger.track({
                            index,
                            refIndex,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'modal-render',
                            modal: `${products.join('_').toLowerCase()}:${offer ? offer.toLowerCase() : products[0]}`,
                            // For standalone modal the stats event does not run, so we duplicate some data here
                            bn_code: getScriptAttributes()[SDK_SETTINGS.PARTNER_ATTRIBUTION_ID],
                            first_modal_render_delay: Math.round(firstModalRenderDelay).toString(),
                            render_duration: Math.round(getCurrentTime() - renderStart).toString()
                        });
                        if (
                            typeof onReady === 'function' &&
                            // No need to fire the merchant's onReady if the modal products haven't changed
                            // which could cause multiple click event handlers to be added
                            (!state.products || JSON.stringify(products) !== JSON.stringify(state.products))
                        ) {
                            onReady({ products, show, hide });
                        }
                        // Consumed in modal controller when validating the offer type passed in
                        // to determine if a modal is able to be displayed or not.
                        // Primary use-case is a standalone modal
                        state.products = products; // eslint-disable-line no-param-reassign
                        event.trigger('ready');
                    };
                }
            },

            // Computed Props
            index: {
                type: 'string',
                queryParam: false,
                default: () => nextIndex().toString()
            },
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
                value: getMeta
            },
            env: {
                type: 'string',
                queryParam: true,
                value: getEnv
            },
            version: {
                type: 'string',
                queryParam: true,
                value: getLibraryVersion
            },
            deviceID: {
                type: 'string',
                queryParam: true,
                value: getOrCreateStorageID
            },
            sessionID: {
                type: 'string',
                queryParam: true,
                value: getSessionID
            },
            scriptUID: {
                type: 'string',
                queryParam: true,
                value: getCurrentScriptUID
            },
            debug: {
                type: 'boolean',
                queryParam: 'pp_debug',
                value: () => /(\?|&)pp_debug=true(&|$)/.test(window.location.search)
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
