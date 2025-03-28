import { uniqueID } from '@krakenjs/belter/src';

// these constants are defined in PostMessenger
const POSTMESSENGER_EVENT_TYPES = {
    ACK: 'ack',
    MESSAGE: 'message'
};
const POSTMESSENGER_ACK_PAYLOAD = {
    ok: 'true'
};

export const POSTMESSENGER_EVENT_NAMES = {
    CALCULATE: 'paypal-messages-modal-calculate',
    CLOSE: 'paypal-messages-modal-close',
    SHOW: 'paypal-messages-modal-show'
};

export function sendEvent(payload, trustedOrigin) {
    if (!trustedOrigin && !document.referrer) {
        return;
    }

    const isTest = process.env.NODE_ENV === 'test';
    const targetWindow = !isTest && window.parent === window ? window.opener : window.parent;

    // referrer origin is used by integrations not passing in props.origin manually
    // eslint-disable-next-line compat/compat
    const referrerOrigin = !isTest ? new window.URL(document.referrer)?.origin : undefined;

    targetWindow.postMessage(payload, trustedOrigin || referrerOrigin);
}

// This function provides data security by preventing accidentally exposing sensitive data; we are adding
// an extra layer of validation here by only allowing explicitly approved fields to be included
function createSafePayload(unscreenedPayload) {
    const allowedFields = [
        'linkName' // close event
    ];

    const safePayload = {};
    const entries = Object.entries(unscreenedPayload);
    entries.forEach(entry => {
        const [key, value] = entry;
        if (allowedFields.includes(key)) {
            safePayload[key] = value;
        }
    });

    return safePayload;
}

export function createPostMessengerEvent(typeArg, eventName, eventPayloadArg) {
    let type;
    let eventPayload;

    if (typeArg === 'ack') {
        type = POSTMESSENGER_EVENT_TYPES.ACK;
        eventPayload = POSTMESSENGER_ACK_PAYLOAD;
    } else if (typeArg === 'message') {
        type = POSTMESSENGER_EVENT_TYPES.MESSAGE;
        // createSafePayload
        eventPayload = createSafePayload(eventPayloadArg);
    }

    return {
        eventName,
        id: uniqueID(),
        type,
        eventPayload
    };
}
