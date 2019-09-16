export default function insertTermsTable(terms) {
    const genericError =
        '<h3 id="terms-error">There was an error retrieving your payment options for this purchase. Please try again later.</h3>';
    if (terms.error) {
        return genericError;
    }

    const filteredOffers = terms.options ? terms.options.filter(opt => !opt.isNonQualified) : [];

    const offer = filteredOffers[0];

    if (+terms.amount < terms.min_amount && terms.type === 'pala') {
        return `<h3 id="terms-error">${terms.formattedMinAmount}€ is the minimum amount to be eligible for Ratenzahlung. Enter an amount of ${terms.formattedMinAmount}€ or more.</h3>`;
    }

    if (+terms.amount > terms.max_amount && terms.type === 'pala') {
        return `<h3 id="terms-error">${terms.formattedMaxAmount}€ is the maximum amount to be eligible for Ratenzahlung. Enter an amount of ${terms.formattedMaxAmount}€ or less.</h3>`;
    }

    if (!offer) {
        return genericError;
    }

    return `
        <h3>${offer.term} monatliche Zahlungen von je €${offer.monthly}</h3>
        <hr />
        <table>
            <tbody>
                <tr>
                    <td>E-Geld Transaktionsbetrag</td>
                    <td>${terms.formattedAmount}€</td>
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
                    <td>${offer.totalInterest}€</td>
                </tr>
                <tr>
                    <td><b>Gesamtbetrag</b></td>
                    <td><b>${offer.total}€</b></td>
                </tr>
            </tbody>
        </table>
    `;
}
