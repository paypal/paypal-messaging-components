export const DEV_US_MULTI = {
    testFileName: 'multiProduct',
    country: 'US',
    description: 'US Multi-product merchant',
    amounts: [
        {
            value: '0.00',
            message: 'Product list modal functionality',
            expectedValue: 'Buy now, pay later.',
            modalContent: {
                headline: 'Buy now,\npay over time',
                shortTerm: 'Pay in 4 interest-free payments',
                longTerm: 'Pay with monthly installments',
                noInterest: 'Pay over time with PayPal Credit'
            }
        }
    ]
};
