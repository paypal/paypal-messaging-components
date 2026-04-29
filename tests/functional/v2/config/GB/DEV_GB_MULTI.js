export const DEV_GB_MULTI = {
    testFileName: 'multiProduct',
    country: 'GB',
    description: 'GB Multi-product merchant with Pay in 3 and Pay in 30 Days',
    amounts: [
        {
            value: '0.00',
            message: 'Product list modal functionality',
            expectedValue: 'Buy now, pay later.',
            modalContent: {
                headline: 'Buy now',
                shortTerm: 'Pay in 3 interest-free payments',
                payIn1: 'Buy now. Pay in 30 Days.'
            }
        }
    ]
};
