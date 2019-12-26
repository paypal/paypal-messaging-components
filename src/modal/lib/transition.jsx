/** @jsx h */
import { h, createContext } from 'preact';
import { useState } from 'preact/hooks';

export const STATUS = {
    OPEN: 'OPENED',
    OPENING: 'OPENING',
    CLOSED: 'CLOSED',
    CLOSING: 'CLOSING'
};

export const TransitionContext = createContext({
    status: STATUS.CLOSED,
    setStatus: () => {}
});

export const TransitionState = ({ children }) => {
    const [state, setState] = useState(STATUS.CLOSED);

    return (
        <TransitionContext.Provider value={{ status: state, setStatus: setState }}>
            {children}
        </TransitionContext.Provider>
    );
};
