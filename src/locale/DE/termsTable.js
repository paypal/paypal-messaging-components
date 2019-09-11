export default function insertTermsTable(terms) {
    const offer = terms.options && terms.options[0];

    if (terms.error || !offer) {
        return '<h3 id="terms-error"> There was an error retrieving your payment options for this purchase. Please try again later. </h3>';
    }

    return `
        <style>
            #terms-container {
                max-width: 350px;
                width: 100%;
            }

            #terms-table {
                width: 100%;
            }

            h3 {
                text-align: center;
            }

            #terms-table td:nth-child(2) {
                text-align: right;
            }
        </style>
        <div id="terms-container">
            <h3>${offer.term} monatliche Zahlungen von je €${offer.monthly}</h3>
            <hr />
            <table id="terms-table">
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
        </div>
    `;
}
