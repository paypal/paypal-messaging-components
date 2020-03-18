/** @jsx h */
import { h } from 'preact';
import { useRef } from 'preact/hooks';

import { useXProps, useScroll, useApplyNow } from '../../lib/hooks';
import { createEvent } from '../../../utils';
import Icon from '../../parts/Icon';
import Calculator from '../../parts/Calculator';
import Button from '../../parts/Button';

const instructions = [
    ['monogram', 'Choose PayPal Credit at checkout and use the Easy Payments offer that works for you.'],
    ['calendar', 'Split your purchase into equal monthly payments over the length of the offer. May include interest.'],
    ['truck', "If your items ship separately, we'll split each new shipment into equal monthly payments."],
    ['tags', 'Your PayPal Credit minimum monthly payment includes all Easy Payments and other PayPal Credit purchases.']
];

export const Header = () => {
    const buttonRef = useRef();
    const handleApplyNowClick = useApplyNow('Apply Now');

    useScroll(event => {
        const { offsetTop, clientHeight } = buttonRef.current;

        // Ensure first that the button is being displayed
        if (offsetTop) {
            if (event.target.scrollTop - offsetTop < clientHeight + 30) {
                window.dispatchEvent(createEvent('apply-now-hidden'));
            } else {
                window.dispatchEvent(createEvent('apply-now-visible'));
            }
        }
    }, []);

    return (
        <div className="content-header">
            <div className="content-header__image-wrapper">
                <div style={{ width: '115%' }}>
                    <Icon name="cart" />
                </div>
            </div>
            <h1 className="content-header__title">Split your purchases into equal monthly payments</h1>
            <p className="content-header__tag">Subject to credit approval.</p>
            <Button ref={buttonRef} onClick={handleApplyNowClick}>
                Apply Now
            </Button>
        </div>
    );
};

export const Content = () => {
    const { onClick } = useXProps();

    return (
        <section className="content-body">
            <Calculator />

            <hr className="content-body__divider" />

            <h2 className="content-body__title">How it works</h2>
            <ul className="content-body__instructions-list">
                {instructions.map(([icon, instruction]) => (
                    <li className="content-body__instructions-item">
                        <div>
                            <Icon name={icon} />
                        </div>
                        <p>{instruction}</p>
                    </li>
                ))}
            </ul>

            <hr className="content-body__divider" />

            <h2 className="content-body__title">About promotional offers</h2>
            <p>
                PayPal Credit promotional offers are available for a limited time only and may vary, depending on where
                you shop. Offers aren&apos;t valid on previous returns, refunds, and exchanges, or when using the Send
                Money feature in your PayPal account.
            </p>

            <hr className="content-body__divider" />

            <div className="content-body__terms">
                <p>
                    <a
                        onClick={() => onClick('Legal Terms')}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.paypal.com/us/webapps/mpp/ppcterms"
                    >
                        Click here
                    </a>{' '}
                    to view the PayPal Credit Terms and Conditions.
                </p>
                <p>
                    PayPal Credit is subject to credit approval as determined by the lender, Synchrony Bank, and is
                    available to US customers who are of legal age in their state of residence. You must pay with PayPal
                    Credit to get the offers. Offers not valid on previous purchases, returns or exchanges. Minimum
                    purchase required is before shipping and tax. For New Accounts: Variable Purchase APR is 25.49%. The
                    APR is accurate as of 3/1/2020 and will vary with the market based on the Prime Rate (as defined in
                    your credit card agreement). Minimum interest charge is $2.00.
                </p>
                <p>Copyright {new Date().getFullYear()} Bill Me Later, Inc. All rights reserved.</p>
            </div>
        </section>
    );
};
