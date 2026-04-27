/* eslint-disable eslint-comments/disable-enable-pair */
/** @jsx h */
import { h, Fragment } from 'preact';
import Button from '../../Button';
import Instructions from '../../Instructions';
import ProductListLink from '../../ProductListLink';
import InlineLinks from '../../InlineLinks';
import styles from './styles.scss';

import { useServerData, useXProps } from '../../../lib/providers';
import { currencyFormat } from '../../../lib/hooks/currency'; // Remove .00 cents from formated min and max

export const PayIn1 = ({
    productMeta: { useV5Design, qualifying },
    content: { instructions, linkToProductList, disclosure, navLinkPrefix, learnMoreLink, cta },
    openProductList
}) => {
    const { views, country } = useServerData();
    const { onClick, onClose } = useXProps();

    const countryClassName = country?.toLowerCase();
    const isQualifying = qualifying === 'true';

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
                    <div className={`button__container ${countryClassName}`}>
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

    return (
        <Fragment>
            <style>{styles._getCss()}</style>
            <div className="content__row dynamic">
                <div className="content__col">
                    <Instructions instructions={instructions} country={country} useV5Design={useV5Design} />
                </div>
                <div className="content__col">
                    <div className="branded-image">
                        {/* TODO: include Icon component when desktop images are final */}
                    </div>
                </div>
            </div>
            <div className={`content__row disclosure ${useV5Design ? 'v5Design' : ''} ${country === 'DE' ? 'DE' : ''}`}>
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
