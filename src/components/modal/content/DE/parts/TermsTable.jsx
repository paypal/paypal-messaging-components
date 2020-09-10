/** @jsx h */
import { h, Fragment } from 'preact';
import { useContent } from '../../../lib';

const TableContent = ({ terms }) => {
    const { content } = useContent('INST');

    const genericError = <h3 className="error">{content.terms.genericError}</h3>;

    if (terms.error || !terms.maxAmount) {
        return genericError;
    }

    if (+terms.amount < terms.minAmount && terms.type === 'pala') {
        return <h3 className="error">{content.terms.minError.replace(/,00/g, '')}</h3>;
    }

    if (+terms.amount > terms.maxAmount && terms.type === 'pala') {
        return <h3 className="error">{content.terms.maxError.replace(/,00/g, '')}</h3>;
    }

    const [offer] = terms.offers.length ? terms.offers : [];
    if (!offer || !offer.qualified) {
        return genericError;
    }

    return (
        <Fragment>
            <h3 className="header">{content.terms.tableHeader}</h3>
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
