/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-param-reassign */
/** @jsx node */
import { destroyElement } from 'belter/src';
import { node, dom } from 'jsx-pragmatic/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { createTitleGenerator, globalEvent } from '../../utils';

const getTitle = createTitleGenerator();

export default ({ uid, frame, prerenderFrame, doc, event, state }) => {
    const TRANSITION_DELAY = 150;
    const CLASS = {
        VISIBLE: `${uid}-visible`,
        INVISIBLE: `${uid}-invisible`,
        BG_TRANSITION_ON: `${uid}-bg-transition-on`,
        BG_TRANSITION_OFF: `${uid}-bg-transition-off`
    };
    state.prerenderDetails.uid = uid;
    state.prerenderDetails.frameElement = frame;
    state.prerenderDetails.prerenderElement = prerenderFrame;
    state.prerenderDetails.classes = CLASS;
    frame.classList.add(CLASS.INVISIBLE);
    prerenderFrame.classList.add(CLASS.VISIBLE);

    globalEvent.on('show-modal', () => {
        event.trigger('show-prerender-modal');
        setTimeout(() => {
            frame.classList.remove(CLASS.INVISIBLE);
            frame.classList.add(CLASS.VISIBLE);
            prerenderFrame.classList.remove(CLASS.VISIBLE);
            prerenderFrame.classList.add(CLASS.INVISIBLE);
        }, 500);
        setTimeout(() => {
            destroyElement(prerenderFrame);
        }, 1000);
    });

    event.on('hide-modal', () => {
        event.trigger('hide-modal-transition');
        frame.classList.remove(CLASS.VISIBLE);
        frame.classList.add(CLASS.INVISIBLE);
    });

    event.on('show-modal-transition', () => {
        ZalgoPromise.delay(TRANSITION_DELAY).then(() => {
            document.getElementById(`${uid}-top`).classList.remove(`${CLASS.BG_TRANSITION_OFF}`);
            document.getElementById(`${uid}-top`).classList.add(`${CLASS.BG_TRANSITION_ON}`);
        });
    });

    event.on('hide-modal-transition', () => {
        ZalgoPromise.delay(TRANSITION_DELAY).then(() => {
            document.getElementById(`${uid}-top`).classList.remove(`${CLASS.BG_TRANSITION_ON}`);
            document.getElementById(`${uid}-top`).classList.add(`${CLASS.BG_TRANSITION_OFF}`);
        });
    });

    const fullScreen = position =>
        `position: ${position} !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; border: none !important;`;
    const modalTitle = getTitle(frame.title);
    // We apply both styles tag and inline style because some merchants are changing the inline
    // style values unintentionally with greedy JavaScript and the style tag with !important
    // helps to protect our desired styles.
    return (
        <div id={uid}>
            <style>
                {`
                    #${uid} > div > iframe {
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                        border: none !important;
                    }
                    .${CLASS.BG_TRANSITION_ON}{
                        background: rgba(108, 115, 120, 0.85);
                        transition: background 150ms linear;
                    }
                    .${CLASS.BG_TRANSITION_OFF}{
                        background: none;
                        transition: background 150ms linear;
                    }
                    #${uid} > div > iframe.${CLASS.VISIBLE} {
                        opacity: 1;
                        transition: opacity 350ms;
                        z-index: 1;
                    }
                    #${uid} > div > iframe.${CLASS.INVISIBLE} {
                        transition: opacity 350ms;
                        transform: translateY(0);
                        opacity: 0;
                    }
                `}
            </style>
            <div style={fullScreen('fixed')} id={`${uid}-top`} class={`${CLASS.BG_TRANSITION_OFF}`}>
                <node el={frame} title={modalTitle} />
                <node el={prerenderFrame} title="Prerender Modal" />
            </div>
        </div>
    ).render(dom({ doc }));
};
