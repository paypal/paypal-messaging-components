/** @jsx node */
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { EVENT } from '@krakenjs/zoid/src';

import { getOverflowObserver, createTitleGenerator } from '../../../utils';

const getTitle = createTitleGenerator();

export default ({ uid, frame, prerenderFrame, doc, event, props, container }) => {
    event.on(EVENT.RENDERED, () => {
        prerenderFrame.parentNode.removeChild(prerenderFrame);
    });

    const setupAutoResize = el => {
        event.on(EVENT.RESIZE, ({ width, height }) => {
            // When you zoom in or out on a page in Chrome, the outerWidth and innerWidth calculations go out of sync.
            // The difference between them is determined by dividing the outerWidth and the innerWidth (zoomLevel).
            // To normalize this value so that the iframe does not report an incorrect width, we multiply the width that the iframe would report by the zoomLevel.
            const zoomLevel = window.parent.outerWidth / window.parent.innerWidth;
            const adjustedWidth = width * zoomLevel;

            if (width !== 0 || height !== 0) {
                if (props.style.layout === 'flex') {
                    // Ensure height property does not exist for flex especially when swapping from text to flex
                    el.style.setProperty('height', null);
                    // Prevent the observer from trying to render a fallback message
                    el.setAttribute('data-width', 0);
                    el.setAttribute('data-height', 0);
                } else {
                    // Attributes used by the overflow observer
                    // To account for browsers where the difference between the outerWidth and innerWidth is imprecise/the zoom level is calculated
                    // based on other means (i.e. Firefox), we add a margin of error check so that the adjustedWidth is only used if the difference is significant.
                    el.setAttribute('data-width', zoomLevel <= 0.95 || zoomLevel >= 1.05 ? adjustedWidth : width);
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
            <style nonce={props.cspNonce}>{baseStyles}</style>
            <node el={frame} title={messageTitle} onRender={setupAutoResize} />
            <node el={prerenderFrame} title={`Prerender ${messageTitle}`} />
        </span>
    ).render(dom({ doc }));
};
