export const DEV_US_MULTI = {
    testFileName: 'multiProduct',
    country: 'US',
    description: 'US Multi-product merchant',
    amounts: [
        {
            value: '0.00',
            message: 'Product list modal functionality',
            expectedValue: 'pay over time',
            modalContent: {
                headline: 'Buy now',
                shortTerm: 'Pay in 4 interest-free payments',
                longTerm: 'Pay Monthly',
                noInterest: 'PayPal Credit'
            }
        }
    ]
};
