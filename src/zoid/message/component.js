import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { create } from 'zoid/src';

import { getMeta, getEnv, getGlobalUrl, getGlobalVariable, runStats, logger } from '../../utils';
import validate from './validation';
import containerTemplate from './containerTemplate';

export default getGlobalVariable('__paypal_credit_message__', () =>
    create({
        tag: 'paypal-message',
        url: getGlobalUrl('MESSAGE_B'),
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

            // Callbacks
            onClick: {
                type: 'function',
                queryParam: false,
                value: ({ props, focus }) => {
                    const { onClick } = props;

                    return ({ meta }) => {
                        const { modal, index } = props;
                        const { offerType, messageRequestId } = meta;

                        modal.show({
                            ...props,
                            index,
                            refId: messageRequestId,
                            offer: offerType,
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

                    return ({ meta }) => {
                        const { account, index, modal } = props;
                        const { messageRequestId, displayedMessage, trackingDetails, offerType } = meta;

                        logger.addMetaBuilder(() => {
                            return {
                                [index]: { messageRequestId, account, displayedMessage, ...trackingDetails }
                            };
                        });

                        runStats({ container: document.querySelector(`[data-pp-id="${index}"]`), index });

                        modal.updateProps({ index, offer: offerType });
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
                        const { index } = props;
                        if (styles) {
                            event.trigger('styles', { styles });
                        }

                        if (warnings) {
                            warnings.forEach(warning => {
                                logger.warn('render_warning', {
                                    description: warning,
                                    container: document.querySelector(`[data-pp-id="${index}"]`)
                                });
                            });
                        }

                        return onMarkup && onMarkup({ styles, warnings, ...rest });
                    };
                }
            },

            // Computed Props
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
