/** @jsx h */
import { h, Fragment } from 'preact';
import { useCalculator } from '../../lib/hooks';

const PL = () => {
    const { terms } = useCalculator();
    console.log(terms);
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
                        PayPal Flex is a trading name of PayPal (Europe) S.a.r.l et Cie,
                        <br /> S.C.A 22-24 Boulevard Royal L-2449, Luxembourg.
                    </p>
                </div>
            </div>
            <div className="container-right">
                <h2>Buy now, pay later</h2>
                <div className="container-right-content">
                    <p>
                        Get your goods now and <br /> pay nothing today.
                    </p>
                    <p>
                        Get an instant decision with <br />
                        no impact on your credit score.
                    </p>
                    <p>
                        Check out with PayPal and <br /> choose <span>Flex.</span>
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default PL;
