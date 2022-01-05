const US = {
    DEV_US_MULTI: {
        country: 'US',
        description: 'US Multi-product merchant',
        amounts: [
            {
                value: '0.00',
                message: 'Product list modal functionality',
                expectedValue: 'Buy now, pay later.',
                modalContent: {
                    headline: 'Pay later with flexible options',
                    shortTerm: 'Pay in 4 interest-free payments',
                    longTerm: 'Make easy monthly payments',
                    noInterest: 'Pay over time with PayPal Credit'
                }
            }
        ]
    },
    DEV_US_SHORT_TERM: {
        country: 'US',
        description: 'US merchant eligible for short term only',
        minAmount: 30,
        maxAmount: 1500,
        amounts: [
            {
                value: '0.00',
                message: 'Non-qualifying Pay in 4',
                expectedValue: 'Pay in 4 interest-free payments on qualifying purchases',
                modalContent: {
                    subheadline:
                        'No impact on credit score and no late fee. Available for purchases of $30.00 to $1,500.00.',
                    periodicPayment: null
                }
            },
            {
                value: '30.00',
                message: 'Qualifying Pay in 4',
                expectedValue: 'Pay in 4 interest-free payments of $7.50',
                modalContent: {
                    subheadline:
                        'Split your purchase of $30.00 into 4 with no impact on credit score and no late fees.',
                    periodicPayment: '$7.50'
                }
            },
            {
                value: '1500.01',
                message: 'Non-qualifying Pay in 4',
                expectedValue: 'Pay in 4 interest-free payments on qualifying purchases',
                modalContent: {
                    subheadline:
                        'No impact on credit score and no late fee. Available for purchases of $30.00 to $1,500.00.',
                    periodicPayment: ''
                }
            }
        ]
    },
    DEV_US_NO_INTEREST: {
        country: 'US',
        description: 'US merchant eligible for NI only',
        amounts: [
            {
                value: '99.00',
                message: 'Qualifying PPC NI',
                expectedValue: 'No interest if paid in full in 6 months.',
                modalContent: 'Apply now and get a decision in seconds.'
            }
        ]
    },
    DEV_US_LONG_TERM: {
        country: 'US',
        description: 'US merchant eligible for long term only',
        minAmount: 199,
        maxAmount: 20000,
        amounts: [
            {
                value: '0.00',
                message: 'Non-qualifying Pay Monthly',
                expectedValue: 'Buy now, pay later.',
                modalContent: {
                    offerHeadline: null,
                    offerFieldValues: null,
                    belowMinAmountErr: 'Enter an amount of $199 or more.',
                    aprDisclaimer: 'Terms may vary based on purchase amount.'
                }
            },
            {
                value: '199.00',
                message: 'Qualifying Pay Monthly',
                expectedValue: 'Buy now, pay later.',
                modalContent: {
                    offerHeadline: '$33.17/mo. for 6 months',
                    updatedOfferHeadline: '$83.33/mo. for 6 months',
                    offerFieldValues: ['0%', '$0.00', '$199.00'],
                    aprDisclaimer: 'Terms may vary based on purchase amount.'
                }
            },
            {
                value: '20000.01',
                message: 'Non-qualifying Pay Monthly',
                expectedValue: 'Buy now, pay later.',
                modalContent: {
                    offerHeadline: null,
                    offerFieldValues: null,
                    aboveMaxAmountErr: 'Enter an amount no larger than $20,000.',
                    aprDisclaimer: 'Terms may vary based on purchase amount.'
                }
            }
        ]
    },
    DEV_US_LONG_TERM_CHECKOUT: {
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
    }
};

export default US;
