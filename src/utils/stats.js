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

// Function semantically similar to runStats, but returns payload to be incorporated
// into the meta attributes of a provided event (served, hovered, click).
export function buildStatsPayload({ container, activeTags, index }) {
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
            browser_width: (topWindow?.innerWidth).toString(),
            browser_height: (topWindow?.innerHeight).toString(),
            visible: isInViewport(container).toString(),
            active_tags: activeTags
        };
    });
}

export function runStats({ container, activeTags, index }) {
    const { messagesMap } = getGlobalState();
    const { state } = messagesMap.get(container);

    const firstRenderDelay = getPerformanceMeasure('firstRenderDelay');
    const renderDuration = Math.round(getCurrentTime() - state.renderStart).toString();

    // No need for scroll event if banner is above the fold
    if (!isInViewport(container)) {
        getViewportIntersectionObserver().then(observer => observer.observe(container));
    }

    buildStatsPayload({ container, activeTags, index }).then(statsPayload => {
        // eslint-disable-next-line no-param-reassign
        statsPayload.first_render_delay = Math.round(firstRenderDelay).toString();

        // eslint-disable-next-line no-param-reassign
        statsPayload.render_duration = renderDuration;

        logger.addMetaBuilder(existingMeta => {
            const { account, messageRequestId, trackingDetails } = existingMeta[index];

            // eslint-disable-next-line no-param-reassign
            delete existingMeta[index];

            return {
                existingMeta,
                [index]: {
                    type: 'message',
                    account,
                    messageRequestId,
                    trackingDetails,
                    ...statsPayload
                }
            };
        });

        logger.track({
            et: 'CLIENT_IMPRESSION',
            event_type: 'stats',
            ...statsPayload
        });
    });
}
