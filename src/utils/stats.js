import { SDK_SETTINGS } from '@paypal/sdk-constants/src';

import { checkAdblock } from './adblock';
import { isHidden, isInViewport, getTopWindow } from './elements';
import { logger } from './logger';
import { getScriptAttributes, isZoidComponent } from './sdk';
import { getCurrentTime } from './miscellaneous';
import { getGlobalState } from './global';
import { awaitWindowLoad } from './events';
import { getNavigationTiming, getPerformanceMeasure, PERFORMANCE_MEASURE_KEYS } from './performance';
import { getViewportIntersectionObserver } from './observers';

const formatStat = value => Math.round(value).toString();

if (!isZoidComponent()) {
    awaitWindowLoad.then(() => {
        const payload = {
            et: 'CLIENT_IMPRESSION',
            event_type: 'page_loaded',
            script_load_delay: formatStat(getPerformanceMeasure(PERFORMANCE_MEASURE_KEYS.SCRIPT_LOAD_DELAY)),
            dom_load_delay: formatStat(getNavigationTiming(PERFORMANCE_MEASURE_KEYS.DOM_CONTENT_LOADED_EVENT_START)),
            page_load_delay: formatStat(getNavigationTiming(PERFORMANCE_MEASURE_KEYS.LOAD_EVENT_START))
        };

        logger.track(payload);
    });
}

export function addLoggerMetaMutator(index, metaMutation) {
    logger.addMetaBuilder(existingMeta => {
        // Remove potential existing meta info
        // Necessary because beaver-logger will not override an existing meta key if these values change
        const newMetaForIndex = { ...existingMeta[index], ...metaMutation };

        // eslint-disable-next-line no-param-reassign
        delete existingMeta[index];

        return { [index]: newMetaForIndex };
    });
}

// Function semantically similar to runStats, but returns payload to be incorporated
// into the meta attributes of a provided event (served, hovered, click).
// TODO: Add requestDuration here after CPNW changes made to allow param on non-stats events
export function buildStatsPayload({ container, activeTags, index, requestDuration, renderDuration }) {
    // Get outer most container's page location coordinates
    const containerRect = container.getBoundingClientRect();
    const topWindow = getTopWindow();

    const sdkMetaAttributes = getScriptAttributes();

    return checkAdblock().then(detected => {
        return {
            index,
            adblock: detected.toString(),
            blocked: isHidden(container).toString(),
            bn_code: sdkMetaAttributes[SDK_SETTINGS.PARTNER_ATTRIBUTION_ID],
            // Beaver logger filters payload props based on Boolean conversion value
            // so everything must be converted to a string to prevent unintended filtering
            pos_x: Math.round(containerRect.left).toString(),
            pos_y: Math.round(containerRect.top).toString(),
            browser_width: String(topWindow?.innerWidth),
            browser_height: String(topWindow?.innerHeight),
            visible: isInViewport(container).toString(),
            active_tags: activeTags,
            request_duration: formatStat(requestDuration),
            render_duration: renderDuration
        };
    });
}

export function runStats({ container, activeTags, index, requestDuration }) {
    const { messagesMap } = getGlobalState();
    const { state } = messagesMap.get(container);

    const renderDuration = Math.round(getCurrentTime() - state.renderStart).toString();

    const firstRenderDelay = getPerformanceMeasure(PERFORMANCE_MEASURE_KEYS.FIRST_RENDER_DELAY);

    // No need for scroll event if banner is above the fold
    if (!isInViewport(container)) {
        getViewportIntersectionObserver().then(observer => observer.observe(container));
    }

    buildStatsPayload({ container, activeTags, index, requestDuration, renderDuration }).then(statsPayload => {
        addLoggerMetaMutator(index, { type: 'message', stats: statsPayload });

        // Attributes temporarily required to exist as part of the stats event
        // {statsPayload} - (({statsPayload} ∩ {meta}) ∪ {attributes exclusive to other tracking events})
        logger.track({
            index,
            et: 'CLIENT_IMPRESSION',
            event_type: 'stats',
            first_render_delay: Math.round(firstRenderDelay).toString()
        });
    });
}
