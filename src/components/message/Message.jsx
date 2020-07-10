/** @jsx h */
import { h } from 'preact';
import { useEffect, useCallback } from 'preact/hooks';
import { once } from 'belter/src';

import { useLogger, useXProps } from './lib';

const Message = ({ innerHTML, meta }) => {
    const { onClick, onReady, amount, clientId, payerId, merchantId, placement } = useXProps();
    const logger = useLogger(meta);

    const handleClick = () => {
        logger.track({ et: 'CLICK', event_type: 'MORS' });
        logger.track({ et: 'CLICK', event_type: 'click', link: 'Banner Wrapper' });

        if (typeof onClick === 'function') {
            onClick({ messageRequestId: meta.messageRequestId });
        }
    };

    const handleHover = useCallback(
        once(() => logger.track({ et: 'CLIENT_IMPRESSION', event_type: 'hover' })),
        []
    );

    useEffect(() => {
        logger.track({ et: 'CLIENT_IMPRESSION', event_type: 'MORS' });
        logger.track({
            et: 'CLIENT_IMPRESSION',
            event_type: 'render',
            amount,
            clientId,
            payerId,
            merchantId,
            placement
        });

        if (typeof onReady === 'function') {
            onReady({ messageRequestId: meta.messageRequestId });
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
