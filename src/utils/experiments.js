import { isLocalStorageEnabled } from '@krakenjs/belter/src';
import { getTreatmentsComponent } from '../library/zoid/treatments';
import { memoize } from './functional';
import { globalEvent } from './global';
import { getStorage, isZoidComponent } from './sdk';

export const fetchTreatments = memoize(() => {
    const treatmentsComponent = getTreatmentsComponent()();

    treatmentsComponent.render(document.body);
});

export function getLocalTreatments() {
    if (isZoidComponent() || !isLocalStorageEnabled()) {
        return null;
    }

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
    if (
        // non-sdk integrations do not support edge caching and therefore, do not need treatmentsHash
        __MESSAGES__.__TARGET__ !== 'SDK' ||
        // we already have local treatments
        getLocalTreatments() ||
        // we can't get local treatments if local storage is not supported (this should be extremely rare)
        !isLocalStorageEnabled()
    ) {
        globalEvent.trigger('treatments');
        return;
    }

    fetchTreatments();
}
