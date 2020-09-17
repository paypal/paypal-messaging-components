import { checkAdblock } from './adblock';
import { isHidden, isInViewport } from './elements';
import { logger } from './logger';

import { instrumentFallback } from './fallbackInstrumentation';

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

export function runStats({ container, index }) {
    // Get outer most container's page location coordinates
    const containerRect = container.getBoundingClientRect();

    // Create initial payload
    const payload = {
        index,
        et: 'CLIENT_IMPRESSION',
        event_type: 'stats',
        integration_type: __MESSAGES__.__TARGET__,
        messaging_version: __MESSAGES__.__VERSION__,
        // Beaver logger filters payload props based on Boolean conversion value
        // so everything must be converted to a string to prevent unintended filtering
        pos_x: Math.round(containerRect.left).toString(),
        pos_y: Math.round(containerRect.top).toString(),
        browser_width: window.innerWidth.toString(),
        browser_height: window.innerHeight.toString(),
        visible: isInViewport(container).toString(),
        // Query iframe to determine size of message sections
        banner_type: instrumentFallback(document.querySelector(`[data-pp-id="${index}"] iframe`))
    };

    // No need for scroll event if banner is above the fold
    if (payload.visible === 'false') {
        const clearScroll = onScroll(container, () => {
            if (isInViewport(container)) {
                clearScroll();
                logger.track({
                    index,
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'scroll',
                    visible: 'true'
                });
            }
        });
    }

    checkAdblock().then(detected => {
        payload.adblock = detected.toString();
        payload.blocked = isHidden(container).toString();
        logger.track(payload); // TODO: , container.getAttribute('data-pp-message-hidden') === 'true');
    });
}
