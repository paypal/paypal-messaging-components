/** @jsx h */
import { h } from 'preact';

import { useServerData } from '../../../lib';

const instructions = [
    'Pay in 4 is not available to residents of Wisconsin, North Dakota, Missouri, or any U.S. Territories.',
    'Late fees may apply for missed payments depending on your state of residency',
    'When applying, a soft credit check may be needed, but will not affect your credit score.'
];

export default () => {
    const { terms } = useServerData();

    return (
        <section className="content-body">
            <div className="description">
                <h2>Simple, short-term installments</h2>

                <p>
                    Interest-free payments every 2 weeks, starting today, with no impact to your credit score. Available
                    on purchases from ${terms.minAmount}-${terms.maxAmount}.
                </p>

                <div className="payment-breakdown" />

                <p>
                    Check out with <b>PayPal</b> and choose <b>Pay Later</b>
                </p>
            </div>

            <hr className="divider" />

            <div className="terms">
                <h3>About Pay in 4</h3>
                <ul>
                    {instructions.map(inst => (
                        <li>{inst}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
