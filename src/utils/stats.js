import { SDK_SETTINGS } from '@paypal/sdk-constants/src';

import { checkAdblock } from './adblock';
import { isHidden, isInViewport, getTopWindow } from './elements';
import { logger } from './logger';
import { getScriptAttributes, isZoidComponent } from './sdk';
import { getCurrentTime } from './miscellaneous';
import { getGlobalState } from './global';
import { awaitWindowLoad } from './events';
import { FPTI_EVENTS } from './constants';
import { getNavigationTiming, getPerformanceMeasure, PERFORMANCE_MEASURE_KEYS } from './performance';
import { getViewportIntersectionObserver } from './observers';

const formatStat = value => Math.round(value);

if (!isZoidComponent()) {
    awaitWindowLoad.then(() => {
        const payload = {
            eventType: FPTI_EVENTS.PAGE_LOADED,
            scriptLoadDelay: formatStat(getPerformanceMeasure(PERFORMANCE_MEASURE_KEYS.SCRIPT_LOAD_DELAY)),
            domLoadDelay: formatStat(getNavigationTiming(PERFORMANCE_MEASURE_KEYS.DOM_CONTENT_LOADED_EVENT_START)),
            pageLoadDelay: formatStat(getNavigationTiming(PERFORMANCE_MEASURE_KEYS.LOAD_EVENT_START))
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
export function buildStatsPayload({ container, index, requestDuration, renderDuration }) {
    // Get outer most container's page location coordinates
    const containerRect = container.getBoundingClientRect();
    const topWindow = getTopWindow();

    const sdkMetaAttributes = getScriptAttributes();

    return checkAdblock().then(detected => {
        return {
            index,
            adblock: detected.toString(),
            blocked: isHidden(container).toString(),
            // Beaver logger filters payload props based on Boolean conversion value
            // so everything must be converted to a string to prevent unintended filtering
            posX: Math.round(containerRect.left).toString(),
            posY: Math.round(containerRect.top).toString(),
            browserWidth: String(topWindow?.innerWidth),
            browserHeight: String(topWindow?.innerHeight),
            visible: isInViewport(container).toString(),
            requestDuration: formatStat(requestDuration),
            renderDuration: formatStat(renderDuration)
        };
    });
}

export function runStats({ container, index, requestDuration }) {
    const { messagesMap } = getGlobalState();
    const { state } = messagesMap.get(container);

    const renderDuration = Math.round(getCurrentTime() - state.renderStart).toString();

    const firstRenderDelay = getPerformanceMeasure(PERFORMANCE_MEASURE_KEYS.FIRST_RENDER_DELAY);

    // No need for scroll event if banner is above the fold
    if (!isInViewport(container)) {
        getViewportIntersectionObserver().then(observer => observer.observe(container));
    }

    buildStatsPayload({ container, index, requestDuration, renderDuration }).then(statsPayload => {
        addLoggerMetaMutator(index, { ...statsPayload, type: 'message' });

        // Attributes temporarily required to exist as part of the stats event
        // {statsPayload} - (({statsPayload} ∩ {meta}) ∪ {attributes exclusive to other tracking events})
        logger.track({
            index,
            eventType: FPTI_EVENTS.MESSAGE_RENDERED,
            renderDelay: Math.round(firstRenderDelay).toString()
        });
    });
}
