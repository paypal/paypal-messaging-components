export const DEV_GB_MULTI = {
    testFileName: 'multiProductGB',
    country: 'GB',
    description: 'GB merchant eligible for Pay in 3 and Pay in 30 Days',
    amounts: [
        {
            value: '50.00',
            message: 'Qualifying Pi30 - opens Pi30 modal then navigates to product list',
            expectedValue: 'Pay in 30 days.',
            modalContent: {
                headline: 'Buy now, pay later',
                shortTerm: 'Pay in 3 interest-free payments',
                payIn1: 'Buy now. Pay in 30 Days.'
            }
        },
        {
            value: '74.99',
            message: 'Qualifying Pi30 at upper boundary - opens Pi30 modal then navigates to product list',
            expectedValue: 'Pay in 30 days.',
            modalContent: {
                headline: 'Buy now, pay later',
                shortTerm: 'Pay in 3 interest-free payments',
                payIn1: 'Buy now. Pay in 30 Days.'
            }
        },
        {
            value: '75.00',
            message: 'Qualifying Pi3 at lower boundary - opens Pi3 modal then navigates to product list',
            expectedValue: 'Pay in 3 interest-free payments of £25.00',
            modalContent: {
                headline: 'Buy now, pay later',
                shortTerm: 'Pay in 3 interest-free payments',
                payIn1: 'Buy now. Pay in 30 Days.'
            }
        },
        {
            value: '200.00',
            message: 'Qualifying Pi3 - opens Pi3 modal then navigates to product list',
            expectedValue: 'Pay in 3 interest-free payments of £66.67',
            modalContent: {
                headline: 'Buy now, pay later',
                shortTerm: 'Pay in 3 interest-free payments',
                payIn1: 'Buy now. Pay in 30 Days.'
            }
        }
    ]
};
