import objectEntries from 'core-js-pure/stable/object/entries';

import { request, getActiveTags } from '../../utils';
// import { useXProps, useServerData } from './lib';

const addToDom = (button, markup) => {
    const documentBody = new DOMParser().parseFromString(markup, 'text/html');
    button.appendChild(documentBody.firstChild.querySelector('div'));
    return button;
};

const Message = function(markup, meta, parentStyles, warnings, frame) {
    const {
        onClick,
        onReady,
        onHover,
        onMarkup,
        // onResize,
        onProps
    } = window.xprops;

    const dimensionsRef = { current: { width: 0, height: 0 } };

    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick({ meta });
        }
    };

    const handleHover = () => {
        if (typeof onHover === 'function') {
            onHover({ meta });
        }
    };

    const createButton = () => {
        const { style } = window.xprops;
        const button = document.createElement('button');

        button.setAttribute('type', 'button');
        button.setAttribute('aria-label', 'PayPal Credit Message');

        button.addEventListener('click', handleClick);
        button.addEventListener('mouseover', handleHover);
        button.addEventListener('focus', handleHover);

        button.style.display = 'block';
        button.style.background = 'transparent';
        button.style.padding = 0;
        button.style.border = 'none';
        button.style.outline = 'none';
        button.style.textAlign = style?.text?.align || 'left';
        button.style.fontFamily = 'inherit';
        button.style.fontSize = 'inherit';

        return button;
    };

    if (markup) {
        let button = addToDom(createButton(), markup);
        frame.appendChild(button);
        window.addEventListener('DOMContentLoaded', () => {
            // const buttonWidth = button.offsetWidth;
            // const buttonHeight = button.offsetHeight;
            // Zoid will not fire a resize event if the markup has the same dimensions meaning the render event
            // in the overflow observer will not fire. This forces the resize event to fire for every render
            // so that the render complete logs will always fire
            // if (dimensionsRef.current.width === buttonWidth && dimensionsRef.current.height === buttonHeight) {
            //     resize({ width: buttonWidth, height: buttonHeight });
            // } else {
            //     dimensionsRef.current = { width: buttonWidth, height: buttonHeight };
            // }

            // needs to fire on event
            if (typeof onReady === 'function') {
                onReady({ meta, activeTags: getActiveTags(button) });
            }

            // needs to fire on event
            if (typeof onMarkup === 'function') {
                onMarkup({ meta, styles: parentStyles, warnings });
            }
            // window.xprops.onResize = () => {
            //     console.error('hello world');
            // };
            // console.error(window.xprops.onResize);
            // resize(button)

            if (typeof onProps === 'function') {
                onProps(() => {
                    const {
                        amount,
                        currency,
                        buyerCountry,
                        style,
                        offer,
                        payerId,
                        clientId,
                        merchantId,
                        version,
                        env,
                        resize
                    } = window.xprops;

                    const query = objectEntries({
                        message_request_id: meta.messageRequestId,
                        amount,
                        currency,
                        buyer_country: buyerCountry,
                        style,
                        credit_type: offer,
                        payer_id: payerId,
                        client_id: clientId,
                        merchant_id: merchantId,
                        version,
                        env
                    })
                        .filter(([, val]) => Boolean(val))
                        .reduce(
                            (acc, [key, val]) =>
                                `${acc}&${key}=${encodeURIComponent(
                                    typeof val === 'object' ? JSON.stringify(val) : val
                                )}`,
                            ''
                        )
                        .slice(1);

                    request('GET', `${window.location.origin}/credit-presentment/renderMessage?${query}`).then(
                        ({ data }) => {
                            while (frame.firstChild) {
                                frame.removeChild(frame.firstChild);
                            }

                            button = addToDom(createButton(), data.markup ?? markup);
                            frame.appendChild(button);

                            const buttonWidth = button.offsetWidth;
                            const buttonHeight = button.offsetHeight;
                            // Zoid will not fire a resize event if the markup has the same dimensions meaning the render event
                            // in the overflow observer will not fire. This forces the resize event to fire for every render
                            // so that the render complete logs will always fire
                            if (
                                dimensionsRef.current.width === buttonWidth &&
                                dimensionsRef.current.height === buttonHeight
                            ) {
                                resize({ width: buttonWidth, height: buttonHeight });
                            } else {
                                dimensionsRef.current = { width: buttonWidth, height: buttonHeight };
                            }

                            if (window.xprops.style.layout === 'text') {
                                resize({ width: button.offsetWidth, height: button.offsetHeight });
                            } else {
                                resize(button);
                            }

                            onMarkup({
                                meta: data.meta ?? meta,
                                styles: data.parentStyles ?? parentStyles,
                                warnings: data.warnings ?? warnings
                            });
                        }
                    );
                });
            }
        });
    }
};

export default Message;
