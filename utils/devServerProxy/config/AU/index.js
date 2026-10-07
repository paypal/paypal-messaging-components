export default {
    DEV_AU_MULTI: {
        country: 'AU',
        modalViews: [
            {
                template: 'product_list.json',
                product: 'PRODUCT_LIST'
            },
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                template: 'long_term.json',
                offersTemplate: 'long_term.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        // getDevAccountDetails reads a message template for every account, so this
        // can't be omitted. Points at Pi4 until AU PM message fixtures land.
        messageThresholds: [
            {
                amount: 0,
                template: 'gpl.json',
                templateV2: 'short-term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        offers: {
            PAY_LATER_SHORT_TERM: [
                {
                    totalPayments: 4,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 1,
                    maxAmount: 1999.99
                }
            ],
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 12,
                    apr: 12.99,
                    nominalRate: 12.99,
                    minAmount: 500,
                    maxAmount: 15000
                },
                {
                    totalPayments: 18,
                    apr: 12.99,
                    nominalRate: 12.99,
                    minAmount: 500,
                    maxAmount: 15000
                },
                {
                    totalPayments: 24,
                    apr: 12.99,
                    nominalRate: 12.99,
                    minAmount: 500,
                    maxAmount: 15000
                }
            ]
        }
    },
    DEV_AU_LONG_TERM: {
        country: 'AU',
        modalViews: [
            {
                template: 'long_term.json',
                offersTemplate: 'long_term.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        // getDevAccountDetails reads a message template for every account, so this
        // can't be omitted. Points at Pi4 until AU PM message fixtures land.
        messageThresholds: [
            {
                amount: 0,
                template: 'gpl.json',
                templateV2: 'short-term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 12,
                    apr: 12.99,
                    nominalRate: 12.99,
                    minAmount: 500,
                    maxAmount: 15000
                },
                {
                    totalPayments: 18,
                    apr: 12.99,
                    nominalRate: 12.99,
                    minAmount: 500,
                    maxAmount: 15000
                },
                {
                    totalPayments: 24,
                    apr: 12.99,
                    nominalRate: 12.99,
                    minAmount: 500,
                    maxAmount: 15000
                }
            ]
        }
    },
    DEV_AU_SHORT_TERM: {
        country: 'AU',
        modalViews: [
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 1999.99,
                template: 'gpl.json',
                templateV2: 'short-term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0.99,
                template: 'gplq.json',
                templateV2: 'short-term_q.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0,
                template: 'gpl.json',
                templateV2: 'short-term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        offers: {
            PAY_LATER_SHORT_TERM: [
                {
                    totalPayments: 4,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 1,
                    maxAmount: 1999.99
                }
            ]
        }
    }
};
