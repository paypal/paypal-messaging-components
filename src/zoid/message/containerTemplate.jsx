/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';

export default ({ uid, frame, prerenderFrame, doc, event }) => {
    event.on(EVENT.RENDERED, () => {
        // prerenderFrame.style.setProperty('display', 'none');
        prerenderFrame.parentNode.removeChild(prerenderFrame);
    });

    return (
        <span id={uid}>
            <node el={frame} />
            <node el={prerenderFrame} />
        </span>
    ).render(dom({ doc }));
};
