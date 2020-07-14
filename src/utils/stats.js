import { checkAdblock } from './adblock';
import { isHidden, isInViewport } from './elements';
import { getLogger } from './logger';

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

export function runStats({ container, refId }) {
    // Get outer most container's page location coordinates
    const containerRect = container.getBoundingClientRect();
    const logger = getLogger();

    // Create initial payload
    const payload = {
        message_request_id: refId,
        et: 'CLIENT_IMPRESSION',
        event_type: 'stats',
        integration_type: __MESSAGES__.__TARGET__,
        messaging_version: __MESSAGES__.__VERSION__,
        pos_x: Math.round(containerRect.left),
        pos_y: Math.round(containerRect.top),
        browser_width: window.innerWidth,
        browser_height: window.innerHeight,
        visible: isInViewport(container)
    };

    // No need for scroll event if banner is above the fold
    if (!payload.visible) {
        const clearScroll = onScroll(container, () => {
            if (isInViewport(container)) {
                clearScroll();
                logger.track({
                    message_request_id: refId,
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
}
