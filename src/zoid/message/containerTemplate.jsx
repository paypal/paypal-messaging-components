/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { EVENT } from 'zoid/src';

export default ({ uid, frame, prerenderFrame, doc, event }) => {
    event.on(EVENT.RENDERED, () => {
        // prerenderFrame.style.setProperty('display', 'none');
        prerenderFrame.parentNode.removeChild(prerenderFrame);
    });

    const setupAutoResize = el => {
        const overflow = {
            _state: [false, false],
            _checkOverflow() {
                if (this._state.some(Boolean)) {
                    el.style.setProperty('opacity', 0, 'important');
                    el.style.setProperty('pointer-events', 'none', 'important');
                } else {
                    el.style.setProperty('opacity', null);
                    el.style.setProperty('pointer-events', null);
                }
            },
            get width() {
                return this._state[0];
            },
            set width(val) {
                this._state[0] = val;
                this._checkOverflow();
            },
            get height() {
                return this._state[1];
            },
            set height(val) {
                this._state[1] = val;
                this._checkOverflow();
            }
        };

        event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
            if (typeof newHeight === 'number') {
                el.style.setProperty('height', `${newHeight}px`);

                requestAnimationFrame(() => {
                    if (el.parentNode.parentNode.offsetHeight < newHeight) {
                        if (!overflow.height) {
                            console.warn(
                                `[PayPal Messages] PayPal Credit Message requires minimum height of ${newHeight}px. Current container is ${el.parentNode.parentNode.offsetHeight}px. Message has been hidden.`
                            );
                        }
                        overflow.height = true;
                    } else {
                        overflow.height = false;
                    }
                });
            }

            if (el.parentNode.parentNode.offsetWidth < newWidth) {
                if (!overflow.width) {
                    console.warn(
                        `[PayPal Messages] PayPal Credit Message requires minimum width of ${newWidth}px. Current container is ${el.parentNode.parentNode.offsetWidth}px. Message has been hidden.`
                    );
                }
                overflow.width = true;
            } else {
                overflow.width = false;
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
                ${styles.replace(/\.pp-flex[^\s:]*/, `#${uid}`)}
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
