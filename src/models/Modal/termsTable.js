const optionRow = (terms, option) =>
    option.type === 'INST'
        ? `<tr>
            ${
                terms.type === 'pala'
                    ? `${option.monthly && !option.isNonQualified ? `<td>$${option.monthly}</td>` : '<td> - </td>'}`
                    : ''
            }
            <td>${option.term}</td>
            <td>$${option.minValue}</td>
            <td>${option.apr}%</td>
            ${
                terms.type === 'pala'
                    ? `${option.total && !option.isNonQualified ? `<td>$${option.total}</td>` : '<td> - </td>'}`
                    : ''
            }
        </tr>`
        : '';

const invalidAmountWarning = terms =>
    terms.max_amount !== terms.default_max_amount
        ? `<div style="text-align: center; padding-bottom: 15px; display: table; padding-top: 10px; "><span style="display: inline-block; vertical-align: middle; "><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19"><path fill="none" fill-rule="evenodd" stroke="#9DA3A6" stroke-linecap="round" stroke-linejoin="round" d="M9.526 10.474v7.579c4.71-.034 8.527-3.817 8.527-8.527a8.526 8.526 0 1 0-11.834 7.862"></path></svg></span><p style="display: inline; font-size: 13px; color: #2c2e2f; padding-left: 5px; font-family: PayPalSansSmall; font-weight: 400 ">$${
              terms.max_amount
          } is the maximum amount to be eligible for Easy Payments. Enter an amount of $${
              terms.max_amount
          } or less.</p></div>`
        : '<p style="text-align: center">No offers are available for this amount. Please enter a new amount.</p>';

export default function insertTermsTable(terms) {
    if (terms.error) {
        return '<h3 id="terms-error"> There was an error retrieving your payment options for this purchase. Please try again later. </h3>';
    }

    if (+terms.amount < terms.min_amount && terms.type === 'pala') {
        return `<div style="text-align: center; padding-bottom: 15px; display: table; padding-top: 10px; "><span style="display: inline-block; vertical-align: middle; "><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19"><path fill="none" fill-rule="evenodd" stroke="#9DA3A6" stroke-linecap="round" stroke-linejoin="round" d="M9.526 10.474v7.579c4.71-.034 8.527-3.817 8.527-8.527a8.526 8.526 0 1 0-11.834 7.862"></path></svg></span><p style="display: inline; font-size: 13px; color: #2c2e2f; padding-left: 5px; font-family: PayPalSansSmall; font-weight: 400 ">$${
            terms.min_amount
        } is the minimum amount to be eligible for Easy Payments. Enter an amount of $${
            terms.min_amount
        } or more.</p></div>`;
    }

    return `
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
            ${
                terms.options && terms.options.length > 0 && terms.options !== 'N/A'
                    ? terms.options.map(option => optionRow(terms, option)).join('')
                    : ''
            }
            </tbody>
        </table>
        ${!terms.options || terms.options.length === 0 || terms.options === 'N/A' ? invalidAmountWarning(terms) : ''}
        <p id="terms-note">The monthly payment shown is an estimated amount and may not include taxes and shipping</p>
    `;
}
