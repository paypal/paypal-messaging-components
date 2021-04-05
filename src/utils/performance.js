import { getPerformance } from 'belter/src';

import { awaitDOMContentLoaded, awaitWindowLoad } from './events';

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
    trackPerformance('pageLoadDelay', { once: true });
});
