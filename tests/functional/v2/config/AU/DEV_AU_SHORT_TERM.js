export const DEV_AU_SHORT_TERM = {
    testFileName: 'shortTerm',
    country: 'AU',
    description: 'AU merchant eligible for short term only',
    minAmount: 30,
    maxAmount: 1500,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay in 4',
            expectedValue: 'Pay in 4 interest-free payments',
            modalContent: {
                subheadline: 'Available for purchases of $30.00 to $1,500.00. No sign-up fees or late fees.',
                periodicPayment: null
            }
        },
        {
            value: '30.00',
            message: 'Qualifying Pay in 4',
            expectedValue: 'Pay in 4 interest-free payments of $7.50',
            modalContent: {
                subheadline: 'Split your purchase of $30.00 into 4 with no sign-up fees or late fees.',
                periodicPayment: '$7.50'
            }
        },
        {
            value: '1500.01',
            message: 'Non-qualifying Pay in 4',
            expectedValue: 'Pay in 4 interest-free payments',
            modalContent: {
                subheadline: 'Available for purchases of $30.00 to $1,500.00. No sign-up fees or late fees.',
                periodicPayment: ''
            }
        }
    ]
};
