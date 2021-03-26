import { SDK_SETTINGS } from '@paypal/sdk-constants/src';
import { getPerformance } from 'belter/src';

import { checkAdblock } from './adblock';
import { isHidden, isInViewport, getTopWindow } from './elements';
import { logger } from './logger';
import { getLibraryVersion, getScriptAttributes } from './sdk';
import { getCurrentTime, getEventListenerPassiveOptionIfSupported } from './miscellaneous';
import { globalState } from './global';
import { awaitDOMContentLoaded, awaitWindowLoad } from './events';

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

const namespaced = name => `__paypal_messaging_performance__${name}`;

const performance = getPerformance();

export function getPerformanceMeasure(name) {
    return performance?.getEntriesByName(namespaced(name))[0]?.duration ?? -1;
}

export function clearPerformance() {
    if (performance) {
        ['scriptLoadDelay', 'domLoadDelay', 'loadDelay', 'firstRenderDelay'].forEach(name => {
            performance.clearMarks(namespaced(name));
            performance.clearMeasures(namespaced(name));
        });
    }
}

export function trackPerformance(name, { startMark, endMark, once } = {}) {
    if (performance) {
        const existing = getPerformanceMeasure(name);

        // Do not track additional values for existing marks
        if (existing !== -1) {
            if (once) {
                return;
            }

            performance.clearMeasures(namespaced(name));
            performance.clearMarks(namespaced(name));
        }

        performance.measure(
            namespaced(name),
            startMark ? namespaced(startMark) : undefined,
            endMark ? namespaced(endMark) : undefined
        );

        performance.mark(namespaced(name));
    }
}

awaitDOMContentLoaded.then(() => {
    trackPerformance('domLoadDelay', { once: true });
});

awaitWindowLoad.then(() => {
    trackPerformance('loadDelay', { once: true });
});

export function runStats({ container, activeTags, index }) {
    const { messagesMap } = globalState;
    const { state } = messagesMap.get(container);

    // Get outer most container's page location coordinates
    const containerRect = container.getBoundingClientRect();
    const topWindow = getTopWindow();

    const sdkMetaAttributes = getScriptAttributes();

    const firstRenderDelay = getPerformanceMeasure('firstRenderDelay');
    const scriptLoadDelay = getPerformanceMeasure('scriptLoadDelay');
    const domLoadDelay = getPerformanceMeasure('domLoadDelay');
    const loadDelay = getPerformanceMeasure('loadDelay');

    // Create initial payload
    const payload = {
        index,
        et: 'CLIENT_IMPRESSION',
        event_type: 'stats',
        integration_type: __MESSAGES__.__TARGET__,
        messaging_version: getLibraryVersion(),
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
        render_duration: Math.round(getCurrentTime() - state.renderStart).toString(),
        first_render_delay: Math.round(firstRenderDelay).toString(),
        script_load_delay: Math.round(scriptLoadDelay).toString(),
        dom_load_delay: Math.round(domLoadDelay).toString(),
        // first stats event will happen before the load event
        // subsequent stats events will include this value
        page_load_delay: Math.round(loadDelay).toString()
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
