// these constants are defined in PostMessenger
const POSTMESSENGER_EVENT_TYPES = {
    ACK: 'ack',
    MESSAGE: 'message'
};
const POSTMESSENGER_ACK_PAYLOAD = {
    ok: 'true'
};

function createUUID() {
    // crypto.randomUUID() is only available in HTTPS secure environments and modern browsers
    if (typeof crypto !== 'undefined' && crypto && crypto.randomUUID instanceof Function) {
        return crypto.randomUUID();
    }

    const validChars = '0123456789abcdefghijklmnopqrstuvwxyz';
    const stringLength = 32;
    let randomId = '';
    for (let index = 0; index < stringLength; index++) {
        const randomIndex = Math.floor(Math.random() * validChars.length);
        randomId += validChars.charAt(randomIndex);
    }
    return randomId;
}

export function sendEvent(payload, trustedOrigin) {
    // target window selection depends on if checkout window is in popup or modal iframe
    let targetWindow;
    const isPopup = window.parent === window;
    const isTest = process.env.NODE_ENV === 'test';
    // jest postMessage mock is on window.parent
    if (isPopup && !isTest) {
        targetWindow = window.opener;
    } else {
        targetWindow = window.parent;
    }

    targetWindow.postMessage(payload, trustedOrigin);
}

export class PostMessengerMessage {
    constructor(type, eventName, eventPayload) {
        this.eventName = eventName;
        this.id = createUUID();

        if (type === 'ack') {
            this.type = POSTMESSENGER_EVENT_TYPES.ACK;
            this.eventPayload = POSTMESSENGER_ACK_PAYLOAD;
        } else if (type === 'message') {
            this.type = POSTMESSENGER_EVENT_TYPES.MESSAGE;
            this.eventPayload = eventPayload;
        }
    }
}
