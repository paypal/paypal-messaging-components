export const DEV_GB_SHORT_TERM_CHECKOUT = {
    testFileName: 'shortTerm',
    country: 'GB',
    description: 'GB merchant eligible for short term only',
    minAmount: 30,
    maxAmount: 2000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay in 3',
            expectedValue: 'Pay in 3 interest-free payments',
            modalContent: {
                subheadline: 'Available for purchases of £30 to £2,000. No sign-up fees or late fees.',
                periodicPayment: null
            }
        },
        {
            value: '30.00',
            message: 'Qualifying Pay in 3',
            expectedValue: 'Pay in 3 interest-free payments of £10.00',
            modalContent: {
                subheadline: 'Split your purchase of £30.00 into 3 with no sign-up fees or late fees.',
                periodicPayment: '£10.00'
            }
        },
        {
            value: '2000.01',
            message: 'Non-qualifying Pay in 3',
            expectedValue: 'Pay in 3 interest-free payments',
            modalContent: {
                subheadline: 'Available for purchases of £30 to £2,000. No sign-up fees or late fees.',
                periodicPayment: ''
            }
        }
    ]
};
