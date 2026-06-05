export const DEV_CA_LONG_TERM_CHECKOUT = {
    testFileName: 'longTerm',
    country: 'CA',
    description: 'CA merchant eligible for pay monthly (long term)',
    minAmount: 49,
    maxAmount: 10000,
    amounts: [
        {
            value: '49.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Pay Monthly',
            modalContent: {
                offerHeadline: '$5.15/mo. for 12 months',
                updatedOfferHeadline: '$52.50/mo. for 12 months',
                offerFieldValues: ['26%', '$12.74', '$61.74'],
                aprDisclaimer: '*APR is 0% to 31.99%. Terms and rates vary based on purchase amount and your credit.',
                cta: 'Continue with Pay Monthly'
            }
        },
        {
            value: '1000.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Pay Monthly',
            modalContent: {
                offerHeadline: '$105.00/mo. for 12 months',
                updatedOfferHeadline: '$52.50/mo. for 12 months',
                offerFieldValues: ['26%', '$260.00', '$1,260.00'],
                aprDisclaimer: '*APR is 0% to 31.99%. Terms and rates vary based on purchase amount and your credit.',
                cta: 'Continue with Pay Monthly'
            }
        },
        {
            value: '0.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Pay Monthly',
            modalContent: {
                belowMinAmountErr: 'Enter an amount of $49.00 or more.'
            }
        },
        {
            value: '10000.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Pay Monthly',
            modalContent: {
                aboveMaxAmountErr: 'Enter an amount no larger than $10,000.00.'
            }
        }
    ]
};
