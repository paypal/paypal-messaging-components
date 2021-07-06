/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';

import { getOverflowObserver, createTitleGenerator } from '../../utils';

const getTitle = createTitleGenerator();

const getStyles = ({ uid, style: { layout, logo: logoOptions, text: textOptions, ratio: ratioOption = '1x4' } }) => {
    let cssStyles = ``;
    const ratioMap = {
        '1x1': `
            max-height: 300px;
            min-height: 120px;
            max-width: 300px;
            min-width: 100px;
        `,
        '1x4': `
            max-height: 640px;
            min-height: 320px;
            max-width: 160px;
            min-width: 100px;
        `,
        '8x1': `
            max-height: 96px;
            min-height: 42px;
            max-width: 768px;
            min-width: 100px;
        `,
        '20x1': `
            max-height: 70px;
            min-height: 18px;
            max-width: 1169px;
            min-width: 100px;
        `
    };
    if (layout === 'text') {
        const { size: textSize = 12 } = textOptions ?? {};
        const { position: logoPosition = 'left' } = logoOptions ?? {};
        let height = Math.floor(textSize * 2.3);

        if (logoPosition === 'top') {
            height += 10;
        }

        cssStyles = `
        height: ${height}px;
        min-width: 100px;
        `;
    } else if (layout === 'flex') {
        cssStyles = ratioMap[ratioOption];
    } else {
        cssStyles = ``;
    }
    const baseStyle = `
        #${uid} {
            display: block;
            width: 100%;
            position: relative;
            box-sizing: border-box;
        }
        #${uid} > iframe {
            width: 100%;
            height: 100%;
            border: 0;
        }
    `;
    // when we remove the prerender iframe, we'll remove this css as well
    const prerenderStyle = `
        #${uid} > iframe:nth-of-type(1){
            ${cssStyles}
        }
        #${uid} > iframe:nth-of-type(2){
            display: none;
            min-height: 10px;
        }
    `.replace(/[\s\n]+/g, ' ');
    return [baseStyle, prerenderStyle];
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
    const baseStyles = getStyles({ ...props, uid });

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
        // remove the css setting the prerender and hiding the banner
        const style = container.querySelector(`#${uid} style:nth-of-type(2)`);
        style.parentNode.removeChild(style);
        // remove the prerender element
        prerenderFrame.parentNode.removeChild(prerenderFrame);
    });
    const messageTitle = getTitle(frame.title);
    return (
        <span id={uid}>
            {baseStyles.map(css => (
                <style>{css}</style>
            ))}
            <node el={prerenderFrame} title={`Prerender ${messageTitle}`} />
            <node el={frame} title={messageTitle} onRender={setupAutoResize} />
        </span>
    ).render(dom({ doc }));
};
