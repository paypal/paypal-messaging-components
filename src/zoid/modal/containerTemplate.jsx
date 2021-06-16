/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
/** @jsx node */
import { destroyElement } from 'belter/src';
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';

import { createTitleGenerator } from '../../utils';

const getTitle = createTitleGenerator();

export default ({ uid, frame, prerenderFrame, doc, event, state }) => {
    const CLASS = {
        VISIBLE: `${uid}-visible`,
        INVISIBLE: `${uid}-invisible`
    };
    state.prerenderDetails.uid = uid;
    state.prerenderDetails.frameElement = frame;
    state.prerenderDetails.prerenderElement = prerenderFrame;

    frame.classList.add(CLASS.INVISIBLE);
    prerenderFrame.classList.add(CLASS.VISIBLE);
    event.on(EVENT.RENDERED, () => {
        // first wait 500ms to show proper transitions
        setTimeout(() => {
            frame.classList.remove(CLASS.INVISIBLE);
            frame.classList.add(CLASS.VISIBLE);
            prerenderFrame.classList.remove(CLASS.VISIBLE);
            prerenderFrame.classList.add(CLASS.INVISIBLE);
        }, 500);
        // next 500ms remove the prerender frame
        setTimeout(() => {
            destroyElement(prerenderFrame);
        }, 1000);
    });

    const fullScreen = position =>
        `position: ${position} !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; border: none !important; background: rgba(108, 115, 120, 0.85);`;
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
                        height: 100%;
                        border: none !important;
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
            <div style={fullScreen('fixed')}>
                <node el={frame} title={modalTitle} />
                <node el={prerenderFrame} title="Prerender Modal" />
            </div>
        </div>
    ).render(dom({ doc }));
};
