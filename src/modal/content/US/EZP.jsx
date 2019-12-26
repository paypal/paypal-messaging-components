/** @jsx h */
import { h } from 'preact';

import Accordion from '../../parts/Accordion';
import Calculator from '../../parts/Calculator';

const EZP = () => {
    return (
        <section id="ezp-content" className="content">
            <h1 className="title">Choose PayPal Credit at checkout and select Easy Payments</h1>

            <Calculator />

            <div className="accordion-divider" />

            <Accordion title="How Easy Payments Works">
                <p className="first-paragraph">
                    Easy Payments lets you make equal monthly payments over the term of the offer to pay off your
                    purchase, including any interest, if applicable.
                </p>
                <p>You must select Easy Payments at checkout to take advantage of special financing offers.</p>
                <p>
                    The total cost of your purchase will be divided into substantially equal monthly payments. If the
                    merchant ships your items separately, the total cost of each shipment will be divided into
                    substantially equal payments.
                </p>
                <p>
                    The minimum payment on your account will include your Easy Payments purchase, as well as any other
                    purchases you&apos;ve made using PayPal Credit.
                </p>
            </Accordion>

            <div className="accordion-divider" />

            <Accordion title="About Promotional Offers">
                <p className="first-paragraph">
                    Special PayPal Credit promotional offers are available for a limited time only and may vary,
                    depending on where you shop. This promotional offer isn&apos;t valid on previous returns, refunds,
                    and exchanges, or when using the Send Money feature in your PayPal account.
                </p>
            </Accordion>

            <div className="accordion-divider" />

            <div className="anchor-small" style={{ marginTop: '27px' }}>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.paypal.com/ppcreditapply/da/us/lander?p=ppcdalpBAUNI&t=ppcdaltModalTerms"
                >
                    Click here
                </a>{' '}
                to apply for PayPal Credit and view the Terms and Conditions.
            </div>
            <p>
                PayPal Credit is subject to credit approval as determined by the lender, Synchrony Bank, and is
                available to US customers who are of legal age in their state of residence. For New Accounts: Variable
                Purchase APR is 25.99%. The APR is accurate as of 9/1/2019 and will vary with the market based on the
                Prime Rate (as defined in your credit card agreement). Minimum interest charge is $2.00.
            </p>
            <p>Copyright {new Date().getFullYear()} Bill Me Later, Inc. All rights reserved.</p>
        </section>
    );
};

export default EZP;
