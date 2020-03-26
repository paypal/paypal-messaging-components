/** @jsx h */
import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { ServerContext } from '../../lib/context';
import Accordion from '../../parts/Accordion';

const NI = () => {
    const { payerId } = useContext(ServerContext);

    return (
        <section id="ni-content" className="content">
            <h1 className="title">Choose PayPal at checkout and select PayPal Credit</h1>

            <div className="accordion-divider" />

            <Accordion
                title="No Interest if paid in full in 6 months on purchases of $99 or more"
                description="Interest will be charged to your account from the purchase date if the balance is not paid in full
                within 6 months."
            >
                <ul className="spaced">
                    <li>
                        A minimum monthly payment is required and may or may not pay off the promotional purchase by the
                        end of the 6 month period.
                    </li>
                    <li>
                        No interest will be charged on the purchase if you pay it off in full within 6 months. If you do
                        not, interest will be charged on the purchase from the purchase date at the Purchase APR
                        applicable to your account.
                    </li>
                    <li>
                        For New Accounts: Variable Purchase APR is 25.99%. The APR is accurate as of 9/1/2019 and will
                        vary with the market based on the Prime Rate (as defined in your credit card agreement). Minimum
                        interest charge is $2.00.
                    </li>
                    <li>
                        Individual items that are less than $99 qualify for special financing when combined for a total
                        of $99 or more in a single transaction.
                    </li>
                    <li>
                        Multiple separate transactions of less than $99 per transaction cannot be combined to meet the
                        minimum purchase amount.
                    </li>
                </ul>
            </Accordion>

            <div className="accordion-divider" />

            <Accordion title="Buy now and pay over time when you spend $98.99 or less">
                <ul className="spaced">
                    <li>Avoid paying interest by paying your balance in full each month by the due date.</li>
                    <li>
                        You can also make payments until you&apos;ve paid off your balance according to your standard
                        account terms. Interest charges may apply.
                    </li>
                    <li>
                        We&apos;ll send you email reminders when your payments are due. You can keep track of your
                        account and view your statements online at any time.
                    </li>
                </ul>
            </Accordion>

            <div className="accordion-divider" />

            <Accordion title="About PayPal Credit">
                <p>
                    PayPal Credit is a digital, reusable credit line available to purchase goods and services from
                    thousands of online stores. Use PayPal Credit to shop anywhere PayPal is accepted.
                </p>
                <p>
                    Whether you&apos;re buying the perfect gift or purchasing a new couch, you can get 6 months special
                    financing on purchases of $99 or more. The best part? This isn&apos;t a one-time offer. You can
                    enjoy paying over time every time you shop with PayPal Credit.
                </p>
                <p>PayPal Credit delivers the same trust, security, and flexibility that you get from PayPal.</p>
            </Accordion>

            <div className="accordion-divider" />

            <div style={{ marginTop: '32px' }} id="terms" className="anchor-small">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.paypal.com/ppcreditapply/da/us/lander?p=ppcdalpBAUNI&t=ppcdaltModalTerms&payer_id=${payerId}`}
                >
                    Click here
                </a>{' '}
                to apply for PayPal Credit and view the Terms and Conditions.
            </div>
            <p>
                PayPal Credit is subject to credit approval as determined by the lender, Synchrony Bank, and is
                available to US customers who are of legal age in their state of residence. You must pay with PayPal
                Credit to get the offers. Minimum purchase required is before shipping and tax. Offers not valid on
                previous purchases, returns or exchanges.
            </p>
            <p>Copyright {new Date().getFullYear()} Bill Me Later, Inc. All rights reserved.</p>
        </section>
    );
};

export default NI;
