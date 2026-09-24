export const DEV_AU_LONG_TERM = {
    testFileName: 'longTerm',
    country: 'AU',
    description: 'AU merchant eligible for long term only',
    minAmount: 500,
    maxAmount: 15000,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Buy now, pay later.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                belowMinAmountErr: 'Enter an amount between $500 AUD - $15,000 AUD.',
                aprDisclaimer: 'Comparison rate: 12.99% p.a.*'
            }
        },
        {
            value: '500.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Buy now, pay later.',
            modalContent: {
                offerHeadline: '$47.08/mo. for 12 instalments',
                updatedOfferHeadline: '$47.08/mo. for 12 instalments',
                offerFieldValues: ['12.99%', '$64.95', '$564.95'],
                aprDisclaimer: 'Comparison rate: 12.99% p.a.*'
            }
        },
        {
            value: '15000.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Buy now, pay later.',
            modalContent: {
                offerHeadline: null,
                offerFieldValues: null,
                aboveMaxAmountErr: 'Enter an amount between $500 AUD - $15,000 AUD.',
                aprDisclaimer: 'Comparison rate: 12.99% p.a.*'
            }
        }
    ]
};
