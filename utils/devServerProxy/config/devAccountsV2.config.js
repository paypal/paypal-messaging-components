export default {
    DEV_US_LT: {
        country: 'US',
        modalViews: [
            {
                template: 'long_term.json',
                offersTemplate: 'long_term.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'gplnq.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 2999.99
                },
                {
                    totalPayments: 12,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 199,
                    maxAmount: 20000
                },
                {
                    totalPayments: 24,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 500,
                    maxAmount: 20000
                },
                {
                    totalPayments: 36,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 3000,
                    maxAmount: 20000
                }
            ]
        }
    }
};
