/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { useXProps } from '../../../lib';

const TRANSITION_TIME = 350;
const CLOSE_TRANSITION_TIME = 450;

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
    const [props, setProps] = useState({});
    const { onProps } = useXProps();

    useEffect(
        () =>
            onProps(newProps => {
                // create a new state value to capture props so we can re-render when visible prop changes
                setProps(newProps);
                if (!newProps.visible) {
                    // close
                    setState(STATUS.CLOSING);
                    setTimeout(() => {
                        setState(STATUS.CLOSED);
                    }, CLOSE_TRANSITION_TIME);
                }
                if (newProps.visible && state === STATUS.CLOSED) {
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
        [props.visible]
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
