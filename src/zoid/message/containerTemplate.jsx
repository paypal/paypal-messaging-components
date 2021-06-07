/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';

import { getOverflowObserver, createTitleGenerator } from '../../utils';

const getTitle = createTitleGenerator();

const getBaseStyles = ({ uid, style: { layout, text: textOptions, ratio: ratioOption = '1x4' } }) => {
    let cssStyles = ``;
    let parentHeight = ``;
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
        parentHeight = `${textSize * 3}px`;
    } else {
        cssStyles = ratioMap[ratioOption];
        parentHeight = `100%`;
    }

    return `
        #${uid} {
            display: block;
            width: 100%;
            height: ${parentHeight};
            position: relative;
            box-sizing: border-box;
            
        }
        #${uid} > iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        #${uid} > iframe:nth-of-type(1){
            z-index: 98;
            ${cssStyles}
        }
        #${uid} > iframe:nth-of-type(2){
            z-index: 99;
            min-height: 10px;
            opacity: 0;
        }
    `;
};

const showBanner = ({ uid, prerenderFrame, container }) => {
    // prerenderFrame.parentNode.removeChild(prerenderFrame);
    const style = container.querySelector(`#${uid} style`);
    style.textContent = style.textContent.replace(/(#.+?>\s*iframe:nth-of-type\(2\)\s*\{(\n|.+?))opacity:\s*0;/g, `$1`);
    style.textContent = style.textContent.replace(/(#.+?>\s*iframe:nth-of-type\(1\)\s*\{)/g, `$1\n\topacity: 0;`);
};
const showLoadedMessage = ({ uid, prerenderFrame, container, event }) => {
    const timestamp = new Date();
    if (event === 'RENDERED') {
        showLoadedMessage.RENDERED = timestamp.getTime();
    } else if (event === 'LOADED') {
        showLoadedMessage.LOADED = timestamp.getTime();
    }
    if (
        typeof showLoadedMessage.RENDERED === 'number' &&
        typeof showLoadedMessage.LOADED === 'number' &&
        showLoadedMessage.LOADED > showLoadedMessage.RENDERED
    ) {
        showBanner({ uid, prerenderFrame, container });
    }
};
showLoadedMessage.RENDERED = false;
showLoadedMessage.LOADED = false;

export default ({ uid, frame, prerenderFrame, doc, event, props, container }) => {
    frame.addEventListener('load', event => {
        showLoadedMessage({ uid, container, event: 'LOADED' });
    });

    event.on(EVENT.RENDERED, () => {
        showLoadedMessage({ uid, container, event: 'RENDERED' });
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
                ${styles.replace(/\.pp-flex[^\s:,.#]*/g, `#${uid}`)}
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
