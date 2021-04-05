import { SDK_SETTINGS } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { checkAdblock } from './adblock';
import { isHidden, isInViewport, getTopWindow } from './elements';
import { logger } from './logger';
import { getScriptAttributes } from './sdk';
import { getCurrentTime, getEventListenerPassiveOptionIfSupported } from './miscellaneous';
import { getGlobalState } from './global';
import { awaitFirstRender, awaitWindowLoad } from './events';
import { getPerformanceMeasure } from './performance';

const scrollHandlers = new Map();
const handleScroll = event => scrollHandlers.forEach(handler => handler(event));
const onScroll = (elem, handler) => {
    const passiveOption = getEventListenerPassiveOptionIfSupported();

    if (scrollHandlers.size === 0) {
        window.addEventListener('scroll', handleScroll, passiveOption);
    }
    scrollHandlers.set(elem, handler);

    return () => {
        scrollHandlers.delete(elem);
        if (scrollHandlers.size === 0) {
            window.removeEventListener('scroll', handleScroll, passiveOption);
        }
    };
};

ZalgoPromise.all([awaitWindowLoad, awaitFirstRender]).then(() => {
    const firstRenderDelay = getPerformanceMeasure('firstRenderDelay');
    const scriptLoadDelay = getPerformanceMeasure('scriptLoadDelay');
    const domLoadDelay = getPerformanceMeasure('domLoadDelay');
    const pageLoadDelay = getPerformanceMeasure('pageLoadDelay');

    const payload = {
        et: 'CLIENT_IMPRESSION',
        event_type: 'page_loaded',
        firstRenderDelay: Math.round(firstRenderDelay).toString(),
        scriptLoadDelay: Math.round(scriptLoadDelay).toString(),
        domLoadDelay: Math.round(domLoadDelay).toString(),
        pageLoadDelay: Math.round(pageLoadDelay).toString()
    };

    logger.track(payload);
});

export function runStats({ container, activeTags, index }) {
    const { messagesMap } = getGlobalState();
    const { state } = messagesMap.get(container);

    // Get outer most container's page location coordinates
    const containerRect = container.getBoundingClientRect();
    const topWindow = getTopWindow();

    const sdkMetaAttributes = getScriptAttributes();

    // Create initial payload
    const payload = {
        index,
        et: 'CLIENT_IMPRESSION',
        event_type: 'stats',
        bn_code: sdkMetaAttributes[SDK_SETTINGS.PARTNER_ATTRIBUTION_ID],
        // Beaver logger filters payload props based on Boolean conversion value
        // so everything must be converted to a string to prevent unintended filtering
        pos_x: Math.round(containerRect.left).toString(),
        pos_y: Math.round(containerRect.top).toString(),
        browser_width: (topWindow?.innerWidth).toString(),
        browser_height: (topWindow?.innerHeight).toString(),
        visible: isInViewport(container).toString(),
        // Visible message sections
        active_tags: activeTags,
        // Performance measurements
        render_duration: Math.round(getCurrentTime() - state.renderStart).toString()
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
