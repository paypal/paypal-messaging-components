/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import Icon from '../../Icon';
import Tile from './Tile';
import styles from './styles/index.scss';

const tilesContent = [
    {
        header: 'Pay in 4',
        icon: 'pay-in-4-tile',
        body: 'Interest-free payments every 2 weeks, starting today.',
        viewName: 'PAY_LATER_LONG_TERM'
    },
    {
        header: 'Pay monthly',
        icon: 'pay-monthly-tile',
        body: 'Split your purchase into equal monthly payments.',
        viewName: 'PAY_MONTHLY'
    },
    {
        header: 'PayPal Credit',
        icon: 'paypal-credit-tile',
        body: 'No Interest if paid in full in 6 months for purchases of $99+.',
        viewName: 'PAYPAL_CREDIT_NO_INTEREST'
    }
];

export const ProductList = ({ disclosure, setProduct, contentBodyRef }) => {
    const [expandedState, setExpandedState] = useState(false);

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="content__container">
                <main className="main">
                    <div className="content__body" ref={contentBodyRef}>
                        <div className="content__row dynamic">
                            <div className="content__col">
                                <div className="content_row instructions">
                                    <p>Choose an option for more details.</p>
                                </div>
                                {tilesContent.map(({ header, body, icon, viewName }, index) => (
                                    <Tile
                                        key={index}
                                        header={header}
                                        body={body}
                                        icon={icon}
                                        viewName={viewName}
                                        setProduct={setProduct}
                                    />
                                ))}
                                <div className="content_row instructions">
                                    <p>
                                        Select <strong>PayPal</strong> at checkout to <strong>Pay Later</strong>.
                                    </p>
                                </div>
                            </div>
                            <div className="content__col collapsed">
                                <div className="branded-image">
                                    {/* TODO: update from temp desktop image */}
                                    <Icon name="pay-monthly-image" />
                                </div>
                            </div>
                        </div>
                        <div className="content__row disclosure">{disclosure}</div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
