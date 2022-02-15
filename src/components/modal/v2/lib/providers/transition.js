/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { useXProps } from './xprops';
import { getIntersectionObserverPolyfill } from '../../../../../utils';
import { isLander, isIframe } from '../utils';

const TRANSITION_DELAY = 300;

export const STATUS = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED'
};

const TransitionContext = createContext({
    status: STATUS.OPEN,
    setStatus: () => {}
});

export const TransitionStateProvider = ({ children }) => {
    const { onShow } = useXProps();
    const [state, setState] = useState(STATUS.OPEN);

    useEffect(() => {
        // Transition accounts for the modal animating open and closed,
        // which does not apply when rendered as a lander
        if (!isLander || isIframe) {
            getIntersectionObserverPolyfill().then(() => {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setState(STATUS.OPEN);
                            onShow();
                        } else {
                            setTimeout(() => {
                                setState(STATUS.CLOSED);
                            }, TRANSITION_DELAY);
                        }
                    },
                    // Triggers observer when body is or is not 100% in view of the viewport
                    { threshold: 1 }
                );

                observer.observe(document.body);
            });
        }
    }, []);

    return (
        <TransitionContext.Provider value={{ status: state, setStatus: setState }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransitionState = () => {
    const { status } = useContext(TransitionContext);
    const { onClose } = useXProps();

    return [status, linkName => onClose({ linkName })];
};
