/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
/** @jsx node */
import { destroyElement } from '@krakenjs/belter/src';
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { EVENT } from '@krakenjs/zoid/src';

import { createTitleGenerator, viewportHijack } from '../../../utils';

const getTitle = createTitleGenerator();

export default ({ uid, frame, prerenderFrame, doc, event, state, props: { cspNonce, features }, context }) => {
    // We render the modal as a popup when attempting to render the modal inside another IFrame.
    // In this scenario we can skip creating container elements and transitions since we
    // cannot overlay across the entire screen
    if (context === 'popup') return undefined;

    const TRANSITION_DELAY = features === 'ql-design' ? 100 : 300;
    const transitionPercent = features === 'ql-design' ? 0 : 5;

    const [hijackViewport, replaceViewport] = viewportHijack();

    const CLASS = {
        HIDDEN: `${uid}-hide`,
        MODAL_SHOW: `${uid}-show`,
        TRANSITION: `${uid}-transition`
    };

    const handleRender = wrapper => {
        const overlay = wrapper.querySelector('div');

        const handleShow = () => {
            state.open = true;
            state.previousFocus = document.activeElement;
            wrapper.classList.remove(CLASS.HIDDEN);
            hijackViewport();
            // Browser needs to repaint otherwise the transition happens immediately
            // Firefox requires 2 RAFs due to where they are called in the event loop
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    overlay.classList.add(CLASS.MODAL_SHOW);
                    if (state.renderedModal && window.document.activeElement !== frame) {
                        frame.focus();
                    } else if (window.document.activeElement !== prerenderFrame) {
                        prerenderFrame.focus();
                    }
                });
            });
        };

        const handleHide = () => {
            state.open = false;
            overlay.classList.remove(CLASS.MODAL_SHOW);
            replaceViewport();
            setTimeout(() => {
                wrapper.classList.add(CLASS.HIDDEN);
                state.previousFocus.focus();
            }, TRANSITION_DELAY);
        };

        const handleEscape = evt => {
            if (state.open && (evt.key === 'Escape' || evt.key === 'Esc' || evt.charCode === 27)) {
                handleHide();
            }
        };

        const handleTransition = () => {
            state.renderedModal = true;
            ZalgoPromise.delay(TRANSITION_DELAY)
                .then(() => overlay.classList.add(CLASS.TRANSITION))
                .then(() => ZalgoPromise.delay(TRANSITION_DELAY))
                .then(() => destroyElement(prerenderFrame))
                .then(() => {
                    if (state.open && document.activeElement !== frame) {
                        frame.focus();
                    }
                });
        };

        // When the show function was called before zoid had a chance to render
        if (state.open) {
            handleShow();
        }

        event.on('modal-show', handleShow);
        event.on('modal-hide', handleHide);
        event.on(EVENT.RENDERED, handleTransition);
        window.addEventListener('keyup', handleEscape);
    };

    const fullScreen = position =>
        `position: ${position} !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; z-index: 2147483647 !important; border: none !important;`;
    const modalTitle = getTitle(frame.title);
    // We apply both styles tag and inline style because some merchants are changing the inline
    // style values unintentionally with greedy JavaScript and the style tag with !important
    // helps to protect our desired styles.
    return (
        <div id={uid} class={CLASS.HIDDEN} onRender={handleRender}>
            <style nonce={cspNonce}>
                {`
                    #${uid}.${CLASS.HIDDEN} {
                        visibility: hidden;
                    }

                    #${uid} > div > iframe {
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                        border: none !important;
                    }

                    #${uid} > div {
                        background: rgba(108, 115, 120, 0);
                        transition: background ${TRANSITION_DELAY}ms linear;
                        ${fullScreen('fixed')}
                    }

                    #${uid} > div.${CLASS.MODAL_SHOW} {
                        background: rgba(108, 115, 120, 0.85);
                    }

                    #${uid} > div > iframe {
                        transition: all ${TRANSITION_DELAY}ms;
                        transform: translateY(${transitionPercent}%);
                        opacity: 0;
                    }

                    #${uid} > div.${CLASS.MODAL_SHOW} > iframe {
                        transform: translateY(0);
                        opacity: 1;
                    }

                    #${uid} > div > iframe:first-of-type {
                        opacity: 0;
                    }

                    #${uid} > div.${CLASS.MODAL_SHOW}.${CLASS.TRANSITION} > iframe:first-of-type {
                        opacity: 1;
                        z-index: 2;
                    }

                    #${uid} > div.${CLASS.TRANSITION} > iframe:last-of-type {
                        opacity: 0;
                    }
                `}
            </style>
            <div>
                <node el={frame} title={modalTitle} />
                <node el={prerenderFrame} title={`Prerender ${modalTitle}`} />
            </div>
        </div>
    ).render(dom({ doc }));
};
