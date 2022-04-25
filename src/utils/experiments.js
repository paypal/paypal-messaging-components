import { memoize } from './functional';
import { getGlobalUrl, globalEvent } from './global';
import { getNamespace, getPayPalDomain, getStorage, updateStorage } from './sdk';

// 1 day in milliseconds
const TREATMENTS_MAX_AGE = 1000 * 60 * 60 * 24;

export const fetchTreatments = memoize(() => {
    const treatmentsIframe = document.createElement('iframe');
    treatmentsIframe.src = getGlobalUrl('TREATMENTS');
    treatmentsIframe.style =
        'position: absolute!important; width: 1px!important; height: 1px!important; left: -99999px!important; top: -99999px!important';
    document.body.appendChild(treatmentsIframe);
    treatmentsIframe.contentWindow.__paypal_namespace__ = getNamespace();

    const receiveTreatments = event => {
        if (event.origin === getPayPalDomain() && event.data.treatmentsHash) {
            updateStorage({
                experiments: {
                    treatmentsHash: event.data.treatmentsHash,
                    // Experiments can only be maintained for 24 hours
                    expiration: Date.now() + TREATMENTS_MAX_AGE
                },
                id: event.data.deviceID
            });
            window.removeEventListener('message', receiveTreatments);
            globalEvent.trigger('treatments');
            document.body.removeChild(treatmentsIframe);
        }
    };

    window.addEventListener('message', receiveTreatments);
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
