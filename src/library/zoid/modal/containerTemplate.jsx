/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
/** @jsx node */
import { destroyElement } from '@krakenjs/belter/src';
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import {
    createTitleGenerator,
    viewportHijack,
    canDebug,
    DEBUG_CONDITIONS,
    ppDebug,
    MODAL_EVENT,
    MODAL_DOM_EVENT
} from '../../../utils';

const TRANSITION_DELAY = 300;
const getTitle = createTitleGenerator();

export default ({ uid, frame, prerenderFrame, doc, event, state, props, context }) => {
    const { cspNonce } = props;
    if (canDebug(DEBUG_CONDITIONS.PROPS)) {
        ppDebug(`EVENT.MODAL.${props.index}.PROPS`, { debugObj: props });
    }
    if (canDebug(DEBUG_CONDITIONS.ZOID_EVENTS) && typeof event?.on !== 'undefined') {
        // this `event` bus is identical to the one received by the prerender modal,
        // so we don't need a debug statement for it
        Object.entries(MODAL_EVENT).forEach(([eventId, eventName]) =>
            event.on(eventName, data => ppDebug(`EVENT.MODAL.${props.index}.${eventId}`, { debugObj: { props, data } }))
        );
    }
    // We render the modal as a popup when attempting to render the modal inside another IFrame.
    // In this scenario we can skip creating container elements and transitions since we
    // cannot overlay across the entire screen
    if (context === 'popup') return undefined;

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
            wrapper.classList.remove(CLASS.HIDDEN);
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
                wrapper.classList.add(CLASS.HIDDEN);
                wrapper.querySelector('iframe')?.blur();
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
                .then(() => destroyElement(prerenderFrame))
                .then(() => event.trigger(MODAL_EVENT.PRERENDER_MODAL_DESTROY))
                .then(() => wrapper.querySelector('iframe')?.focus());
        };

        // When the show function was called before zoid had a chance to render
        if (state.open) {
            handleShow();
        }

        event.on(MODAL_EVENT.MODAL_SHOW, handleShow);
        event.on(MODAL_EVENT.MODAL_HIDE, handleHide);
        event.on(MODAL_EVENT.RENDERED, handleTransition);
        window.addEventListener(MODAL_DOM_EVENT.KEYUP, handleEscape);
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
                        transform: translateY(5%);
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
