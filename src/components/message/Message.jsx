/** @jsx h */
import { h } from 'preact';
import { useEffect, useCallback } from 'preact/hooks';
import { once } from 'belter/src';

import { useXProps } from '../common/providers';
import { useLogger } from './hooks';

const Message = ({ innerHTML, meta }) => {
    const { onClick, onReady, amount, clientId, payerId, merchantId, placement } = useXProps();
    const logger = useLogger(meta);

    const handleClick = () => {
        logger.track({ et: 'CLICK', event_type: 'MORS' });
        logger.track({ et: 'CLICK', event_type: 'click', link: 'Banner Wrapper' });

        if (typeof onClick === 'function') {
            onClick();
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
            style={{ display: 'block' }}
            innerHTML={innerHTML}
        />
    );
};

export default Message;
