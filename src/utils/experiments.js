import { memoize } from './functional';
import { getGlobalUrl, globalEvent } from './global';
import { getNamespace, getPayPalDomain, getStorage, updateStorage } from './sdk';

// 1 day in milliseconds
const TREATMENTS_MAX_AGE = 1000 * 60 * 60 * 24;

export const fetchTreatments = memoize(() => {
    const treatmentsIframe = document.createElement('iframe');
    treatmentsIframe.src = `${getGlobalUrl('TREATMENTS')}?namespace=${getNamespace()}`;
    treatmentsIframe.style =
        'position: absolute!important; width: 1px!important; height: 1px!important; left: -99999px!important; top: -99999px!important';
    document.body.appendChild(treatmentsIframe);

    const receiveTreatments = event => {
        if (event.origin === getPayPalDomain()) {
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
    const storage = getStorage();

    if (!storage.experiments) {
        return null;
    }

    if (storage.experiments.expiration < Date.now()) {
        // use existing value, but update treatments in the background
        fetchTreatments();
    }

    return storage.experiments.treatmentsHash;
}

export function ensureTreatments() {
    if (getLocalTreatments()) {
        globalEvent.trigger('treatments');
        return;
    }

    fetchTreatments();
}
