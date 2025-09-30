// Note that these values are solely mock structures for development purposes
// that are not guaranteed to be reflective of what is in production
export default {
    DEV_IT_MULTI: {
        country: 'IT',
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
        messageThresholds: [
            {
                amount: 0,
                template: 'short_term_no_amount.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 0.01,
                template: 'short_term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'short_term_q.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 500,
                template: 'long_term_q.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 5000.01,
                template: 'long_term_nq.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_SHORT_TERM: [
                {
                    totalPayments: 3,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 30,
                    maxAmount: 2000
                }
            ],
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 14.99,
                    nominalRate: 0,
                    minAmount: 60,
                    maxAmount: 5000
                },
                {
                    totalPayments: 12,
                    apr: 14.99,
                    nominalRate: 0,
                    minAmount: 120,
                    maxAmount: 5000
                },
                {
                    totalPayments: 24,
                    apr: 14.99,
                    nominalRate: 0,
                    minAmount: 240,
                    maxAmount: 5000
                }
            ]
        }
    },
    DEV_IT_SHORT_TERM: {
        country: 'IT',
        modalViews: [
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'short_term_no_amount.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 30,
                template: 'short_term_q.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 2000.01,
                template: 'short_term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        offers: {
            PAY_LATER_SHORT_TERM: [
                {
                    totalPayments: 3,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 30,
                    maxAmount: 2000
                }
            ]
        }
    },
    DEV_IT_LONG_TERM: {
        country: 'IT',
        modalViews: [
            {
                template: 'long_term.json',
                offersTemplate: 'long_term.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 60,
                template: 'long_term_q.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 5000.01,
                template: 'long_term_nq.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 60,
                    maxAmount: 5000
                },
                {
                    totalPayments: 12,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 60,
                    maxAmount: 5000
                },
                {
                    totalPayments: 24,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 60,
                    maxAmount: 5000
                }
            ]
        }
    }
};
