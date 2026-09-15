export const DEV_US_APPLE_LONG_TERM_PL2GO = {
    testFileName: 'longTerm',
    country: 'US',
    description: 'Apple Wallet PL2GO - US merchant showing long term Pay Later to Go content via Apple Wallet flow',
    minAmount: 199,
    maxAmount: 20000,
    amounts: [
        {
            value: '199.00',
            modalContent: {
                offerHeadline: '$33.17/mo. for 6 months',
                updatedOfferHeadline: '$83.33/mo. for 6 months',
                offerFieldValues: ['0%', '$0.00', '$199.00'],
                aprDisclaimer: 'Terms may vary based on purchase amount.'
            }
        }
    ]
};
