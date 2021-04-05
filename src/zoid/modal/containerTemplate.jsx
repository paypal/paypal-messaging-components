/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';

import { createTitleGenerator } from '../../utils';

const getTitle = createTitleGenerator();

export default ({ uid, frame, prerenderFrame, doc, event }) => {
    event.on(EVENT.RENDERED, () => {
        prerenderFrame.style.setProperty('display', 'none');
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
                `}
            </style>
            <div style={fullScreen('fixed')}>
                <node el={frame} title={modalTitle} style={fullScreen('absolute')} />
                <node el={prerenderFrame} title={`Prerender ${modalTitle}`} style={fullScreen('absolute')} />
            </div>
        </div>
    ).render(dom({ doc }));
};
