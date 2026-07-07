// Note that these values are solely mock structures for development purposes
// that are not guaranteed to be reflective of what is in production
export default {
    DEV_FR_MULTI: {
        country: 'FR',
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
                template: 'generic.json',
                product: 'GENERIC'
            },
            {
                amount: 0.01,
                template: 'gpl.json',
                templateV2: 'short-term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 20,
                template: 'gplq.json',
                templateV2: 'short-term_q.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 500,
                template: 'long_term_q_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 2900.01,
                template: 'gplq.json',
                templateV2: 'short-term_q.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 3000.01,
                template: 'long_term_nq_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_SHORT_TERM: [
                {
                    totalPayments: 4,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 20,
                    maxAmount: 3000
                }
            ],
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 14.99,
                    nominalRate: 14.99,
                    minAmount: 120,
                    maxAmount: 2900
                },
                {
                    totalPayments: 12,
                    apr: 14.99,
                    nominalRate: 14.99,
                    minAmount: 120,
                    maxAmount: 2900
                },
                {
                    totalPayments: 24,
                    apr: 14.99,
                    nominalRate: 14.99,
                    minAmount: 240,
                    maxAmount: 2900
                }
            ]
        }
    },
    DEV_FR_SHORT_TERM: {
        country: 'FR',
        modalViews: [
            {
                template: 'short_term.json',
                product: 'PAY_LATER_SHORT_TERM'
            }
        ],
        messageThresholds: [
            {
                amount: 0,
                template: 'gpl.json',
                templateV2: 'short-term_nq.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 20,
                template: 'gplq.json',
                templateV2: 'short-term_q.json',
                product: 'PAY_LATER_SHORT_TERM'
            },
            {
                amount: 3000.01,
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
                    minAmount: 20,
                    maxAmount: 3000
                }
            ]
        }
    },
    DEV_FR_LONG_TERM: {
        country: 'FR',
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
                template: 'long_term_nq_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 120,
                template: 'long_term_q_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            },
            {
                amount: 2900.01,
                template: 'long_term_nq_gtz.json',
                product: 'PAY_LATER_LONG_TERM'
            }
        ],
        offers: {
            PAY_LATER_LONG_TERM: [
                {
                    totalPayments: 6,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 120,
                    maxAmount: 2900
                },
                {
                    totalPayments: 12,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 120,
                    maxAmount: 2900
                },
                {
                    totalPayments: 24,
                    apr: 0,
                    nominalRate: 0,
                    minAmount: 240,
                    maxAmount: 2900
                }
            ]
        }
    }
};
