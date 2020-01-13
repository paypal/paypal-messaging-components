/** @jsx h */
import { h } from 'preact';

import Icon from '../../parts/Icon';

const terms = [
    'Interest will be charged to your account from the purchase date if the balance is not paid in full within 6 months.',
    'A minimum monthly payment is required and may or may not pay off the promotional purchase by the end of the 6 month period.',
    'No interest will be charged on the purchase if you pay it off in full within 6 months. If you do not, interest will be charged on the purchase from the purchase date at the Purchase APR applicable to your account.',
    'For New Accounts: Variable Purchase APR is 25.99%. The APR is accurate as of 9/1/2019 and will vary with the market based on the Prime Rate (as defined in your credit card agreement). Minimum interest charge is $2.00.',
    'Individual items that are less than $99 qualify for special financing when combined for a total of $99 or more in a single transaction.',
    'Multiple separate transactions of less than $99 per transaction cannot be combined to meet the minimum purchase amount.'
];

const instructions = [
    [
        'card',
        'PayPal Credit is a reusable credit line you can use to shop online at millions of stores that accept PayPal.'
    ],
    ['badge', 'Pay with the same trust, security, and flexibility you always get from PayPal.'],
    ['monogram', 'Click the PayPal button at checkout and choose to pay with PayPal Credit.']
];

export const Header = () => (
    <div className="ni-header">
        <div className="ni-header__image-wrapper">
            <Icon name="rocket" />
        </div>
        <h1 className="ni-header__title">Buy now and pay over time with PayPal Credit</h1>
        <p className="ni-header__tag">Subject to credit approval.</p>
        <a
            href="https://www.paypal.com/ppcreditapply/da/us?cats_id=DA_AD_OTHER"
            target="_blank"
            rel="noopener noreferrer"
        >
            <button className="ni-header__button" type="button">
                Apply Now
            </button>
        </a>
    </div>
);

export const Content = () => (
    <section className="ni-content">
        <h2 className="ni-content__title">No Interest if paid in full in 6 months on purchases of $99 or more</h2>
        <ul className="ni-content__terms-list">
            {terms.map(term => (
                <li className="ni-content__terms-item">{term}</li>
            ))}
        </ul>

        <hr className="ni-content__divider" />

        <h2 className="ni-content__title">How PayPal Credit works</h2>
        <ul className="ni-content__instructions-list">
            {instructions.map(([icon, instruction]) => (
                <li className="ni-content__instructions-item">
                    <div>
                        <Icon name={icon} />
                    </div>
                    <p>{instruction}</p>
                </li>
            ))}
        </ul>

        <div className="ni-content__terms">
            <p>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.paypal.com/ppcreditapply/da/us/lander?p=ppcdalpBAUNI&t=ppcdaltModalTerms"
                >
                    Click here
                </a>{' '}
                to apply for PayPal Credit and view the Terms and Conditions.
            </p>
            <p>
                PayPal Credit is subject to credit approval as determined by the lender, Synchrony Bank, and is
                available to US customers who are of legal age in their state of residence. You must pay with PayPal
                Credit to get the offers. Minimum purchase required is before shipping and tax. Offers not valid on
                previous purchases, returns or exchanges.
            </p>
            <p>Copyright {new Date().getFullYear()} Bill Me Later, Inc. All rights reserved.</p>
        </div>
    </section>
);
