/** @jsx h */
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { h, Fragment } from 'preact';
import { useLayoutEffect, useRef, useEffect } from 'preact/hooks';

import { useTransitionState, useXProps } from '../lib/hooks';
import ScrollState from '../lib/scroll';
import Header from './Header';
import Overlay from './Overlay';

const Modal = ({ children }) => {
    const [transitionState] = useTransitionState();
    const { country } = useXProps();
    const contentWrapper = useRef();

    const { contentMaxWidth, contentMaxHeight } = (() => {
        switch (country) {
            case 'GB':
                return {
                    contentMaxWidth: 750,
                    contentMaxHeight: 537
                };
            case 'US':
            case 'DE':
            default:
                return {
                    contentMaxWidth: 612
                };
        }
    })();

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

    const countryModalContainer = () => {
        switch (country) {
            case 'GB':
                return (
                    <div className="modal__content-wrapper" ref={contentWrapper}>
                        <div className="modal__content-background">
                            <Header />
                            <div className="modal__content">
                                <main className="modal__main">{children}</main>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <Fragment>
                        <Header />
                        <div className="modal__content-wrapper" ref={contentWrapper}>
                            <div className="modal__content-background">
                                <div className="modal__content">
                                    <main className="modal__main">{children}</main>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
        }
    };

    return (
        <ScrollState containerRef={contentWrapper}>
            <section
                className={`modal__container ${
                    stringStartsWith(transitionState, 'OPEN') ? 'modal__container--show' : ''
                }`}
            >
                <div className="modal__wrapper" id="modal__wrapper">
                    {countryModalContainer()}
                </div>
                <Overlay contentMaxWidth={contentMaxWidth} contentMaxHeight={contentMaxHeight} />
            </section>
        </ScrollState>
    );
};

export default Modal;
