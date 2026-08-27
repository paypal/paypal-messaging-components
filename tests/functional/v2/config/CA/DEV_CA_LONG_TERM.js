export const DEV_CA_LONG_TERM = {
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
                offerHeadline: '$9.23/mo. for 6 months',
                updatedOfferHeadline: '$94.17/mo. for 6 months',
                offerFieldValues: ['26%', '$6.37', '$55.37'],
                aprDisclaimer:
                    '*Terms and rates vary based on purchase amount and your credit. In Quebec and Newfoundland, APR is no more than 22%.'
            }
        },
        {
            value: '1000.00',
            message: 'Qualifying Pay Monthly',
            expectedValue: 'Pay Monthly',
            modalContent: {
                offerHeadline: '$188.33/mo. for 6 months',
                updatedOfferHeadline: '$94.17/mo. for 6 months',
                offerFieldValues: ['26%', '$130.00', '$1,130.00'],
                aprDisclaimer:
                    '*Terms and rates vary based on purchase amount and your credit. In Quebec and Newfoundland, APR is no more than 22%.'
            }
        },
        {
            value: '0.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Pay Monthly',
            modalContent: {
                belowMinAmountErr: 'Enter an amount between $49.00 - $10,000.00.'
            }
        },
        {
            value: '10000.01',
            message: 'Non-qualifying Pay Monthly',
            expectedValue: 'Pay Monthly',
            modalContent: {
                aboveMaxAmountErr: 'Enter an amount between $49.00 - $10,000.00.'
            }
        }
    ]
};
