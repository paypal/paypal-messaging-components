import stringIncludes from 'core-js-pure/stable/string/includes';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { SDK_SETTINGS } from '@paypal/sdk-constants';
import { create } from 'zoid/src';

import {
    getMeta,
    getEnv,
    getGlobalUrl,
    getGlobalVariable,
    getCurrentTime,
    getLibraryVersion,
    getScriptAttributes,
    viewportHijack,
    logger,
    nextIndex
} from '../../utils';
import validate from '../message/validation';
import containerTemplate from './containerTemplate';

export default getGlobalVariable('__paypal_credit_modal__', () =>
    create({
        tag: 'paypal-credit-modal',
        url: getGlobalUrl('MODAL'),
        // eslint-disable-next-line security/detect-unsafe-regex
        domain: /\.paypal\.com(:\d+)?$/,
        containerTemplate,
        attributes: {
            iframe: {
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

                    return ({ linkName }) => {
                        const { index, refIndex } = props;

                        logger.track({
                            index,
                            refIndex,
                            et: 'CLICK',
                            event_type: 'click',
                            link: linkName
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
                    const [hijackViewport] = viewportHijack();

                    return () => {
                        const { index, refIndex } = props;

                        hijackViewport();

                        logger.track({
                            index,
                            refIndex,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'modal-open'
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
                value: ({ props }) => {
                    const { onClose } = props;
                    const [, replaceViewport] = viewportHijack();

                    return ({ linkName }) => {
                        const { index, refIndex } = props;

                        replaceViewport();

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
                value: ({ props, state }) => {
                    const { onReady } = props;

                    return ({ products, meta }) => {
                        const { index, offer, merchantId, account, refIndex } = props;
                        const { renderStart, show, hide } = state;
                        const { messageRequestId, trackingDetails, displayedMessage } = meta;

                        logger.addMetaBuilder(existingMeta => {
                            // Remove potential existing meta info
                            // Necessary because beaver-logger will not override an existing meta key if these values change
                            // eslint-disable-next-line no-param-reassign
                            delete existingMeta[index];

                            return {
                                [index]: {
                                    type: 'modal',
                                    messageRequestId,
                                    account: merchantId || account,
                                    displayedMessage,
                                    trackingDetails
                                }
                            };
                        });

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
                            integration_type: __MESSAGES__.__TARGET__,
                            messaging_version: getLibraryVersion(),
                            bn_code: getScriptAttributes()[SDK_SETTINGS.PARTNER_ATTRIBUTION_ID]
                        });

                        if (typeof onReady === 'function') {
                            onReady({ products, show, hide });
                        }
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
                decorate: ({ props }) => (!stringStartsWith(props.account, 'client-id:') ? props.account : ''),
                default: () => '',
                required: false
            },
            clientId: {
                type: 'string',
                queryParam: 'client_id',
                decorate: ({ props }) => (stringStartsWith(props.account, 'client-id:') ? props.account.slice(10) : ''),
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
            }
        }
    })
);
