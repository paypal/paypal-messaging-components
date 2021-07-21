/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-param-reassign */
/** @jsx node */
import { destroyElement } from 'belter/src';
import { node, dom } from 'jsx-pragmatic/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { EVENT } from 'zoid/src';

import { createTitleGenerator, viewportHijack } from '../../utils';

const TRANSITION_DELAY = 300;
const getTitle = createTitleGenerator();

export default ({ uid, frame, prerenderFrame, doc, event, state }) => {
    const [hijackViewport, replaceViewport] = viewportHijack();

    const CLASS = {
        VISUALLY_HIDDEN: `${uid}-hide`,
        MODAL_SHOW: `${uid}-show`,
        TRANSITION: `${uid}-transition`
    };

    const handleRender = wrapper => {
        const overlay = wrapper.querySelector('div');

        const handleShow = () => {
            state.open = true;
            wrapper.classList.remove(CLASS.VISUALLY_HIDDEN);
            hijackViewport();
            // Browser needs to repaint otherwise the transition happens immediately
            // Firefox requires 2 RAFs due to where they are called in the event loop
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    overlay.classList.add(CLASS.MODAL_SHOW);
                });
            });
        };

        const handleHide = () => {
            state.open = false;
            overlay.classList.remove(CLASS.MODAL_SHOW);
            replaceViewport();
            setTimeout(() => {
                wrapper.classList.add(CLASS.VISUALLY_HIDDEN);
            }, TRANSITION_DELAY);
        };

        const handleEscape = evt => {
            if (state.open && (evt.key === 'Escape' || evt.key === 'Esc' || evt.charCode === 27)) {
                handleHide();
            }
        };

        const handleTransition = () => {
            ZalgoPromise.delay(TRANSITION_DELAY)
                .then(() => overlay.classList.add(CLASS.TRANSITION))
                .then(() => ZalgoPromise.delay(TRANSITION_DELAY))
                .then(() => destroyElement(prerenderFrame));
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
        `position: ${position} !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; border: none !important;`;
    const modalTitle = getTitle(frame.title);
    // We apply both styles tag and inline style because some merchants are changing the inline
    // style values unintentionally with greedy JavaScript and the style tag with !important
    // helps to protect our desired styles.
    return (
        <div id={uid} class={CLASS.VISUALLY_HIDDEN} onRender={handleRender}>
            <style>
                {`
                    #${uid}.${CLASS.VISUALLY_HIDDEN} {
                        clip: rect(0 0 0 0); 
                        clip-path: inset(50%);
                        height: 1px;
                        overflow: hidden;
                        position: absolute;
                        white-space: nowrap; 
                        width: 1px;
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
                    }

                    #${uid} > div.${CLASS.MODAL_SHOW} {
                        background: rgba(108, 115, 120, 0.85);
                    }

                    #${uid} > div > iframe {
                        transition: all ${TRANSITION_DELAY}ms;
                        transform: translateY(100%);
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
            <div style={fullScreen('fixed')}>
                <node el={frame} title={modalTitle} />
                <node el={prerenderFrame} title="Prerender Modal" />
            </div>
        </div>
    ).render(dom({ doc }));
};
