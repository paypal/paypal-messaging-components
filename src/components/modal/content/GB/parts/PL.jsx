/** @jsx h */
import { h } from 'preact';
import { useCalculator } from '../../../lib/hooks';
import Icon from '../../../parts/Icon';

const isEligible = terms => {
    if (typeof terms.amount === 'undefined' || terms.amount < terms.minAmount || terms.amount > terms.maxAmount) {
        return (
            <h1 className="offer">
                Pay in 3 interest-free <br /> payments
            </h1>
        );
    }
    return (
        <h1 className="offer">
            Pay in 3 interest-free <br /> payments of £{terms.offers[0].periodic}
        </h1>
    );
};

const PL = () => {
    const { terms } = useCalculator();
    return (
        <div className="content-body">
            <div className="left">
                {isEligible(terms)}
                <p className="subheadline">
                    {!terms.error && terms.formattedMinAmount && terms.formattedMaxAmount
                        ? `For purchases between £${terms.formattedMinAmount} and £${terms.formattedMaxAmount}`
                        : 'On eligible purchases'}
                </p>
                <Icon name="icecream" />
                <div className="thumbs-up">
                    <Icon name="thumbs-up" />
                </div>
                <div className="terms">
                    <p>
                        Subject to status. Terms and Conditions apply. UK residents only. <br />
                        PayPal Pay in 3 is a trading name of PayPal (Europe) S.à.r.l. et <br />
                        Cie, S.C.A., <br /> 22-24 Boulevard Royal, L-2449, Luxembourg.
                    </p>
                </div>
            </div>
            <div className="right">
                <h2 className="title">Buy now, pay later</h2>
                <div className="info">
                    <Icon name="shopping-bag" />
                    <p>
                        Make one payment today, <br /> then pay the rest monthly.
                    </p>
                    <Icon name="checkmark" />
                    <p>
                        Apply easily and get an <br /> instant decision.
                    </p>
                    <Icon name="pp-button" />
                    <p>
                        Check out with PayPal and <br /> choose <span>Pay in 3.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PL;
