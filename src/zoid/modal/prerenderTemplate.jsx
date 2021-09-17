/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-unknown-property */
/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { Spinner } from '@paypal/common-components';
import { ZalgoPromise } from 'zalgo-promise/src';

const CloseIcon = ({ size = 36, strokeWidth = 1, color = '#000000' }) => {
    const dimension = /^\d+$/.test(`${size}`) ? `${size}` : '36';
    const oneThird = dimension / 3;
    const twoThird = (dimension / 3) * 2;
    const styles = `path{stroke: ${color};stroke-width: ${strokeWidth};stroke-linecap: round;transition: all 0.3s;}`;
    return (
        <svg
            width={dimension}
            height={dimension}
            viewBox={`0 0 ${dimension} ${dimension}`}
            fill="transparent"
            xmlns="http://www.w3.org/2000/svg"
        >
            <style>{styles}</style>
            <path d={`M${twoThird} ${oneThird}L${oneThird} ${twoThird}`} />
            <path d={`M${oneThird} ${oneThird}L${twoThird} ${twoThird}`} />
        </svg>
    );
};

export default ({ doc, props, event }) => {
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
                url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/headlinedark/festivo1.ttf) format('truetype'),
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
                url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/headlinedark/festivo1.ttf) format('truetype'),
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
                url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/headlinedark/festivo1.ttf) format('truetype'),
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
                url(https://www.paypalobjects.com/webstatic/mktg/2014design/font/headlinedark/festivo1.ttf) format('truetype'),
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
            background-color: #fefefe;
            margin: auto;
            border: 1px solid #888;
            max-width: 640px;
            height: 100%;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
            box-shadow: 0 5px 15px 0 rgb(0 0 0 / 50%);
        }
        .spinner{
            position: relative !important;
        }


        .error{
            width: 200px;
            height: 100px;
            position: absolute;
            top: 67%;
            left: 50%;
            margin-left: -60px;
        }

        @media (max-width: 639px), (max-height: 539px){
            .modal{
                overflow-y: hidden;
            }
            .modal-content {
                margin-top: 84px;
                height: calc(100% - 84px);
                
            }
        }
        
        .close svg{
            height: 40px;
            width: 40px;
            margin: 0;
            text-align: center;
        }


        button.close {
            height: 40px;
            width: 40px;
            padding: 0;
            border: none;
            background: transparent;
            top: 5px;
            right: 5px;
            position: absolute;
        }
    `;

    const closeModal = () => event.trigger('modal-hide');

    const checkForErrors = element => {
        ZalgoPromise.delay(ERROR_DELAY).then(() => {
            // check to see if modal content class exists
            if (element.querySelector('.error')) {
                // looks like there is an error if modal content class does not exist.
                // assign variable to state and access in UI
                element.querySelector('.error').style.display = 'block';
                element.querySelector('.error').textContent = 'Something went wrong. Please try again later.';
            }
        });
    };

    return (
        <html lang="en">
            <head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <style>{styles}</style>
            <body onRender={checkForErrors}>
                <div class="modal">
                    <div class="overlay" onClick={closeModal} />
                    <div class="top-overlay" />
                    <div class="modal-content">
                        <button class="close" aria-label="Close" type="button" id="close-btn" onClick={closeModal}>
                            <CloseIcon color="#000000" size="36" />
                        </button>
                        <div class="error" style="display: none"></div>
                        <Spinner nonce={props.nonce} />
                    </div>
                </div>
            </body>
        </html>
    ).render(dom({ doc }));
};
