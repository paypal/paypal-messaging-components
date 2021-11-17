/** @jsx h */
import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
import OfferCard from './OfferCard';
import LoadingShimmer from './LoadingShimmer';

const TermsTable = ({ isLoading, terms: { offers }, hasError }) => {
    /**
     * numOffers/setNumOffers is used to dynamically change the number of loading shimmers that are rendered
     * depending on the last number of offers that were displayed.
     */
    const [numOffers, setNumOffers] = useState();

    if (isLoading || hasError) {
        return (
            <Fragment>
                <div className="offer__wrapper">
                    <LoadingShimmer numOffers={numOffers} />
                </div>
            </Fragment>
        );
    }

    const sortedOffers = offers
        .slice()
        .sort((a, b) => b.term - a.term)
        .filter(offer => offer.meta.qualifying === 'true')
        .map((offer, idx) => <OfferCard offer={offer} index={idx} />);

    setNumOffers(sortedOffers.length);

    return (
        <Fragment>
            <div className="offer__wrapper">{sortedOffers}</div>
        </Fragment>
    );
};

export default TermsTable;
