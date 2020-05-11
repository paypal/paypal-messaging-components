/** @jsx h */
import { h, Fragment } from 'preact';

const TermsTable = ({ terms }) => {
    const genericError = (
        <h3 className="finance-terms__error">
            Es ist ein Fehler bei der Berechnung Ihres Angebots aufgetreten. Bitte versuchen Sie es später noch einmal.
        </h3>
    );

    if (terms.error || !terms.maxAmount) {
        return genericError;
    }

    if (+terms.amount < terms.minAmount && terms.type === 'pala') {
        return (
            <h3 className="finance-terms__error">
                PayPal Ratenzahlung steht ab einem Bestellwert von {terms.formattedMinAmount}€ zur Verfügung. Bitte
                geben Sie einen Betrag von {terms.formattedMinAmount}€ oder mehr ein.
            </h3>
        );
    }

    if (+terms.amount > terms.maxAmount && terms.type === 'pala') {
        return (
            <h3 className="finance-terms__error">
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
            <h3 className="finance-terms__header">
                {offer.term} monatliche Raten von je €{offer.monthly}
            </h3>
            <hr className="finance-terms__divider" />
            <table className="finance-terms__table">
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

export default TermsTable;
