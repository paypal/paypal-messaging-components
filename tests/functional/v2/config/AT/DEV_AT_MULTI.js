export const DEV_AT_MULTI = {
    testFileName: 'multiProduct',
    country: 'AT',
    description: 'AT Multi-product merchant (Pi30 + Long Term)',
    amounts: [
        {
            value: '0.00',
            message: 'Product list modal functionality',
            expectedValue: 'Jetzt kaufen, später bezahlen.',
            modalContent: {
                headline: 'Jetzt kaufen',
                payIn1: 'Kaufen Sie jetzt was Sie möchten. Bezahlen Sie erst in 30 Tagen',
                longTerm: 'Später bezahlen in monatlichen Raten'
            }
        }
    ]
};
