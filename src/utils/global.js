import { getEnv } from './sdk';
import { createState } from './miscellaneous';

// TODO: refactor top-level use of window object to allow server-side rendering
export const [globalState, setGlobalState] = createState(window.__paypal_messages_state__ || { nextId: 1, config: {} });

Object.defineProperty(window, '__paypal_messages_state__', {
    value: globalState,
    enumerable: false,
    configurable: true,
    writable: false
});

export const nextId = () => {
    setGlobalState({ nextId: globalState.nextId + 1 });
    return globalState.nextId - 1;
};

const DOMAINS = __MESSAGES__.__DOMAIN__;
const URI = __MESSAGES__.__URI__;

/**
 * Create a URL of the requested type from Webpack global variables
 * @param {String} type URL type
 * @returns {String} URL of requested type
 */
export function getGlobalUrl(type) {
    const envField = `__${getEnv().toUpperCase()}__`;
    const typeField = `__${type.toUpperCase()}__`;
    const domain = (DOMAINS[typeField] && DOMAINS[typeField][envField]) || DOMAINS[envField];

    return `${domain}${URI[typeField]}`;
}
