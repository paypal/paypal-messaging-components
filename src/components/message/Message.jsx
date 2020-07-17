/** @jsx h */
import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { useXProps, useServerData, useDidUpdateEffect } from './lib';
import { request } from '../../utils';

const Message = () => {
    const { amount, currency, style, offer, payerId, clientId, merchantId, onClick, onReady, onHover } = useXProps();
    const { markup, meta, parentStyles, warnings, setServerData } = useServerData();

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

    useEffect(() => {
        if (typeof onReady === 'function') {
            onReady({ meta, warnings, styles: parentStyles });
        }
    }, [meta]);

    useDidUpdateEffect(() => {
        request('GET', `${window.location.origin}/credit-presentment/renderMessage`).then(({ data }) =>
            setServerData({
                markup: data.markup || markup,
                meta: data.meta || meta,
                parentStyles: data.parentStyles || parentStyles,
                warnings: data.warnings || warnings
            })
        );
    }, [amount, currency, JSON.stringify(style), offer, payerId, clientId, merchantId]);

    return (
        <button
            type="button"
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
                textAlign: 'left',
                fontFamily: 'inherit'
            }}
            innerHTML={markup}
        />
    );
};

export default Message;
