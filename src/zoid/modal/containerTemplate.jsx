/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';

import { createTitleGenerator } from '../../utils';

const getTitle = createTitleGenerator();

const CLASS = {
    VISIBLE: 'visible',
    INVISIBLE: 'invisible'
};

export default ({ uid, frame, prerenderFrame, doc, event }) => {
    frame.classList.add(CLASS.INVISIBLE);
    prerenderFrame.classList.add(CLASS.VISIBLE);
    event.on(EVENT.RENDERED, () => {
        prerenderFrame.classList.remove(CLASS.VISIBLE);
        // prerenderFrame.classList.add(CLASS.INVISIBLE);
        // frame.classList.remove(CLASS.INVISIBLE);
        // frame.classList.add(CLASS.VISIBLE);

        // one option to auto close the renderer is to increase this timeout to maybe 5sec and if the api does not return a resposne it will just close on it's own if we can't get button to work
        // setTimeout(() => {
        //     destroyElement(prerenderFrame);
        // }, 5000);
    });
    event.on(EVENT.ERROR, err => {
        // to see if it would console if the request somehow error'd out but couldn't get this to trigger
        console.log(err);
    });
    const fullScreen = position =>
        `position: ${position} !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; z-index: 2147483647 !important; border: none !important;`;
    const modalTitle = getTitle(frame.title);
    // We apply both styles tag and inline style because some merchants are changing the inline
    // style values unintentionally with greedy JavaScript and the style tag with !important
    // helps to protect our desired styles.
    return (
        <div id={uid}>
            <style>
                {`
                    #${uid} > div { ${fullScreen('fixed')} }
                    #${uid} > div > iframe { ${fullScreen('absolute')} }
                    #${uid} > div > iframe.${CLASS.INVISIBLE} {
                        opacity: 0;
                    }
                    #${uid} > div > iframe.${CLASS.VISIBLE} {
                        opacity: 1;
                    }
                `}
            </style>
            <div style={fullScreen('fixed')}>
                <node el={frame} title={modalTitle} style={fullScreen('absolute')} />
                <node el={prerenderFrame} title={`Prerender ${modalTitle}`} style={fullScreen('absolute')} />
            </div>
        </div>
    ).render(dom({ doc }));
};
