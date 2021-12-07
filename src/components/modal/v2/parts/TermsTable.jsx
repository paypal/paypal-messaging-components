/** @jsx h */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import OfferCard from './OfferCard';
import LoadingShimmer from './LoadingShimmer';

const TermsTable = ({ isLoading, view: { offers }, hasError }) => {
    /**
     * numOffers/setNumOffers is used to dynamically change the number of loading shimmers that are rendered
     * depending on the last number of offers that were displayed.
     */
    const [numOffers, setNumOffers] = useState();

    if (isLoading || hasError) {
        return (
            <div className="offer__wrapper">
                <LoadingShimmer numOffers={numOffers} />
            </div>
        );
    }

    const qualifyingOffers = offers
        .filter(offer => offer.meta.qualifying === 'true')
        .map((offer, idx) => <OfferCard offer={offer} index={idx} />);

    setNumOffers(qualifyingOffers.length);

    return <div className="offer__wrapper">{qualifyingOffers}</div>;
};

export default TermsTable;
