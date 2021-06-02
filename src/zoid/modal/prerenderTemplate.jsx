/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-unknown-property */
/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { Spinner } from '@paypal/common-components';

export default ({ doc, props }) => {
    const styles = `
    .modal {
        position: fixed;
        z-index: 1; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%;
        background-color: rgb(0,0,0);
        background-color: rgba(108, 115, 120, 0.85);
      }
      
      .modal-content {
        background-color: #fefefe;
        margin: auto;
        border: 1px solid #888;
        max-width: 640px;
        height: 100%;
        border-radius: 10px;
        box-shadow: 0px 10px 14px 1px rgb(0 0 0 / 60%);
      }
      .spinner{
          position: relative !important;

      }
        
    `;
    return (
        <html lang="en">
            <head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <style>{styles}</style>
            <body>
                <div class="modal">
                    <div class="modal-content">
                        <Spinner nonce={props.nonce} />
                    </div>
                </div>
            </body>
        </html>
    ).render(dom({ doc }));
};
