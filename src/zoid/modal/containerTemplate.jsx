/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';
import { getComponentTitle } from '../../utils';

export default ({ uid, frame, prerenderFrame, doc, event }) => {
    event.on(EVENT.RENDERED, () => {
        prerenderFrame.style.setProperty('display', 'none');
    });

    const fullScreen = position =>
        `position: ${position} !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; z-index: 2147483647 !important; border: none !important;`;
    const modalTitle = getComponentTitle('PayPal Modal ');
    // eslint-disable-next-line no-param-reassign
    frame.title = modalTitle;
    // eslint-disable-next-line no-param-reassign
    prerenderFrame.title = `Prerender ${modalTitle}`;
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
                <node el={frame} style={fullScreen('absolute')} />
                <node el={prerenderFrame} style={fullScreen('absolute')} />
            </div>
        </div>
    ).render(dom({ doc }));
};
