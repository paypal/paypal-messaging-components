import { checkAdblock, isHidden, isInViewport } from '../../../utils';

const scrollHandlers = new Map();
const handleScroll = event => scrollHandlers.forEach(handler => handler(event));
const onScroll = (elem, handler) => {
    if (scrollHandlers.size === 0) {
        window.addEventListener('scroll', handleScroll);
    }
    scrollHandlers.set(elem, handler);

    return () => {
        scrollHandlers.delete(elem);
        if (scrollHandlers.size === 0) {
            window.removeEventListener('scroll', handleScroll);
        }
    };
};

export default ({ container, amount, account, logger }) => {
    // Get outer most container's page location coordinates
    const containerRect = container.getBoundingClientRect();

    // Create initial payload
    const payload = {
        et: 'CLIENT_IMPRESSION',
        event_type: 'stats',
        integration_type: __MESSAGES__.__TARGET__,
        messaging_version: __MESSAGES__.__VERSION__,
        // placement, TODO: This should now be handled on the server?
        pos_x: Math.round(containerRect.left),
        pos_y: Math.round(containerRect.top),
        browser_width: window.innerWidth,
        browser_height: window.innerHeight,
        visible: isInViewport(container),
        amount
    };

    if (account.subject) {
        payload.partner_client_id = account.id;
    } else if (account.type === 'client_id:') {
        payload.client_id = account.id;
    }

    // No need for scroll event if banner is above the fold
    if (!payload.visible) {
        const clearScroll = onScroll(container, () => {
            if (isInViewport(container)) {
                clearScroll();
                logger.track({
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'scroll',
                    visible: true
                });
            }
        });
    }

    checkAdblock().then(detected => {
        payload.adblock = detected;
        payload.blocked = isHidden(container);
        logger.track(payload); // TODO: , container.getAttribute('data-pp-message-hidden') === 'true');
    });
};
