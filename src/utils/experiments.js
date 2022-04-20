import { getGlobalUrl, globalEvent } from './global';
import { getNamespace, getPayPalDomain, getStorage, updateStorage } from './sdk';

// 1 day in milliseconds
const TREATMENTS_MAX_AGE = 1000 * 60 * 60 * 24;
export function getLocalTreatments() {
    const storage = getStorage();

    if (!storage.experiments || storage.experiments.expiration < Date.now()) {
        return null;
    }

    return storage.experiments.treatmentsHash;
}

export function fetchTreatments() {
    if (getLocalTreatments()) {
        globalEvent.trigger('treatments');
        return;
    }

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
        }
    };

    window.addEventListener('message', receiveTreatments);
}
