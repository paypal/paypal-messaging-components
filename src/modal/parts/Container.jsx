/** @jsx h */
import { h } from 'preact';
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';

import { useTransitionState } from '../lib/hooks';
import Header from './Header';
import Overlay from './Overlay';

const Modal = ({ children }) => {
    const [hasShadow, showShadow] = useState(false);
    const [transitionState] = useTransitionState();
    const contentWrapper = useRef();

    useEffect(() => {
        const handleScroll = () => {
            if (contentWrapper.current.scrollTop > 0 && !hasShadow) {
                showShadow(true);
            } else if (contentWrapper.current.scrollTop <= 0 && hasShadow) {
                showShadow(false);
            }
        };

        contentWrapper.current.addEventListener('scroll', handleScroll);
        contentWrapper.current.addEventListener('touchmove', handleScroll);

        return () => {
            contentWrapper.current.removeEventListener('scroll', handleScroll);
            contentWrapper.current.removeEventListener('touchmove', handleScroll);
        };
    }, [hasShadow]);

    useLayoutEffect(() => {
        if (transitionState === 'CLOSED') {
            contentWrapper.current.scrollTop = 0;
        }
    }, [transitionState]);

    return (
        <section
            id="modal-container"
            className={`modal__container ${transitionState.startsWith('OPEN') ? 'show' : ''}`}
        >
            <div className="modal__wrapper" id="modal__wrapper">
                <Header shadow={hasShadow} />
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
    );
};

export default Modal;
