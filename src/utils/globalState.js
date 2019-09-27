import { createState } from './index';

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
