import { uniqueID } from '@krakenjs/belter/src';

// these constants are defined in PostMessenger
const POSTMESSENGER_EVENT_TYPES = {
    ACK: 'ack',
    MESSAGE: 'message'
};
const POSTMESSENGER_ACK_PAYLOAD = {
    ok: 'true'
};
// these constants should maintain parity with MESSAGE_MODAL_EVENT_NAMES in core-web-sdk
export const POSTMESSENGER_EVENT_NAMES = {
    CALCULATE: 'paypal-messages-modal-calculate',
    CLOSE: 'paypal-messages-modal-close',
    SHOW: 'paypal-messages-modal-show'
};

export function sendEvent(payload, trustedOrigin) {
    if (!trustedOrigin) {
        return;
    }

    const isTest = process.env.NODE_ENV === 'test';
    const targetWindow = !isTest && window.parent === window ? window.opener : window.parent;

    targetWindow.postMessage(payload, trustedOrigin);
}

// This function provides data security by preventing accidentally exposing sensitive data; we are adding
// an extra layer of validation here by only allowing explicitly approved fields to be included
function createSafePayload(unscreenedPayload) {
    const allowedFields = [
        'linkName' // close event
    ];

    const safePayload = {};
    if (unscreenedPayload) {
        const entries = Object.entries(unscreenedPayload);
        entries.forEach(entry => {
            const [key, value] = entry;
            if (allowedFields.includes(key)) {
                safePayload[key] = value;
            } else {
                console.warn(`modal hook payload param should be allowlisted if secure: ${key}`);
            }
        });
    }

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
        // createSafePayload, only call this if a payload is sent
        eventPayload = createSafePayload(eventPayloadArg);
    }

    return {
        eventName,
        id: uniqueID(),
        type,
        eventPayload: eventPayload || {}
    };
}
