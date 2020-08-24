/** @jsx h */
import { h } from 'preact';

import { useServerData, useApplyNow } from '../../../lib';
import Button from '../../../parts/Button';

const terms = (aprEntry = { apr: '', formattedDate: '' }) => [
    'Interest will be charged to your account from the purchase date if the balance is not paid in full within 6 months.',
    'A minimum monthly payment is required and may or may not pay off the promotional purchase by the end of the 6 month period.',
    'No interest will be charged on the purchase if you pay it off in full within 6 months. If you do not, interest will be charged on the purchase from the purchase date at the Purchase APR applicable to your account.',
    `For New Accounts: Variable Purchase APR is ${aprEntry.apr}%. The APR is accurate as of ${aprEntry.formattedDate} and will vary with the market based on the Prime Rate (as defined in your credit card agreement). Minimum interest charge is $2.00.`,
    'Individual items that are less than $99 qualify for special financing when combined for a total of $99 or more in a single transaction.',
    'Multiple separate transactions of less than $99 per transaction cannot be combined to meet the minimum purchase amount.'
];

export default () => {
    const handleApplyNowClick = useApplyNow('Apply Now');
    const { aprEntry } = useServerData();

    return (
        <section className="content-body">
            <div className="description">
                <h2>6 months special financing</h2>

                <p>No Interest if paid in full in 6 months on purchases of $99+. No money due today.</p>

                <div className="payment-breakdown" />

                <p className="apply-now">
                    <div>
                        <p>
                            <b>Get a decision in seconds</b>
                        </p>
                        <span>Subject to credit approval</span>
                    </div>
                    <Button onClick={handleApplyNowClick}>Apply Now</Button>
                </p>
            </div>

            <hr className="divider" />

            <div className="terms">
                <h3>About Special Financing with PayPal Credit</h3>
                <ul>
                    {terms(aprEntry).map(term => (
                        <li>{term}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
