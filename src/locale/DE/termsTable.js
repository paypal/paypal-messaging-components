export default function insertTermsTable(terms) {
    const offer = terms.options && terms.options[0];

    if (terms.error || !offer) {
        return '<h3 id="terms-error"> There was an error retrieving your payment options for this purchase. Please try again later. </h3>';
    }

    return `
        <h3>${offer.term} monatliche Zahlungen von je</h3>
        <table>
            <thead>
                <tr>
                    ${terms.type === 'pala' ? '<th>Monthly<br>Payments</th>' : ''}
                    <th>Payments</th>
                    <th>Minimum<br>Purchase</th>
                    <th>APR</th>
                    ${terms.type === 'pala' ? '<th>Total w/<br>Interest</th>' : ''}
                </tr>
            </thead>
            <tbody>
            
            </tbody>
        </table>
        <p id="terms-note">The monthly payment shown is an estimated amount and may not include taxes and shipping</p>
    `;
}
