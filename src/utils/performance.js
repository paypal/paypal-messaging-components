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
    LOAD_EVENT_START: 'loadEventStart'
};

export function getRequestDuration() {
    if (typeof window?.performance?.getEntries !== 'function') {
        return -1;
    }
    // eslint-disable-next-line compat/compat
    const requests = window.performance
        .getEntries()
        .filter(
            ({ name, entryType }) =>
                (entryType === 'navigation' && `${name}`.indexOf('/credit-presentment/smart/message') > -1) ||
                (entryType === 'resource' && `${name}`.indexOf('/credit-presentment/renderMessage') > -1)
        );

    const [{ connectStart, responseStart }] = requests.slice(-1);

    if (typeof connectStart !== 'undefined') {
        // This measures the "Waiting (Time To First Byte)" for the request;
        // how long we've spent waiting for a response after sending the request
        return responseStart - connectStart;
    }
    return -1;
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
