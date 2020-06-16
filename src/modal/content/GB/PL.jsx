/** @jsx h */
import { h } from 'preact';
import { useCalculator } from '../../lib/hooks';
import Icon from '../../parts/Icon';

const isEligible = terms => {
    if (terms.amount === null || terms.amount < terms.minAmount || terms.amount > terms.maxAmount) {
        return (
            <h1 className="content-body__offer">
                3 interest-free monthly <br /> payments with Flex
            </h1>
        );
    }
    return (
        <h1 className="content-body__offer">
            3 interest-free payments of <br /> £{terms.offers[0].monthly} per month with Flex
        </h1>
    );
};

const PL = () => {
    const { terms } = useCalculator();
    return (
        <div className="content-body">
            <div className="content-body--left">
                {isEligible(terms)}
                <p className="content-body__subheadline">On purchases of £45 to £2,000</p>
                <Icon name="icecream" />
                <div className="content-body__thumbs-up">
                    <Icon name="thumbs-up" />
                </div>
                <div className="content-body__terms">
                    <p>
                        Subject to status. T&Cs apply. UK residents only. <br />
                        PayPal Flex is a trading name of PayPal (Europe) S.a.r.l et <br className="mobile-break" />
                        Cie, S.C.A <br className="desktop-break" /> 22-24 Boulevard Royal L-2449, Luxembourg.
                    </p>
                </div>
            </div>
            <div className="content-body--right">
                <h2 className="content-body__title">Buy now, pay later</h2>
                <div className="content-body__info">
                    <Icon name="shopping-bag" />
                    <p>
                        Get your goods now and <br /> pay nothing for 1 month.
                    </p>
                    <Icon name="checkmark" />
                    <p>
                        Get an instant decision <br className="desktop-break" /> with <br className="mobile-break" /> no
                        impact to your
                        <br className="desktop-break" /> credit score.
                    </p>
                    <Icon name="pp-button" />
                    <p>
                        Check out with PayPal and <br /> choose <span>Flex.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PL;
