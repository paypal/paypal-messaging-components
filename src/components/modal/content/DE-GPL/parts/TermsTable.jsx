/** @jsx h */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useContent } from '../../../lib';
import Icon from '../../../parts/Icon';

const getTableError = ({ amount, minAmount, maxAmount, error, offers }) => {
    const {
        terms: { genericError, invalidAmount }
    } = useContent('GPL');

    if (error || !maxAmount) {
        return genericError;
    }

    if (+amount < minAmount || +amount > maxAmount) {
        return invalidAmount.replace(/,00/g, '');
    }

    const [offer] = offers.length ? offers : [];
    if (!offer || !offer.qualified) {
        return genericError;
    }

    return null;
};

const blankOffers = [
    {
        periodic: '--,--',
        term: 24
    },
    {
        periodic: '--,--',
        term: 12
    },
    {
        periodic: '--,--',
        term: 6
    },
    {
        periodic: '--,--',
        term: 3
    }
];

const TableContent = ({ terms: { formattedAmount, offers }, hasError }) => {
    const sortedOffers = hasError ? blankOffers : offers.slice().sort((a, b) => b.term - a.term);
    const [expandedOffer, setExpandedOffer] = useState(hasError ? null : sortedOffers[0]);

    useEffect(() => {
        if (offers && !hasError) {
            setExpandedOffer(sortedOffers[0]);
        }
    }, [offers]);

    return sortedOffers.map(offer => (
        <button
            className={`offer ${offer === expandedOffer ? 'expanded' : ''}`}
            type="button"
            onClick={hasError ? null : () => setExpandedOffer(offer)}
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

    const error = getTableError(terms);

    return (
        <div className={`finance-terms ${error ? 'has-error' : ''}`}>
            {error ? (
                <h3 className="error">
                    <Icon name="error" />
                    {error}
                </h3>
            ) : null}
            <TableContent terms={terms} hasError={!!error} />
            <div className="finance-terms__disclaimer">{disclaimer}</div>
        </div>
    );
};

export default TermsTable;
