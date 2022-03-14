export const DEV_US_LONG_TERM_CHECKOUT = {
    testFileName: 'longTermCheckout',
    country: 'US',
    description: 'US merchant eligible for long term only',
    minAmount: 199,
    maxAmount: 20000,
    amounts: [
        {
            value: '199.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Buy now, pay later.',
            modalContent: {
                offerHeadline: '$34.82/mo. for 6 months',
                updatedOfferHeadline: '$87.50/mo. for 6 months',
                offerFieldValues: ['10%', '$9.95', '$208.95'],
                aprDisclaimer:
                    '*APR is 0-30% based on your credit. Terms and 0% APR may vary based on purchase amount.',
                cta: 'Continue with Pay Monthly'
            }
        }
    ]
};
