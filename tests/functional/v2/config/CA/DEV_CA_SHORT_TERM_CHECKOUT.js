export const DEV_CA_SHORT_TERM_CHECKOUT = {
    testFileName: 'shortTerm',
    country: 'CA',
    description: 'CA merchant eligible for short term only',
    minAmount: 10,
    maxAmount: 2000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay in 4',
            expectedValue: 'Pay in 4 interest-free payments on qualifying purchases',
            modalContent: {
                subheadline:
                    'No impact on credit score and no late fees. Available for purchases of $10 CAD to $2,000 CAD.',
                periodicPayment: null
            }
        },
        {
            value: '10.00',
            message: 'Qualifying Pay in 4',
            expectedValue: 'Pay in 4 interest-free payments of $2.50',
            modalContent: {
                subheadline:
                    'Split $10.00 CAD into 4 interest-free payments with no impact on credit score and no late fees.',
                periodicPayment: '$2.50'
            }
        },
        {
            value: '2000.01',
            message: 'Non-qualifying Pay in 4',
            expectedValue: 'Pay in 4 interest-free payments on qualifying purchases',
            modalContent: {
                subheadline:
                    'No impact on credit score and no late fees. Available for purchases of $10 CAD to $2,000 CAD.',
                periodicPayment: ''
            }
        }
    ]
};
