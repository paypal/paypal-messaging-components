/** @jsx node */
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { Spinner } from '@paypal/common-components';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { canDebug, ppDebug, DEBUG_CONDITIONS, MODAL_EVENT } from '../../../utils';

export default ({ doc, props, event }) => {
    if (canDebug(DEBUG_CONDITIONS.EVENT_EMITTERS)) {
        ppDebug(`EVENT_EMITTER.MODAL.${props.index}`, { debugObj: event });
    }
    if (canDebug(DEBUG_CONDITIONS.ZOID_EVENTS) && typeof event?.on !== 'undefined') {
        /**
         * Because the prerender modal and modal use the same event bus,
         * we cannot call `event.reset()` to clear the debug listeners for
         * the prerender modal without clearing the listeners for the modal;
         * instead, we'll use this variable to stop prerender modal logs from
         * firing after the PRERENDER_MODAL_DESTROY event.
         *
         * Moreover, belter doesn't appear to provide a `removeListeners` method
         * @see {@link https://github.com/krakenjs/belter/blob/main/src/util.js#L798 belter EventEmitter}
         */
        let exists = false;
        Object.entries(MODAL_EVENT).forEach(([eventId, eventName]) => {
            event.on(eventName, data => {
                if (exists) {
                    ppDebug(`EVENT.PRERENDER_MODAL.${props.index}.${eventId}`, { debugObj: data });
                }
            });
        });
        event.on(MODAL_EVENT.PRERENDER_MODAL_DESTROY, () => {
            exists = true;
        });
    }
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
             background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 44 44' fill='transparent' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0L0 12' transform='translate(12 12)' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M0 0L12 12' transform='translate(12 12)' stroke='white' stroke-width='2' stroke-linecap='round' /%3E%3C/svg%3E");
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
        }

        .error{
            color: white;
            width: 200px;
            height: 100px;
            position: absolute;
            top: 67%;
            left: 50%;
            margin-left: -60px;
            display: none;
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

    const closeModal = () => event.trigger(MODAL_EVENT.MODAL_HIDE);
    const checkForErrors = element => {
        ZalgoPromise.delay(ERROR_DELAY).then(() => {
            // check to see if modal content class exists
            if (element.querySelector('.error')) {
                // looks like there is an error if modal content class does not exist.
                // assign variable to state and access in UI
                element.querySelector('.error').style.display = 'block';
                element.querySelector('.error').textContent = 'Error loading Modal';
            }
        });
    };

    return (
        <html lang="en">
            <head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <style nonce={props.cspNonce}>{styles}</style>
            <body onRender={checkForErrors}>
                <div class="modal">
                    <div class="overlay" onClick={closeModal} />
                    <div class="top-overlay" />
                    <div class="modal-content">
                        <div class="close-button">
                            <button onClick={closeModal} type="button" />
                        </div>
                        <div class="error"></div>
                        <Spinner nonce={props.cspNonce} />
                    </div>
                </div>
            </body>
        </html>
    ).render(dom({ doc }));
};
