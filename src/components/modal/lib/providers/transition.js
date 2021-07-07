/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { useXProps } from '../../../lib';

const TRANSITION_TIME = 350;
const CLOSE_TRANSITION_TIME = 150;

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
    // added new visible prop so we can re-render anytime visibilty of content modal changes
    const [visible, setVisible] = useState(false);
    const { onProps } = useXProps();

    useEffect(
        () =>
            onProps(newProps => {
                // create a new state value to capture props so we can re-render when visible prop changes
                if (!newProps.visible) {
                    setVisible(newProps.visible);
                    // close
                    if (state === STATUS.OPEN || state === STATUS.OPENING) {
                        setState(STATUS.CLOSING);
                        setTimeout(() => {
                            setState(STATUS.CLOSED);
                        }, CLOSE_TRANSITION_TIME);
                    }
                }
                if (newProps.visible && state === STATUS.CLOSED) {
                    setVisible(newProps.visible);
                    // open
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            setState(STATUS.OPENING);
                            setTimeout(() => {
                                setState(STATUS.OPEN);
                            }, TRANSITION_TIME);
                        });
                    });
                }
            }),
        // anytime visibility or content modal status changes (ie OPEN, CLOSED etc) re-render
        [visible, state]
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
