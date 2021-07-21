/** @jsx h */
import { h, createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { useXProps } from '../../../lib';
import { getIntersectionObserverPolyfill } from '../../../../utils';

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
                        setState(STATUS.CLOSED);
                    }
                },
                { threshold: 0.05 }
            );

            observer.observe(document.body);
        });
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
