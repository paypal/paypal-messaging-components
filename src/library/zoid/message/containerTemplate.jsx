/** @jsx node */
import { node, dom } from '@krakenjs/jsx-pragmatic/src';

import {
    getOverflowObserver,
    createTitleGenerator,
    canDebug,
    ppDebug,
    DEBUG_CONDITIONS,
    MESSAGE_EVENT
} from '../../../utils';

const getTitle = createTitleGenerator();

export default ({ uid, frame, prerenderFrame, doc, event, props, container }) => {
    if (canDebug(DEBUG_CONDITIONS.PROPS)) {
        ppDebug(`EVENT.MESSAGE.${props.index}.PROPS`, { debugObj: props });
    }
    if (canDebug(DEBUG_CONDITIONS.EVENT_EMITTERS)) {
        ppDebug(`EVENT_EMITTER.MESSAGE.${props.index}`, { debugObj: event });
    }
    if (canDebug(DEBUG_CONDITIONS.ZOID_EVENTS) && typeof event?.on !== 'undefined') {
        Object.entries(MESSAGE_EVENT).forEach(([eventId, eventName]) =>
            event.on(eventName, debugObj => ppDebug(`EVENT.MESSAGE.${props.index}.${eventId}`, { debugObj }))
        );
    }

    event.on(MESSAGE_EVENT.RENDERED, () => {
        prerenderFrame.parentNode.removeChild(prerenderFrame);
    });

    const setupAutoResize = el => {
        event.on(MESSAGE_EVENT.RESIZE, ({ width, height }) => {
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
                    event.once(MESSAGE_EVENT.STYLES, () => {
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

    event.on(MESSAGE_EVENT.STYLES, ({ styles }) => {
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
