/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';

import { getOverflowObserver, createTitleGenerator } from '../../utils';

const getTitle = createTitleGenerator();

const getBaseStyles = ({ uid, style: { layout, text: textOptions, ratio: ratioOption = '1x4' } }) => {
    let cssStyles = ``;
    const ratioMap = {
        '1x1': `
            max-height: 300px;
            min-height: 120px;
            max-width: 300px;
            min-width: 120px;
        `,
        '1x4': `
            max-height: 640px;
            min-height: 320px;
            max-width: 160px;
            min-width: 160px;
        `,
        '8x1': `
            max-height: 96px;
            min-height: 42px;
            max-width: 768px;
            min-width: 250px;
        `,
        '20x1': `
            max-height: 59px;
            min-height: 42px;
            max-width: 1169px;
            min-width: 350px;
        `
    };
    if (layout === 'text') {
        const { size: textSize = 12 } = textOptions ?? {};
        cssStyles = `
        min-height: ${textSize * 3}px;
        max-height: ${textSize * 6}px;
        min-width: 100px;
        `;
    } else {
        cssStyles = ratioMap[ratioOption];
    }

    return `
        #${uid} {
            display: block;
            width: 100%;
            height: 100%;
        }
        #${uid} > iframe:nth-of-type(1){
            width: 100%;
            height: 100%;
            ${cssStyles}
        }
    `.replace(/[\s\n]/g, ' ');
};

export default ({ uid, frame, prerenderFrame, doc, event, props, container }) => {
    const setupAutoResize = el => {
        event.on(EVENT.RESIZE, ({ width, height }) => {
            if (width !== 0 || height !== 0) {
                if (props.style.layout === 'flex') {
                    // Ensure height property does not exist for flex especially when swapping from text to flex
                    el.style.setProperty('height', null);
                    // Prevent the observer from trying to render a fallback message
                    el.setAttribute('data-width', 0);
                    el.setAttribute('data-height', 0);
                } else {
                    // Attributes used by the overflow observer
                    el.setAttribute('data-width', width);
                    el.setAttribute('data-height', height);
                    if (typeof height === 'number') {
                        // Auto resize height for non-layout flex messages
                        el.style.setProperty('height', `${height}px`);
                    }
                }
                if (el.__hasResizedBefore__) {
                    // The styles event will fire first before the resize event for the initial render
                    event.once('styles', () => {
                        getOverflowObserver().then(observer => {
                            observer.observe(el); // The observer will immediately check the element once, then unsubscribe
                        });
                    });
                } else {
                    // eslint-disable-next-line no-param-reassign
                    el.__hasResizedBefore__ = true;
                    getOverflowObserver().then(observer => {
                        observer.observe(el); // The observer will immediately check the element once, then unsubscribe
                    });
                }
            }
        });
    };
    const baseStyles = getBaseStyles({ ...props, uid });
    event.on('styles', ({ styles }) => {
        if (typeof styles === 'string') {
            const style = container.querySelector(`#${uid} style`);

            style.textContent = `
                ${baseStyles}
                ${styles.replace(/\.pp-flex[^\s:,.#]*/g, `#${uid}`)}
            `;
        }
    });
    event.on(EVENT.RENDERED, () => {
        prerenderFrame.parentNode.removeChild(prerenderFrame);
    });
    const messageTitle = getTitle(frame.title);
    return (
        <span id={uid}>
            <style>{baseStyles}</style>
            <node el={prerenderFrame} title={`Prerender ${messageTitle}`} />
            <node el={frame} title={messageTitle} onRender={setupAutoResize} />
        </span>
    ).render(dom({ doc }));
};
