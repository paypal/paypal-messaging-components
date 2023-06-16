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
import { currencyFormat } from '../../../lib/hooks/currency'; // Remove .00 cents from formated min and max

export const ShortTerm = ({
    content: { instructions, linkToProductList, estimatedInstallments, disclosure, donutTimestamps, learnMoreLink },
    productMeta: { qualifying, periodicPayment },
    openProductList
}) => {
    const { views } = useServerData();

    const renderProductListLink = () => {
        return (
            views?.length > 2 && (
                <ProductListLink openProductList={openProductList}>{linkToProductList}</ProductListLink>
            )
        );
    };

    // Optional outbound link to MPP product learn more page
    const renderLearnMoreLink = () => {
        return (
            learnMoreLink && (
                <div className="learnMoreLink__container">
                    <InlineLinks text={learnMoreLink} />
                </div>
            )
        );
    };

    const hasInstallments = Object.keys(estimatedInstallments?.items ?? {}).length;
    const elements = hasInstallments ? estimatedInstallments?.items : donutTimestamps;

    // regex replaces EUR with the euro symbol €
    const localeFormattedPayment = periodicPayment.replace(/(\s?EUR)/g, ' €');

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="dynamic__container">
                <div className="content__row dynamic">
                    <div className="content__col">
                        <div className="content__row donuts">
                            <div className="donuts__container">
                                {elements.map((installment, index) => (
                                    <Donut
                                        key={index}
                                        qualifying={qualifying}
                                        // regex replaces EUR with the euro symbol €
                                        periodicPayment={
                                            installment?.total_payment
                                                ? installment.total_payment.replace(/(\s?EUR)/g, ' €')
                                                : localeFormattedPayment
                                        }
                                        currentNum={index + 1}
                                        timeStamp={installment?.payment_date ?? donutTimestamps[index]}
                                        numOfPayments={elements.length}
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
                <InlineLinks text={currencyFormat(disclosure)} />
            </div>
            <div className="content__row productLink">
                {renderLearnMoreLink()}
                <div className="productLink__container">{renderProductListLink()}</div>
            </div>
        </Fragment>
    );
};
