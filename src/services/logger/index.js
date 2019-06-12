import objectValues from 'core-js-pure/stable/object/values';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import { ZalgoPromise } from 'zalgo-promise';

import sendBeacon from './sendBeacon';

const FLUSH_INTERVAL = 3000;
export const EVENTS = {
    STARTING_MESSAGE_RENDER: 'Starting_Message_Render',
    IFRAME_CREATED: 'iFrame_Created',
    MESSAGE_FETCH_INITIATED: 'Message_Fetch_Initiated',
    MESSAGE_FETCH_RECEIVED: 'Message_Fetch_Received',
    MESSAGE_CREATE_INITIATED: 'Message_Create_Initiated',
    MESSAGE_UPDATE_INITIATED: 'Message_Update_Initiated',
    MESSAGE_RENDERED: 'Message_Rendered',
    ERROR: 'ERROR',
    FLUSH: 'FLUSH',
    FLUSH_CAP: 'FLUSH_CAP'
};

export const ERRORS = {
    OVERFLOW: 'Banner Overflow detected.',
    HIDDEN: 'Overflow fallback failed.  Hiding banner.',
    INVALID_STYLE_OPTIONS: 'Invalid account, styles, signature combination.',
    INVALID_LEGACY_BANNER: 'Invalid legacy banner placement/offerType combination',
    MODAL_LOAD_FAILURE: 'Modal failed to initialize.'
};

const logs = [];
const pendingEvents = [];

function prepareLogs(payload) {
    const possibleEvents = objectValues(EVENTS);

    return payload.reduce((accumulator, log) => {
        if (arrayIncludes(possibleEvents, log.event)) {
            accumulator[log.event] = accumulator[log.event] || [];
            const organizedLog = { ...log };
            delete organizedLog.event;
            accumulator[log.event].push(organizedLog);
        }

        return accumulator;
    }, {});
}

let flushCount = 0;
const FLUSH_MAX = 3;

export const logger = {
    flush(immediate = false) {
        if (flushCount >= FLUSH_MAX) return ZalgoPromise.resolve();

        return (immediate
            ? ZalgoPromise.resolve()
            : ZalgoPromise.all(pendingEvents).then(() => {
                  pendingEvents.length = 0;
              })
        ).then(() => {
            if (logs.length === 0) return;

            logs.push({
                event: EVENTS.FLUSH,
                flushType: immediate ? 'immediate' : 'normal'
            });

            flushCount += 1;

            if (flushCount === FLUSH_MAX) {
                logs.push({
                    event: EVENTS.FLUSH_CAP,
                    cap: FLUSH_MAX
                });
            }

            const payload = {
                version: __MODULE_VERSION__,
                events: prepareLogs(logs)
            };
            logs.length = 0;

            // TODO: Handle error
            const xhttp = new XMLHttpRequest();
            xhttp.open('POST', __LOGGING_URL__, true);
            xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhttp.send(JSON.stringify({ data: payload }));
        });
    },
    info(event, data = {}) {
        logs.push({ event, ...data });
    },
    error(data) {
        logger.info(EVENTS.ERROR, data);
        logger.flush(true);
    },
    waitFor(prom) {
        pendingEvents.push(prom);
    },
    track: sendBeacon,
    warn(...messages) {
        console.warn('[Messaging.js]', ...messages);
    }
};

let flushing = false;
setInterval(() => {
    if (flushing) return;

    flushing = true;
    logger.flush().then(() => {
        flushing = false;
    });
}, FLUSH_INTERVAL);
