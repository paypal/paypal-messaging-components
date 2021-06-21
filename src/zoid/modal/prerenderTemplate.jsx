/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/control-has-associated-label */
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
      .modal-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        border: 1px solid #888;
        max-width: 638px;
        height: 100%;
        border-radius: 10px;
        right: 10px;
        box-shadow: 0 5px 15px 0 rgb(0 0 0 / 50%);
        transition: transform 350ms ease, box-shadow 350ms ease;
        transform: translateY(100%);
      }
      .show-modal{
        transform: translateY(0);
      }
      .spinner{
          position: relative !important;
      }
      .close-button > button {
          background-image: url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' fill='transparent' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0L0 12' transform='translate(12 12)' stroke='%232C2E2F' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M0 0L12 12' transform='translate(12 12)' stroke='%232C2E2F' stroke-width='2' stroke-linecap='round' /%3E%3C/svg%3E");
          width: 38px;
        height: 38px;
        display: block;
        padding: 0;
        border: none;
        cursor: pointer;
        position: absolute;
        top: 12px;
        right: 8px;
        z-index: 50;
      }
        
    `;
    const toggleShow = boolean => {
        const wrapper = state.prerenderDetails.prerenderElement.contentDocument;
        if (boolean) {
            wrapper.getElementsByClassName('modal-content')[0].classList.add('show-modal');
            wrapper.getElementsByClassName('overlay')[0].style.opacity = 1;
            return;
        }
        wrapper.getElementsByClassName('modal-content')[0].classList.remove('show-modal');
        wrapper.getElementsByClassName('overlay')[0].style.opacity = 0;
    };
    const handlePrerenderClose = () => {
        state.prerenderDetails.prerenderElement.classList.add(`${uid}-invisible`);
        state.prerenderDetails.prerenderElement.classList.remove(`${uid}-visible`);
        document.querySelector(`#${uid}`).style.display = 'none';
        toggleShow(false);
    };
    // no way to check if prerenderer is fully loaded so wait 100ms before attempting to see if the elements exist. This timeout only happens on first render
    setTimeout(() => {
        toggleShow(true);
    }, 100);
    return (
        <html lang="en">
            <head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <style>{styles}</style>
            <body>
                <div class="modal">
                    <div class="overlay" onClick={handlePrerenderClose} />
                    <div class="modal-content">
                        <div class="close-button">
                            <button onClick={handlePrerenderClose} type="button" />
                        </div>
                        <Spinner nonce={props.nonce} />
                    </div>
                </div>
            </body>
        </html>
    ).render(dom({ doc }));
};
