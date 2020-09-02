/** @jsx h */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { useXProps } from './hooks/helpers';
import { TransitionContext, STATUS, TRANSITION_TIME } from './context';

export default ({ children }) => {
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
