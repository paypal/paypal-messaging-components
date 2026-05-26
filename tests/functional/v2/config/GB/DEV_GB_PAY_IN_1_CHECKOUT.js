export const DEV_GB_PAY_IN_1_CHECKOUT = {
    testFileName: 'payIn1',
    country: 'GB',
    description: 'GB merchant eligible for pay in 1',
    minAmount: 1,
    maxAmount: 900,
    amounts: [
        {
            value: '0.01',
            message: 'Non-qualifying Pay in 1',
            expectedValue: 'Buy now. Pay in 30 Days.',
            modalContent: {
                subheadline: 'Available for purchases of £1 to £900. Eligibility subject to status.',
                periodicPayment: null
            }
        },
        {
            value: '1.00',
            message: 'Qualifying Pay in 1',
            expectedValue: 'Buy now. Pay in 30 Days.',
            modalContent: {
                subheadline: 'Available for purchases of £1 to £900. Eligibility subject to status.',
                periodicPayment: null
            }
        },
        {
            value: '900.01',
            message: 'Non-qualifying Pay in 1',
            expectedValue: 'Buy now. Pay in 30 Days.',
            modalContent: {
                subheadline: 'Available for purchases of £1 to £900. Eligibility subject to status.',
                periodicPayment: null
            }
        }
    ]
};
