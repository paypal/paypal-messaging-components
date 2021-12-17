import { getPerformance, isIE } from 'belter/src';

const namespaced = name => `__paypal_messaging_performance__${name}`;

export const performance = getPerformance();

export const PERFORMANCE_MEASURE_KEYS = {
    // the duration of time between beginning the first message render,
    // to when zoid fires its Ready event
    FIRST_RENDER_DELAY: 'firstRenderDelay',
    // the duration of time between beginning the first modal render,
    // to when zoid fires its Ready event
    FIRST_MODAL_RENDER_DELAY: 'firstModalRenderDelay',

    // the duration of time between beginning setup of messages & modals on
    // the parent page, to when zoid fires its Ready event
    SCRIPT_LOAD_DELAY: 'scriptLoadDelay',

    // (PerformanceTiming.domContentLoadedEventStart is DEPRECATED)
    // the timestamp before the DOMContentLoaded event for the parent page
    DOM_CONTENT_LOADED_EVENT_START: 'domContentLoadedEventStart',
    // (PerformanceTiming.loadEventStart is DEPRECATED)
    // when the load event was sent for the parent page
    LOAD_EVENT_START: 'loadEventStart',

    // the time it took to load specific resources
    REQUEST_DURATION: {
        name: 'requestDuration',
        requests: {
            '/credit-presentment/smart/message': 'messageRequest'
        }
    }
};

// Use the PerformanceObserver().observe() to capture network request statistics for each message.
// This runs globally, so we need messageRequestId to associate each request to each message
(function setupRequestMeasures() {
    const namespace = namespaced(PERFORMANCE_MEASURE_KEYS.REQUEST_DURATION.name);
    if (!window[namespace]) {
        window[namespace] = {};
        new PerformanceObserver(list => {
            list.getEntries().forEach(item => {
                const { name, duration } = item.toJSON();
                const [metricName] = Object.entries(PERFORMANCE_MEASURE_KEYS.REQUEST_DURATION.requests)
                    .filter(([key]) => name.indexOf(key) > -1)
                    .map(([, value]) => value);

                if (typeof metricName !== 'undefined') {
                    const searchParams = Object.fromEntries(new URL(name)?.searchParams.entries());
                    const { message_request_id: messageRequestId } = searchParams;

                    if (messageRequestId) {
                        window[namespace][metricName] = {
                            ...(window[namespace][metricName] ?? {}),
                            [messageRequestId]: duration
                        };
                    }
                }
            });
        }).observe({ type: 'resource', buffered: true });
    }
})();

export function getRequestMeasure(requestName, messageRequestId) {
    const namespace = namespaced(PERFORMANCE_MEASURE_KEYS.REQUEST_DURATION.name);
    return window?.[namespace]?.[requestName]?.[messageRequestId] ?? -1;
}

export function getPerformanceMeasure(name) {
    return performance?.getEntriesByName(namespaced(name))[0]?.duration ?? -1;
}

export function getNavigationTiming(name) {
    const entry = performance?.getEntriesByType('navigation')[0];

    return Math.round(entry?.[name] ?? -1).toString();
}

export function clearPerformance() {
    if (performance) {
        Object.values(PERFORMANCE_MEASURE_KEYS).forEach(name => {
            performance.clearMarks(namespaced(name));
            performance.clearMeasures(namespaced(name));
        });
    }
}

export function addPerformanceMeasure(name, { startMark, endMark, repeat } = {}) {
    if (performance) {
        const existing = getPerformanceMeasure(name);

        // Do not track additional values for existing marks
        if (existing !== -1) {
            if (!repeat) {
                return;
            }

            performance.clearMeasures(namespaced(name));
            performance.clearMarks(namespaced(name));
        }

        /* eslint-disable no-unused-expressions, flowtype/no-unused-expressions */
        isIE()
            ? performance.measure(namespaced(name))
            : performance.measure(
                  namespaced(name),
                  startMark ? namespaced(startMark) : undefined,
                  endMark ? namespaced(endMark) : undefined
              );
        /* eslint-enable no-unused-expressions, flowtype/no-unused-expressions */
        performance.mark(namespaced(name));
    }
}
