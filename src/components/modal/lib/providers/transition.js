/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { useXProps } from './xprops';
import { getIntersectionObserverPolyfill } from '../../../../utils';

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
        getIntersectionObserverPolyfill().then(() => {
            // eslint-disable-next-line compat/compat
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
    }, []);

    return (
        // Triggers: The object passed as the value prop to the Context provider (at line 47) changes every render. To fix this consider wrapping it in a useMemo hook.
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <TransitionContext.Provider value={{ status: state, setStatus: setState }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransitionState = () => {
    const { status } = useContext(TransitionContext);
    const { onClose, close } = useXProps();

    return [
        status,
        linkName => {
            onClose({ linkName });

            if (window === window.top && typeof close === 'function') {
                // Check to see if the modal is running as a standalone page (i.e. popup), close the entire page
                // `close` will only exist with zoid integrations, so this is skipped for the lander
                // TODO: We should consider changing `onClose` to `onHide` since close has a different meaning for zoid
                close();
            }
        }
    ];
};
