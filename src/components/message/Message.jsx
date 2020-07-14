/** @jsx h */
import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { useXProps } from './lib';

const Message = ({ innerHTML, meta }) => {
    const { onClick, onReady, onHover } = useXProps();

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
            onReady({ meta });
        }
    }, []);

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
                outline: 'none'
            }}
            innerHTML={innerHTML}
        />
    );
};

export default Message;
