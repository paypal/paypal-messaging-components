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
import OfferTerms from '../../OfferTerms';
import Icon from '../../Icon';
import styles from './styles.scss';

import { useXProps, useServerData, usePrequalification } from '../../../lib';
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
        cta,
        offerTerms,
        spendingPowerSubtext
    },
    productMeta: {
        qualifying,
        periodicPayment,
        useV4Design,
        useV5Design,
        preapproved,
        showPreapprovedBadge,
        showPromoContent,
        prequalExperience,
        product
    },
    openProductList,
    useNewCheckoutDesign,
    use5Dot1Design
}) => {
    const { views, country } = useServerData();
    const { onClick, onClose, ecToken } = useXProps();
    const offer = product ?? 'PAY_LATER_SHORT_TERM';
    const spendingPowerClickTitle = 'Check Spending Power';
    const handlePrequalification = usePrequalification(spendingPowerClickTitle, onClick, onClose, {
        offer,
        token: ecToken
    });

    const isQualifying = qualifying === 'true';

    const showOfferTerms = showPromoContent === 'true';

    const isPreapproved = preapproved === 'true';
    const shouldShowPreapprovedBadge = showPreapprovedBadge === 'true';
    const showPreapprovalContent = isPreapproved && shouldShowPreapprovedBadge;
    const isPrequalExperience = prequalExperience === 'true';

    const preapprovalDisclaimerHeadline = preapproval?.preapprovalDisclaimerHeadline;
    const preapprovalDisclaimerBody = preapproval?.preapprovalDisclaimerBody;
    const preapprovalPrivacyDisclaimer = preapproval?.preapprovalPrivacyDisclaimer;
    const countryClassName = country?.toLowerCase();

    const renderCheckoutCtaButton = () => {
        /**
         * Event link name used in checkout version of the modal.
         * If initial amount is qualfying and eligible for short term in XO, use eligibleClickTitle and vice versa if ineligible.
         */
        const eligibleClickTitle = 'Short Term Continue';
        const ineligibleClickTitle = 'Back to Checkout';

        if (isQualifying && isPrequalExperience) {
            return (
                <div className="button__fixed-wrapper">
                    <div
                        className={`button__container ${
                            useNewCheckoutDesign === 'true' ? 'checkout' : ''
                        } ${countryClassName}`}
                    >
                        <p className="spending-power__subtext">{spendingPowerSubtext}</p>
                        <Button onClick={handlePrequalification} className="cta">
                            <span className="cta__content">
                                {cta?.buttonTextSpendingPower ?? 'Check your Spending Power'}
                                <Icon name="lightning-bolt" />
                            </span>
                        </Button>
                    </div>
                </div>
            );
        }

        if (typeof cta !== 'undefined') {
            return (
                <div className="button__fixed-wrapper">
                    <div
                        className={`button__container ${
                            useNewCheckoutDesign === 'true' ? 'checkout' : ''
                        } ${countryClassName}`}
                    >
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
                <div
                    className={`content__row dynamic ${
                        useNewCheckoutDesign === 'true' ? 'checkout' : ''
                    } ${countryClassName}`}
                >
                    <div className="content__col">
                        <div className={`content__row donuts ${useNewCheckoutDesign === 'true' ? 'checkout' : ''}`}>
                            <div className="donuts__container">
                                {elements.map((installment, index) => (
                                    <Donut
                                        key={index}
                                        useV4Design={useV4Design}
                                        useV5Design={useV5Design}
                                        use5Dot1Design={use5Dot1Design}
                                        useNewCheckoutDesign={useNewCheckoutDesign}
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
                        {showPreapprovalContent && (
                            <PreapprovalDisclaimer
                                preapprovalDisclaimerBody={preapprovalDisclaimerBody}
                                preapprovalDisclaimerHeadline={preapprovalDisclaimerHeadline}
                                preapprovalPrivacyDisclaimer={preapprovalPrivacyDisclaimer}
                                country={country}
                                useNewCheckoutDesign={useNewCheckoutDesign}
                            />
                        )}
                        <Instructions
                            instructions={instructions}
                            cta={cta}
                            useV4Design={useV4Design}
                            useV5Design={useV5Design}
                            useNewCheckoutDesign={useNewCheckoutDesign}
                        />
                        {showOfferTerms && offerTerms && (
                            <OfferTerms
                                headline={offerTerms.headline}
                                bullets={offerTerms.bullets}
                                footer={offerTerms.footer}
                                seeTermsLink={offerTerms.seeTermsLink}
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
            <div
                className={`content__row disclosure ${
                    (cta && useNewCheckoutDesign === 'true') || cta ? 'checkout' : ''
                } ${useV5Design === 'true' ? 'v5Design' : ''}`}
            >
                <InlineLinks text={currencyFormat(disclosure)} />
                {renderLearnMoreLink()}
            </div>
            <div className={`content__row productLink${isPrequalExperience ? ' prequal-fixed-offset' : ''}`}>
                <div className="productLink__container">{renderProductListLink()}</div>
            </div>
            <div className="content__row">{renderCheckoutCtaButton()}</div>
        </Fragment>
    );
};
