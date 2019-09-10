export default function insertTermsTable(terms) {
    const offer = terms.options && terms.options[0];

    if (terms.error || !offer) {
        return '<h3 id="terms-error"> There was an error retrieving your payment options for this purchase. Please try again later. </h3>';
    }

    return `
        <h3>${offer.term} monatliche Zahlungen von je €${offer.monthly}</h3>
        <br />
        <table>
            <tbody>
                <tr>
                    <td>E-Geld Transaktionsbetrag</td>
                    <td>€${terms.amount}</td>
                </tr>
                <tr>
                    <td>Effektiver Jahreszinssatz</td>
                    <td>${offer.apr}%</td>
                </tr>
                <tr>
                    <td>Fester Sollzinssatz</td>
                    <td>${offer.nominalRate}%</td>
                </tr>
                <tr>
                    <td>Zinsbetrag</td>
                    <td>€${offer.totalInterest}</td>
                </tr>
                <tr>
                    <td><b>Gesamtbetrag</b></td>
                    <td><b>€${offer.total}</b></td>
                </tr>
            </tbody>
        </table>
    `;
}
