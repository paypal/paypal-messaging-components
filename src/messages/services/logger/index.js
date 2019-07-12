import stringPadStart from 'core-js-pure/stable/string/pad-start';

import { createState } from '../../../utils';
import sendBeacon from './sendBeacon';

export const EVENTS = {
    START: 'Start',
    END: 'End',
    RENDER_START: 'Render_Start',
    RENDER_END: 'Render_End',
    CREATE: 'Create',
    CONTAINER: 'Container',
    VALIDATE: 'Validate',
    FETCH_START: 'Fetch_Start',
    FETCH_END: 'Fetch_End',
    INSERT: 'Insert',
    MODAL: 'Modal',
    SIZE: 'Size',
    STATS: 'Stats',
    UPDATE: 'Update',
    ERROR: 'ERROR'
};

export const ERRORS = {
    OVERFLOW: 'Banner Overflow detected.',
    HIDDEN: 'Overflow fallback failed.  Hiding banner.',
    INVALID_STYLE_OPTIONS: 'Invalid account, styles, signature combination.',
    INVALID_LEGACY_BANNER: 'Invalid legacy banner placement/offerType combination',
    MODAL_LOAD_FAILURE: 'Modal failed to initialize.',
    INVALID_CUSTOM_BANNER_JSON: 'Invalid JSON in custom banner creative'
};

function formatLogs(logs) {
    return logs.map(log => {
        const name = log.event;
        const newLog = { ...log };
        delete newLog.event;
        return Object.keys(newLog).length > 0 ? [name, newLog] : name;
    });
}

const FLUSH_MAX = 3;

export const Logger = {
    create(id, selector, type) {
        const [state, setState] = createState({ count: 1, history: [], logs: [] });

        function flush() {
            if (state.count > FLUSH_MAX) return;

            const subType = state.logs.find(({ event }) => event === 'Create' || event === 'Update');

            const payload = {
                version: __MESSAGES__.__VERSION__,
                url: window.location.href,
                selector,
                type: `${type}${subType ? `-${subType.event}` : ''}`,
                id: `${id}-${stringPadStart(state.count, 4, '0')}`,
                history: state.history,
                events: formatLogs(state.logs)
            };

            setState({ count: state.count + 1, logs: [] });

            // TODO: Handle error
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4) {
                    setState({ history: [...state.history, xhttp.getResponseHeader('Paypal-Debug-Id')].slice(-5) });
                }
            };
            xhttp.open('POST', __MESSAGES__.__LOGGING_URL__, true);
            xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhttp.send(JSON.stringify({ data: payload }));
        }

        const logger = {
            start(data) {
                logger.info(EVENTS.START, { t: Date.now(), ...data });
            },
            end(data) {
                logger.info(EVENTS.END, { t: Date.now(), ...data });
                flush();
            },
            info(event, data = {}) {
                setState({ logs: [...state.logs, { event, ...data }] });
            },
            error(data) {
                logger.info(EVENTS.ERROR, data);
            },
            track: sendBeacon,
            warn(...messages) {
                console.warn('[Messaging.js]', ...messages);
            }
        };

        return logger;
    },
    warn(...messages) {
        console.warn('[PayPal Messages]', ...messages);
    }
};
