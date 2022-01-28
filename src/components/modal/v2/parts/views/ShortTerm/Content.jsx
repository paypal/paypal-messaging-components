/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
/** @jsx h */
import { h, Fragment } from 'preact';
import Instructions from '../../Instructions';
import Donut from '../../Donut';
import ProductListLink from '../../ProductListLink';
import InlineLinks from '../../InlineLinks';
import styles from './styles.scss';

import { useServerData } from '../../../lib/providers';

export const ShortTerm = ({
    content: { instructions, linkToProductList, disclosure, donutTimestamps },
    productMeta: { qualifying, periodicPayment },
    openProductList
}) => {
    const { views } = useServerData();

    const renderProductListLink = () => {
        if (views?.length > 1) {
            return <ProductListLink openProductList={openProductList}>{linkToProductList}</ProductListLink>;
        }
        return <Fragment />;
    };

    const donutScreenReaderString = donutTimestamps
        .map(timestamp => `${periodicPayment.replace('.00', '')} for ${timestamp}`)
        .join(', ');

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="content__container">
                <main className="main">
                    <div className="content__body">
                        <div className="dynamic__container">
                            <div className="content__row dynamic">
                                <div className="content__col">
                                    <div className="content__row donuts">
                                        <div className="donuts__container">
                                            <span aria-hidden={qualifying !== 'true'} className="sr-only">
                                                {donutScreenReaderString}
                                            </span>
                                            {donutTimestamps.map((_, index) => (
                                                <Donut
                                                    key={index}
                                                    qualifying={qualifying}
                                                    periodicPayment={periodicPayment}
                                                    currentNum={index + 1}
                                                    timeStamp={donutTimestamps[index]}
                                                    numOfPayments={donutTimestamps.length}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <Instructions instructions={instructions} />
                                </div>
                                <div className="content__col">
                                    <div className="branded-image">
                                        {/* TODO: include Icon component when desktop images are final */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content__row disclosure">
                            <p>
                                <InlineLinks text={disclosure} />
                            </p>
                        </div>
                        <div className="content__row productLink">
                            <div className="productLink__container">{renderProductListLink()}</div>
                        </div>
                    </div>
                </main>
            </div>
        </Fragment>
    );
};
