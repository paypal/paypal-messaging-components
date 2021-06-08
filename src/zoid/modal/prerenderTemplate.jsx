/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unknown-property */
/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { Spinner } from '@paypal/common-components';

export default ({ uid, doc, props, state }) => {
    const styles = `
      .overlay{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%;
      }
      .background-overlay {
        background-color: rgba(108, 115, 120, 0.85);
      }
      .modal-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        border: 1px solid #888;
        max-width: 637px;
        height: 100%;
        border-radius: 10px;
        right: 9px;
      }
      .spinner{
          position: relative !important;

      }
        
    `;

    const handlePrerenderClose = () => {
        state.prerenderDetails.prerenderElement.classList.add(`${uid}-invisible`);
        state.prerenderDetails.prerenderElement.classList.remove(`${uid}-visible`);
        document.querySelector(`#${uid}`).style.display = 'none';
    };
    return (
        <html lang="en">
            <head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <style>{styles}</style>
            <body>
                <div class="modal">
                    <div class="overlay background-overlay" onClick={handlePrerenderClose} />
                    <div class="modal-content">
                        <div class="close-button">
                            <button onClick={handlePrerenderClose} type="button">
                                Close
                            </button>
                        </div>
                        <Spinner nonce={props.nonce} />
                    </div>
                </div>
            </body>
        </html>
    ).render(dom({ doc }));
};
