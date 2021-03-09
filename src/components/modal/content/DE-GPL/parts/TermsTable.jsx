/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useContent } from '../../../lib';

const TermsTable = ({ terms: { error, formattedAmount, offers }, isLoading }) => {
    const sortedOffers = offers.sort((a, b) => b.term - a.term);
    const [expandedOffer, setExpandedOffer] = useState(sortedOffers[0]);
    const {
        calculator: { disclaimer }
    } = useContent('GPL');

    useEffect(() => {
        if (offers) {
            setExpandedOffer(sortedOffers[0]);
        }
    }, [offers]);

    if (isLoading) {
        return (
            <div className="finance-terms">
                {[0, 1, 2, 3].map(() => (
                    <button className="offer" type="button">
                        <div className="loading-bar" />
                        <div className="loading-bar " />
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="finance-terms">
            {offers.map(offer => (
                <button
                    className={`offer ${offer === expandedOffer ? 'expanded' : ''}`}
                    type="button"
                    onClick={() => setExpandedOffer(offer)}
                >
                    <div className="offer__header">
                        <div className="offer__periodic">
                            {offer.periodic} € <span className="small">/Monat</span>
                        </div>
                        <div className="offer__term">{offer.term} Raten</div>
                    </div>
                    <div className="offer__body">
                        <div className="offer__description">
                            Eff. Jahreszins {offer.apr}%, Fester Sollzinssatz {offer.nominalRate}%
                        </div>
                        <div className="offer__field">
                            <div>Transaktionsbetrag E-Geld Service</div>
                            <div>{formattedAmount} €</div>
                        </div>
                        <div className="offer__field">
                            <div>Zinsbetrag</div>
                            <div>{offer.totalInterest} €</div>
                        </div>
                        <div className="offer__field">
                            <div>Gesamtbetrag</div>
                            <div>{offer.total} €</div>
                        </div>
                    </div>
                </button>
            ))}
            <div className="finance-terms__disclaimer">{disclaimer}</div>
        </div>
    );
};

export default TermsTable;
