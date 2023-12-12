/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
/** @jsx h */
import { h, Fragment } from 'preact';
import Instructions from '../../Instructions';
import PreapprovalDisclaimer from '../../PreapprovalDisclaimer';
import Donut from '../../Donut';
import ProductListLink from '../../ProductListLink';
import InlineLinks from '../../InlineLinks';
import Button from '../../Button';
import styles from './styles.scss';

import { useServerData, useXProps } from '../../../lib/providers';
import { currencyFormat } from '../../../lib/hooks/currency'; // Remove .00 cents from formated min and max

export const ShortTerm = ({
    content: {
        instructions,
        linkToProductList,
        estimatedInstallments,
        preapproval,
        disclosure,
        donutTimestamps,
        learnMoreLink,
        cta
    },
    productMeta: { qualifying, periodicPayment, useV4Design, preapproved },
    openProductList
}) => {
    const { views, country } = useServerData();
    const { onClick, onClose } = useXProps();

    const isQualifying = qualifying === 'true';
    const isPreapproved = preapproved === 'true';

    const preapprovalDisclaimerHeadline = preapproval?.preapprovalDisclaimerHeadline;
    const preapprovalDisclaimerBody = preapproval?.preapprovalDisclaimerBody;

    const renderCheckoutCtaButton = () => {
        /**
         * Event link name used in checkout version of the modal.
         * If initial amount is qualfying and eligible for short term in XO, use eligibleClickTitle and vice versa if ineligible.
         */
        const eligibleClickTitle = 'Short Term Continue';
        const ineligibleClickTitle = 'Back to Checkout';

        if (typeof cta !== 'undefined') {
            return (
                <div className="button__fixed-wrapper">
                    <div className="button__container">
                        {isQualifying ? (
                            <Button
                                onClick={() => {
                                    onClick({ linkName: eligibleClickTitle });
                                    onClose({ linkName: eligibleClickTitle });
                                }}
                                className="cta"
                            >
                                {cta.buttonTextEligible}
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    onClick({ linkName: ineligibleClickTitle });
                                    onClose({ linkName: ineligibleClickTitle });
                                }}
                                className="cta"
                            >
                                {cta.buttonTextIneligible}
                            </Button>
                        )}
                    </div>
                </div>
            );
        }
        return null;
    };

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
                                        useV4Design={useV4Design}
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
                        <Instructions instructions={instructions} useV4Design={useV4Design} />
                        {isPreapproved && (
                            <PreapprovalDisclaimer
                                preapprovalDisclaimerBody={preapprovalDisclaimerBody}
                                preapprovalDisclaimerHeadline={preapprovalDisclaimerHeadline}
                                country={country}
                            />
                        )}
                    </div>
                    <div className="content__col">
                        <div className="branded-image">
                            {/* TODO: include Icon component when desktop images are final */}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`content__row disclosure ${cta ? 'checkout' : ''}`}>
                <InlineLinks text={currencyFormat(disclosure)} />
                {renderLearnMoreLink()}
            </div>
            <div className="content__row productLink">
                <div className="productLink__container">{renderProductListLink()}</div>
            </div>
            <div className="content__row">{renderCheckoutCtaButton()}</div>
        </Fragment>
    );
};
