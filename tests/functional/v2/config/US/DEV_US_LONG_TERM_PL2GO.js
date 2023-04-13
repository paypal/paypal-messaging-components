export const DEV_US_LONG_TERM_PL2GO = {
    testFileName: 'longTerm',
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
};
