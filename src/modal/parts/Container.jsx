/** @jsx h */
import { h } from 'preact';
import { useLayoutEffect, useRef } from 'preact/hooks';

import { useTransitionState } from '../lib/hooks';
import { ScrollState } from '../lib/scroll';
import Header from './Header';
import Overlay from './Overlay';

const Modal = ({ children }) => {
    const [transitionState] = useTransitionState();
    const contentWrapper = useRef();

    useLayoutEffect(() => {
        if (transitionState === 'CLOSED') {
            contentWrapper.current.scrollTop = 0;
        }
    }, [transitionState]);

    return (
        <ScrollState containerRef={contentWrapper}>
            <section
                id="modal-container"
                className={`modal__container ${transitionState.startsWith('OPEN') ? 'show' : ''}`}
            >
                <div className="modal__wrapper" id="modal__wrapper">
                    <Header />
                    <div className="modal__content-wrapper" ref={contentWrapper}>
                        <div className="modal__content-background">
                            <div className="modal__content">
                                <main>{children}</main>
                            </div>
                        </div>
                    </div>
                </div>
                <Overlay contentMaxWidth={612} />
            </section>
        </ScrollState>
    );
};

export default Modal;
