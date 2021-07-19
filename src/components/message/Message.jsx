/** @jsx h */
import objectEntries from 'core-js-pure/stable/object/entries';
import { h } from 'preact';
import { useLayoutEffect, useRef } from 'preact/hooks';

import { request, getActiveTags, ppDebug, getOrCreateStorageID } from '../../utils';
import { useXProps, useServerData, useDidUpdateEffect, useDidUpdateLayoutEffect } from './lib';

const Message = () => {
    const {
        amount,
        currency,
        buyerCountry,
        style,
        offer,
        payerId,
        clientId,
        merchantId,
        version,
        stageTag,
        env,
        onClick,
        onReady,
        onHover,
        onMarkup,
        resize
    } = useXProps();
    const { markup, meta, parentStyles, warnings, setServerData } = useServerData();
    const dimensionsRef = useRef({ width: 0, height: 0 });
    const buttonRef = useRef();

    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick({ meta });
        }
    };

    const handleHover = () => {
        if (typeof onHover === 'function') {
            onHover({ meta });
        }
    };

    useLayoutEffect(() => {
        if (typeof onMarkup === 'function') {
            onMarkup({ meta, styles: parentStyles, warnings });
        }
    }, [parentStyles, warnings, markup]);

    useLayoutEffect(() => {
        if (typeof onReady === 'function') {
            onReady({
                meta,
                activeTags: getActiveTags(buttonRef.current),
                // Utility will create iframe deviceID if it doesn't exist.
                deviceID: getOrCreateStorageID()
            });
        }
    }, [meta.messageRequestId]);

    useDidUpdateLayoutEffect(() => {
        const buttonWidth = buttonRef.current.offsetWidth;
        const buttonHeight = buttonRef.current.offsetHeight;

        // Zoid will not fire a resize event if the markup has the same dimensions meaning the render event
        // in the overflow observer will not fire. This forces the resize event to fire for every render
        // so that the render complete logs will always fire
        if (dimensionsRef.current.width === buttonWidth && dimensionsRef.current.height === buttonHeight) {
            resize({ width: buttonWidth, height: buttonHeight });
        } else {
            dimensionsRef.current = { width: buttonWidth, height: buttonHeight };
        }
    });

    useDidUpdateEffect(() => {
        const query = objectEntries({
            message_request_id: meta.messageRequestId,
            amount,
            currency,
            buyer_country: buyerCountry,
            style,
            credit_type: offer,
            payer_id: payerId,
            client_id: clientId,
            merchant_id: merchantId,
            version,
            stageTag,
            env
        })
            .filter(([, val]) => Boolean(val))
            .reduce(
                (acc, [key, val]) =>
                    `${acc}&${key}=${encodeURIComponent(typeof val === 'object' ? JSON.stringify(val) : val)}`,
                ''
            )
            .slice(1);

        ppDebug('Updating message with new props...', { inZoid: true });

        request('GET', `${window.location.origin}/credit-presentment/renderMessage?${query}`).then(({ data }) => {
            setServerData({
                markup: data.markup ?? markup,
                meta: data.meta ?? meta,
                // Respect empty string value in order to remove styles when switch from flex to text layout
                parentStyles: data.parentStyles ?? parentStyles,
                warnings: data.warnings ?? warnings
            });
        });
    }, [amount, currency, buyerCountry, JSON.stringify(style), offer, payerId, clientId, merchantId]);

    return (
        <button
            type="button"
            ref={buttonRef}
            onClick={handleClick}
            onMouseOver={handleHover}
            onFocus={handleHover}
            aria-label="PayPal Credit Message"
            style={{
                display: 'block',
                background: 'transparent',
                padding: 0,
                border: 'none',
                outline: 'none',
                textAlign: style?.text?.align || 'left',
                fontFamily: 'inherit',
                fontSize: 'inherit'
            }}
            innerHTML={markup}
        />
    );
};

export default Message;
