/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useContent } from '../../../lib';

const OfferCard = ({ offer, formattedAmount, index }) => {
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        if (index === 0) {
            // Allow the card to be rendered in the DOM before expanding to make animation visible
            requestAnimationFrame(() => {
                setExpanded(true);
            });
        } else {
            setExpanded(false);
        }
    }, [offer]);

    return (
        <div className={`offer ${expanded ? 'expanded' : ''}`}>
            <button className="offer__header" type="button" onClick={() => setExpanded(!expanded)}>
                <div className="offer__periodic">
                    {offer.periodic} € <span className="small">/Monat</span>
                </div>
                <div className="offer__term">{offer.term} Raten</div>
            </button>
            <div className="offer__body">
                <div className="offer__description">
                    Eff. Jahreszins {offer.apr}%&nbsp;p.a., Fester Sollzinssatz {offer.nominalRate}%&nbsp;p.a.
                </div>
                <div className="offer__field">
                    <div className="blue">Transaktionsbetrag E-Geld Service</div>
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
        </div>
    );
};

const TermsTable = ({ isLoading, terms: { offers, formattedAmount }, hasError }) => {
    const {
        terms: { disclaimer }
    } = useContent('GPL');

    if (isLoading || hasError) {
        return (
            <div className={`finance-terms transitional loading ${hasError ? 'has-error' : ''}`}>
                {[0, 1, 2, 3].map(() => (
                    <div className="offer loading">
                        <div className="loading-bar" />
                    </div>
                ))}
            </div>
        );
    }

    const sortedOffers = offers.slice().sort((a, b) => b.term - a.term);

    return (
        <div className="finance-terms transitional">
            {sortedOffers.map((offer, idx) => (
                <OfferCard offer={offer} formattedAmount={formattedAmount} index={idx} />
            ))}
            <div className="finance-terms__disclaimer">{disclaimer}</div>
        </div>
    );
};

export default TermsTable;
