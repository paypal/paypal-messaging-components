export const DEV_GB_PAY_IN_1 = {
    testFileName: 'payIn1',
    country: 'GB',
    description: 'GB merchant eligible for pay in 30 days',
    minAmount: 1,
    maxAmount: 900,
    amounts: [
        {
            value: '0.00',
            message: 'Non-qualifying Pay in 30 Days',
            expectedValue: 'Pay in 30 days for purchases of £1 to £900.',
            modalContent: {
                subheadline: 'Available for purchases of £1 – £900. Eligibility subject to status.'
            }
        },
        {
            value: '1.00',
            message: 'Qualifying Pay in 30 Days',
            expectedValue: 'Pay in 30 days.',
            modalContent: {
                subheadline: 'Available for purchases of £1 – £900. Eligibility subject to status.'
            }
        },
        {
            value: '900.01',
            message: 'Non-qualifying Pay in 30 Days',
            expectedValue: 'Pay in 30 days for purchases of £1 to £900.',
            modalContent: {
                subheadline: 'Available for purchases of £1 – £900. Eligibility subject to status.'
            }
        }
    ]
};
