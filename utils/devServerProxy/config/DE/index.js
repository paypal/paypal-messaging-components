// Note that these values are solely mock structures for development purposes
// that are not guaranteed to be reflective of what is in production
export default {
    DEV_DE_LONG_TERM: {
        country: 'DE',
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
                template: 'gpl_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 3,
                    apr: 9.99,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 6,
                    apr: 9.99,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 12,
                    apr: 9.99,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 5000
                },
                {
                    totalPayments: 24,
                    apr: 9.99,
                    nominalRate: 0,
                    minAmount: 99,
                    maxAmount: 5000
                }
            ]
        }
    }
};
