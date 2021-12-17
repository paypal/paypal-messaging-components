import { SDK_SETTINGS } from '@paypal/sdk-constants/src';

import { checkAdblock } from './adblock';
import { isHidden, isInViewport, getTopWindow } from './elements';
import { logger } from './logger';
import { getScriptAttributes, isZoidComponent } from './sdk';
import { getCurrentTime } from './miscellaneous';
import { getGlobalState } from './global';
import { awaitWindowLoad } from './events';
import { getNavigationTiming, getPerformanceMeasure, getRequestMeasure, PERFORMANCE_MEASURE_KEYS } from './performance';
import { getViewportIntersectionObserver } from './observers';

if (!isZoidComponent()) {
    awaitWindowLoad.then(() => {
        const payload = {
            et: 'CLIENT_IMPRESSION',
            event_type: 'page_loaded',
            script_load_delay: getPerformanceMeasure(PERFORMANCE_MEASURE_KEYS.SCRIPT_LOAD_DELAY),
            dom_load_delay: getNavigationTiming(PERFORMANCE_MEASURE_KEYS.DOM_CONTENT_LOADED_EVENT_START),
            page_load_delay: getNavigationTiming(PERFORMANCE_MEASURE_KEYS.LOAD_EVENT_START)
        };

        logger.track(payload);
    });
}

const formatStat = value => Math.round(value).toString();

export function runStats({ container, activeTags, index, messageRequestId }) {
    const { messagesMap } = getGlobalState();
    const { state } = messagesMap.get(container);

    // Get outer most container's page location coordinates
    const containerRect = container.getBoundingClientRect();
    const topWindow = getTopWindow();

    const sdkMetaAttributes = getScriptAttributes();

    const firstRenderDelay = getPerformanceMeasure(PERFORMANCE_MEASURE_KEYS.FIRST_RENDER_DELAY);

    // Create initial payload
    const payload = {
        index,
        et: 'CLIENT_IMPRESSION',
        event_type: 'stats',
        bn_code: sdkMetaAttributes[SDK_SETTINGS.PARTNER_ATTRIBUTION_ID],
        // Beaver logger filters payload props based on Boolean conversion value
        // so everything must be converted to a string to prevent unintended filtering
        pos_x: formatStat(containerRect.left),
        pos_y: formatStat(containerRect.top),
        browser_width: (topWindow?.innerWidth).toString(),
        browser_height: (topWindow?.innerHeight).toString(),
        visible: isInViewport(container).toString(),
        // Visible message sections
        active_tags: activeTags,
        // Performance measurements
        first_render_delay: formatStat(firstRenderDelay),
        request_duration: formatStat(getRequestMeasure('messageRequest', messageRequestId)),
        render_duration: formatStat(getCurrentTime() - state.renderStart)
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
