/** @jsx node */
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { Spinner } from '@paypal/common-components';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

export default ({ doc, props, event, state }) => {
    const ERROR_DELAY = 15000;
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
        .overlay{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%;
        }
        .modal-content {
            position: relative;
            margin: auto;
            height: 100%;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
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

        #modal-status{
            color: white;
            position: absolute;
            top: 67%;
            left: calc( 50% - 10px );
            margin-left: -60px;
            display: none;
            padding: 10px;

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
    let renderedModal = false;
    let closeBtn;

    const checkForErrors = element => {
        ZalgoPromise.delay(ERROR_DELAY).then(() => {
            const modalStatus = element.querySelector('#modal-status');
            // if we have a place to put our status message,
            // and we have not heard the 'zoid-rendered' event for the modal yet
            if (modalStatus && !renderedModal) {
                // assign variable to state and access in UI
                modalStatus.style.display = 'block';
                modalStatus.textContent = 'Error loading Modal';
                // TODO: should we report this failure to our log endpoint?
            }
        });
    };

    const focusCloseButton = () => {
        if (closeBtn) {
            window.requestAnimationFrame(() => {
                // TODO: determine how to get this to re-focus if the prerender is dismissed and re-opened
                closeBtn.focus();
            });
        }
    };

    const handleClose = () => {
        event.trigger('modal-hide');
    };

    const handleEscape = evt => {
        if (!renderedModal && state.open && (`${evt?.key}`.toLowerCase().startsWith('esc') || evt?.charCode === 27)) {
            handleClose();
        }
    };

    const handleRender = element => {
        closeBtn = element.querySelector('#prerender-close-btn');
        focusCloseButton();
        ZalgoPromise.delay(ERROR_DELAY).then(() => {
            return checkForErrors(element);
        });
    };

    event.on('zoid-rendered', () => {
        renderedModal = true;
    });

    return (
        <html lang="en">
            <head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <style nonce={props.cspNonce}>{styles}</style>
            <body onRender={handleRender}>
                <div class="modal" aria-errormessage="modal-status">
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                    <div
                        class="overlay"
                        role="dialog"
                        onClick={handleClose}
                        onKeyUp={handleEscape}
                        aria-keyshortcuts="escape"
                    />
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
                            </button>
                        </div>
                        <span id="modal-status" aria-label="modal-status" aria-live="polite">
                            Loading Modal
                        </span>
                        <Spinner nonce={props.cspNonce} />
                    </div>
                </div>
            </body>
        </html>
    ).render(dom({ doc }));
};
