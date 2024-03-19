/** @jsx node */
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { Spinner } from '@paypal/common-components';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

export default ({ doc, props: { cspNonce, features }, event, state }) => {
    const ERROR_DELAY = 15000;
    const useNewCheckoutDesign = features === 'new-checkout-design' ? 'true' : 'false';
    const styles = `
        @font-face {
            font-family: 'PayPalSansBig';
            font-weight: 600;
            src: url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Medium.eot);
            src: url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Medium.eot?#iefix)
                    format('embedded-opentype'),
                url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Medium.woff)
                    format('woff'),
                url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Medium.svg) format('svg');
        }
        
        @font-face {
            font-family: 'PayPalSansBig';
            font-weight: 200;
            src: url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Light.eot);
            src: url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Light.eot?#iefix)
                    format('embedded-opentype'),
                url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Light.woff)
                    format('woff'),
                url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansBig-Light.svg) format('svg');
        }
        
        @font-face {
            font-family: 'PayPalSansSmall';
            font-weight: 400;
            src: url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansSmall-Regular.eot);
            src: url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansSmall-Regular.eot?#iefix)
                    format('embedded-opentype'),
                url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansSmall-Regular.woff)
                    format('woff'),
                url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansSmall-Regular.svg)
                    format('svg');
        }
        
        @font-face {
            font-family: 'PayPalSansSmall';
            font-weight: 600;
            src: url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansSmall-Medium.eot);
            src: url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansSmall-Medium.eot?#iefix)
                    format('embedded-opentype'),
                url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansSmall-Medium.woff)
                    format('woff'),
                url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/PP-Sans/PayPalSansSmall-Medium.svg)
                    format('svg');
        }
        html {
            color: #2d2d2d;
            font-family: PayPal-Sans, Helvetica, Arial, sans-serif;
            font-size: 14px;
            font-weight: 400;
        }
        .modal{
            overflow-y: scroll;
        }
        ${
            useNewCheckoutDesign === 'true'
                ? ` @media (min-device-width: 640px) {
                    .overlay {
                        background-color: #f1f2f3;        
                        position: fixed;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 424px;
                        height: 90vh;
                        border-radius: 32px;
                        border: 1px solid #cdd0d4;
                    }
                }
                @media (max-device-width: 639px) {
                    .overlay {
                        background-color: #f1f2f3;
                        position: fixed;
                        left: 0;
                        top: 0;
                        width: 100%; 
                        height: 100%;
                    }
                }
            `
                : `.overlay {
                position: fixed;
                left: 0;
                top: 0;
                width: 100%; 
                height: 100%;
            }`
        }
        .modal-content {
            position: relative;
            margin: auto;
            height: 100%;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
        }
        ${
            useNewCheckoutDesign === 'true' &&
            `
                @media screen and (min-device-width: 640px) {
                    #prerender-close-btn {
                        position: relative;
                    }
                    .close-button {
                        position: absolute;
                        width: 424px;
                        transform: translate(-50%, -50%);
                        top: 85px;
                        left: 50%;
                        padding-left: 25px;
                        z-index: 50;
                    }
                }
                @media screen and (max-device-width: 639px) {
                    #prerender-close-btn {
                        left: 0;
                    }
                }

                .spinnerImage{
                    display: none;
                }
                .loader {
                    width: 44px !important;
                    height: 44px !important;
                    margin: 0 0 0 -22px !important;
                    background-color: transparent !important;
                    animation: rotation 1.3s infinite linear !important;
                    border-left: 3px solid #0544b5 !important;
                    border-right: 3px solid #0544b5 !important;
                    border-bottom: 3px solid transparent !important;
                    border-top: 3px solid #0544b5 !important;
                    border-radius: 100% !important;
                    top: 20;
                    }
            `
        }
        .spinner{
            position: relative !important;
        }
        .close-button > button {
            background-color: transparent;
            width: 48px;
            height: 48px;
            display: block;
            padding: 0;
            border: none;
            cursor: pointer;
            position: absolute;
            z-index: 50;
            right: 0;
            margin-right: 2px;
            margin-top: 2px;
        }

        .close-button > button > svg {
            width: 48px;
            height: 48px;
        }

        ${
            useNewCheckoutDesign === 'true'
                ? `#modal-status {
                    color: #545D68;
                    position: absolute;
                    top: 58%;
                    left: calc( 50% - 10px );
                    margin-left: -60px;
                    display: none;
                    padding: 10px;
                }`
                : `#modal-status{
                    color: white;
                    position: absolute;
                    top: 67%;
                    left: calc( 50% - 10px );
                    margin-left: -60px;
                    display: none;
                    padding: 10px;
            }`
        }

        @media (max-width: 639px), (max-height: 539px){
            .modal{
                overflow-y: hidden;
            }
            .modal-content {
                height: calc(100% - 84px);
                
            }
        }
        
    `;
    let closeBtn;

    const checkForErrors = element => {
        ZalgoPromise.delay(ERROR_DELAY).then(() => {
            const modalStatus = element.querySelector('#modal-status');
            // if we have a place to put our status message,
            // and we have not heard the 'zoid-rendered' event for the modal yet
            if (modalStatus && !state.renderedModal) {
                // assign variable to state and access in UI
                modalStatus.style.display = 'block';
                modalStatus.textContent = 'Error loading Modal';
                // TODO: should we report this failure to our log endpoint?
            }
        });
    };

    const handleClose = () => {
        event.trigger('modal-hide');
    };

    const handleEscape = evt => {
        if (!state.renderedModal && state.open && (evt.key === 'Escape' || evt.key === 'Esc' || evt.charCode === 27)) {
            handleClose();
        }
    };

    const handleRender = element => {
        closeBtn = element.querySelector('#prerender-close-btn');
        // we need to give chrome a moment before we can focus the close button
        window.requestAnimationFrame(() => {
            closeBtn?.focus();
        });
        ZalgoPromise.delay(ERROR_DELAY).then(() => {
            return checkForErrors(element);
        });
    };

    event.on('modal-show', () => {
        if (!state.renderedModal) {
            // we need to give chrome a moment before we can focus the close button
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    closeBtn?.focus();
                });
            });
        }
    });

    const renderCloseButton = () => {
        if (useNewCheckoutDesign === 'true') {
            return (
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.203 4.793a1 1 0 0 1 0 1.414L9.91 12.5l6.293 6.293a1 1 0 0 1-1.414 1.414l-6.993-6.993a1.01 1.01 0 0 1 0-1.428l6.993-6.993a1 1 0 0 1 1.414 0Z"
                        fill="#545D68"
                    />
                </svg>
            );
        }
        return (
            <svg
                aria-hidden="true"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 0L0 12"
                    transform="translate(12 12)"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                />
                <path
                    d="M0 0L12 12"
                    transform="translate(12 12)"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                />
            </svg>
        );
    };

    return (
        <html lang="en">
            <head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <style nonce={cspNonce}>{styles}</style>
            {/* 
                disable jsx-a11y/no-static-element-interactions
                    because we need handleEscape to work regardless of which element has focus,
                    and Safari currently forbids an iframe from setting focus within its document
                    until the user interacts with the contents of the iframe 
            */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <body onRender={handleRender} onKeyUp={handleEscape}>
                <div class="modal" aria-errormessage="modal-status">
                    {/* 
                        disable jsx-a11y/click-events-have-key-events 
                            because although the overlay does not have a keyup listener, the body does 
                        disable jsx-a11y/no-static-element-interactions
                            because if we give it `role="button"`, then it will require the overlay be 
                            focusable, which is unnecessary given the `#prerender-close-btn`
                    */}
                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
                    <div class="overlay" onClick={handleClose} aria-keyshortcuts="escape" />
                    <div class="top-overlay" />
                    <div class="modal-content">
                        <div class="close-button">
                            <button
                                id="prerender-close-btn"
                                onClick={handleClose}
                                type="button"
                                aria-label="Close"
                                tabindex="0"
                            >
                                {renderCloseButton()}
                            </button>
                        </div>
                        <span id="modal-status" aria-label="modal-status" aria-live="polite">
                            Loading Modal
                        </span>
                        <Spinner nonce={cspNonce} />
                    </div>
                </div>
            </body>
        </html>
    ).render(dom({ doc }));
};
