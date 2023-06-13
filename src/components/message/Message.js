import objectEntries from 'core-js-pure/stable/object/entries';
import { uniqueID } from '@krakenjs/belter/src';

import {
    request,
    getActiveTags,
    ppDebug,
    createState,
    isStorageFresh,
    getDeviceID,
    parseObjFromEncoding,
    getRequestDuration,
    getTsCookieFromStorage
} from '../../utils';

const Message = function ({ markup, meta, parentStyles, warnings }) {
    const {
        onClick,
        onReady,
        onHover,
        onMarkup,
        onProps,
        resize,
        deviceID: parentDeviceID,
        messageRequestId
    } = window.xprops;

    const dimensionsRef = { current: { width: 0, height: 0 } };

    const [props, setProps] = createState({
        amount: window.xprops.amount ?? null,
        currency: window.xprops.currency ?? null,
        buyerCountry: window.xprops.buyerCountry ?? null,
        ignoreCache: window.xprops.ignoreCache ?? null,
        style: window.xprops.style,
        offer: window.xprops.offer ?? null,
        payerId: window.xprops.payerId ?? null,
        clientId: window.xprops.clientId ?? null,
        merchantId: window.xprops.merchantId ?? null,
        merchantConfigHash: window.xprops.merchantConfigHash ?? null
    });

    const [serverData, setServerData] = createState({
        parentStyles,
        warnings,
        markup,
        meta
    });

    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick({ meta: serverData.meta });
        }
    };

    const handleHover = () => {
        if (typeof onHover === 'function') {
            onHover({ meta: serverData.meta });
        }
    };

    // if there is a button reuse that instead of making a new one
    const button = document.createElement('button');

    button.setAttribute('type', 'button');

    button.addEventListener('click', handleClick);
    button.addEventListener('mouseover', handleHover);
    button.addEventListener('focus', handleHover);

    button.style.display = 'block';
    button.style.background = 'transparent';
    button.style.padding = 0;
    button.style.border = 'none';
    button.style.outline = 'none';
    button.style.textAlign = window.xprops.style?.text?.align || 'left';
    button.style.fontFamily = 'inherit';
    button.style.fontSize = 'inherit';
    button.innerHTML = markup ?? '';

    onReady({
        meta: serverData.meta,
        activeTags: getActiveTags(button),
        messageRequestId,
        // Utility will create iframe deviceID/ts_cookie values if it doesn't exist.
        deviceID: isStorageFresh() ? parentDeviceID : getDeviceID(),
        ts: getTsCookieFromStorage(),
        // getRequestDuration runs in the child component (iframe/banner message),
        // passing a value to onReady and up to the parent component to go out with
        // the other stats
        requestDuration: getRequestDuration()
    });

    onMarkup({
        meta: serverData.meta,
        styles: serverData.parentStyles,
        warnings: serverData.warnings
    });

    window.addEventListener('focus', () => {
        button.focus();
    });

    if (typeof onProps === 'function') {
        onProps(xprops => {
            const shouldRerender = Object.keys(props).some(key => {
                // check to see if both x/props values are undefined or null
                if (
                    (typeof props[key] === 'undefined' || props[key] === null) &&
                    (typeof xprops[key] === 'undefined' || xprops[key] === null)
                ) {
                    // x/props values are undefined or null carry on
                    return false;
                }

                return typeof props[key] !== 'object'
                    ? props[key] !== xprops[key]
                    : JSON.stringify(props[key]) !== JSON.stringify(xprops[key]);
            });

            if (shouldRerender) {
                const {
                    amount,
                    currency,
                    buyerCountry,
                    ignoreCache,
                    offer,
                    payerId,
                    clientId,
                    merchantId,
                    version,
                    env,
                    features,
                    stageTag,
                    style,
                    merchantConfigHash,
                    channel,
                    treatmentsHash
                } = xprops;

                setProps({
                    amount,
                    currency,
                    buyerCountry,
                    ignoreCache,
                    style,
                    offer,
                    payerId,
                    clientId,
                    merchantId,
                    merchantConfigHash,
                    channel
                });

                // Generate new MRID on message update.
                const newMessageRequestId = uniqueID();

                const query = objectEntries({
                    message_request_id: newMessageRequestId,
                    amount,
                    currency,
                    buyer_country: buyerCountry,
                    ignore_cache: ignoreCache,
                    style,
                    credit_type: offer,
                    payer_id: payerId,
                    client_id: clientId,
                    merchant_id: merchantId,
                    features,
                    version,
                    env,
                    stageTag,
                    merchant_config: merchantConfigHash,
                    channel,
                    treatments: treatmentsHash
                })
                    .filter(([, val]) => Boolean(val))
                    .reduce(
                        (acc, [key, val]) =>
                            `${acc}&${key}=${encodeURIComponent(typeof val === 'object' ? JSON.stringify(val) : val)}`,
                        ''
                    )
                    .slice(1);

                ppDebug('Updating message with new props...', { inZoid: true });

                request('GET', `${window.location.origin}/credit-presentment/smart/message?${query}`).then(
                    ({ data: resData }) => {
                        const encodedData = resData.slice(resData.indexOf('<!--') + 4, resData.indexOf('-->'));
                        const data = parseObjFromEncoding(encodedData);
                        button.innerHTML = data.markup ?? markup ?? '';
                        const buttonWidth = button.offsetWidth;
                        const buttonHeight = button.offsetHeight;
                        // Zoid will not fire a resize event if the markup has the same dimensions meaning the render event
                        // in the overflow observer will not fire. This forces the resize event to fire for every render
                        // so that the render complete logs will always fire
                        if (
                            dimensionsRef.current.width === buttonWidth &&
                            dimensionsRef.current.height === buttonHeight
                        ) {
                            // resizes the iframe
                            resize({ width: buttonWidth, height: buttonHeight });
                        } else {
                            dimensionsRef.current = { width: buttonWidth, height: buttonHeight };
                        }

                        if (typeof onReady === 'function') {
                            // currency, amount, payerId, clientId, merchantId, buyerCountry
                            onReady({
                                meta: data.meta ?? serverData.meta,
                                activeTags: getActiveTags(button),
                                messageRequestId: newMessageRequestId,
                                // Utility will create iframe deviceID/ts cookie if it doesn't exist.
                                deviceID: isStorageFresh() ? parentDeviceID : getDeviceID(),
                                ts: getTsCookieFromStorage(),
                                // getRequestDuration runs in the child component (iframe/banner message),
                                // passing a value to onReady and up to the parent component to go out with
                                // the other stats
                                requestDuration: getRequestDuration()
                            });
                        }

                        if (typeof onMarkup === 'function') {
                            if (
                                serverData.parentStyles !== (data.parentStyles ?? parentStyles) ||
                                serverData.warnings !== (data.warnings ?? warnings) ||
                                serverData.markup !== (data.markup ?? markup)
                            ) {
                                // resizes the parent message div
                                onMarkup({
                                    meta: data.meta ?? serverData.meta,
                                    styles: data.parentStyles ?? serverData.parentStyles,
                                    warnings: data.warnings ?? serverData.warnings
                                });
                            }
                        }

                        setServerData({
                            parentStyles: data.parentStyles ?? serverData.parentStyles,
                            warnings: data.warnings ?? serverData.warnings,
                            markup: data.markup ?? serverData.markup,
                            meta: data.meta ?? serverData.meta
                        });
                    }
                );
            }
        });
    }

    return button;
};

export default Message;
