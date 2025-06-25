/** @jsx node */
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { Spinner } from '@paypal/common-components';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

export default ({ doc, props: { cspNonce, features, onError, onClose }, event, state }) => {
    const ERROR_DELAY = 15000;
    const useNewCheckoutDesign = features?.includes('new-checkout-design') ? 'true' : 'false';
    const styles = `
         @font-face {
            font-family: 'PayPalOpen';
            src: url(https://www.paypalobjects.com/paypal-ui/fonts/PayPalOpen-Regular.woff2) format('woff');
            font-weight: normal;
            font-style: normal;
        }
        html {
            color: #2d2d2d;
            font-family: PayPalOpen, Helvetica, Arial, sans-serif;
            font-size: 14px;
            font-weight: 400;
        }
        .modal{
            overflow-y: scroll;
        }
        ${
            useNewCheckoutDesign === 'true'
                ? ` @media screen and (min-width: 640px) {
                    .overlay {
                        background-color: #ffffff;        
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
                @media screen and (max-width: 639px) {
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
                @media screen and (min-width: 640px) {
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
                @media screen and (max-width: 639px) {
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

        #modal-status {
            color: white;
            position: absolute;
            top: 67%;
            left: calc( 50% - 10px );
            margin-left: -60px;
            display: none;
            padding: 10px;
        }
        
        ${
            useNewCheckoutDesign === 'true' &&
            `
        .close-button > button {
            background-color: transparent;
            width: 48px;
            height: 48px;
        }

        .close-button > button > svg {
            width: 48px;
            height: 48px;

            @include mobile {
                margin-left: 15px;
            }
        }

        @media screen and (max-width: 639px) {
            .close-button > button > svg {
                margin-top: auto;
                margin-left: auto;
            }
        }

        #modal-status {
            color: #545D68;
            position: absolute;
            top: 52%;
            margin-left: -60px;
            display: none;
            padding: 10px;
        }
        `
        }

        @media screen and (max-width: 639px), (max-height: 539px){
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

                // Call the onError handler provided via xprops
                if (onError) {
                    onError({
                        message: modalStatus.textContent
                    });
                }
            }
        });
    };

    const handleClose = () => {
        onClose({ linkName: 'Pre-render Close' });
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
                <svg width="24" height="24" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" width="40" height="40" rx="20" fill="#EDF0F2" />
                    <path
                        d="M26.5005 13.1245C26.6662 13.1246 26.8247 13.1909 26.9419 13.3081C27.0591 13.4253 27.1254 13.5838 27.1255 13.7495C27.1255 13.9154 27.0592 14.0746 26.9419 14.1919L21.1333 19.9995L26.9419 25.8081C26.9999 25.8661 27.0462 25.9345 27.0776 26.0103C27.109 26.086 27.1254 26.1675 27.1255 26.2495C27.1255 26.3315 27.109 26.413 27.0776 26.4888C27.0462 26.5646 27 26.6338 26.9419 26.6919C26.8839 26.7498 26.8155 26.7962 26.7397 26.8276C26.664 26.859 26.5825 26.8754 26.5005 26.8755C26.4185 26.8755 26.337 26.859 26.2612 26.8276C26.1854 26.7962 26.1162 26.75 26.0581 26.6919L19.8081 20.4419C19.7501 20.384 19.7038 20.3154 19.6724 20.2397C19.6409 20.1639 19.6245 20.0816 19.6245 19.9995C19.6246 19.9175 19.641 19.836 19.6724 19.7603C19.7038 19.6845 19.7501 19.616 19.8081 19.5581L26.0581 13.3081C26.1754 13.1908 26.3346 13.1245 26.5005 13.1245Z"
                        fill="black"
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
