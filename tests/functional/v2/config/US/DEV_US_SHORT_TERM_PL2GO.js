export const DEV_US_SHORT_TERM_PL2GO = {
    testFileName: 'shortTermPL2GO',
    country: 'US',
    description: 'US merchant showing short term Pay Later to Go content',
    minAmount: 30,
    maxAmount: 1500,
    amounts: [
        {
            value: '30.00',
            message: 'Qualifying Pay in 4',
            expectedValue: 'Pay in 4 interest-free payments of $7.50',
            modalContent: {
                subheadline: 'Split your purchase of $30.00 into 4 with no impact on credit score and no late fees.',
                periodicPayment: '$7.50'
            }
        },
        {
            value: '1500.01',
            message: 'Non-qualifying Pay in 4',
            expectedValue: 'Pay in 4 interest-free payments on qualifying purchases',
            modalContent: {
                subheadline: 'No impact on credit score and no late fees. Available for purchases of $30 to $1,500.',
                periodicPayment: ''
            }
        }
    ]
};
