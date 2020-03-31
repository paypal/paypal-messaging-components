/** @jsx h */
import { h } from 'preact';
import { useEffect, useCallback } from 'preact/hooks';
import { once } from 'belter/src';

import { useModal } from './hooks';

const Message = ({ logger, country, offerType, requestId, innerHTML }) => {
    const { open } = useModal({ logger, country, offerType, requestId });
    const { onReady } = window.xprops;

    const handleClick = () => {
        logger.track({ et: 'CLICK', event_type: 'MORS' });
        logger.track({ et: 'CLICK', event_type: 'click', link: 'Banner Wrapper' });

        open();
    };

    const handleHover = useCallback(
        once(() => logger.track({ et: 'CLIENT_IMPRESSION', event_type: 'hover' })),
        []
    );

    useEffect(() => {
        logger.track({ et: 'CLIENT_IMPRESSION', event_type: 'MORS' });

        if (typeof onReady === 'function') {
            onReady(logger);
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
