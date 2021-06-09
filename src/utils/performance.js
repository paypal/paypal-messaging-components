import { getPerformance } from 'belter/src';

const namespaced = name => `__paypal_messaging_performance__${name}`;

const performance = getPerformance();

export function getPerformanceMeasure(name) {
    return performance?.getEntriesByName(namespaced(name))[0]?.duration ?? -1;
}

export function getNavigationTiming(name) {
    const entry = performance?.getEntriesByType('navigation')[0];

    return entry?.[name] ?? -1;
}

export function clearPerformance() {
    if (performance) {
        ['scriptLoadDelay', 'firstRenderDelay', 'firstModalRenderDelay'].forEach(name => {
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

        performance.measure(
            namespaced(name),
            startMark ? namespaced(startMark) : undefined,
            endMark ? namespaced(endMark) : undefined
        );

        performance.mark(namespaced(name));
    }
}
