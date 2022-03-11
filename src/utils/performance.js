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

    // (PerformanceTiming.domContentLoadedEventStart is DEPRECATED, PerformanceNavigationTiming.domContentLoadedEventStart is not)
    // the timestamp before the DOMContentLoaded event for the parent page
    DOM_CONTENT_LOADED_EVENT_START: 'domContentLoadedEventStart',
    // (PerformanceTiming.loadEventStart is DEPRECATED, PerformanceNavigationTiming.loadEventStart is not)
    // when the load event was sent for the parent page
    LOAD_EVENT_START: 'loadEventStart'
};

export function getRequestDuration() {
    // determine how long it took the iframe to load the banner message content
    if (typeof performance?.getEntries !== 'function') {
        return -1;
    }

    const validateMetric = metric => typeof metric === 'number' && metric > 0;

    const requests = performance
        .getEntries()
        .filter(
            ({ name, entryType }) =>
                (entryType === 'navigation' && `${name}`.indexOf('/credit-presentment/smart/message') > -1) ||
                (entryType === 'resource' && `${name}`.indexOf('/credit-presentment/renderMessage') > -1)
        );

    const [{ requestStart, responseStart }] = [...requests.slice(-1), {}];

    // This measures the "Waiting (Time To First Byte)" for the request;
    // how long we've spent waiting for a response after sending the request
    return validateMetric(requestStart) && validateMetric(responseStart) ? responseStart - requestStart : -1;
    // NOTE: PerformanceNavigationTiming.requestStart and PerformanceNavigationTiming.responseStart are DEPRECATED
    // A suitable alternative that measures the value found in the Network tab of Dev Tools could not be found.
    // https://w3c.github.io/navigation-timing/timestamp-diagram.svg
}

export function getPerformanceMeasure(name) {
    return performance?.getEntriesByName(namespaced(name))[0]?.duration ?? -1;
}

export function getNavigationTiming(name) {
    const entry = performance?.getEntriesByType('navigation')[0];

    return entry?.[name] ?? -1;
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
