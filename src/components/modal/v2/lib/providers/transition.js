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

    /**
     * Set iniitial focus on modal open to the close button.
     * Particularly useful for those using screen readers and other accessibility functions.
     */
    const focusCloseBtnOnModalOpen = () => {
        const btn = document.querySelector('.close');
        btn?.focus();
    };

    useEffect(() => {
        // Transition accounts for the modal animating open and closed,
        // which does not apply when rendered as a lander
        if (!isLander || isIframe) {
            getIntersectionObserverPolyfill().then(() => {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            // Removes .modal-closed class from modal iframe body when modal is open.
                            document.body.classList.remove('modal-closed');
                            setState(STATUS.OPEN);
                            onShow();

                            focusCloseBtnOnModalOpen();
                        } else {
                            setTimeout(() => {
                                /**
                                 * Prevents modal from switching views on browser window resize while the modal is still open.
                                 * The .modal-closed class is added via useTransitionState. If this class is not on the modal iframe body,
                                 * we know the modal is open and should not trigger the hook to reset the modal to the primary view.
                                 */
                                if (document.body.classList.contains('modal-closed')) {
                                    setState(STATUS.CLOSED);
                                }
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
        // Triggers The object passed as the value prop to the Context provider (at line 12) changes every render. To fix this consider wrapping it in a useMemo hook.
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
            // Appends a class to the modal iframe body when handleClose is fired.
            document.body.classList.add('modal-closed');
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
