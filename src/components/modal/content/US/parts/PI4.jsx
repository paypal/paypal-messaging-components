/** @jsx h */
import { h, Fragment } from 'preact';

import { useServerData } from '../../../lib';
import PieChart from './PieChart';

const instructions = [
    'Pay in 4 is not available to residents of Wisconsin, North Dakota, Missouri, or any U.S. Territories.',
    'Late fees may apply for missed payments depending on your state of residency',
    'When applying, a soft credit check may be needed, but will not affect your credit score.'
];

export default () => {
    const { terms } = useServerData();

    // For now, only PI4 INST offer should be shown in this modal
    const offer = terms.offers.find(ofr => ofr.type === 'INST' && ofr.qualified);

    return (
        <section className="content-body">
            <div className="description">
                <h2>Simple, short-term installments</h2>

                <p>
                    Interest-free payments every 2 weeks, starting today, with no impact to your credit score. Available
                    on purchases from ${terms.minAmount}-${terms.maxAmount}.
                </p>

                <div className="payment-breakdown">
                    {offer ? (
                        <Fragment>
                            <div>
                                <PieChart filledPercent={25} />
                                <b>${offer.periodic}</b>
                                <div>Today</div>
                            </div>
                            <div>
                                <PieChart filledPercent={50} />
                                <b>${offer.periodic}</b>
                                <div>Week 2</div>
                            </div>
                            <div>
                                <PieChart filledPercent={75} />
                                <b>${offer.periodic}</b>
                                <div>Week 4</div>
                            </div>
                            <div>
                                <PieChart filledPercent={100} />
                                <b>${offer.periodic}</b>
                                <div>Week 6</div>
                            </div>
                        </Fragment>
                    ) : null}
                </div>

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
