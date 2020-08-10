/** @jsx h */
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { h } from 'preact';
import { useLayoutEffect, useEffect } from 'preact/hooks';

import { useTransitionState, ScrollProvider, useServerData, useXProps } from '../lib';
import Overlay from './Overlay';

const Container = ({ children, contentWrapper, contentMaxWidth, contentMaxHeight }) => {
    const { type, products } = useServerData();
    const { onReady } = useXProps();
    const [transitionState] = useTransitionState();

    useEffect(() => {
        if (transitionState === 'OPENING') {
            window.focus();
        }
    }, [transitionState]);

    useLayoutEffect(() => {
        if (transitionState === 'CLOSING') {
            // eslint-disable-next-line no-param-reassign
            contentWrapper.current.scrollTop = 0;
        }
    }, [transitionState]);

    useEffect(() => {
        if (typeof onReady === 'function') {
            onReady({ type, products });
        }
    }, []);

    return (
        <ScrollProvider containerRef={contentWrapper}>
            <section
                className={`modal__container ${
                    stringStartsWith(transitionState, 'OPEN') ? 'modal__container--show' : ''
                }`}
            >
                <div className="modal__wrapper" id="modal__wrapper">
                    {children}
                </div>
                <Overlay contentMaxWidth={contentMaxWidth} contentMaxHeight={contentMaxHeight} />
            </section>
        </ScrollProvider>
    );
};

export default Container;
