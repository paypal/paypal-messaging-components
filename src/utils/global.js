import objectKeys from 'core-js-pure/stable/object/keys';
import objectAssign from 'core-js-pure/stable/object/assign';
import Map from 'core-js-pure/stable/map';
import { eventEmitter } from 'belter/src';

import { getEnv, getLibraryVersion } from './sdk';
import { createState } from './miscellaneous';

// Following the global naming convention of zoid and prevent collision with merchant.js
const NAMESPACE = `__paypal_messages_${getLibraryVersion().replace(/[.-]/g, '_')}__`;

const createDefaultState = () => ({
    index: 1,
    config: {},
    messagesMap: new Map()
});

export const createGlobalState = () => {
    const [globalState, setGlobalState] = createState(window[NAMESPACE] || createDefaultState());

    globalState.setGlobalState = setGlobalState;

    Object.defineProperty(window, NAMESPACE, {
        value: globalState,
        enumerable: false,
        configurable: true,
        writable: false
    });

    return window[NAMESPACE];
};
export const destroyGlobalState = () => {
    if (window[NAMESPACE]) {
        objectKeys(window[NAMESPACE]).forEach(key => delete window[NAMESPACE][key]);
        objectAssign(window[NAMESPACE], createDefaultState());

        delete window[NAMESPACE];
    }
};
export const getGlobalState = () => window[NAMESPACE] ?? createGlobalState();
export const setGlobalState = newState => getGlobalState().setGlobalState(newState);

export const nextIndex = () => {
    const currentIndex = getGlobalState().index;

    setGlobalState({ index: currentIndex + 1 });

    return currentIndex;
};

export const createTitleGenerator = () => {
    let count = 0;
    return title => {
        count += 1;
        return `${title} ${count}`;
    };
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

export const createGlobalVariableGetter = (variable, fn) => () => {
    if (!getGlobalState()[variable]) {
        setGlobalState({
            [variable]: fn()
        });
    }

    return getGlobalState()[variable];
};

export const globalEvent = eventEmitter();
