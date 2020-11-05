/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { useXProps } from '../../../lib';

const TRANSITION_TIME = 350;

export const STATUS = {
    OPEN: 'OPENED',
    OPENING: 'OPENING',
    CLOSED: 'CLOSED',
    CLOSING: 'CLOSING'
};

const TransitionContext = createContext({
    status: STATUS.CLOSED,
    setStatus: () => {}
});

export const TransitionStateProvider = ({ children }) => {
    const [state, setState] = useState(STATUS.CLOSED);
    const { show, onProps } = useXProps();

    useEffect(
        () =>
            onProps(newProps => {
                if (newProps.visible && state === STATUS.CLOSED) {
                    show().then(() => {
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                setState(STATUS.OPENING);
                                setTimeout(() => {
                                    setState(STATUS.OPEN);
                                }, TRANSITION_TIME);
                            });
                        });
                    });
                }
            }),
        []
    );

    return (
        <TransitionContext.Provider value={{ status: state, setStatus: setState }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransitionState = () => {
    const { status, setStatus } = useContext(TransitionContext);
    const { hide, onClose } = useXProps();

    return [
        status,
        linkName => {
            if (status === STATUS.OPEN || status === STATUS.OPENING) {
                setStatus(STATUS.CLOSING);
                setTimeout(() => {
                    if (onClose) {
                        onClose({ linkName });
                    }
                    hide().then(() => setStatus(STATUS.CLOSED));
                }, TRANSITION_TIME);
            }
        }
    ];
};
