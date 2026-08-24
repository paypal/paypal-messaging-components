/** @jsx h */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import OfferCard from './OfferCard';
import OfferAccordion from './OfferAccordion';
import LoadingShimmer from './LoadingShimmer';

// US, ES, IT, and CA display offers ascending (6, 12, 24 months); AT, DE, and FR display descending.
const offerSortDirection = { US: 'asc', ES: 'asc', IT: 'asc', CA: 'asc', AT: 'desc', DE: 'desc', FR: 'desc' };

const TermsTable = ({
    isLoading,
    view: { meta, offers },
    aprDisclaimer,
    useV4Design,
    useV5Design,
    use5Dot1Design,
    useNewCheckoutDesign,
    useDarkMode
}) => {
    const { offerCountry } = meta;
    const offerAccordionCountries = ['AT', 'DE', 'ES', 'IT'];
    /**
     * numOffers/setNumOffers is used to dynamically change the number of loading shimmers that are rendered
     * depending on the last number of offers that were displayed.
     */
    const [numOffers, setNumOffers] = useState();
    const [activeSelection, setActiveSelection] = useState(0);

    if (isLoading) {
        return (
            <div className="offer__wrapper">
                <LoadingShimmer
                    numOffers={offerAccordionCountries.includes(offerCountry) ? 4 : numOffers}
                    offerCountry={offerCountry}
                    useNewCheckoutDesign={useNewCheckoutDesign}
                />
            </div>
        );
    }

    const direction = offerSortDirection[offerCountry];
    let sortSign = 0;
    if (direction === 'asc') {
        sortSign = 1;
    } else if (direction === 'desc') {
        sortSign = -1;
    } else if (direction) {
        console.warn(`Unrecognized offer Sort Direction "${direction}" for country "${offerCountry}"`);
    }
    const processedOffers = sortSign
        ? [...offers].sort((a, b) => sortSign * (a.meta.total_payments - b.meta.total_payments))
        : offers;

    const qualifyingOffers = processedOffers
        .filter(offer => offer.meta.qualifying === 'true')
        .map((offer, idx) => {
            // DE, ES, and IT use the accordion style for presentation of offers in the modal.
            if (offerAccordionCountries.includes(offerCountry)) {
                const disclaimer =
                    aprDisclaimer[offer.meta.total_payments]?.aprDisclaimer ?? aprDisclaimer.default?.aprDisclaimer;
                return (
                    <OfferAccordion
                        offer={offer}
                        index={idx}
                        aprDisclaimer={disclaimer}
                        activeSelection={activeSelection}
                        setActiveSelection={setActiveSelection}
                        useV5Design={useV5Design}
                        use5Dot1Design={use5Dot1Design}
                        offerCountry={offerCountry}
                    />
                );
            }
            // All other countries use the card style
            return (
                <OfferCard
                    offer={offer}
                    index={idx}
                    useV4Design={useV4Design}
                    useV5Design={useV5Design}
                    use5Dot1Design={use5Dot1Design}
                    useNewCheckoutDesign={useNewCheckoutDesign}
                    useDarkMode={useDarkMode}
                />
            );
        });

    setNumOffers(qualifyingOffers.length === 0 ? undefined : qualifyingOffers.length);

    return <div className="offer__wrapper">{qualifyingOffers}</div>;
};

export default TermsTable;
