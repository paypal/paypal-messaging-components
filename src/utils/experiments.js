import { getTreatmentsComponent } from '../library/zoid/treatments';
import { memoize } from './functional';
import { globalEvent } from './global';
import { getNamespace, getStorage, updateStorage } from './sdk';

// 1 day in milliseconds
const TREATMENTS_MAX_AGE = 1000 * 60 * 60 * 24;

export const fetchTreatments = memoize(() => {
    const treatmentsComponent = getTreatmentsComponent()({
        namespace: getNamespace(),
        onReady: ({ treatmentsHash, deviceID }) => {
            updateStorage({
                experiments: {
                    treatmentsHash,
                    // Experiments can only be maintained for 24 hours
                    expiration: Date.now() + TREATMENTS_MAX_AGE
                },
                id: deviceID
            });

            globalEvent.trigger('treatments');

            treatmentsComponent.close();
        }
    });

    treatmentsComponent.render(document.body);
});

export function getLocalTreatments() {
    const experiments = getStorage().getState(state => state.experiments);

    if (!experiments) {
        return null;
    }

    if (experiments.expiration < Date.now()) {
        // use existing value, but update treatments in the background
        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', fetchTreatments);
        } else {
            fetchTreatments();
        }
    }

    return experiments.treatmentsHash;
}

export function ensureTreatments() {
    if (getLocalTreatments()) {
        globalEvent.trigger('treatments');
        return;
    }

    fetchTreatments();
}
