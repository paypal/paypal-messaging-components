/** @jsx h */
import { h, Fragment } from 'preact';

const TableContent = ({ terms }) => {
    const genericError = (
        <h3 className="error">
            Es ist ein Fehler bei der Berechnung Ihres Angebots aufgetreten. Bitte versuchen Sie es später noch einmal.
        </h3>
    );

    if (terms.error || !terms.maxAmount) {
        return genericError;
    }

    if (+terms.amount < terms.minAmount && terms.type === 'pala') {
        return (
            <h3 className="error">
                PayPal Ratenzahlung steht ab einem Bestellwert von {terms.formattedMinAmount}€ zur Verfügung. Bitte
                geben Sie einen Betrag von {terms.formattedMinAmount}€ oder mehr ein.
            </h3>
        );
    }

    if (+terms.amount > terms.maxAmount && terms.type === 'pala') {
        return (
            <h3 className="error">
                PayPal Ratenzahlung steht bis zu einem Bestellwert von {terms.formattedMaxAmount}€ zur Verfügung. Bitte
                geben Sie einen Betrag von {terms.formattedMaxAmount}€ oder weniger ein.
            </h3>
        );
    }

    const [offer] = terms.offers.length ? terms.offers : [];
    if (!offer || !offer.qualified) {
        return genericError;
    }

    return (
        <Fragment>
            <h3 className="header">
                {offer.term} monatliche Raten von je €{offer.monthly}
            </h3>
            <hr className="divider" />
            <table className="table">
                <tbody>
                    <tr>
                        <td>E-Geld Transaktionsbetrag</td>
                        <td>{terms.formattedAmount}€</td>
                    </tr>
                    <tr>
                        <td>Effektiver Jahreszinssatz</td>
                        <td>{offer.apr}%</td>
                    </tr>
                    <tr>
                        <td>Fester Sollzinssatz</td>
                        <td>{offer.nominalRate}%</td>
                    </tr>
                    <tr>
                        <td>Zinsbetrag</td>
                        <td>{offer.totalInterest}€</td>
                    </tr>
                    <tr>
                        <td>
                            <b>Gesamtbetrag</b>
                        </td>
                        <td>
                            <b>{offer.total}€</b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
};

const TermsTable = ({ terms, isLoading }) => (
    <div className="finance-terms">
        <div className="spinner" style={{ opacity: isLoading ? '1' : '0' }} />
        <div style={{ opacity: isLoading ? '0.5' : '1' }}>
            {(terms.type === 'pala' || terms.error) && <TableContent terms={terms} />}
        </div>
    </div>
);

export default TermsTable;
