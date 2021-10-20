/** @jsx h */
import { Fragment, h } from 'preact';
import OfferCard from './OfferCard';
import LoadingShimmer from './LoadingShimmer';

const TermsTable = ({ isLoading, terms: { offers, formattedAmount }, termsLabel, disclaimer, hasError }) => {
    if (isLoading || hasError) {
        return (
            <Fragment>
                <div className="offer__wrapper">
                    <LoadingShimmer />
                </div>
                <div className="finance-terms__disclaimer">{disclaimer}</div>
            </Fragment>
        );
    }
    const sortedOffers = offers.slice().sort((a, b) => b.term - a.term);

    return (
        <Fragment>
            <div className="offer__wrapper">
                {sortedOffers.map((offer, idx) => (
                    <OfferCard termsLabel={termsLabel} offer={offer} formattedAmount={formattedAmount} index={idx} />
                ))}
            </div>
            <div className="finance-terms__disclaimer">{disclaimer}</div>
        </Fragment>
    );
};

export default TermsTable;
