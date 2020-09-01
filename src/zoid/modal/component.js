import stringIncludes from 'core-js-pure/stable/string/includes';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import { create } from 'zoid/src';

import { getMeta, getEnv, getGlobalUrl, getGlobalVariable, getCurrentTime, viewportHijack, logger } from '../../utils';
import validate from '../message/validation';
import containerTemplate from './containerTemplate';

// Determine pre-selected tab based on the offer type of the banner.
// Currently only applicable to the US
const determineInitialTab = (type = 'NI') => {
    switch (true) {
        case arrayIncludes(
            ['EZP:ANY:EQZ', 'EZP:ANY:GTZ', 'PALA:MULTI:EQZ', 'PALA:MULTI:GTZ', 'PALA:SINGLE:EQZ', 'PALA:SINGLE:GTZ'],
            type.toUpperCase()
        ):
            return 'EZP';
        default:
            return 'NI';
    }
};

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
                value: validate.merchantId,
                required: false
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
            refId: {
                type: 'string',
                queryParam: false,
                required: false
            },
            buyerCountry: {
                type: 'string',
                queryParam: 'buyer_country',
                required: false,
                value: validate.buyerCountry
            },

            // Callbacks
            onClick: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onClick, onApply } = props;

                    return ({ linkName }) => {
                        logger.track({
                            index: props.index,
                            et: 'CLICK',
                            event_type: 'click',
                            link: linkName
                        });

                        if (typeof onClick === 'function') {
                            onClick({ linkName });

                            if (typeof onApply === 'function' && stringIncludes(linkName, 'Apply Now')) {
                                onApply();
                            }
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
                        logger.track({
                            index: props.index,
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
            onClose: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onClose } = props;
                    const [, replaceViewport] = viewportHijack();

                    return ({ linkName }) => {
                        replaceViewport();

                        logger.track({
                            index: props.index,
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

                    return ({ products }) => {
                        const { index } = props;

                        logger.info('modal_render', {
                            index,
                            duration: getCurrentTime() - state.renderStart
                        });
                        logger.track({
                            index,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'modal-render',
                            modal: products.join('_').toLowerCase()
                        });

                        if (typeof onReady === 'function') {
                            onReady({ products });
                        }
                    };
                }
            },

            // Computed Props
            offer: {
                type: 'string',
                value: ({ props }) => determineInitialTab(props.offer),
                required: false
            },
            payerId: {
                type: 'string',
                queryParam: 'payer_id',
                value: ({ props }) => (!stringStartsWith(props.account, 'client-id:') ? props.account : undefined),
                required: false
            },
            clientId: {
                type: 'string',
                queryParam: 'client_id',
                value: ({ props }) =>
                    stringStartsWith(props.account, 'client-id:') ? props.account.slice(10) : undefined,
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
                value: () => __MESSAGES__.__VERSION__
            }
        }
    })
);
