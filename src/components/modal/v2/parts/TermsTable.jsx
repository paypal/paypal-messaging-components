/** @jsx h */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import OfferCard from './OfferCard';
import OfferAccordion from './OfferAccordion';
import LoadingShimmer from './LoadingShimmer';

const SORT_DIRECTION = {
    ASCENDING: 1,
    DESCENDING: -1
};

// US, ES, IT, and CA display offers ascending (6, 12, 24 months); AT, DE, and FR display descending.
const OFFER_SORT_DIRECTION_BY_COUNTRY = {
    US: SORT_DIRECTION.ASCENDING,
    ES: SORT_DIRECTION.ASCENDING,
    IT: SORT_DIRECTION.ASCENDING,
    CA: SORT_DIRECTION.ASCENDING,
    AT: SORT_DIRECTION.DESCENDING,
    DE: SORT_DIRECTION.DESCENDING,
    FR: SORT_DIRECTION.DESCENDING
};

const TermsTable = ({
    isLoading,
    view: { meta, offers },
    aprDisclaimer,
    useV4Design,
    useV5Design,
    use5Dot1Design,
    useNewCheckoutDesign,
    useDarkMode,
    language
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

    const rawSortDirection = OFFER_SORT_DIRECTION_BY_COUNTRY[offerCountry];
    const isValidSortDirection = Object.values(SORT_DIRECTION).includes(rawSortDirection);
    const sortSign = isValidSortDirection ? rawSortDirection : 0;
    const processedOffers = sortSign
        ? offers
              .filter(offer => offer.meta.qualifying === 'true')
              .map(offer => ({ offer, totalPayments: Number(offer.meta.total_payments) }))
              .sort((a, b) =>
                  Number.isNaN(a.totalPayments) || Number.isNaN(b.totalPayments)
                      ? 0
                      : sortSign * (a.totalPayments - b.totalPayments)
              )
              .map(({ offer }) => offer)
        : offers.filter(offer => offer.meta.qualifying === 'true');

    const qualifyingOffers = processedOffers.map((offer, idx) => {
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
                offerCountry={offerCountry}
                language={language}
            />
        );
    });

    setNumOffers(qualifyingOffers.length === 0 ? undefined : qualifyingOffers.length);

    return <div className="offer__wrapper">{qualifyingOffers}</div>;
};

export default TermsTable;
