/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';

import { overflowObserver } from '../../utils';

export default ({ uid, frame, prerenderFrame, doc, event, props }) => {
    event.on(EVENT.RENDERED, () => {
        // prerenderFrame.style.setProperty('display', 'none');
        prerenderFrame.parentNode.removeChild(prerenderFrame);
    });

    const setupAutoResize = el => {
        event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
            if (newWidth !== 0 || newHeight !== 0) {
                el.setAttribute('data-width', newWidth);
                el.setAttribute('data-height', newHeight);

                if (props.style.layout !== 'flex' && typeof newHeight === 'number') {
                    el.style.setProperty('height', `${newHeight}px`);
                }

                overflowObserver.then(observer => {
                    // The observer will check the element once, then unsubscribe
                    observer.observe(el);
                });
            }
        });
    };

    const baseStyles = `
        #${uid} > iframe {
            width: 100%;
            height: 0;
        }

        #${uid} > iframe:nth-of-type(2) {
            display: none;
        }
    `;

    event.on('styles', ({ styles }) => {
        if (styles) {
            const style = document.querySelector(`#${uid} style`);

            style.textContent = `
                ${baseStyles}
                ${styles.replace(/\.pp-flex[^\s:,.#]*/g, `#${uid}`)}
            `;
        }
    });

    return (
        <span id={uid}>
            <style>{baseStyles}</style>
            <node el={frame} onRender={setupAutoResize} />
            <node el={prerenderFrame} />
        </span>
    ).render(dom({ doc }));
};
