/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';

import { getOverflowObserver, createTitleGenerator } from '../../utils';
import prerenderTemplate from './prerenderTemplate';

const getTitle = createTitleGenerator();

import getParentStyles from '../../../server/getParentStyles.js';

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
            max-height: 1920px;
            min-height: 120px;
            max-width: 160px;
            min-width: 160px;
        `,
        '8x1': `
            max-width: 768px;
            min-width: 250px;
        `,
        '20x1': `
            max-width: 1169px;
            min-width: 350px;
        `
    };
    if (layout !== 'flex') {
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
            position: relative;
            box-sizing: border-box;
            
        }
        #${uid} iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }
        #${uid} > iframe:nth-of-type(1) {
            z-index: 99;
            height: 100%;
            ${cssStyles}
        }
        #${uid} > iframe:nth-of-type(2) {
            z-index: 98;
            height: 100%;
            min-height: 10px;
        }
    `;
};

export default ({ uid, frame, prerenderFrame, doc, event, props, container }) => {
    const removePrerender = getRemovePrerender(prerenderFrame);

    prerenderFrame.srcdoc = prerenderTemplate({ doc, props });

    event.on(EVENT.RENDERED, () => {
        prerenderFrame.parentNode.removeChild(prerenderFrame);
        // setTimeout(() => {
        //     prerenderFrame.parentNode.removeChild(prerenderFrame);
        // }, 3000);
    });

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

    console.log('baseStyles', props?.style?.layout ?? 'text', baseStyles);

    event.on('styles', ({ styles }) => {
        if (typeof styles === 'string') {
            const style = container.querySelector(`#${uid} style`);

            style.textContent = `
                ${baseStyles}
                ${styles.replace(/\.pp-(text|flex)[^\s:,.#]*/g, `#${uid}`)}
            `;
        }
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
