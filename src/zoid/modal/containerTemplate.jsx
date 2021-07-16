/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-param-reassign */
/** @jsx node */
import { destroyElement } from 'belter/src';
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';

import { createTitleGenerator, globalEvent } from '../../utils';

const getTitle = createTitleGenerator();

export default ({ uid, frame, prerenderFrame, doc, event, state }) => {
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
        frame.classList.remove(CLASS.INVISIBLE);
        frame.classList.add(CLASS.VISIBLE);
        globalEvent.trigger('show-modal-transition');
    });

    globalEvent.on('hide-modal', () => {
        frame.classList.add(CLASS.VISIBLE);
        frame.classList.remove(CLASS.INVISIBLE);
        globalEvent.trigger('hide-modal-transition');
    });

    globalEvent.on('show-modal-transition', () => {
        document.getElementById(`${uid}-top`).classList.remove(`${CLASS.BG_TRANSITION_OFF}`);
        document.getElementById(`${uid}-top`).classList.add(`${CLASS.BG_TRANSITION_ON}`);
    });

    globalEvent.on('hide-modal-transition', () => {
        document.getElementById(`${uid}-top`).classList.remove(`${CLASS.BG_TRANSITION_ON}`);
        document.getElementById(`${uid}-top`).classList.add(`${CLASS.BG_TRANSITION_OFF}`);
    });

    event.on(EVENT.RENDERED, () => {
        // once modal is ready hide prerender and show the content modal after 500ms
        // kill the prerender after 1sec
        setTimeout(() => {
            globalEvent.trigger('show-modal');
            prerenderFrame.classList.remove(CLASS.VISIBLE);
            prerenderFrame.classList.add(CLASS.INVISIBLE);
        }, 500);
        setTimeout(() => {
            destroyElement(prerenderFrame);
        }, 1000);
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
                        transition: background 350ms linear;
                    }
                    .${CLASS.BG_TRANSITION_OFF}{
                        background: none;
                        transition: background 350ms linear;
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
