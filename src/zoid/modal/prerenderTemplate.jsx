/** @jsx node */
import { node, dom } from 'jsx-pragmatic/src';
import { Spinner } from '@paypal/common-components';

export default ({ doc, props }) => {
    return (
        <html lang="en">
            <head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <div className="modal-wrapper">
                    <section className="modal-container show ">
                        <div className="wrapper">
                            <div className="top-overlay" />
                            <div className="content-wrapper">
                                <div className="content-background">
                                    <Spinner nonce={props.nonce} />
                                </div>
                            </div>
                        </div>
                        <div className="overlay" />
                        <div className="overlay-side left" style={{ left: '0px', width: `calc((100 % -640px) / 2)` }} />
                        <div className="overlay-side right" style={{ right: '0px', width: `calc((100 % -640) / 2)` }} />
                    </section>
                </div>
            </body>
        </html>
    ).render(dom({ doc }));
};
