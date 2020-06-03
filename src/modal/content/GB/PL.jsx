/** @jsx h */
import { h, Fragment } from 'preact';
import { useCalculator } from '../../lib/hooks';
import Icon from '../../parts/Icon';

const PL = () => {
    const { terms } = useCalculator();
    return (
        <Fragment>
            <div className="container-left">
                <div className="headline-container">
                    <h1>
                        3 interest-free payments of <br /> £{terms.offers[0].monthly}/month with Flex
                    </h1>
                </div>
                <div className="subheadline-container">
                    <p className="subheadline">On purchases of £45 to £2,000</p>
                </div>
                <div className="placeholderSpace" />
                <div className="content-body__terms">
                    <p>
                        Subject to status. T&Cs apply. UK residents only. <br />
                        PayPal Flex is a trading name of PayPal (Europe) S.a.r.l et Cie, S.C.A <br /> 22-24 Boulevard
                        Royal L-2449, Luxembourg.
                    </p>
                </div>
            </div>
            <div className="container-right">
                <h2>Buy now, pay later</h2>
                <div className="container-right-content">
                    <div className="shopping-bag icon-container">
                        <Icon name="shopping-bag" />
                    </div>
                    <p>
                        Get your goods now and <br /> pay nothing today.
                    </p>
                    <div className="checkmark icon-container">
                        <Icon name="checkmark" />
                    </div>
                    <p>
                        Get an instant decision <br /> with no impact to your <br /> credit score.
                    </p>
                    <div className="pp-button icon-container">
                        <Icon name="pp-button" />
                    </div>
                    <p>
                        Check out with PayPal and <br /> choose <span>Flex.</span>
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default PL;
