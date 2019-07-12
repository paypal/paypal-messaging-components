import { createState } from './index';

// eslint-disable-next-line import/prefer-default-export
export const [globalState, setGlobalState] = createState(window.__paypal_messages_state__ || { nextId: 1, config: {} });

Object.defineProperty(window, '__paypal_messages_state__', {
    value: globalState,
    enumerable: false,
    configurable: true,
    writable: false
});
