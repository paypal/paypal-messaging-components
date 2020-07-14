/** @jsx h */
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { h } from 'preact';
import { useLayoutEffect, useRef, useEffect } from 'preact/hooks';

import { useTransitionState, ScrollProvider, useServerData, useXProps } from '../lib';
import Header from './Header';
import Overlay from './Overlay';

const Modal = ({ children }) => {
    const { type } = useServerData();
    const { onReady } = useXProps();
    const [transitionState] = useTransitionState();
    const contentWrapper = useRef();

    useEffect(() => {
        if (transitionState === 'OPENING') {
            window.focus();
        }
    }, [transitionState]);

    useLayoutEffect(() => {
        if (transitionState === 'CLOSED') {
            contentWrapper.current.scrollTop = 0;
        }
    }, [transitionState]);

    useEffect(() => {
        if (typeof onReady === 'function') {
            onReady({ type });
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
                    <Header />
                    <div className="modal__content-wrapper" ref={contentWrapper}>
                        <div className="modal__content-background">
                            <div className="modal__content">
                                <main className="modal__main">{children}</main>
                            </div>
                        </div>
                    </div>
                </div>
                <Overlay contentMaxWidth={612} />
            </section>
        </ScrollProvider>
    );
};

export default Modal;
