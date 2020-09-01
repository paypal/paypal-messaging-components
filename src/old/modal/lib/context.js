import { createContext } from 'preact';

export const TRANSITION_TIME = 350;
export const STATUS = {
    OPEN: 'OPENED',
    OPENING: 'OPENING',
    CLOSED: 'CLOSED',
    CLOSING: 'CLOSING'
};

export const ServerContext = createContext({
    terms: {}
});

export const ScrollContext = createContext({
    addScrollCallback: () => {},
    removeScrollCallback: () => {}
});

export const TransitionContext = createContext({
    status: STATUS.CLOSED,
    setStatus: () => {}
});
