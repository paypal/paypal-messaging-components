import objectEntries from 'core-js-pure/stable/object/entries';
import { request, getActiveTags, ppDebug, getOrCreateStorageID } from '../../utils';

const addToDom = (button, markup) => {
    const documentBody = new DOMParser().parseFromString(markup, 'text/html'); // turn string into html elements

    const buttonElement = button;
    buttonElement.innerHTML = null; // remove any existing child elements

    buttonElement.appendChild(documentBody.firstChild.querySelector('div')); // add child elements

    return buttonElement;
};

const Message = function(markup, meta, parentStyles, warnings, frame = null) {
    const { onClick, onReady, onHover, onMarkup, onProps, resize, style } = window.xprops;
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

    const buttonElement = document.createElement('button');

    buttonElement.setAttribute('type', 'button');
    buttonElement.setAttribute('aria-label', 'PayPal Credit Message');

    buttonElement.addEventListener('click', handleClick);
    buttonElement.addEventListener('mouseover', handleHover);
    buttonElement.addEventListener('focus', handleHover);

    buttonElement.style.display = 'block';
    buttonElement.style.background = 'transparent';
    buttonElement.style.padding = 0;
    buttonElement.style.border = 'none';
    buttonElement.style.outline = 'none';
    buttonElement.style.textAlign = style?.text?.align || 'left';
    buttonElement.style.fontFamily = 'inherit';
    buttonElement.style.fontSize = 'inherit';

    let button = addToDom(buttonElement, markup);

    let buttonWidth = button.offsetWidth;
    let buttonHeight = button.offsetHeight;
    // Zoid will not fire a resize event if the markup has the same dimensions meaning the render event
    // in the overflow observer will not fire. This forces the resize event to fire for every render
    // so that the render complete logs will always fire
    if (dimensionsRef.current.width === buttonWidth && dimensionsRef.current.height === buttonHeight) {
        resize({ width: buttonWidth, height: buttonHeight });
    } else {
        dimensionsRef.current = { width: buttonWidth, height: buttonHeight };
    }

    if (typeof onReady === 'function') {
        onReady({
            meta,
            activeTags: getActiveTags(button),
            // Utility will create iframe deviceID if it doesn't exist.
            deviceID: getOrCreateStorageID()
        });
    }

    if (typeof onMarkup === 'function') {
        onMarkup({ meta, styles: parentStyles, warnings });
    }

    if (typeof onProps === 'function') {
        onProps(() => {
            const {
                amount,
                currency,
                buyerCountry,
                // style, linting doesn't like since its on like 16
                offer,
                payerId,
                clientId,
                merchantId,
                version,
                env
            } = window.xprops;

            const query = objectEntries({
                message_request_id: meta.messageRequestId,
                amount,
                currency,
                buyer_country: buyerCountry,
                style: window.xprops.style,
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
                        `${acc}&${key}=${encodeURIComponent(typeof val === 'object' ? JSON.stringify(val) : val)}`,
                    ''
                )
                .slice(1);

            ppDebug('Updating message with new props...', { inZoid: true });

            request('GET', `${window.location.origin}/credit-presentment/renderMessage?${query}`).then(({ data }) => {
                button = addToDom(button, data.markup ?? markup);
                frame.appendChild(button);

                buttonWidth = button.offsetWidth;
                buttonHeight = button.offsetHeight;
                // Zoid will not fire a resize event if the markup has the same dimensions meaning the render event
                // in the overflow observer will not fire. This forces the resize event to fire for every render
                // so that the render complete logs will always fire
                if (dimensionsRef.current.width === buttonWidth && dimensionsRef.current.height === buttonHeight) {
                    // resizes the iframe
                    resize({ width: buttonWidth, height: buttonHeight });
                } else {
                    dimensionsRef.current = { width: buttonWidth, height: buttonHeight };
                }

                // resizes the parent message div
                onMarkup({
                    meta: data.meta ?? meta,
                    styles: data.parentStyles ?? parentStyles,
                    warnings: data.warnings ?? warnings
                });

                if (!frame) {
                    return button;
                }
                return frame;
            });
        });
    }

    // test doesn't have a document body. Need to return just the the button for the test
    if (!frame) {
        return button;
    }

    frame.appendChild(button);
    return frame;
};

export default Message;
