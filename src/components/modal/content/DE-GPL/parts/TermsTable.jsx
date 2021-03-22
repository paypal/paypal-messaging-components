/** @jsx h */
import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useContent } from '../../../lib';

const TableContent = ({ terms: { formattedAmount, offers } }) => {
    const sortedOffers = offers.slice().sort((a, b) => b.term - a.term);
    const [expandedOffer, setExpandedOffer] = useState(null);

    useEffect(() => {
        if (offers) {
            // Animate the first offer expanding
            requestAnimationFrame(() => {
                setExpandedOffer(sortedOffers[0]);
            });
        }
    }, [offers]);

    return sortedOffers.map(offer => (
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
        </button>
    ));
};

const TermsTable = ({ isLoading, terms }) => {
    const {
        terms: { disclaimer }
    } = useContent('GPL');

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
            <Fragment>
                <TableContent terms={terms} />
                <div className="finance-terms__disclaimer">{disclaimer}</div>
            </Fragment>
        </div>
    );
};

export default TermsTable;
