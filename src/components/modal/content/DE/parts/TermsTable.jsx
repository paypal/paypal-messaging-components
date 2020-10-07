/** @jsx h */
import { h, Fragment } from 'preact';
import { useContent } from '../../../lib';

const TableContent = ({ terms: { error, amount, formattedAmount, maxAmount, minAmount, type, offers } }) => {
    const {
        terms: { genericError, minError, maxError, tableHeader }
    } = useContent('INST');

    const genericErrorEl = <h3 className="error">{genericError}</h3>;

    if (error || !maxAmount) {
        return genericErrorEl;
    }

    if (+amount < minAmount && type === 'pala') {
        return <h3 className="error">{minError.replace(/,00/g, '')}</h3>;
    }

    if (+amount > maxAmount && type === 'pala') {
        return <h3 className="error">{maxError.replace(/,00/g, '')}</h3>;
    }

    const [offer] = offers.length ? offers : [];
    if (!offer || !offer.qualified) {
        return genericErrorEl;
    }

    return (
        <Fragment>
            <h3 className="header">{tableHeader}</h3>
            <hr className="divider" />
            <table className="table">
                <tbody>
                    <tr>
                        <td>E-Geld Transaktionsbetrag</td>
                        <td>{formattedAmount}€</td>
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
