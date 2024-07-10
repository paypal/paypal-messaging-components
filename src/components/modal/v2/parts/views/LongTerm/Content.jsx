/** @jsx h */
import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useXProps, useServerData, getComputedVariables } from '../../../lib';
import Calculator from '../../Calculator';
import ProductListLink from '../../ProductListLink';
import Instructions from '../../Instructions';
import InlineLinks from '../../InlineLinks';
import Button from '../../Button';
import styles from './styles.scss';

/**
 * Checks qualifying offer APRs in order to determine which APR disclaimer to render.
 */
const getAPRDetails = ({ offers, genericDisclaimer, disclaimer: { zeroAPR, mixedAPR, nonZeroAPR } = {} }) => {
    const qualifyingOffers = offers.filter(offer => offer?.meta?.qualifying === 'true');

    let totalNonZero = 0;
    let totalZero = 0;

    qualifyingOffers.forEach(offer => {
        if (offer?.meta?.apr?.replace?.('.00', '') === '0') {
            totalZero += 1;
        } else {
            totalNonZero += 1;
        }
    });

    if (qualifyingOffers.length === 0) {
        return [
            {
                /**
                 * Specifically, this impacts US Long Term and which legal disclaimer shows underneath the offer cards.
                 * If no initial amount is passed in or there is an error, we default to a generic disclaimer.
                 * i.e. Terms may vary based on purchase amount.
                 */
                aprDisclaimer: genericDisclaimer ?? zeroAPR,
                /**
                 * Used by DE Long Term to determine which legal disclosure shows at the bottom of the modal.
                 * If no initial amount is passed in, set the default legal disclosure to the nonZeroAPR disclosure.
                 */
                aprType: 'nonZeroAPR'
            }
        ];
    }

    // TODO: Clean up backwards compatible code after release and content updates.
    return qualifyingOffers.map(({ content: { disclaimer } }) => {
        if (qualifyingOffers.length === totalNonZero) {
            return {
                aprDisclaimer: disclaimer?.nonZeroAPR ?? nonZeroAPR,
                aprType: 'nonZeroAPR'
            };
        }

        if (qualifyingOffers.length === totalZero) {
            return {
                aprDisclaimer: disclaimer?.zeroAPR ?? zeroAPR,
                aprType: 'zeroAPR'
            };
        }

        return {
            aprDisclaimer: disclaimer?.mixedAPR ?? mixedAPR,
            aprType: 'mixedAPR'
        };
    });
};

export const LongTerm = ({
    content: {
        calculator,
        disclaimer,
        genericDisclaimer,
        instructions,
        v5Instructions,
        disclosure,
        navLinkPrefix,
        linkToProductList,
        cta
    },
    productMeta: { useV4Design, useV5Design },
    openProductList,
    useNewCheckoutDesign
}) => {
    const [expandedState, setExpandedState] = useState(false);
    const { amount, onClick, onClose } = useXProps();
    const { views, country } = useServerData();
    const { offers } = views.find(view => view.offers);
    const { minAmount, maxAmount } = getComputedVariables(offers);
    const offerAPRDisclaimers = getAPRDetails({ offers, disclaimer, genericDisclaimer });

    const isQualifyingAmount = amount >= minAmount && amount <= maxAmount;

    /**
     * The presence of "cta" in the content means the channel is checkout and the checkout-specific
     * partial content has been added. Because we do not want to show the link to the product list modal if we are in checkout,
     * we make sure "cta" is not in the content. If "cta" is not undefined, return the Checkout-specific cta button.
     * Otherwise, render the Product List link.
     */
    const renderCheckoutCtaButton = () => {
        /**
         * Event link name used in Pay Monthly XO version of the modal.
         * If initial amount is qualfying and eligible for Pay Monthly in XO, use eligibleClickTitle and vice versa if ineligible.
         */
        const eligibleClickTitle = 'Pay Monthly Continue';
        const ineligibleClickTitle = 'Back to Checkout';

        if (typeof cta !== 'undefined') {
            return (
                <div className={`button__container ${useNewCheckoutDesign === 'true' ? 'checkout' : ''}`}>
                    {isQualifyingAmount ? (
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
            );
        }
        if (views?.length > 2) {
            return (
                <Fragment>
                    {navLinkPrefix && <div className="content__row nav__link-prefix">{navLinkPrefix}</div>}
                    <ProductListLink openProductList={openProductList} className={country?.toLowerCase()}>
                        {linkToProductList}
                    </ProductListLink>
                </Fragment>
            );
        }
        return null;
    };

    // New checkout modal designs utilize a sticky button
    const conditionalStickyButton =
        useNewCheckoutDesign === 'true' ? (
            <div className="button__fixed-wrapper">{renderCheckoutCtaButton()}</div>
        ) : (
            renderCheckoutCtaButton()
        );

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className={`content__row dynamic ${useNewCheckoutDesign === 'true' ? 'checkout' : ''}`}>
                <div className="content__col">
                    <Calculator
                        setExpandedState={setExpandedState}
                        calculator={calculator}
                        aprDisclaimer={offerAPRDisclaimers}
                        useV4Design={useV4Design}
                        useV5Design={useV5Design}
                        useNewCheckoutDesign={useNewCheckoutDesign}
                    />
                    <div className={`content__col ${expandedState ? '' : 'collapsed'}`}>
                        <div className="branded-image">
                            {/* TODO: include Icon component when desktop images are final */}
                        </div>
                    </div>
                </div>
                <Instructions
                    instructions={v5Instructions ?? instructions}
                    useV4Design={useV4Design}
                    useV5Design={useV5Design}
                    useNewCheckoutDesign={useNewCheckoutDesign}
                    expandedState={expandedState}
                />
            </div>
            <div
                className={`content__row disclosure ${expandedState ? '' : 'collapsed'} ${
                    useNewCheckoutDesign === 'true' ? 'checkout' : ''
                } ${useV5Design === 'true' ? 'v5Design' : ''}`}
            >
                {typeof disclosure === 'string' || Array.isArray(disclosure) ? (
                    <InlineLinks text={disclosure} useNewCheckoutDesign={useNewCheckoutDesign} />
                ) : (
                    <InlineLinks
                        text={(disclosure?.[offerAPRDisclaimers[0].aprType] ?? '').replace(/\D00\s?(EUR|€)/g, ' €')}
                    />
                )}
            </div>
            {conditionalStickyButton}
        </Fragment>
    );
};
