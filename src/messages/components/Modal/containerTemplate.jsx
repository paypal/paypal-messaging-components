/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';

export default ({ uid, frame, prerenderFrame, doc, event }) => {
    event.on(EVENT.RENDERED, () => {
        prerenderFrame.style.setProperty('display', 'none');
    });

    const fullScreen = position =>
        `position: ${position}; z-index: 2147483638; top: 0; left: 0; width: 100%; height: 100%;`;

    return (
        <div id={uid}>
            <div style={fullScreen('fixed')}>
                <node el={frame} style={fullScreen('absolute')} />
                <node el={prerenderFrame} style={fullScreen('absolute')} />
            </div>
        </div>
    ).render(dom({ doc }));
};
