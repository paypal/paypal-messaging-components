import stringPadStart from 'core-js-pure/stable/string/pad-start';
import arrayFind from 'core-js-pure/stable/array/find';

import { createState, objectGet } from '../../../utils';
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
    ERROR: 'Error'
};

export const ERRORS = {
    MESSAGE_OVERFLOW: 'MESSAGE_OVERFLOW',
    MESSAGE_HIDDEN: 'MESSAGE_HIDDEN',
    MESSAGE_INVALID_LEGACY: 'MESSAGE_INVALID_LEGACY',
    MESSAGE_INVALID_MARKUP: 'MESSAGE_INVALID_MARKUP',
    MODAL_FAIL: 'MODAL_FAIL',
    CUSTOM_TEMPLATE_FAIL: 'CUSTOM_TEMPLATE_FAIL',
    CUSTOM_JSON_OPTIONS_FAIL: 'CUSTOM_JSON_OPTIONS_FAIL'
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
    create({ id, account, selector, type }) {
        const [state, setState] = createState({ count: 1, account, history: [], logs: [] });

        function flush() {
            if (state.count > FLUSH_MAX) return;

            const subType = arrayFind(state.logs, ({ event }) => event === 'Create' || event === 'Update');
            const payload = {
                version: __MESSAGES__.__VERSION__,
                url: window.location.href,
                selector,
                type: `${type}${subType ? `-${subType.event}` : ''}`,
                id: `${id}-${stringPadStart(state.count, 4, '0')}`,
                account: state.account,
                history: state.history,
                events: formatLogs(state.logs)
            };

            setState({ count: state.count + 1, logs: [] });

            // TODO: Handle error
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4) {
                    // Same correlation id duplicated in prod
                    const [corrId] = (xhttp.getResponseHeader('Paypal-Debug-Id') || '').split(',');
                    setState({ history: [...state.history, corrId].slice(-5) });
                }
            };
            xhttp.open('POST', __MESSAGES__.__LOGGING_URL__, true);
            xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            // Some sites setting Array.prototype.toJSON causing non-standard JSON stringify
            // ex: https://www.interpunk.com/
            const temp = Array.prototype.toJSON;
            delete Array.prototype.toJSON;
            xhttp.send(JSON.stringify({ data: payload }));
            Array.prototype.toJSON = temp; // eslint-disable-line no-extend-native
        }

        const logger = {
            start(data) {
                if (objectGet(data, 'options.account') && state.account !== data.options.account) {
                    setState({ account: data.account });
                }
                // Dat.now() altered on some sites: https://www.hydropool.com
                logger.info(EVENTS.START, { t: new Date().getTime(), ...data });
            },
            end(data) {
                logger.info(EVENTS.END, { t: new Date().getTime(), ...data });
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
                console.warn('[PayPal Messages]', ...messages);
            }
        };

        return logger;
    },
    warn(...messages) {
        console.warn('[PayPal Messages]', ...messages);
    }
};
