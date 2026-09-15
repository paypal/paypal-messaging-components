export const DEV_US_TIKTOK_SHORT_TERM = {
    testFileName: 'shortTerm',
    country: 'US',
    description: 'TikTok Pay Later Hub - US merchant eligible for short term only, $10 to $2,000 range',
    minAmount: 10,
    maxAmount: 2000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay in 4',
            expectedValue: 'Pay in 4 interest-free payments on qualifying purchases',
            modalContent: {
                subheadline: 'No impact on credit score and no late fees. Available for purchases of $10 to $2,000.',
                periodicPayment: null
            }
        },
        {
            value: '10.00',
            message: 'Qualifying Pay in 4',
            expectedValue: 'Pay in 4 interest-free payments of $2.50',
            modalContent: {
                subheadline: 'Split your purchase of $10.00 into 4 with no impact on credit score and no late fees.',
                periodicPayment: '$2.50'
            }
        },
        {
            value: '2000.01',
            message: 'Non-qualifying Pay in 4',
            expectedValue: 'Pay in 4 interest-free payments on qualifying purchases',
            modalContent: {
                subheadline: 'No impact on credit score and no late fees. Available for purchases of $10 to $2,000.',
                periodicPayment: ''
            }
        }
    ]
};
