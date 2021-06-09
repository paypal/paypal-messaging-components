import { SDK_SETTINGS } from '@paypal/sdk-constants/src';

import { checkAdblock } from './adblock';
import { isHidden, isInViewport, getTopWindow } from './elements';
import { logger } from './logger';
import { getScriptAttributes, isZoidComponent } from './sdk';
import { getCurrentTime } from './miscellaneous';
import { getGlobalState } from './global';
import { awaitWindowLoad } from './events';
import { getNavigationTiming, getPerformanceMeasure } from './performance';
import { getViewportIntersectionObserver } from './observers';

if (!isZoidComponent()) {
    awaitWindowLoad.then(() => {
        const scriptLoadDelay = getPerformanceMeasure('scriptLoadDelay');

        const domLoadDelay = getNavigationTiming('domContentLoadedEventStart');
        const pageLoadDelay = getNavigationTiming('loadEventStart');

        const payload = {
            et: 'CLIENT_IMPRESSION',
            event_type: 'page_loaded',
            script_load_delay: Math.round(scriptLoadDelay).toString(),
            dom_load_delay: Math.round(domLoadDelay).toString(),
            page_load_delay: Math.round(pageLoadDelay).toString()
        };

        logger.track(payload);
    });
}

export function runStats({ container, activeTags, index }) {
    const { messagesMap } = getGlobalState();
    const { state } = messagesMap.get(container);

    // Get outer most container's page location coordinates
    const containerRect = container.getBoundingClientRect();
    const topWindow = getTopWindow();

    const sdkMetaAttributes = getScriptAttributes();

    const firstRenderDelay = getPerformanceMeasure('firstRenderDelay');

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
        first_render_delay: Math.round(firstRenderDelay).toString(),
        render_duration: Math.round(getCurrentTime() - state.renderStart).toString()
    };

    // No need for scroll event if banner is above the fold
    if (payload.visible === 'false') {
        getViewportIntersectionObserver().then(observer => observer.observe(container));
    }

    checkAdblock().then(detected => {
        payload.adblock = detected.toString();
        payload.blocked = isHidden(container).toString();
        logger.track(payload); // TODO: , container.getAttribute('data-pp-message-hidden') === 'true');
    });
}
